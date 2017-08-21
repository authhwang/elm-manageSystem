<template>
  <div id="login">
    <div class="form">
      <el-form :rules="rules">
        <el-form-item prop="name">
          <el-input placeholder="用户名" v-model="loginForm.name"></el-input>
        </el-form-item>
         <el-form-item prop="password">
          <el-input placeholder="密码" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    };
  }
};
</script>

<style lang="less" scoped>
@import '../style/mixin';
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #324057;
  .wh(100%,100%);
  .form {
    background-color: white;
    border-radius: 5px;
    flex-basis: 370px;
    height: 260px;
    position: relative;
    padding: 25px;
    box-sizing: border-box;

    &:before {
      content: 'elm后台管理系统';
      display: block;
      position: absolute;
      font-size: 34px;
      color: #fff;
      top: -100px;
      left: 0;
      width: 370px;
      text-align: center;
    }
  }
}
</style>
