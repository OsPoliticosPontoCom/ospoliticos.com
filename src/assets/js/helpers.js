import {set, orderBy, startCase, toLower} from 'lodash'
import { Notification } from 'element-ui'

function normalizeText (str) {
  return startCase(toLower(str))
}

async function despesasDeputadoPorAno (
  idDeputado,
  DB = null,
  fetch = false,
  ano = '2017',
  itens = 100,
  ordem = 'ASC',
  url = `https://dadosabertos.camara.leg.br/api/v2/deputados/${idDeputado}/despesas?ano=${ano}&itens=${itens}&ordem=${ordem}`) {
  if (!fetch) {
    console.error('Você precisa passar uma lib/função para fazer o fetch. Recomenda-se a whatwg-fetch')
    return
  }

  if (!DB) {
    console.log('Precisa da Lib LocalStorageDB')
    return
  }
  // check for cache
  let existeNoCache = false
  try {
    let query = DB.queryAll('gastoDeputado', {
      query: { idDeputado, ano },
      limit: 1
    })
    existeNoCache = query.length > 0
  } catch (error) {
    console.error('erro testando o cache', error)
  }
  if (existeNoCache) {
    console.log('retornando do cache')
    return DB.queryAll('gastoDeputado', {
      query: {idDeputado, ano}
    })
  }
  // a API da camara retorna as despesas em pagina de até 100 itens
  let gastosPorPagina = []
  let gastos = null
  let resultadoGastos = null
  try {
    gastos = await fetch.get(url)
    if (gastos.status === 500) {
      Notification.error({
        title: 'Erro',
        message: 'Não conseguimos acessar as despesas do político no momento',
        duration: 2000
      })
    }
    resultadoGastos = await gastos.json()
    gastosPorPagina.push(resultadoGastos.dados)
  } catch (error) {
    console.error('erro ao acessar as despesas do deputado')
    Notification.error({
      title: 'Erro',
      message: 'Não conseguimos acessar algum dado no momento',
      duration: 2000
    })
  }

  // procura por mais páginas se existir
  let leuTodasAsPaginas = false // TODO testar se assim funciona
  while (!leuTodasAsPaginas) {
    // atualiza com o proximo link(pagina)
    if (!resultadoGastos || !resultadoGastos.links) break
    let proximoLink = resultadoGastos.links.find(l => l.rel === 'next')
    if (proximoLink) {
      gastos = await fetch.get(proximoLink.href)
      resultadoGastos = await gastos.json()
      gastosPorPagina.push(resultadoGastos.dados) // talvez vazio
    }
    leuTodasAsPaginas = resultadoGastos.links.find(l => l.rel === 'self').href === resultadoGastos.links.find(l => l.rel === 'last').href
  }
  // flat map => [[a], [b]] => [a, b]
  gastosPorPagina = gastosPorPagina.reduce((paginas, pagina) => paginas.concat(pagina), [])

  let fornecedoresDict = {}
  // calcula o gasto total
  for (let index = 0; index < gastosPorPagina.length; index++) {
    // gasto atual
    let gasto = gastosPorPagina[index]

    // existe
    if (gasto && fornecedoresDict[gasto.cnpjCpfFornecedor]) {
      let fornecedor = fornecedoresDict[gasto.cnpjCpfFornecedor]
      fornecedor.count += 1 // quantas vezes o mesmo fornecedor aparece
      fornecedor.totalValorLiquido += Number(gasto.valorLiquido)
      fornecedor.totalValorDocumento += Number(gasto.valorDocumento)
    } else {
      // pode vim vazio
      if (gasto && gasto.cnpjCpfFornecedor && gasto.cnpjCpfFornecedor.length > 0) {
        set(fornecedoresDict, gasto.cnpjCpfFornecedor, {
          idDeputado,
          dataDocumento: gasto.dataDocumento,
          count: 1,
          tipoDespesa: gasto.tipoDespesa,
          nomeFornecedor: gasto.nomeFornecedor,
          cnpjCpfFornecedor: gasto.cnpjCpfFornecedor,
          totalValorDocumento: Number(gasto.valorDocumento),
          totalValorLiquido: Number(gasto.valorLiquido),
          ano: gasto.ano,
          mes: gasto.mes,
          tipoDocumento: gasto.tipoDocumento
        })
      }
    }
  }
  const fornecedoresValues = Object.values(fornecedoresDict)
  const gastosOrdenados = orderBy(fornecedoresValues, ['totalValorLiquido', 'count'], ['desc', 'desc']) // [{gasto}]

  try {
    for (let i = 0; i < gastosOrdenados.length; i++) {
      let gasto = gastosOrdenados[i]
      DB.insert('gastoDeputado', gasto)
    }
    DB.commit()
    return gastosOrdenados
  } catch (error) {
    console.error('erro ao salvar no cache')
    return gastosOrdenados
  }
}

async function getDeputadosFromUF (
  uf,
  fetch = false,
  itens = 100,
  ordem = 'ASC') {
  let deputados = null
  try {
    deputados = await fetch.get(`https://dadosabertos.camara.leg.br/api/v2/deputados?siglaUf=${uf.toUpperCase()}&itens=${itens}&ordem=ASC&ordenarPor=nome`)
  } catch (error) {
    console.error('erro ao acessar os deputados de um determinado UF', error)
    Notification.error({
      title: 'Erro',
      message: 'Não conseguimos acessar algum dado no momento',
      duration: 2000
    })
  }
  const result = await deputados.json()
  return result.dados
}

