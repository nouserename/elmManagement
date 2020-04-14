import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = () => import('../page/login')
const manage = () => import('../page/manage')
const addShop = () => import('../page/addShop')
const addGoods = () => import('../page/addGoods')
const userList = () => import('../page/userList')
const shopList = () => import('../page/shopList')
const foodList = () => import('../page/foodList')
const orderList = () => import('../page/orderList')
const adminList = () => import('../page/adminList')


const routes = [{
    path: '/',
    component: login
  },
  {
    path: '/manage',
    component: manage,
    name: '',
    children: [{
        path: '',
        redirect: '/userList'
      },
      {
        path: '/addShop',
        component: addShop,
        meta: ['添加数据', '添加商铺'],
      }, {
        path: '/addGoods',
        component: addGoods,
        meta: ['添加数据', '添加商品'],
      }, {
        path: '/userList',
        component: userList,
        meta: ['数据管理', '用户列表'],
      }, {
        path: '/shopList',
        component: shopList,
        meta: ['数据管理', '商家列表'],
      }, {
        path: '/foodList',
        component: foodList,
        meta: ['数据管理', '食品列表'],
      }, {
        path: '/orderList',
        component: orderList,
        meta: ['数据管理', '订单列表'],
      }, {
        path: '/adminList',
        component: adminList,
        meta: ['数据管理', '管理员列表'],
      }
    ]
  }
]

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production',
})
