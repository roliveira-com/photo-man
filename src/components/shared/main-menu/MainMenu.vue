<template>
  <header>
    <nav class="main-nav clearfix">
      <div class="nav-left">
        <a class="nav-brand" href=""><img class="logo-sm" src="../../../assets/logo.svg" alt="Photo Man"></a>
        <ul class="nav-links">
          <li class="nav-links__item" v-for="link in links"><router-link :to="link.path ? link.path : '/'">{{ link.label }}</router-link></li>
        </ul>
      </div>
      <div class="nav-right">
        <ul class="nav-links">
          <li class="nav-links__item">Login</li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    props : ['links']
  }
</script>

<style lang="scss">

  nav.main-nav{
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
      padding-left: 20px;
      margin: 0 5px;

      .nav-links__item{
        display: inline-block;
        padding: 15px 5px 20px;
      }
      .nav-links__item a{
        display: inline-block;
        padding: 5px 15px;
        font-size: 13px;
        font-weight: bold;
        color: #00a0a0;
        text-transform: uppercase;
        text-decoration: none;
        background-color: transparent;
        border: 2px solid #00a0a0;
        border-radius: 5px;

        &:hover,
        &.router-link-active{
          color: white;
          border: 2px solid #00a0a0;
          background-color: #00a0a0;
        }
      }
    }

    .nav-brand,
    .nav-brand:hover,
    .nav-brand:visited{
      display: inline-block;
      position: relative;
      top: 10px;
      margin: 5px 0;
      font-size: 26px;
      font-weight: bold;
      text-decoration: none;
      text-transform: uppercase;
      color: #00a0a0;
    }
  }
</style>
