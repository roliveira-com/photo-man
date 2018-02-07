<template>
  <ul class="polaroids">
    <li>
      <slot>
        {{ titulo }}
      </slot>
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['titulo']
  }
</script>

<style lang="scss" scoped>

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
