import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home.vue'
import Main from '@/views/main.vue'
import Login from '@/components/login.vue'
import Anchor from '@/components/anchor.vue'

Vue.use(Router)

//import Layout from '@/views/layout/Layout'

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
      	{
      		path:'',
      		component:Main
      	},
      	{
      		path:'/anchor',
      		component:Anchor
      	}
      ]
    },
    {
    	path:'/login',
    	name:'Login',
    	component:Login,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
//    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
  ]
})
