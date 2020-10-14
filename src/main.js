/*
 * @Author: ljr 
 * @Date: 2020-09-18 14:02:05 
 * @Last Modified by: ljr
 * @Last Modified time: 2020-10-14 14:02:22
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import logger from '@/utils/logger'
import exception from '@/utils/exception'
import '@/assets/iconfont/iconfont.css'
import './global.js'
import vueAwesomeCountdown from 'vue-awesome-countdown'
import wx from 'weixin-js-sdk'
// import VConsole from 'vconsole'

// new VConsole()

Vue.config.productionTip = false
Vue.prototype.$logger = logger
Vue.prototype.$exception = exception
Vue.prototype.$wx = wx
Vue.use(vueAwesomeCountdown, 'vac')
let vueInstance = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vueInstance