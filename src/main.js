import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Cookies from 'js-cookie'

import $ from "jquery"

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import './icon/iconfont.css' // icon

import * as filters from './filters' // global filters

import toRoute from './utils/toRouter.js'

Vue.prototype.toRoute = toRoute

/*Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
})*/
Vue.use(Element, { size: 'small', zIndex: 3000 });
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
