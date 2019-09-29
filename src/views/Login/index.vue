<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理</div>

      <el-form :model="ruleForm" class="cy-login-form" ref="ruleForm" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="OnSubmit('ruleForm')">登录</el-button>
          </div>
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
        callback(new Error('用户名由数字、26个英文字母或者下划线组成'))
      }
      callback()
    }
    let validatepassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码'))
      } else if (value.length < 3 || value.length > 12) {
        callback(new Error('密码长度至少3位最多12位'))
      }
      callback()
    }
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: validatename, trigger: 'blur' }],
        password: [{ validator: validatepassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    OnSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('成功')
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
    margin-top: -175px;
    width: 350px;
    max-height: 350px;
    background-color: $mslogin;
    .ms-title {
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #ccc;
    }
    .cy-login-form {
      width: 300px;
      padding: 25px;
      .login-btn button {
        width: 100%;
      }
    }
  }
}
</style>