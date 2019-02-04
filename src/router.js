import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Register from './components/Register'
import Login from './components/Login'
import HelloWorld from './components/HelloWorld'
import Home from './views/Home'
import Verify from './components/Verify'
import Chat from './components/Chat'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/verify',
      name: 'verify',
      component: Verify
    },
    {
      path: '/secure',
      name: 'chat',
      component: Chat,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['AuthModule/user']) {
      if(store.getters['AuthModule/user'].user.emailVerified){
        next()
        return
      }else{
        next('/verify')
      }
    } else {
      next('/login')
    }
    
  } else {
    next() 
  }
})

export default router
