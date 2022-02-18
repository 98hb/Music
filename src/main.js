import Vue from 'vue'
import App from './App.vue'
import "@/mobile/flexible"//适配
import "@/styles/reset.css"//初始化
import router from '@/router'//路由对象
//vant Tabbar TabbarItem NavBar  Col Row Image as VanImage全局注册
import { Tabbar, TabbarItem, NavBar, Col, Row, Image as VanImage, Cell, CellGroup, Icon, Search, List } from 'vant';
// 全局注册recommendMusic
import { recommendMusicAPI } from '@/api/index'
async function myFn() {
  const res = await recommendMusicAPI({
    limit: 6
  })
  console.log(res);
}
myFn()
Vue.use(List);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(VanImage);
Vue.use(Col);
Vue.use(Row);
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
