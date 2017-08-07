# Sobre os critérios

## Design do produto e experiência do usuário

- optamos por uma landing page simples com uma explicação sobre o projeto
- oferecemos uma experiência responsiva ao usuário, facilitando o acesso em qualquer dispositivo
- uma tela para pesquisas e filtros de políticos, com opção de filtrar por estado, partido, sexo e nome
- uma tela de perfil para o político seguindo um template similar ao de redes sociais comum a população brasileira. Podendo nessa, ver comparações entre políticos, últimos tweets, últimas despesas por categoria.


## Sustentabilidade

- nossos dados são provenientes diretamente da API da câmara, sem necessidade de servidor próprio para uma outra API. Valorizando e mantendo os dados atualizados de acordo com o esforço da câmara
- obtemos os dados para o ano atual e anterior dinamicamente, ficando atualizado independente de quando o site for acessado. Checar o código no arquivo "Perfil.vue"
- todos os dados coletados e processados no cliente(browser) são armazenados em banco local para servir de cache, criando uma experiência mais rápida
- nosso custo é baixíssimo já que estamos servindo ao usuário apenas arquivos estáticos como um HTML, CSS e Javascript fazendo com que a maioria dos recursos como imagens e dados venham direto da câmara
- nossa capacidade de melhorar e acrescentar mais informações cresce a medida que mais dados abertos são disponibilizados

## Inovação e Criatividade

- o principal ponto de inovação é que criamos uma maneira de ler e compartilhar uma informação simples onde qualquer pessoa pode potencializar a divulgação das ações de políticos
- nosso foco de conscientizar cidadãos permite uma mudança de pensamento, possivelmente ajudando a população votar mais consciente sabendo quem é seu candidato e o que ele já fez
- transformar gráficos em um texto simples permite que pessoas que não conseguem entender um gráfico ainda assim consigam ler algo útil

## Potencial de impacto

- conscientizar cidadãos sobre os políticos permitindo uma eleição mais consciente, possivelmente minimizando a vitória de políticos sem um bom histórico
- ser uma plataforma para conhecer mais sobre qualquer político, sobre tudo que foi feito de bom ou ruim, deixando o cidadão tomar sua própria decisão. Para qualquer lugar do Brasil
- como uma wiki, encontrar uma compilação sobre determinado político numa página única