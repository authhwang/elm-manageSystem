import Vue from 'vue';
import Router from 'vue-router';

const login = r => require.ensure([], () => r(require('@/page/login')), 'login'); //按需加载组件
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addFood = r => require.ensure([], () => r(require('@/page/addFood')), 'addFood');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/manage',
      name: '',
      component: manage,
      children: [
        {
          path: '',
          component: home,
          meta: []
        },
        {
          path: '/userList',
          component: userList,
          meta: ['数据管理', '用户列表']
        },
        {
          path: '/shopList',
          component: shopList,
          meta: ['数据管理', '商家列表']
        },
        {
          path: '/foodList',
          component: foodList,
          meta: ['数据管理', '食品列表']
        },
        {
          path: '/orderList',
          component: orderList,
          meta: ['数据管理', '订单列表']
        },
        {
          path: '/adminList',
          component: adminList,
          meta: ['数据管理', '管理员列表']
        },
        {
          path: '/addShop',
          component: addShop,
          meta: ['添加数据', '添加商铺']
        },
        {
          path: '/addFood',
          component: addFood,
          meta: ['添加数据', '添加食品']
        },
        {
          path: '/visitor',
          component: visitor,
          meta: ['图表', '用户列表']
        }
      ]
    }
  ]
});
