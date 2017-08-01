<template>
<div class="politico">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">{{startCase(toLower(nome))}}</h3>
    </div>
    <div class="panel-body">
      <div>
        <div class="row">
          <div class="col-md-6" v-if="id">
            <router-link :to="{ name: 'politico', params: { id }}">
              <img class="politico-img" :src="urlFoto" :alt="nome">
            </router-link>
          </div>
          <div class="col-md-6 text-left politico-info">
            <strong>Partido:</strong> {{siglaPartido}}  <br>
            <strong>UF:</strong> {{siglaUf}}  <br>
            <hr>
            <slot >
            </slot>
            <slot name="link">
              <router-link :to="{ name: 'politico', params: { id }}">
                <button class="btn btn-default btn-xs">
                  <i class="fa fa-external-link" aria-hidden="true"></i>&nbsp;Ver Perfil
                </button>
              </router-link>
            </slot>
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
