<template>
  <div class="wrapper">

    <banner :titulo="page"></banner>

    <nav class="context-menu">
      <div class="container">
        <div class="context-menu__items-left">
          <a class="context-menu__item active" href="">Nova Foto</a>
          <a class="context-menu__item" href="">novo album</a>
        </div>
        <div class="context-menu__items-right">
        </div>
        <p>&nbsp;</p>
      </div>
    </nav>

    <div class="content">
      <div class="container clearfix">
        <form @submit.prevent="salvar()">
          <div class="field">
            <label class="label">Titulo</label>
            <div class="control">
              <!-- <input class="input" type="text" @input="imagem.titulo=$event.target.value" :value="imagem.titulo"> -->
              <input class="input" type="text" v-model="imagem.titulo">
            </div>
          </div>

          <div class="field">
            <label class="label">URL</label>
            <div class="control">
              <input class="input" type="text" @input="imagem.url=$event.target.value" :value="imagem.url">
            </div>
          </div>

          <div class="field">
            <label class="label">Message</label>
            <div class="control">
              <textarea class="textarea" @input="imagem.descricao=$event.target.value" :value="imagem.descricao"></textarea>
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <btn skin="primary" type="submit" label="Cadastrar" />
            </p>
            <p class="control">
              <btn type="reset" label="Cancelar" />
            </p>
          </div>
        </form>
        <div class="preview-card">
          <div class="preview-card__image">
            <img :src="imagem.url || 'http://www.germandrive.com/wp-content/uploads/2017/05/placeholder.gif'" :alt="imagem.titulo">
          </div>
          <h2 class="preview-card__title">
            {{ imagem.titulo || 'Insira um Título'}}
          </h2>
          <p class="preview-card__descricao">
            {{ imagem.descricao }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Banner from '../shared/banner/Banner.vue';
  import Button from '../shared/button/Button.vue';
  import Polaroids from '../shared/polaroids/Polaroids.vue';
  import Foto from '../../domain/foto/foto.model'
  import FotoService from '../../domain/foto/foto.service'

  export default {
    
    components : {
      'banner' : Banner,
      'btn' : Button,
      'polaroids': Polaroids
    },

    data(){
      return {
        page: 'Cadastro',

        imagem: new Foto()
      }
    },

    created(){
      // ***
      // Utilizando o $resource
      // Ele trabalha semelhante ai $http mas permite configurações ais refinadas
      // Abaixo, instanciamos o objeto $resource para a url 'v1/fotos'
      // ***
      // this.resource = this.$resource('v1/fotos')

      // ***
      // Utilizando o Foto Service para abstrair as chamads na API
      // ***
      // Instanciando o serviço
      this.service = new FotoService(this.$resource)

    },

    methods: {
      salvar() {

        this.service
          .cadastra(this.imagem)
          .then(this.imagem = new Foto(), err => console.log(err))

        // ***
        // No resource, o método save() substitui o post
        // ***
        // this.resource
        //   .save(this.imagem)
        //   .then(this.imagem = new Foto(), err => console.log(err))

        // this.$http.post('http://localhost:3000/v1/fotos', this.imagem)
        //     .then(this.imagem = new Foto(), err => console.log(err))
      }
    }

  }
</script>

<style lang="scss" scoped>

  @import '../../assets/sass/forms';
  @import '../../assets/sass/columns';
  @import '../../assets/sass/card';

  form{
    display: block;
    float: left;
    width: 100%;
    margin-top: 2em;
    margin-right: 0;

    @media (min-width: 768px){
      width: 45%;
      margin-right: 3em;      
    }

    .label{
      text-align: left;
      color: #969696;
      font-size: .8em;
      text-transform: uppercase;
    }

    .input{
      box-shadow: none;
      box-sizing: border-box;

      &:focus{
        outline: none !important;
      }
    }

    .textarea{
      box-shadow: none;
      box-sizing: border-box;
    }
  }

  .preview-card{
    display: block;
    float: right;
    width: 100%;
    margin-top: 2em;
    padding: 20px;
    border: 1px solid #CCC;
    border-radius: 4px;

    @media (min-width: 768px){
      width: 45%;
      margin-right: 0;      
    }   

    &__image{
      display: block;
      position: relative;
      overflow: hidden;

    }

    &__image img{
      max-width: 100%;
      max-height: 250px;
    }

    &__title{
      font-family: "Permanent Marker", sans-serif;
    }
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
        color: #00a0a0;
        border-bottom: 3px solid #00a0a0;
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
        border: 2px solid #00a0a0;
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
  }
</style>