async function getDeputadosProposicoesFromUF (uf, fetch) {
  let proposicoes = null
  try {
    proposicoes = await fetch.get(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?siglaUfAutor=${uf.toUpperCase()}&ano=2017&ordem=ASC&ordenarPor=id&itens=10`)
  } catch (error) {
    console.error('erro ao acessar as proposicoes dos deputados de um determinado UF', error)
    Notification.error({
      title: 'Erro',
      message: 'Não conseguimos acessar algum dado no momento',
      duration: 2000
    })
  }
  const result = await proposicoes.json()
  return result.dados
}

async function getDeputadosProposicoes (uf, fetch, {partido = null, sexo = null, ano = null, itens = 20, requestCadaProposicao = true} = {}) {
  let newPartido = (partido !== null && partido !== 'TODOS') ? partido : ''
  let newSexo = (sexo !== null && sexo !== 'TODOS') ? sexo : ''

  let hoje = new Date()
  let anoAtual = hoje.getFullYear()
  // let anoAnterior = anoAtual - 1
  ano = ano || anoAtual // default para o ano atual

  let proposicoesResult = null
  try {
    proposicoesResult = await fetch.get(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?siglaUfAutor=${uf.toUpperCase()}&ano=${ano}&siglaPartidoAutor=${newPartido}&siglaSexo=${newSexo}&ordem=ASC&ordenarPor=id&itens=${itens}`)
  } catch (error) {
    console.error('erro ao acessar as proposicoes dos deputados de um determinado UF', error)
    Notification.error({
      title: 'Erro',
      message: 'Não conseguimos acessar algum dado no momento',
      duration: 2000
    })
  }
  const proposicoesParsed = await proposicoesResult.json()
  const proposicoes = proposicoesParsed.dados
  if (requestCadaProposicao) {
    const idsProposicoes = proposicoes.map(p => {
      if (p.ementa.length > 0) {
        return p.id
      }
    })
    const proposicoesCompletas = []
    for (let proposicaoId of idsProposicoes) {
      try {
        let proposicaoResult = await fetch.get(`https://dadosabertos.camara.leg.br/api/v2/proposicoes/${proposicaoId}`)
        let result = await proposicaoResult.json()
        let proposicaoCompleta = result.dados
        proposicoesCompletas.push(proposicaoCompleta)
      } catch (error) {
        console.error(error)
      }
    }
    return proposicoesCompletas
  }
  return proposicoes
}

export {despesasDeputadoPorAno, getDeputadosFromUF, getDeputadosProposicoesFromUF, normalizeText, getDeputadosProposicoes}

/*
Deputado
{
  id:160527
  idLegislatura:55
  nome:"AGUINALDO RIBEIRO"
  siglaPartido:"PP"
  siglaUf:"PB"
  uri:"https://dadosabertos.camara.leg.br/api/v2/deputados/160527"
  uriPartido:"https://dadosabertos.camara.leg.br/api/v2/partidos/36809"
  urlFoto:"http://www.camara.leg.br/internet/deputado/bandep/160527.jpg"
}
-----

PROPOSICAO - SE TIVER

{
  "id": 142,
  "tipo": "REQ",
  "numero": "5679",
  "ano": "2016",
  "nomeProposicao": "REQ 5679/2016 => PL 5850/2016",
  "idProposicao": "2120382",
  "idProposicaoPrincipal": "2092189",
  "nomeProposicaoOrigem": "NA",
  "tipoProposicao": "Requerimento de Urgência (Art. 155 do RICD)",
  "tema": "NA",
  "ementa": "Requer Urgência para o PL 5.850 de 2016.",
  "explicacaoEmenta": "NA",
  "dataApresentacao": "07/12/2016",
  "regimeTramitacao": ".",
  "dataUltimoDespacho": "NA",
  "ultimoDespacho": "NA",
  "apreciacao": ".",
  "indexacao": "NA",
  "situacao": "MESA - Tramitação do Requerimento Finalizada",
  "linkInteiroTeor": "http://www.camara.gov.br/proposicoesWeb/prop_mostrarintegra?codteor=1515376",
  "apensadas": "NA"
}
*/

/*
  "links": [
    {
    "rel": "self",
    "href": "https://dadosabertos.camara.leg.br/api/v2/deputados/141536/despesas?ano=2017&pagina=25&itens=10"
    },
    {
    "rel": "next",
    "href": "https://dadosabertos.camara.leg.br/api/v2/deputados/141536/despesas?ano=2017&pagina=26&itens=10"
    },
    {
    "rel": "first",
    "href": "https://dadosabertos.camara.leg.br/api/v2/deputados/141536/despesas?ano=2017&pagina=1&itens=10"
    },
    {
    "rel": "last",
    "href": "https://dadosabertos.camara.leg.br/api/v2/deputados/141536/despesas?ano=2017&pagina=25&itens=10"
    },
    {
    "rel": "previous",
    "href": "https://dadosabertos.camara.leg.br/api/v2/deputados/141536/despesas?ano=2017&pagina=24&itens=10"
    }
    ]
*/

/* gasto ==
{
    "ano": "2017",
    "mes": "5",
    "tipoDespesa": "Emissão Bilhete Aéreo",
    "idDocumento": "",
    "tipoDocumento": "Nota Fiscal",
    "dataDocumento": "2017-05-22",
    "numDocumento": "Bilhete: 957-4554.950935",
    "valorDocumento": "200",
    "urlDocumento": "",
    "nomeFornecedor": "Cia Aérea - TAM",
    "cnpjCpfFornecedor": "02012862000160",
    "valorLiquido": "200",
    "valorGlosa": "0",
    "numRessarcimento": "0",
    "idLote": "0",
    "parcela": "0"
}
*/
