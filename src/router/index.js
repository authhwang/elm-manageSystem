import Vue from 'vue';
import Router from 'vue-router';

const login = r => require.ensure([], () => r(require('@/page/login')), 'login'); //按需加载组件
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');

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
        }
      ]
    }
  ]
});
