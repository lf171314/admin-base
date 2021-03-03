import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import noLayout from './no-layouts'
import NotFound from '@/layout/error-pages/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout
  },
  ...noLayout,
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

export default router
