import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/loading'
  }, {
    path: '/loading',
    name: 'Loading',
    component: () => import('@/views/loading')
  }, {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home')
  }, {
    path: '/rank',
    name: 'RankBoard',
    component: () => import('@/views/rankBoard')
  }, {
    path: '/award',
    name: 'Award',
    component: () => import('@/views/award')
  }, {
    path: '/chooseBox',
    name: 'ChooseBox',
    component: () => import('@/views/chooseBox')
  }, {
    path: '/openBox',
    name: 'OpenBox',
    component: () => import('@/views/openBox')
  }, {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/404')
  }, {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: `${process.env.VUE_APP_ROUTER_BASE}`,
  routes
})

export default router
