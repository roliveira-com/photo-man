<template>
  <transition name="card-fade">
    <div class="polaroids">
      <a  @dblclick="visivel = !visivel">
        <slot></slot>
      </a>
      <p>{{ titulo }}</p>
      <transition name="text-collapse">
      <!-- <div class="polaroids__footer" v-show="visivel">
        <btn type="button" label="delete" skin="danger" :sensitive="true" />
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

<style lang="scss">

  .polaroids {
    display: inline-block;
    position: relative;
    padding: 15px;
    padding-bottom: 50px;
    width: 100%;
    font-family: "Permanent Marker", sans-serif;
    font-size: 18px;
    text-align: center;
    color: #333;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0,0,0,.25);
    // transition: transform .15s linear;

    // &:hover{
    //   transform: scale(1.2) rotate(5deg);
    //   transition: transform ease-in-out .3s;
    // }

    @media (min-width: 768px){
      width: 25%;
      margin-right: 5%;
      margin-bottom: 5%;
    }

    a {
      background: #fff;
      display: block;
      margin: 0;
      width: 100%;
      max-height: 220px;
      overflow: hidden;
    }

    .polaroids__options{
      position: absolute;
      right: 15px;
      bottom: 15px;
    }

    .polaroids__options a{
      display: inline;
    }

    p{
      margin: 15px 0;
    }
  
    img{
      display: inline-block;
      width: 100%;
      margin-bottom: 12px;
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
