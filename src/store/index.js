import {getAdminInfo} from '../common/js/common.js';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const state = {
  adminInfo: {
    avatar: 'default.jpg'
  }
};

const mutations = {
  saveAdminInfo (state, userinfo) {
    state.adminInfo = userinfo;
  }
};

const actions = {
  updateAdminInfo ({commit}) {
    getAdminInfo().then(function(result) {
      console.log(result);
      result = result.data;
      if (result.status === 1) {
        commit('saveAdminInfo', result.data);
      } else {
        console.log('您尚未登陆或者session失效');
      }
    }).catch(function(error) {
      console.log('您尚未登陆或者session失效', error);
    });
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
