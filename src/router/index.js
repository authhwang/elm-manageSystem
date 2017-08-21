import Vue from 'vue';
import Router from 'vue-router';

const Login = r => require.ensure([], () => r(require('@/page/login')), 'login'); //按需加载组件

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
});
