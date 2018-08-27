import Vue from 'vue'
import App from './App.vue'
import router from './router'
import wysiwyg from "vue-wysiwyg";
import ReadMore from 'vue-read-more';
import Paginate from 'vuejs-paginate'

Vue.component('paginate', Paginate)
 
Vue.use(ReadMore);
Vue.use(wysiwyg, {});
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
