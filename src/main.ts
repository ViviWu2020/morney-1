import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';


Vue.config.productionTip = false;

Vue.component('Icon', Icon);
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);

window.onload = function (){
    setTimeout(function (){
        window.scrollTo(0,200)
    },0)
};

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
