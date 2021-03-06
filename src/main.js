import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate);
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import helpers from "./helpers/helper";
const plugin = {
  install() {
    Vue.prototype.$helpers = helpers;
  }
};
Vue.use(plugin);
import CKEditor from '@ckeditor/ckeditor5-vue2'; 
Vue.use( CKEditor );
Vue.use(Loading,{
  color: '#148DCD',
  height:70,
  zIndex:99999999
});
import VueGoodTablePlugin from 'vue-good-table';
// import the styles
import 'vue2-datepicker/index.css';
import 'vue-good-table/dist/vue-good-table.css';
import money from 'v-money'
Vue.use(money, {precision: 4})
Vue.use(VueGoodTablePlugin);
Vue.config.productionTip = false;
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
Vue.use(
  VueMoment, 
  {
    moment,
  }
)
moment.locale('id');
Vue.mixin({
    methods: {
      $can(permissionName) {
        const userPermissions = JSON.parse(localStorage.getItem('user')).data.permissions;
        return userPermissions.indexOf(permissionName) !== -1;
      },
    }
})

new Vue({
  router,
  store,
  provide:{
    $can : true
  },
  render: h => h(App)
}).$mount('#app');