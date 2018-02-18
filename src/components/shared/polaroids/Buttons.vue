<template>
  <div class="polaroids__footer" v-show="visivel">
    <button :class="btn_style" @click="clicked()" :type="type">{{ label }}</button>
  </div>
</template>

<script>

export default {

  // Implementando propriedades do elemento.
  // props :['type','label', 'sensitive', 'skin'],

  // Implementando propriedades do elemento com validação
  props: {
    type : {
      required: true,
      type: String
    },
    label : {
      required : true,
      type : String
    },
    sensitive : {
      type : Boolean,
    },
    skin: {
      type : String
    }
  },

  methods : {
    clicked(){
      if(this.sensitive){
        if(confirm('deseja relamente deletar este registro?')){
          this.$emit('confirmed', new Date());
        }
      }else{
        this.$emit('confirmed', new Date());
      }
    },
  },

  computed: {

    btn_style() {
      return this.skin ? this.skin : 'default'
      // if(this.skin){
      //   return this.skin
      // }else{
      //   return 'default'
      // }
    },

  }

}
</script>

<style lang="scss" scoped>

  button{
    display: inline-block;
    padding: 5px 15px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 3px;

    &.primary{
      background-color: #00a0a0;
      border: 1px solid #00a0a0;
      color: white;
    }

    &.danger {
      background-color: #a02500;
      border: 1px solid #a02500;
      color: white;
    }

    &.default{
      background-color: #CCC;
      border: 1px solid #666;
      color: #666;
    }
  }

</style>
