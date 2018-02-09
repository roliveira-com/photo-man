<template>
  <div class="wrapper">

    <banner :titulo="titulo"></banner>

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
  </div>
</template>

<script>

  import Banner from '../shared/banner/Banner.vue'

  export default {
    
    components : {
      'banner' : Banner
    },

    data(){
      return {
        titulo: 'Cadastro'
      }
    }

  }
</script>

<style lang="scss" scoped>

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


