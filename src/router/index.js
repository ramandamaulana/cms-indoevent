import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import notfound from '../views/404.vue'
import admincreate from '../components/admin/admincreate.vue'
import adminupdate from '../components/admin/adminupdate.vue'
import rolecreate from '../components/role/rolecreate.vue'
import roleupdate from '../components/role/roleupdate.vue'
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
    component: Login
  },
  {
    path: '*',
    name: 'not-found',
    component: notfound
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['admin/read']
    },
  },
  {
    path: '/admin/create',
    name: 'admincreate',
    component: admincreate,
    meta:{
      requiresAuth:true,
      permissions: ['admin/create']
    }
  },
  {
    path: '/admin/update/:id',
    name: 'adminupdate',
    component: adminupdate,
    meta:{
      requiresAuth:true,
      permissions: ['admin/update']
    }
  },
  {
    path: '/role',
    name: 'role',
    component: () => import('../views/role.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['role/read']
    },
  },
  {
    path: '/role/create',
    name: 'rolecreate',
    component: rolecreate,
    meta:{
      requiresAuth:true,
      permissions: ['role/create']
    }
  },
  {
    path: '/role/update/:id',
    name: 'roleupdate',
    component: roleupdate,
    meta:{
      requiresAuth:true,
      permissions: ['role/update']
    }
  },
  {
    path: '/role/set-role-permission/:id',
    name: 'setRolePermission',
    component: () => import('../components/role/set-role-permission.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['role/set-permission']
    }
  },
  {
    path: '/role/set-role-user',
    name: 'setRoleUser',
    component: () => import('../components/role/set-role-user.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['role/set-role']
    }
  },
  {
    path: '/document',
    name: 'document',
    component: () => import('../views/document.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['document/read']
    }
  },
  {
    path: '/dokumen/create',
    name: 'dokumencreate',
    component: dokumencreate,
    meta:{
      requiresAuth:true,
      permissions: ['document/create']
    }
  },
  {
    path: '/dokumen/update/:id',
    name: 'dokumenupdate',
    component: dokumenupdate,
    meta:{
      requiresAuth:true,
      permissions: ['document/update']
    }
  },
  {
    path: '/bank',
    name: 'bank',
    component: () => import('../views/bank.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['bank/read']
    }
  },
  {
    path: '/bank/create',
    name: 'bankcreate',
    component: bankcreate,
    meta:{
      requiresAuth:true,
      permissions: ['bank/create']
    }
  },
  {
    path: '/bank/update/:id',
    name: 'bankupdate',
    component: bankupdate,
    meta:{
      requiresAuth:true,
      permissions: ['bank/update']
    }
  },
  {
    
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta:{
      requiresAuth:true,
      permissions: ['dashboard/read']
    }
  },
  {
    
    path: '/member',
    name: 'member',
    component: () => import('../views/member.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['member/read']
    }
  },
  {
    path: '/member/create',
    name: 'membercreate',
    component: membercreate,
    meta:{
      requiresAuth:true,
      permissions: ['member/create']
    }
  },
  {
    path: '/member/update/:id',
    name: 'memberupdate',
    component: memberupdate,
    meta:{
      requiresAuth:true,
      permissions: ['member/update']
    }
  },
  {
    path: '/phone',
    name: 'phone',
    component: () => import('../views/phone.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['phone/read']
    }
  },
  {
    path: '/phone/create',
    name: 'phonecreate',
    component: phonecreate,
    meta:{
      requiresAuth:true,
      permissions: ['phone/create']
    }
  },
  {
    path: '/phone/update/:id',
    name: 'phoneupdate',
    component: phoneupdate,
    meta:{
      requiresAuth:true,
      permissions: ['phone/update']
    }
  },

  {
    path: '/tiket',
    name: 'tiket',
    component: () => import('../views/tiket.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['ticket/read']
    }
  },
  {
    path: '/tiket/create',
    name: 'tiketcreate',
    component: tiketcreate,
    meta:{
      requiresAuth:true,
      permissions: ['ticket/create']
    }
  },
  {
    path: '/tiket/update/:id',
    name: 'tiketupdate',
    component: tiketupdate,
    meta:{
      requiresAuth:true,
      permissions: ['ticket/update']
    }
  },
  {
    path: '/tiket/document',
    name: 'tiket',
    component: () => import('../views/tiket-document.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['ticket/read']
    }
  },
  {
    path: '/tiket/document/create',
    name: 'tiketdokumencreate',
    component: () => import('../components/tiket-dokumen/create.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['ticket/create']
    }
  },
  {
    path: '/tiket/schedule',
    name: 'tiketschedule',
    component: () => import('../views/tiket-schedule.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['ticket/read']
    }
  },
  {
    path: '/tiket/schedule/create',
    name: 'tiketschedulecreate',
    component: () => import('../components/tiket-schedule/create.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['ticket/create']
    }
  },
  {
    path: '/jadwal',
    name: 'jadwal',
    component: () => import('../views/jadwal.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['schedule/read']
    }
  },
  {
    path: '/jadwal/create',
    name: 'jadwalcreate',
    component: jadwalcreate,
    meta:{
      requiresAuth:true,
      permissions: ['schedule/create']
    }
  },
  {
    path: '/jadwal/update/:id',
    name: 'jadwalupdate',
    component: jadwalupdate,
    meta:{
      requiresAuth:true,
      permissions: ['schedule/update']
    }
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../views/faq.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['faq/read']
    }
  }, 
  {
    path: '/faq/create',
    name: 'faqcreate',
    component: faqcreate,
    meta:{
      requiresAuth:true,
      permissions: ['faq/create']
    }
  },
  {
    path: '/faq/update/:id',
    name: 'faqupdate',
    component: faqupdate,
    meta:{
      requiresAuth:true,
      permissions: ['faq/update']
    }
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: () => import('../views/transaction.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['transaction/read']
    }
  },
  {
    path: '/member/detail/transaction/:id',
    name: 'Transaksaidetails',
    component: () => import('../components/transaksi-member/detail.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['member/detail']
    }
  },
  {
    path: '/member/transaction/create/:id',
    name: 'Transactioncreate',
    component: () => import('../components/transaksi/create.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['member/create']
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('../views/feedback.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['feedback/read']
    }
  },
  {
    path: '/feedback/create',
    name: 'feedbackcreate',
    component: feedbackcreate,
    meta:{
      requiresAuth:true,
      permissions: ['feedback/create']
    }
  },
  {
    path: '/feedback/update/:id',
    name: 'feedbackupdate',
    component: feedbackupdate,
    meta:{
      requiresAuth:true,
      permissions: ['feedback/update']
    }
  },
  {
    path: '/artikel/kategori',
    name: 'artikelkategori',
    component: () => import('../views/artikelkategori.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['article/read']
    }
  },
  {
    path: '/artikel/kategori/create',
    name: 'artikelkategoricreate',
    component: artikelkategoricreate,
    meta:{
      requiresAuth:true,
      permissions: ['article/create']
    }
  },
  {
    path: '/artikel/kategori/update/:id',
    name: 'artikelkategoriupdate',
    component: artikelkategoriupdate,
    meta:{
      requiresAuth:true,
      permissions: ['article/update']
    }
  },
  {
    path: '/artikel/komen',
    name: 'artikelcomment',
    component: () => import('../views/artikelkomen.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['article/read']
    }
  },
  {
    path: '/artikel/komen/create',
    name: 'artikelkomencreate',
    component: artikelcommentcreate,
    meta:{
      requiresAuth:true,
      permissions: ['article/create']
    }
  },
  {
    path: '/artikel/komen/update/:id',
    name: 'artikelkomentupdate',
    component: artikelcommentupdate,
    meta:{
      requiresAuth:true,
      permissions: ['article/update']
    }
  },
  {
    path: '/artikel/post',
    name: 'artikelpost',
    component: () => import('../views/artikelpost.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['article/read']
    }
  },
    {
      path: '/artikel/post/create',
      name: 'artikelpostcreate',
      component: () => import('../components/artikel-post/postcreate.vue'),
      meta:{
        requiresAuth:true,
        permissions: ['article/create']
      }
    },
    {
      path: '/artikel/post/update/:id',
      name: 'artikel-post-update',
      component: () => import('../components/artikel-post/postupdate.vue'),
      meta:{
        requiresAuth:true,
        permissions: ['article/update']
      }
    },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('../views/gallery.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['gallery/read']
    }
  },
  {
    path: '/gallery/create',
    name: 'gallerycreate',
    component: () => import('../components/gallery/gallerycreate.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['gallery/create']
    }
  },
  {
    path: '/gallery/update/:id',
    name: 'galleryupdate',
    component: () => import('../components/gallery/galeryupdate.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['gallery/update']
    }
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('../views/team.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['team/read']
    }
  },

  {
    path: '/team/create',
    name: 'teamcreate',
    component: () => import('../components/team/teamcreate.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['team/create']
    }
  },
  {
    path: '/team/update/:id',
    name: 'Teamupdate',
    component: () => import('../components/team/teamupdate.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['team/update']
    }
  },
  {
    path: '/landing',
    name: 'landing',
    component: () => import('../views/landingpage.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['landing-page/read']
    }
  },
  {
    path: '/info',
    name: 'Information',
    component: () => import('../views/Information.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['information/read']
    }
  },
  {
    path: '/info/create',
    name: 'Informationcreate',
    component: () => import('../components/info/infocreate.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['information/create']
    }
  },
  {
    path: '/info/update/:id',
    name: 'Informationupdate',
    component: () => import('../components/info/infoupdate.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['information/update']
    }
  },
  {
    path: 'info/detail',
    name: 'Information-Detail',
    component: () => import('../views/Informationdetail.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['information/read']
    }
  },
  {
    path: '/info/detail/create',
    name: 'InformationDetailcreate',
    component: () => import('../components/info-detail/infodetailcreate.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['information/create']
    }
  },
  {
    path: '/info/detail/update/:id',
    name: 'InformationDetailcreate',
    component: () => import('../components/info-detail/infodetailupdate.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['information/update']
    }
  },
  {
    path: '/info/user',
    name: 'Information-user',
    component: () => import('../views/Informationuser.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['information/read']
    }
  },
  {
    path: '/info/user/create',
    name: 'InformationUsercreate',
    component: () => import('../components/info-user/infousercreate.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['information/create']
    }
  },
  {
    path: '/user-attendance',
    name: 'userattendance',
    component: () => import('../views/userattendance.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['user-attendance/read']
    }
  },
  {
    path: '/user-attendance/:id',
    name: 'userattendance-detail',
    component: () => import('../components/user-attendance/detail.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['user-attendance/detail']
    }
  },
  {
    path: '/landing/create',
    name: 'Page-create',
    component: () => import('../components/landing/create.vue'),
    meta:{
      requiresAuth:true,
      permissions: ['landing-page/create']
    }
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
      next({  
        name: 'Login',
        query: { redirect: to.fullPath }    
      })          
    } else {
      const userPermissions = JSON.parse(localStorage.getItem('user')).data.permissions;
        if (to.meta.permissions && to.meta.permissions.length > 0) {
          let isAllowed = userPermissions.some(p => to.meta.permissions.includes(p))
          
          if (! isAllowed) return next('/not-found')
      }

      next()
    }
    
  } else {
    next() // does not require auth, make sure to always call next()!
  }
});



export default router

