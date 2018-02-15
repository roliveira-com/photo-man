<template>
  <transition name="card-fade">
    <div class="polaroids">
      <a  @dblclick="visivel = !visivel">
        <slot></slot>
      </a>
      <p>{{ titulo }}</p>
      <transition name="text-collapse">
      <!-- <div class="polaroids__footer" v-show="visivel">
        <btn type="button" label="delete" @click.native="remove($event.target)" />
      </div> -->
      </transition>
  </div>
  </transition>
</template>

<script>

  import Button from '../button/Button.vue';

  export default {

    components: {
      'btn' : Button
    },

    props: ['titulo'],

    data(){
      return {
        visivel: true
      }
    }
  }
</script>

<style lang="scss" scoped>

  @import url('https://fonts.googleapis.com/css?family=Permanent+Marker');

  .polaroids {
    display: inline-block;
    position: relative;
    padding-bottom: 50px;
    width: 100%;
    font-family: "Permanent Marker", sans-serif;
    font-size: 18px;
    text-align: center;
    color: #333;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0,0,0,.25);
    transition: transform .15s linear;

    @media (min-width: 768px){
      width: 32%;
      margin-right: 1%;
      margin-bottom: 1%;
    }

    a {
      background: #fff;
      display: block;
      margin: 10px;
      padding: 15px;
      width: auto;
      height: 220px;
      overflow: hidden;
    }

    p{
      margin: 15px 0;
    }
  
    img{
      display: inline-block;
      width: 100%;
      margin-bottom: 12px;
    }

    .polaroids__footer{
      display: block;
      position: absolute;
      width: 100%;
      right: 1%;
      bottom: 1%;
      padding: 10px;
      text-align: right;
    }

  }

  // As classes abaixo são geradas a partir do valor do atributo
  // 'name' definido na tag transition no template
  // antes do elemento ser incluído ou removido, o estado atual
  .text-collapse-enter {
    overflow: hidden;
    transform: translateY(0px);
    transition: all ease .3s;
  }

  // quando o elemento esta sendo incluído
  .text-collapse-enter-active {
    position: relative;
    transform: translateY(0);
    overflow: hidden;
    transition: all ease .3s;
  }

  // quando o elemento esta sendo removido
  .text-collapse-leave-active {
    position: relative;
    transform: translateY(100px);
    overflow: hidden;
    transition: all ease .3s;
  }

  .card-fade-enter {
    transition: all ease .3s;
  }

  .card-fade-enter-active,
  .card-fade-leave-active {
    position: relative;
    opacity: 0;
    transition: all ease .3s;
  }

</style>
