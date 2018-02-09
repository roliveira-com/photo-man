import Cadastro from './components/cadastro/Cadastro.vue';
import Home from './components/home/Home.vue';

export const routes = [
  { path: '', component: Home, label: 'Explorar' },
  { path: '/cadastro', component: Cadastro, label: 'Novo' }
]