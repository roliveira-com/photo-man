<template>
  <div class="title-box">
      <h1>{{ titulo }}</h1>
  </div>
</template>

<script>
export default {

  // Implementando validação na declaração da propriedade
  props : {
    titulo: {
      type: String,
      required: true
    }
  }
  
}
</script>

<style lang="scss">
  div.title-box{
    padding: 3rem 1rem; 
    text-align: left;
    background-color: #00a0a0;
    box-shadow: -1px 2px 6px -1px rgba(133,139,166,0.5);

    h1 {
      margin: 0;
      font-size: 36px;
      font-weight: bold;
      text-transform: uppercase;
      color: #FFF;

      &:after {
        content: '';
        display: block;
        margin-top: 5px;
        width: 150px;
        height: 0px;
        background-color: #FFF;
        border: 1px solid #FFF;
        border-radius: 4px;
      }
    }
  }
</style>
