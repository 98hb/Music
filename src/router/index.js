// 路由相关模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Search from '@/views/Search'
import Play from '@/views/Play'
Vue.use(VueRouter)
const routes = [
    {
        path: "/",
        redirect: "/layout"//默认跳转页面
    },
    {
        path: "/layout",//一级页面
        component: Layout,
        redirect: "/layout/home",//默认跳转二级页面
        children: [
            {
                path: 'home',//二级页面
                component: Home
            },
            {
                path: 'search',//二级页面
                component: Search
            }
        ]
    },
    {
        path: "/play",//一级页面
        component: Play
    }
]
const router = new VueRouter({
    routes
})
export default router