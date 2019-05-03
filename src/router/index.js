import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import Home from '@/components/Home'
import Role from '@/components/Role'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: '/admin/home',
      component: Admin,
      children: [{
        path: '/admin/home',
        name: 'Home',
        component: Home
      },{
        path: '/admin/User',
        name: 'User',
        component: User
      },{
        path: '/admin/Role',
        name: 'Role',
        component: Role
      }]
    }
  ]
})
