import Vue from 'vue'
import App from './App.vue'
import "@/mobile/flexible"//适配
import "@/styles/reset.css"//初始化
import router from '@/router'//路由对象
//vant Tabbar TabbarItem 全局注册
// vant NavBar 全局注册
import { Tabbar, TabbarItem, NavBar } from 'vant';
// 全局注册recommendMusic
import { recommendMusicAPI } from '@/api/index'
async function myFn() {
  const res = await recommendMusicAPI({
    limit: 6
  })
  console.log(res);
}
myFn()
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
