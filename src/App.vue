<template>
  <!-- 
  Mais que um elemento dentro da tag template devem ser encapsulador por uma
  div ou section aou algo do tipo 
  -->
  <div class="container">
    <header>
      <nav class="clearfix">
        <div class="nav-left">
          <a class="nav-brand" href="">Photo Man</a>
        </div>
        <div class="nav-right">
          <ul class="nav-links">
            <li class="nav-links__item">Login</li>
          </ul>
        </div>
      </nav>
    </header>
    <div class="title-box">
      <h1>Album: {{ titulo }}</h1>
    </div>

    <polaroids v-for="imagem of imagens" :titulo="imagem.titulo">
      <p>{{ imagem.titulo }}</p>
      <a href="#"><img :src="imagem.url" :alt="imagem.titulo"></a>
    </polaroids>

    <!-- <ul class="polaroids">
      ## Iterando dados
      #  iterando array de dados com o v-for
      <li v-for="imagem of imagens">
        
        A string interpolation em atributos html não é permitida no vue. Para isto é necessário
        usar a diretiva v-bind (v-bind:atributo) ou o shorhand : (:atributo) 
       
        <a href="" :title="imagem.titulo">
          <img :src="imagem.url" :alt="imagem.titulo">
        </a>
      </li>
    </ul> -->
  </div>
</template>

<script>

import Painel from './components/shared/polaroids/Polaroids.vue';

export default {
  name: 'app',

  components: {
    'polaroids' : Painel
  },
  
  data () {
    return {
      titulo: 'Momentos',
      imagens: []
    }
  },

  // ## Life Cycle hooks
  // ## https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
  // #  São métodos que deteminado pontos do ciclo de vida do componente
  // #  Aqui, executamos uma chamada $http para a api que popula as imagens
  created(){
    this.$http.get('http://localhost:3000/v1/fotos')
        .then(res => res.json())
        .then(
          imgs => this.imagens = imgs,
          // imgs => console.log(imgs),
          err => console.log(err)
        );
  }
}
</script>

<style lang="scss">

  body {
    margin: 0;
  }

  .clearfix {
    overflow: auto;
    zoom: 1;
  }

  header {
    display: block;
    margin: 0;
    padding: 5px 15px;
    background-color: #CCC;
  }

  nav{
    display: block;

    .nav-left{
      display: inline-block;
      float: left;
    }

    .nav-right{
      display: inline-block;
      float: right;      
    }

    .nav-links{
      display: inline-block;
      margin: 5px;

      .nav-links__item{
        display: inline-block;
        padding: 5px 15px;
      }
    }

    .nav-brand,
    .nav-brand:hover,
    .nav-brand:visited{
      display: inline-block;
      margin: 5px 0;
      font-size: 26px;
      font-weight: bold;
      text-decoration: none;
      text-transform: uppercase;
      color:rgb(0, 160, 160);
    }
  }

  div {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
  }

  div.title-box{
    padding: 3rem 1rem; 
    text-align: left;
    background-color: #42b983;

    h1 {
      margin: 0;
      font-size: 36px;
      font-weight: bold;
      text-transform: uppercase;
      color: #FFF;

      &:after {
        content: '';
        display: block;
        margin-top: 5px;
        width: 150px;
        height: 0px;
        background-color: #FFF;
        border: 1px solid #FFF;
        border-radius: 4px;
      }
    }
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
    width: 100%;
    height: auto;
    overflow: initial;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    img {
      width: 100%;
    }

    @media screen and (min-width: 768px){
      width: 30%;
      max-height: 170px;
      overflow: hidden;
    }
  }

  a {
    color: #42b983;
  }
</style>
