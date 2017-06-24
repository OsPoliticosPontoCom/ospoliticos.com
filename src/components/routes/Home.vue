<template>
<div class="home">
  <section class="hero is-success is-large">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-1">
          OsPolíticos.com
        </h1>
        <h2 class="subtitle">
          Saiba mais sobre essa galera
        </h2>
      </div>
    </div>
  </section>
  <section>
    <div class="container">
      Conteudo
    </div>
  </section>
</div>
</template>


<style lang="scss" scoped>

.home {
  .hero {
    .hero-body {
      background-image: url('~assets/img/01.png');
      background-size: cover;
      &::after {
        background: -webkit-linear-gradient(135deg, rgba(101, 47, 142, 0.88) 0%, rgba(125, 46, 185, 0.30) 100%);
        background: linear-gradient(135deg, rgba(101, 47, 142, 0.88) 0%, rgba(125, 46, 185, 0.30) 100%);
      }
    }
  }
}

.nav {
  background-color: transparent;
}
.wrapper {
  .container {
    color: #333;
    &.is-white {
      color: white;
    }
    .row {
      margin-top: 160px;
    }
  }
}
.wrapper .header {
  height: 43vw;
  background-image: url('~assets/img/01.png');
  &::after {
    background: -webkit-linear-gradient(135deg, rgba(101, 47, 142, 0.88) 0%, rgba(125, 46, 185, 0.45) 100%);
  }
}

.anuncie-aqui {
  background-color: #bdbcbc;
}
</style>

<script>
export default {
  name: 'home',
  data () {
    return {
      open: false
    }
  },
  components: {
  }
}
</script>
