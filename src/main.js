import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VeeValidate, { Validator } from 'vee-validate';

import { routes } from './routes'
import ValidationMessages from 'vee-validate/dist/locale/pt_BR';

// ***
// Importando diretivas diretamente no global view object
// deste modo ela estará disponível para a aplicação inteira
// ***
// import './directives/rotate'

Vue.use(VueResource);
// ***
// Configurando dominio/host nas opções do módulo vue-resource com variáveis de ambiente
// Deste modo, podemos omitir o endereço base da api usando apenas 'v1/fotos'
// ***
Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';


// ***
// Usando o HTTP Interceptors do vue para adicionar header na requisição
// ***
Vue.http.interceptors.push((req, next) => {

    // é possível colocar informações no header antes do envio da requisição
    // req.headers.set('Authorization', 'informação de segurança aqui');
    console.log('Lidando com o request');

    next(res => {
      console.log('Lidando com a resposta')
      // é possível acessar os dados da reposta e realizar transformações antes
      console.log(res.body);
    });

});

Vue.use(VueRouter);

// Vue.use(VeeValidate, {
//   locale: 'pt_BR',
//   dictionary: {
//     pt_BR: { 
//       messages: ValidationMessages
//     }
//   }
// });

Validator.localize('pt_BR', ValidationMessages);
Vue.use(VeeValidate);

const router = new VueRouter({
  routes: routes,
  mode: 'history'

})
 
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
