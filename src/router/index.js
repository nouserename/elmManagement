import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//用 import 引入 login 组件，实现组件懒加载
const login = () => import('../page/login')
//配置路由表
const routes = [{
    path: '/',
    component: login
  }]

//暴露路由对象
export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production',
})