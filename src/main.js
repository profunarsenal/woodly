import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './plugins/api';
import InlineSvg from 'vue-inline-svg';
import { clickOutside } from '@/directives/clickOutside';

createApp(App)
    .use(api)
    .use(router)
    .use(store)
    .component('inline-svg', InlineSvg)
    .directive('click-outside', clickOutside)
    .mount('#app');