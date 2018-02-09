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
      routes : routes
    }
  }
  
}

</script>

<style lang="scss">

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
