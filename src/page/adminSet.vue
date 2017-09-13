<template>
  <div>
    <elm-header></elm-header>
    <h3 class="header">管理员信息</h3>
    <div class="container">
      <p>姓名: {{adminInfo.user_name}}</p>
      <p>注册时间: {{adminInfo.create_time}}</p>
      <p>管理员权限: {{getAuthrization}}</p>
      <p>管理员 ID: {{adminInfo.id}}</p>
      <p>更换头像：
        <img class="avatar" :src="dataImgUrl + adminInfo.avatar"></img>
      </p>
    </div>
  </div>
</template>

<script>
import header from '@/components/header';
import {mapState} from 'vuex';
import {dataImgUrl} from '@/config/config.js';
export default {
  components: {
    'elm-header': header
  },
  data() {
    return {
      dataImgUrl
    };
  },
  computed: {
    ...mapState(['adminInfo']),
    getAuthrization() {
      return this.adminInfo.status === 1 ? '管理员' : '超级管理员';
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  color: #666;
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
}
.container {
  margin: 20px auto;
  background-color: #f9fafc;
  width: 60%;
  min-height: 400px;
  border-radius: 6px;
  p {
    padding: 20px;
    color: #666;
  }
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
