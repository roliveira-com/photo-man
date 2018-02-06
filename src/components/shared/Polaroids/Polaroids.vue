<template>
  <ul class="polaroids">
    <li v-for="imagem of imagens">
      <a href="" :title="imagem.titulo">
        <img :src="imagem.url" :alt="imagem.titulo">
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'app',
  
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

  .polaroids {

    li{
      display: inline;
      padding-left: 0
    }

    a {
      background: #fff;
      display: inline;
      float: left;
      margin: 0 0 27px 30px;
      width: auto;
      padding: 10px 10px 15px;
      text-align: center;
      font-family: "Marker Felt", sans-serif;
      text-decoration: none;
      color: #333;
      font-size: 18px;
      box-shadow: 0 3px 6px rgba(0,0,0,.25);
      transition: transform .15s linear;

      &::after {
        content: attr(title);
      }
      
    }
  
    img{
      display: block;
      width: 190px;
      margin-bottom: 12px;
    }


  }
</style>
