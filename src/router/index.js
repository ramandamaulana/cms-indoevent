import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import admincreate from '../components/admin/admincreate.vue'
import adminupdate from '../components/admin/adminupdate.vue'
import bankcreate from '../components/bank/bankcreate.vue'
import bankupdate from '../components/bank/bankupdate.vue'
import dokumencreate from '../components/document/dokumencreate.vue'
import dokumenupdate from '../components/document/dokumenupdate.vue'
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
import artikelcommentcreate from '../components/artikel-comment/komencreate.vue'
import artikelcommentupdate from '../components/artikel-comment/komenupdate.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin.vue'),
    meta:{requiresAuth:true},
  },
  {
    path: '/admin/create',
    name: 'admincreate',
    component: admincreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/admin/update/:id',
    name: 'adminupdate',
    component: adminupdate,
    meta:{requiresAuth:true}
  },
  {
    path: '/document',
    name: 'document',
    component: () => import('../views/document.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/dokumen/create',
    name: 'dokumencreate',
    component: dokumencreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/dokumen/update/:id',
    name: 'dokumenupdate',
    component: dokumenupdate,
    meta:{requiresAuth:true}
  },
  {
    path: '/bank',
    name: 'bank',
    component: () => import('../views/bank.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/bank/create',
    name: 'bankcreate',
    component: bankcreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/bank/update/:id',
    name: 'bankupdate',
    component: bankupdate,
    meta:{requiresAuth:true}
  },
  {
    
    path: '/dashboard',
    name: 'Home',
    component: Home,
    meta:{requiresAuth:true}
  },
  {
    
    path: '/member',
    name: 'member',
    component: () => import('../views/member.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/member/create',
    name: 'membercreate',
    component: membercreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/member/update/:id',
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
    path: '/phone/create',
    name: 'phonecreate',
    component: phonecreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/phone/update/:id',
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
    path: '/tiket/create',
    name: 'tiketcreate',
    component: tiketcreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/tiket/update/:id',
    name: 'tiketupdate',
    component: tiketupdate,
    meta:{requiresAuth:true}
  },
  {
    path: '/tiket/document',
    name: 'tiket',
    component: () => import('../views/tiket-document.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/tiket/document/create',
    name: 'tiketdokumencreate',
    component: () => import('../components/tiket-dokumen/create.vue'),
    meta:{requiresAuth:true}
  },
 
  {
    path: '/tiket/schedule',
    name: 'tiketschedule',
    component: () => import('../views/tiket-schedule.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/tiket/schedule/create',
    name: 'tiketschedulecreate',
    component: () => import('../components/tiket-schedule/create.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/jadwal',
    name: 'jadwal',
    component: () => import('../views/jadwal.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/jadwal/create',
    name: 'jadwalcreate',
    component: jadwalcreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/jadwal/update/:id',
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
    path: '/faq/create',
    name: 'faqcreate',
    component: faqcreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/faq/update/:id',
    name: 'faqupdate',
    component: faqupdate,
    meta:{requiresAuth:true}
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: () => import('../views/transaction.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('../views/feedback.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/feedback/create',
    name: 'feedbackcreate',
    component: feedbackcreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/feedback/update/:id',
    name: 'feedbackupdate',
    component: feedbackupdate,
    meta:{requiresAuth:true}
  },
  {
    path: '/artikel/kategori',
    name: 'artikelkategori',
    component: () => import('../views/artikelkategori.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/artikel/kategori/create',
    name: 'artikelkategoricreate',
    component: artikelkategoricreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/artikel/kategori/update/:id',
    name: 'artikelkategoriupdate',
    component: artikelkategoriupdate,
    meta:{requiresAuth:true}
  },
  {
    path: '/artikel/komen',
    name: 'artikelcomment',
    component: () => import('../views/artikelkomen.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/artikel/komen/create',
    name: 'artikelkomencreate',
    component: artikelcommentcreate,
    meta:{requiresAuth:true}
  },
  {
    path: '/artikel/komen/update/:id',
    name: 'artikelkomentupdate',
    component: artikelcommentupdate,
    meta:{requiresAuth:true}
  },
  {
    path: '/artikel/post',
    name: 'artikelpost',
    component: () => import('../views/artikelpost.vue'),
    meta:{requiresAuth:true}
  },
    {
      path: '/artikel/post/create',
      name: 'artikelpostcreate',
      component: () => import('../components/artikel-post/postcreate.vue'),
      meta:{requiresAuth:true}
    },
    {
      path: '/artikel/post/update/:id',
      name: 'artikel-post-update',
      component: () => import('../components/artikel-post/postupdate.vue'),
      meta:{requiresAuth:true}
    },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('../views/gallery.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/gallery/create',
    name: 'gallerycreate',
    component: () => import('../components/gallery/gallerycreate.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/gallery/update/:id',
    name: 'galleryupdate',
    component: () => import('../components/gallery/galeryupdate.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('../views/team.vue'),
    meta:{requiresAuth:true}
  },

  {
    path: '/team/create',
    name: 'teamcreate',
    component: () => import('../components/team/teamcreate.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/team/update/:id',
    name: 'Teamupdate',
    component: () => import('../components/team/teamupdate.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/landing',
    name: 'landing',
    component: () => import('../views/landingpage.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/info',
    name: 'Information',
    component: () => import('../views/Information.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/info/create',
    name: 'Informationcreate',
    component: () => import('../components/info/infocreate.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/info/update/:id',
    name: 'Informationupdate',
    component: () => import('../components/info/infoupdate.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/Info/detail',
    name: 'Information-Detail',
    component: () => import('../views/Informationdetail.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/info/detail/create',
    name: 'InformationDetailcreate',
    component: () => import('../components/info-detail/infodetailcreate.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/info/detail/update/:id',
    name: 'InformationDetailupdate',
    component: () => import('../components/info-detail/infodetailupdate.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/info/user',
    name: 'Information-user',
    component: () => import('../views/Informationuser.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/user-attendance',
    name: 'userattendance',
    component: () => import('../views/userattendance.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/landing/create',
    name: 'Page-create',
    component: () => import('../components/landing/create.vue'),
    meta:{requiresAuth:true}
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
})


router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!loggedIn) {
      next({ name: 'Login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
});

export default router

