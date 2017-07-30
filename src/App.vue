<template>
  <div id="app">
    <!-- header -->

    	<header role="header" class="header-top" id="headere-top">



        	<div class="header-fixed-wrapper" :class="{
            'navbar-fixed-top': $route.name != 'home', 'is-home': $route.name === 'home'}" role="header-fixed">

                <div class="container">

                    <!-- hgroup -->

                    <hgroup class="row">

                        <!-- logo -->

                        <div class="col-xs-5 col-sm-2 col-md-2 col-lg-2">

                            <h1 class="gravata-wrapper">
                                <a href="/" title="OsPoliticos.com"><img src="~assets/img/icon_gravata.png" alt="Os politicos ponto com gravata" title="OsPoliticos.com"/></a>
                            </h1>

                        </div>

                        <!-- logo -->

                        <!-- nav -->

                        <nav role="navigation" class="col-xs-12 col-sm-10 col-md-10 col-lg-10 navbar navbar-default">

                            <div class="navbar-header">

                                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">

                                    <span class="sr-only">Toggle navigation</span>

                                    <span class="icon-bar"></span>

                                    <span class="icon-bar"></span>

                                    <span class="icon-bar"></span>

                                </button>

                            </div>

                            <div id="navbar" class="navbar-collapse collapse">

                                <ul class="nav navbar-nav">

                                    <li>
                                    <a href="/" title="Início">Início</a>
                                    </li>

                                    <li>
                                      <router-link to="/politicos">Políticos</router-link>
                                    </li>

                                    <li>
                                      <a href="http://www2.camara.leg.br/glossario" target="_blank">Dicionário</a>
                                    </li>

                                    <li v-if="$route.name === 'home'">
                                      <a href="#section-two" title="Funcionalidades">Funcionalidades
                                      </a>
                                    </li>

                                    <li v-if="$route.name === 'home'">
                                      <a href="#section-four" title="Time">Time
                                      </a>
                                    </li>

                                </ul>

                            </div>

                        </nav>

                        <!-- nav -->

                    </hgroup>

                    <!-- hgroup -->

                  </div>

            </div>

            <!-- banner Text -->

                 <section class="text-center" v-show="$route.name === 'home'">


                    <p><img class="img-responsive logo-ospoliticos" src="~assets/img/Logo.png" alt="Os politicos ponto com logo"></p>

                    <h2>Saiba tudo sobre os políticos</h2>



                </section>



            <!-- banner Text -->



            <!-- banner image -->

        	<figure class="logo-ospoliticos-figure" v-show="$route.name === 'home'">

              <parallax class="parallax-window item tp-banner-container"
                :speed-factor="0.7">
                <img src="~assets/img/01.png" alt="very cool bg">
              </parallax>

          </figure>

            <!-- banner image -->

        </header>

    <!-- header -->
    <router-view></router-view>
    <footer></footer>
  </div>
</template>

<script>
import NavBar from './components/shared/NavBar'
import Footer from './components/shared/Footer'
import Parallax from 'vue-parallaxy'

export default {
  name: 'app',
  mounted () {
  },
  components: {
    navbar: NavBar,
    Footer,
    Parallax
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo-ospoliticos {
  max-height: 190px;
  display: inline-block;
}

.logo-ospoliticos-figure {
  &:after {
    background: -webkit-linear-gradient(135deg, rgba(101, 47, 142, 0.88) 0%, rgba(125, 46, 185, 0.30) 100%);
    background: linear-gradient(135deg, rgba(101, 47, 142, 0.88) 0%, rgba(125, 46, 185, 0.30) 100%);
  }
}

.body {
  height: 100%;
}

.gravata-wrapper {
    font-size: 16px;
    color: #fff;
    line-height: 18px;
    float: left;
    margin-left: 10px;
    margin-top: 7px;
    width: 70px;
    height: 40px;
    text-align: left;
}

.navbar-margin {
  margin-top: 54px; // navbar size
}
</style>
