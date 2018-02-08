<template>
  <!-- 
  Mais que um elemento dentro da tag template devem ser encapsulador por uma
  div ou section aou algo do tipo 
  -->
  <div>
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

    <nav class="context-menu">
      <div class="container">
        <div class="context-menu__items-left">
          <input class="filter-input" type="text" v-on:input="filtro = $event.target.value" placeholder="filtre por título">
        </div>
        <div class="context-menu__items-right">
          <a class="context-menu__item" href="">Nova Foto</a>
          <a class="context-menu__item" href="">selecionar fotos</a>
          <a class="context-menu__item" href="">novo album</a>
        </div>
        <p>&nbsp;</p>
      </div>
    </nav>

    <div class="content">
      <div class="container">
        <polaroids v-for="imagem of filteredImages" :titulo="imagem.titulo">
          <img :src="imagem.url" :alt="imagem.titulo">
        </polaroids>
      </div>
    </div>

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

import Polaroids from '../shared/polaroids/Polaroids.vue';

export default {
  name: 'app',

  components: {
    'polaroids' : Polaroids
  },
  
  data () {
    return {
      titulo: 'Momentos',
      imagens: [],
      filtro: ''
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
  },

  computed: {
    filteredImages(){
      if(this.filtro){
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.imagens.filter(foto => exp.test(foto.titulo));
      }else{
        return this.imagens;
      }
    }
  }
}
</script>

<style lang="scss">

  body {
    margin: 0;
  }

  input{
    outline: none;
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

  .context-menu {
    border-bottom: 1px solid #CCC;

    &__items-left{
      display: block;
      float: none;

      @media (min-width: 768px){
        display: inline-block;
        float: left;
      }
    }

    &__items-right{
      display: block;
      float: none;

      @media (min-width: 768px){
        display: inline-block;
        float: right;
      }
    }

    &__item{
      display: block;
      padding: 14px 10px;
      font-size: 14px;
      font-weight: bold;
      color: #969696;
      text-transform: uppercase;
      text-decoration: none;
      white-space: nowrap;

      &.active,
      &:hover{
        color: #42b983;
        border-bottom: 3px solid #42b983;
      }

      @media(min-width: 768px){
        display: inline;
      }
    }

    .filter-input {
      position: relative;
      width: 90%;
      height: 40px;
      top: -20px;
      font-size: 14px;
      padding: 3px;
      border: 2px solid #ccc;

      &:focus{
        border: 2px solid #42b983;
      }

      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: #CCC;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        color: #CCC;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        color: #CCC;
      }
      &:-moz-placeholder { /* Firefox 18- */
        color: #CCC;
      }

      @media (min-width: 768px){
        width: 200px;
        height: 20px;
        top: -5px;
      }

    }

    .container{
      margin-top: 0;
      margin-right: auto;
      margin-left: auto;
      padding-left: 0;
      padding-right: 0;
      clear: both;

      @media (min-width: 768px) {
        width: 750px;
      }
      @media (min-width: 992px) {
        width: 970px;
      }
      @media (min-width: 1200px) {
        width: 1170px;
      }
    }
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

  div.container {
    margin-top: 30px;
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;

    @media (min-width: 768px) {
      width: 750px;
    }
    @media (min-width: 992px) {
      width: 970px;
    }
    @media (min-width: 1200px) {
      width: 1170px;
    }
  }

  div.title-box{
    padding: 3rem 1rem; 
    text-align: left;
    background-color: #42b983;
    box-shadow: -1px 2px 6px -1px rgba(133,139,166,0.5);

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
