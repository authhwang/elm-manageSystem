import Vue from 'vue';
import Router from 'vue-router';

const login = r => require.ensure([], () => r(require('@/page/login')), 'login'); //按需加载组件
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');

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
          meta: ['呀咯', '测试一下']
        }
      ]
    }
  ]
});
