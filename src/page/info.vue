<template>
  <div>
    <elm-header></elm-header>
    <div class="container">
      <p>
        node-elm后台管理系统<br>
        第一次登录的用户自动注册成为普通管理员<br>
        普通管理员可以添加，修改信息<br>
        超级管理员可以删除信息<br>
      </p>
    </div>
  </div>
</template>

<script>
import header from '@/components/header';
export default {
  components: {
    'elm-header': header
  }
};
</script>

<style lang="less" scoped>
.container {
  margin-top: 20px;
  text-align: center;

  p {
    font-size: 20px;
    line-height: 42px;
  }
}
</style>
