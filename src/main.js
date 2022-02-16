import Vue from 'vue'
import App from './App.vue'
import "@/mobile/flexible"//适配
import "@/styles/reset.css"//初始化
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
