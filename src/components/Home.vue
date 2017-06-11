<template>
<div class="home">
  <nav class="navbar navbar-fixed-top navbar-color-on-scroll">
	<div class="container">
        <div class="navbar-header">
	    	<button type="button" @click="open = !open" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-index">
	        	<span class="sr-only">Toggle navigation</span>
	        	<span class="icon-bar"></span>
	        	<span class="icon-bar"></span>
	        	<span class="icon-bar"></span>
	    	</button>
	    	<a href="">
	        	<div class="logo-container">
	                <!-- <div class="logo"> -->
	                <!-- </div> -->
	                <div class="brand">
	                    <img style="max-heigth : 10px;" src="../assets/img/icon_gravata.png" alt="Os Políticos" rel="tooltip" title="MeuPolítico.com" data-placement="bottom" data-html="true">
	                </div>
              </div>
	      </a>
			<a class="navbar-brand visible-xs" href="#"> MeuPolítico.com </a>
	    </div>

	    <div class="collapse navbar-collapse" :class="{in: open}" id="navigation-index">
	    	<ul class="nav navbar-nav navbar-right">
				<li>
					<a href="#" target="_blank">
						<i class="material-icons">fingerprint</i> Sobre
					</a>
				</li>
				<li>
					<a href="#" target="_blank">
						<i class="material-icons">favorite_border</i> Contribuir
					</a>
				</li>
				<li>
					<a rel="tooltip" title="Siga no Twitter" data-placement="bottom" href="https://twitter.com/CreativeTim" target="_blank" class="btn btn-white btn-simple btn-just-icon">
						<i class="fa fa-twitter"></i>
					</a>
				</li>
				<li>
					<a rel="tooltip" title="Curta no Facebook" data-placement="bottom" href="https://www.facebook.com/CreativeTim" target="_blank" class="btn btn-white btn-simple btn-just-icon">
						<i class="fa fa-facebook-square"></i>
					</a>
				</li>
				<li>
					<a rel="tooltip" title="Siga no Instagram" data-placement="bottom" href="https://www.instagram.com/CreativeTimOfficial" target="_blank" class="btn btn-white btn-simple btn-just-icon">
						<i class="fa fa-instagram"></i>
					</a>
				</li>

	    	</ul>
	    </div>
	</div>
  </nav>
  <!-- End Navbar -->
  <div class="wrapper is-white">

  	<div class="header header-filter">
  		<div class="container is-white">
  			<div class="row">
  				<div class="col-md-8 col-md-offset-2">
  					<div class="brand">
  						<!-- <h1>MeuPolítico.com</h1> -->

  						<img src="../assets/img/Logo.png" class="img-responsive">
  						<h3>Descubra mais sobre essa galera.</h3>
  					</div>
  				</div>
  			</div>

  		</div>
  	</div>

    <div class="section section-download">
        <div class="container">
            <!-- Início da comparação -->
            <div class="row sharing-area text-center">
              <h3>Comparação</h3>
            </div>
            <!-- Final da comparação -->
            <div class="row sharing-area text-center">
                    <h3>Compartilhe o MeuPolítico.com!</h3>
                    <a href="#" class="btn btn-twitter">
                        <i class="fa fa-twitter"></i>
                        Tweet
                    </a>
                    <a href="#" class="btn btn-facebook">
                        <i class="fa fa-facebook-square"></i>
                        Compartilhar
                    </a>
					<a href="#" class="btn btn-github">
                        <i class="fa fa-github"></i>
                    	Star
                    </a>
            </div>
        </div>
    </div>

    <footer class="footer">
	    <div class="container">
	        <nav class="pull-left">
	            <ul>
					<li>
						<a href="http://www.creative-tim.com">
							MeuPolitico.Com
						</a>
					</li>
					<li>
						<a href="http://presentation.creative-tim.com">
						   Sobre
						</a>
					</li>
					<li>
						<a href="http://blog.creative-tim.com">
						   Blog
						</a>
					</li>
					<li>
						<a href="http://www.creative-tim.com/license">
							Licença
						</a>
					</li>
	            </ul>
	        </nav>
	        <div class="copyright pull-right">
	            &copy; 2017, made with <i class="material-icons">favorite</i> by Creative Tim for a better web.
	        </div>
	    </div>
	</footer>
  </div>
</div>
</template>


<style lang="scss" scoped>

.wrapper {
  .container {
    color: #333;
    &.is-white {
      color: white;
    }
    .row {
      margin-top: 90px;
    }
  }
}
.wrapper .header {
  height: 30vw;
  background-image: url('../assets/img/01.png');
  &::after {
    background: -webkit-linear-gradient(135deg, rgba(101, 47, 142, 0.88) 0%, rgba(125, 46, 185, 0.45) 100%);
  }
}
</style>

<script>
export default {
  name: 'home',
  data () {
    return {
      open: false
    }
  }
}
</script>
