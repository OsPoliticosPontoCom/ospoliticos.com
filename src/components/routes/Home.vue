<template>
<div class="home">
  <h1>Home</h1>
</div>
</template>


<style lang="scss" scoped>
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
