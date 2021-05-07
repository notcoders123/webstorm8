import Vue from 'vue'
import App from './App.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)
import router from './router'
Vue.config.productionTip = false
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import axios from 'axios'
Vue.prototype.$http = axios

import components from './plugins/Component'//加载公共组件
Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase())
  Vue.component('v'+name, components[key])
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
