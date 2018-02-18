// ***
// Registrando Diretivas de outra maneira
// Aqui, exportamos um objeto apenas com as configurações da diretiva. Desta forma, passamos a
// registrar a diretiva diretamente no componente em que ela é usada ai invés de fazer isto no
// global view object do Vue. Neste caso, resgistraremos no componente Home
// ***
export default {
  bind(el, binding, vnode) {

    let rotationDeg = 0;

    el.addEventListener('dblclick', function () {

      let valor = binding.value || 90;
      let effect

      if (!binding.arg || binding.arg == 'rotate') {

        if (binding.modifiers.reverse) {
          rotationDeg -= valor;
        } else {
          rotationDeg += valor;
        }
        effect = `rotate(${rotationDeg}deg)`

      } else if (binding.arg == 'scale') {

        effect = `scale(${valor})`

      }

      el.style.transform = effect;
      if (binding.modifiers.animate) el.style.transition = 'transform ease-in-out .3s';

    })
  }
}