<template>

  <div class="wrapper">

    <main-menu :links="routes"></main-menu>

    <main>
      <transition name=page-fade>
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>

import { routes } from './routes'
import MainMenu from './components/shared/main-menu/MainMenu.vue'

export default {

  components: {
    'main-menu' : MainMenu
  },

  data(){
    return {
      // ***
      // Atribuindo para a propriedade routes, o objeto routes onde
      // estão as configurações de rotas da aplicação. Contudo, filtramos
      // casa haja a propriedade label. Isto evita que rotas genericas sejam 
      // adicionadas ao menu. E posivel alcançar o mesmo resultado com a 
      // diretiva v-show no proprio componente
      // *** 
      routes : routes.filter(route => route.label)
    }
  }
  
}

</script>

<style lang="scss">

  @import url('https://fonts.googleapis.com/css?family=Permanent+Marker');
  @import './assets/sass/base';

  .page-fade-enter {
    transition: all ease .3s;
  }

  .page-fade-enter-active,
  .page-fade-leave-active {
    position: relative;
    opacity: 0;
    transition: all ease .3s;
  }

</style>
