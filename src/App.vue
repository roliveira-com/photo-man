<template>
  <!-- 
  Mais que um elemento dentro da tag template devem ser encapsulador por uma
  div ou section aou algo do tipo 
  -->
  <div class="container">
    <div class="title-box">
      <h1>{{ titulo }}</h1>
    </div>

    <ul>
      <!-- ## Iterando dados -->
      <!-- #  iterando array de dados com o v-for -->
      <li v-for="imagem of imagens">
        <!-- 
        A string interpolation em atributos html não é permitida no vue. Para isto é necessário
        usar a diretiva v-bind (v-bind:atributo) ou o shorhand : (:atributo) 
        -->
        <img :src="imagem.url" :alt="imagem.alt">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  
  data () {
    return {
      titulo: 'Photo Man',
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
          // imgs => this.imagens = imgs,
          imgs => console.log(imgs),
          err => console.log(err)
        );
  }
}
</script>

<style lang="scss">
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
