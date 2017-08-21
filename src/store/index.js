import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

let state = {
  adminInfo: {
    avatar: 'default.jpg'
  }
};

let mutations = {
  saveAdminInfo (state, userinfo) {
    state.adminInfo = userinfo;
  }
};

let actions = {
  updateInfo ({commit}) {
    axios({
      method: 'get',
      url: global.getAdminInfo
    }).then(function(result) {
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
