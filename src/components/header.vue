<template>
  <div id="header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(meta,index) in $route.meta" v-bind:key="index">{{meta}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown menu-align='start'  @command="handleMenu">
      <span class="el-dropdown-link">
        下拉菜单
      </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item command="homepage">首页</el-dropdown-item>
        <el-dropdown-item command="exit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import {signout} from '@/common/js/common.js';
export default {
  methods: {
    handleMenu(command) {
      if (command === 'homepage') {
        this.$router.push('/manage');
      } else {
        signout().then((result) => {
          result = result.data;
          if (result.status === 1) {
            this.$message({
              type: 'success',
              message: '退出成功'
            });
            this.$router.push('/');
          } else {
            this.$message({
              type: 'error',
              message: '退出失败'
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
#header {
  display: flex;
  background-color: #eff2f7;
  height: 60px;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 37px;
  align-items: center;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
