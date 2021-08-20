import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import membercreate from '../components/member/membercreate.vue'
import memberupdate from '../components/member/memberupdate.vue'
import phonecreate from '../components/phone/phonecreate.vue'
import phoneupdate from '../components/phone/phoneupdate.vue'
import tiketcreate from '../components/tiket/tiketcreate.vue'
import tiketupdate from '../components/tiket/tiketupdate.vue'
import jadwalcreate from '../components/jadwal/jadwalcreate.vue'
import jadwalupdate from '../components/jadwal/jadwalupdate.vue'
import faqcreate from '../components/faq/faqcreate.vue'
import faqupdate from '../components/faq/faqupdate.vue'
import feedbackcreate from '../components/feedback/feedbackcreate.vue'
import feedbackupdate from '../components/feedback/feedbackupdate.vue'
import artikelkategoricreate from '../components/artikel-category/kategoricreate.vue'
import artikelkategoriupdate from '../components/artikel-category/kategoriupdate.vue'
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
    path: '/member-update/:id',
    name: 'memberupdate',
    component: memberupdate,
    meta:{requiresAuth:true}
  },
  {
    path: '/phone',
    name: 'phone',
    component: () => import('../views/phone.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/phone-create',
    name: 'phonecreate',
    component: phonecreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/phone-update/:id',
    name: 'phoneupdate',
    component: phoneupdate,
    meta:{requiresAuth:true}
  },
  {
    path: '/tiket',
    name: 'tiket',
    component: () => import('../views/tiket.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/tiket-create',
    name: 'tiketcreate',
    component: tiketcreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/tiket-update/:id',
    name: 'tiketupdate',
    component: tiketupdate,
    meta:{requiresAuth:true}
  },
  {
    path: '/jadwal',
    name: 'jadwal',
    component: () => import('../views/jadwal.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/jadwal-create',
    name: 'jadwalcreate',
    component: jadwalcreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/jadwal-update/:id',
    name: 'jadwalupdate',
    component: jadwalupdate,
    meta:{requiresAuth:true}
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../views/faq.vue'),
    meta:{requiresAuth:true}
  }, 
  {
    path: '/faq-create',
    name: 'faqcreate',
    component: faqcreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/faq-update/:id',
    name: 'faqupdate',
    component: faqupdate,
    meta:{requiresAuth:true}
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('../views/feedback.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/feedback-create',
    name: 'feedbackcreate',
    component: feedbackcreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/feedback-update/:id',
    name: 'feedbackupdate',
    component: feedbackupdate,
    meta:{requiresAuth:true}
  },
  {
    path: '/artikel-kategori',
    name: 'artikelkategori',
    component: () => import('../views/artikelkategori.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/artikelkategori-create',
    name: 'artikelkategoricreate',
    component: artikelkategoricreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/artikelkategori-update/:id',
    name: 'artikelkategoriupdate',
    component: artikelkategoriupdate,
    meta:{requiresAuth:true}
  },
  {
    path: '/artikel-comment',
    name: 'artikelcomment',
    component: () => import('../views/artikelkomen.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/artikel-post',
    name: 'artikelpost',
    component: () => import('../views/artikelpost.vue'),
    meta:{requiresAuth:true}
  },
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
