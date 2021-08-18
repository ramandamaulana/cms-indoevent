import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import membercreate from '../components/member/membercreate.vue'
import phonecreate from '../components/phone/phonecreate.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login 
  },
  {
    path: '/Dashboard',
    name: 'Home',
    component: Home,
    meta:{requiresAuth:true}
  },
  {
    path: '/member-create',
    name: 'membercreate',
    component: membercreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/phone-create',
    name: 'phonecreate',
    component: phonecreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/phone',
    name: 'phone',
    component: () => import('../views/phone.vue'),
    meta:{requiresAuth:true}
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})


router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
      next("/Login")
    }
  next();
});

export default router
