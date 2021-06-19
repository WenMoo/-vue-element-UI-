import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//加载mock
import mockData from './mock'
//加载element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'  //关键代码
axios.defaults.headers = {
  'Content-type': 'application/json'
}

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  mockData,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
