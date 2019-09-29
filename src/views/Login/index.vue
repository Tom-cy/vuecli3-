<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理</div>
      <el-form :model="ruleForm" class="cy-login-form" ref="ruleForm" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let validatename = (rule, value, callback) => {
      let reg = /^[0-9a-zA-Z_]{1,}$/
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!value.match(reg)) {
        callback(
          new Error(
            '请输入正确规则的用户名, 由数字、26个英文字母或者下划线组成'
          )
        )
      }
      callback()
    }
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: validatename, trigger: 'blur' }]
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../style/variables.scss';
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/login.png);
  background-size: 100%;
  color: #fff;
  .ms-login {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 50%;
    width: 350px;
    height: 200px;
    background-color: $mslogin;
    .ms-title {
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #ccc;
    }
    .cy-login-form {
      width: 300px;
      padding: 25px;
    }
  }
}
</style>