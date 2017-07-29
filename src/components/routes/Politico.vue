<template>
<div class="politico col-md-4">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">{{startCase(toLower(nome))}}</h3>
    </div>
    <div class="panel-body">
      <div>
        <div class="row">
          <div class="col-md-6" v-if="id">
            <router-link :to="{ name: 'politico', params: { id }}">
              <img :src="urlFoto" :alt="nome">
            </router-link>
          </div>
          <div class="col-md-6 text-left">
            <strong>Partido:</strong> {{siglaPartido}}  <br>
            <strong>Uf:</strong> {{siglaUf}}  <br>
            <hr>
            <router-link :to="{ name: 'politico', params: { id }}">
              <button class="btn btn-default btn-xs">Ver Perfil</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {capitalize, startCase, toLower} from 'lodash'

export default {
  name: 'politico',
  props: {
    politico: {
      type: Object,
      required: true
    }
  },
  data () {
    return {...this.politico}
  },
  methods: {
    capitalize,
    startCase,
    toLower
  }
}
</script>

<style lang="scss" scoped>

</style>
