import Vue from 'vue'
// ###
// O primeiro parametro é o nome que desejamos dar a diretiva
// Embora na hora de chamar a diretiva no componente usamos a
// sintaxe 'v-nome_da_diretiva', no momento de definir este nome
// abaixo não é necessário usar o 'v-'

// é necessário importar a diretiva no Vue Object em main.js
// ###
Vue.directive('rotate', {
  bind(el, binding, vnode) {

    let rotationDeg = 0;

    el.addEventListener('dblclick', function(){
     
      // ***
      // O parametro 'binding' busca o valor do parametro passado
      // na diretiva. Neste caso, passamos o objeto de configuração 
      // e configuramos o comportamento da diretiva com base nele
      // ***
      // let deg = 90;
      // let animate = false
      // if(binding.value){
      //   deg = binding.value.degree;
      //   animate = binding.value.animate;
      // }
      // rotationDeg += deg;

      // ***
      // Trabalhando com Modificadores
      // Aqui esperamos que a diretiva seja chamada no elemento
      // incluindo a propriedade animate 'v-rotate.animate'
      // ***
      // let animate = false
      // if (binding.modifiers.animate) animate = true

      // if (binding.modifiers.reverse) {
      //   rotationDeg -= binding.value || 90;
      // }else{
      //   rotationDeg += binding.value || 90;
      // }
      
      // el.style.transform = `rotate(${rotationDeg}deg)`;
      // if (animate) el.style.transition = 'transform ease-in-out .3s';

      // ***
      // Trabalhando com argumentos
      // ***
      let valor = binding.value || 90;
      let effect
      
      if(!binding.arg || binding.arg == 'rotate'){

        if (binding.modifiers.reverse) {
          rotationDeg -= valor;
        }else{
          rotationDeg += valor;
        }
        effect = `rotate(${rotationDeg}deg)`

      } else if (binding.arg == 'scale'){

        effect = `scale(${valor})`

      }

      el.style.transform = effect;
      if (binding.modifiers.animate) el.style.transition = 'transform ease-in-out .3s';

    })

  }
})