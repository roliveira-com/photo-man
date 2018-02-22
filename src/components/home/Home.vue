<template>
  <!-- 
  // Mais que um elemento dentro da tag template devem ser encapsulador por uma
  // div ou section aou algo do tipo 
  -->
  <div>

    <banner :titulo="titulo"></banner>

    <nav class="context-menu">
      <div class="container">
        <div class="context-menu__items-left">
          <input class="filter-input" type="text" v-on:input="filtro = $event.target.value" placeholder="filtre por título">
        </div>
        <div class="context-menu__items-right">
          <!-- a diretiva ':to' abaixo agora referencia o nome da rota ao invés so seu endereço -->
          <router-link class="context-menu__item" :to="{name: 'cadastro'}">Nova Foto</router-link>
          <a class="context-menu__item" href="">Nova Foto</a>
          <a class="context-menu__item" href="">selecionar fotos</a>
          <a class="context-menu__item" href="">novo album</a>
        </div>
        <p>&nbsp;</p>
      </div>
    </nav>

    <div class="content">
      <div class="container">
        <!--
        // Diretivas customizadas
        // No elemento 'polaroids' abaixo, a diretiva 'v-rotate' foi customizada. Nela é possível passar parametros de
        // configuracao como o objeto contento 'degree' e 'animate'
        -->
        <!-- <polaroids v-rotate="{degree: 90, animate: true}" v-for="imagem of filteredImages" :key="imagem._id" :titulo="imagem.titulo"> -->
        <!-- 
        // Diretivas com modificadores
        // Abaixo, ao inves de passarmos um objeto de configuração, chamamos a diretiva com as propriedades/modificadores 'animate' e 'reverse'
        // para dizer a a animação deve ser aplicada em sentido anti-horario. Para alterar o sentido bastar remover o modificador '.reverse' e 
        // para remover a animação baste remover o modificador '.animate'
        -->
        <!-- <polaroids v-rotate.animate.reverse="15" v-for="imagem of filteredImages" :key="imagem._id" :titulo="imagem.titulo" @confirmed="remove($event)"> -->
        <!-- 
        // Diretivas com argumentos
        // Os argumentos, assim como o os modificadores dão a possibiidade de passar valores adicionais para ativar certas logicas nas Diretivas
        // No caso abaixo, o argumento ':scale' faz com que a diretiva 'v-rotate' aplique um efeito de scale 
        -->
        <div class="notification is-success" v-show="message.success">
          <button class="delete"></button>
          {{ message.success }}
        </div>
        <div class="notification is-danger" v-show="message.error">
          <button class="delete"></button>
          {{ message.error }}
        </div>
        <polaroids v-for="imagem of filteredImages" :key="imagem._id" :titulo="imagem.titulo">
          <img v-rotate:scale.animate="1.5" :src="imagem.url" :alt="imagem.titulo">
          <!-- 
          // No botão abaixo o método remove() é chamado atraves do evento click do botao. Contudoo botão esta encapsulado 
          // no custom elemento btn-danger que não tem o evento click configurado. Assim, chamamos a proproedade 'click.native'
          // que vai buscar no elemento nativo desntro deste custom element para o evento solicitado, e chamando o metodo
          // <btn-delete type="button" label="delete" @click.native="remove($event.target)" /> 
          -->

          <!-- 
          // Já em 'btn' abaixo, configurei o evento confirmed diretamento no elemento, assim não é mais necessario usar
          // a propriedade click.native, bastar usar o event customizado. 
          -->
          <div class="polaroids__options">
            <btn skin="danger" type="button" label="delete" :sensitive="true" @confirmed="remove(imagem)"/>
          </div>
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

// Importanto outros componentes para o escopo deste componente
import Polaroids from '../shared/polaroids/Polaroids.vue';
import Banner from '../shared/banner/Banner.vue'
import Button from '../shared/button/Button.vue';

// Importanto a diretiva para o escopo deste componente
import rotate from '../../directives/rotate-alternative'

import FotoService from '../../domain/foto/foto.service'

export default {
  name: 'app',

  // registrando os componentes importados acima
  components: {
    'polaroids' : Polaroids,
    'banner' : Banner,
    'btn' : Button
  },

  // registrando a diretiva importada acima
  directives: { rotate },
  
  data () {
    return {
      titulo: 'Album: Momentos',
      imagens: [],
      filtro: '',
      message: {
        success : '',
        error: ''
      }
    }
  },

  // ## Life Cycle hooks
  // ## https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
  // #  São métodos que deteminado pontos do ciclo de vida do componente
  // #  Aqui, executamos uma chamada $http para a api que popula as imagens
  created(){

    // ***
    // Encapsulando o $resource/$http em um serviço
    // Abaixo, começamos instanciando a classe FotoService já importada
    // acima passando o $resource
    // ***
    this.service = new FotoService(this.$resource)
    this.service
      .lista()
      .then(imgs => this.imagens = imgs, err => console.log(err))

    // ***
    // Utilizando o $resource
    // Ele trabalha semelhante ai $http mas permite configurações ais refinadas
    // Abaixo, instanciamos o objeto $resource para a url 'v1/fotos'
    // ***
    // this.resource = this.$resource('v1/fotos{/id}')

    // this.resource
    //   .query()
    //   .then(res => res.json())
    //   .then(imgs => this.imagens = imgs, err => console.log(err))

    // this.$http.get('/v1/fotos')
    //     .then(res => res.json())
    //     .then(
    //       imgs => this.imagens = imgs,
    //       err => console.log(err)
    //     );
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
  },

  methods :{
    remove(imagem){

      this.service
        .deleta(imagem._id)
        .then(
          () => {
            this.imagens.splice(this.imagens.indexOf(imagem), 1)
            this.message.success = 'Foto Removida'
          }, 
          err => {
            this.message.error = 'Não foi possível remover a foto'
          }
        )

      // this.resource.delete({ id: imagem._id })
      //   .then(
      //     () => {
      //       this.imagens.splice(this.imagens.indexOf(imagem), 1)
      //       this.message.success = 'Foto Removida'
      //     }, 
      //     err => {
      //       this.message.error = 'Não foi possível remover a foto'
      //     }
      //   )

      // this.$http.delete(`v1/fotos/${imagem._id}`)
      //     .then(
      //       () => {
      //         this.imagens.splice(this.imagens.indexOf(imagem), 1)
      //         this.message.success = 'Foto Removida'
      //       }, 
      //       err => {
      //         this.message.error = 'Não foi possível remover a foto'
      //       }
      //     )
    }
  }
}
</script>

<style lang="scss" scoped>

  @import '../../../node_modules/bulma/sass/utilities/all';
  @import '../../../node_modules/bulma/sass/elements/notification';

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
    color: #00a0a0;
  }
</style>
