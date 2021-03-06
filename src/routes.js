// ***
// Lazy Loading no componente de Cadastro
// Encapsula o carregamento do componente cadastro em um função que usa o System.js
// ***
const Cadastro = () => System.import('./components/cadastro/Cadastro.vue')

// import Cadastro from './components/cadastro/Cadastro.vue';
import Home from './components/home/Home.vue';

export const routes = [
  // ***
  // Nomeando Rotas
  // Com isso, é possivel referenciar seu nome no componente <router-link>
  // tornando mais facil a manutenção no caso de troca de endereço. No componente
  // rotas nomeada são referenciadas como <router-link :to="{name:'nome-da-rota'}">
  // ***
  { path: '', name: 'home', component: Home, label: 'Explorar' },
  { path: '/cadastro', name: 'cadastro', component: Cadastro, label: 'Novo' },
  { path: '/cadastro/:id', name: 'altera', component: Cadastro },
  { path: '*', component: Home}
]