<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理</div>
      <el-form
        :model="ruleForm"
        class="cy-login-form"
        ref="ruleForm"
        :rules="rules"
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
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
            <el-button
              v-popover:popover
              type="primary"
              @click="OnSubmit('ruleForm')"
              :loading="loading"
            >登录</el-button>
          </div>
        </el-form-item>
      </el-form>
      <!-- 验证码弹框 -->
      <el-popover
        popper-class="slidingPictures"
        ref="popover"
        trigger="manual"
        v-model="visible"
      >
        <div class="sliding-pictures">
          <div class="vimg">
            <canvas id="sliderBlock"></canvas>
            <canvas id="codeImg"></canvas>
          </div>
          <div class="slider">
            <div
              class="track"
              :class="{pintuTrue:puzzle}"
            >{{tips}}</div>
            <div
              class="button el-icon-s-grid"
              @mousedown.prevent="drag"
            ></div>
          </div>
          <div class="operation">
            <span
              title="关闭验证码"
              @click="closecanvas"
              class="el-icon-circle-close"
            ></span>
            <span
              title="刷新验证码"
              @click="canvasInit"
              class="el-icon-refresh-left"
            ></span>
          </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { async } from 'q'
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
      loading: false,
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: validatename, trigger: 'blur' }],
        password: [{ validator: validatepassword, trigger: 'blur' }]
      },
      /**
       * 图片验证模块
       */
      // 拼图是否出现:
      visible: false,
      //拼图是否正确
      puzzle: false,
      tips: '拖动左边滑块完成上方拼图',
      //滑块x轴数据
      slider: {
        mx: 0,
        bx: 0
      },
      // 拼图背景图片
      imgN: 0
    }
  },
  methods: {
    // 自定义函数- 拼图完成之后的函数操作
    UserLogin() {
      this.loading = false
      this.$store.dispatch('user/login', this.ruleForm).then(response => {
        this.$router.push('/')
      })
    },

    OnSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          let isVisible = this.visible
          this.visible = !isVisible
          this.canvasInit()
          this.puzzle = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //拼图验证码初始化
    canvasInit() {
      let imgN = this.imgN
      imgN++
      if (imgN > 8) {
        imgN = 1
      }
      this.imgN = imgN
      this.tips = '拖动左边滑块完成上方拼图'
      //生成指定区间的随机数
      const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 10) + min)
      }
      //x: 254, y: 109
      let mx = random(100, 255),
        bx = random(10, 120),
        y = random(10, 99)
      this.slider = { mx, bx }
      this.draw(mx, bx, y)
    },
    // 绘制图片模块
    draw(mx = 200, bx = 20, y = 50) {
      let mainDom = document.querySelector('#codeImg')
      let bg = mainDom.getContext('2d')
      let width = mainDom.width
      let height = mainDom.height

      let blockDom = document.querySelector('#sliderBlock')
      let block = blockDom.getContext('2d')
      // 重新赋值, 让canvas进行重新绘制
      blockDom.height = height
      mainDom.height = height

      let img = document.createElement('img')
      img.style.objectFit = 'scale-down'
      // let imgsrc = require('../../assets/login/1.jpg')
      let imgSrc = [
        require('../../assets/login/1.jpg'),
        require('../../assets/login/2.jpg'),
        require('../../assets/login/3.jpg'),
        require('../../assets/login/4.jpg'),
        require('../../assets/login/5.jpg'),
        require('../../assets/login/6.jpg'),
        require('../../assets/login/7.jpg'),
        require('../../assets/login/8.jpg'),
        require('../../assets/login/9.jpg')
      ]

      let imgN = this.imgN
      img.src = imgSrc[imgN - 1]

      img.onload = function() {
        bg.drawImage(img, 0, 0, width, height)
        block.drawImage(img, 0, 0, width, height)
      }

      let mainxy = { x: mx, y: y, r: 9 }
      let blockxy = { x: bx, y: y, r: 9 }

      this.drawBlock(bg, mainxy, 'fill')
      this.drawBlock(block, blockxy, 'clip')
    },
    // 绘制拼图
    drawBlock(ctx, xy = { x: 254, y: 109, r: 9 }, type) {
      let x = xy.x,
        y = xy.y,
        r = xy.r,
        w = 40
      let PI = Math.PI
      //绘制
      ctx.beginPath()
      //left
      ctx.moveTo(x, y)
      //top
      ctx.arc(x + (w + 5) / 2, y, r, -PI, 0, true)
      ctx.lineTo(x + w + 5, y)
      //right
      ctx.arc(x + w + 5, y + w / 2, r, 1.5 * PI, 0.5 * PI, false)
      ctx.lineTo(x + w + 5, y + w)
      //bottom
      ctx.arc(x + (w + 5) / 2, y + w, r, 0, PI, false)
      ctx.lineTo(x, y + w)
      ctx.arc(x, y + w / 2, r, 0.5 * PI, 1.5 * PI, true)
      ctx.lineTo(x, y)
      //修饰，没有会看不出效果
      ctx.lineWidth = 1
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.stroke()
      ctx[type]()
      ctx.globalCompositeOperation = 'xor'
    },
    // 拖动图片模块,鼠标go
    drag(e) {
      let dom = e.target //dom元素
      let slider = document.querySelector('#sliderBlock') //滑块dom
      const downCoordinate = { x: e.x, y: e.y }
      //正确的滑块数据
      let checkx = Number(this.slider.mx) - Number(this.slider.bx)
      //x轴数据
      let x = 0
      const move = moveEV => {
        x = moveEV.x - downCoordinate.x
        //y = moveEV.y - downCoordinate.y;
        if (x >= 251 || x <= 0) return false
        dom.style.left = x + 'px'
        // dom.style.top = y + "px";
        slider.style.left = x + 'px'
      }

      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        dom.style.left = ''

        let max = checkx + 3
        let min = checkx - 3
        /**
         * x : 图片移动的距离
         * checkx : 需要图片滑动的距离
         */
        // console.log('需要滑动的距离最大为' + max)
        // console.log('需要滑动的距离最小为' + min)
        // console.log('需要滑动的距离为' + x)
        // 允许正负误差3
        if ((max >= x && x >= min) || x === checkx) {
          this.puzzle = true
          this.tips = '验证成功'
          setTimeout(() => {
            this.visible = false
          }, 500)

          this.UserLogin()
        } else {
          this.tips = '验证失败，请重试'
          this.puzzle = false
          this.canvasInit()
        }
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },
    // 关闭验证码
    closecanvas() {
      this.visible = false
      this.loading = false
    }
  }
}
</script>







<style >
.slidingPictures {
  padding: 0;
  width: 300px;
  border-radius: 2px;
}
</style>

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

// Canvas效果图样式
/*该样式最终是以弹窗插入*/
.sliding-pictures {
  width: 100%;
  .vimg {
    width: 100%;
    height: 170px;
    #sliderBlock {
      // padding: 7px 7px 0 7px;
      width: inherit;
      height: inherit;
    }
    #sliderBlock {
      position: absolute;
      z-index: 4000;
    }
  }
  .slider {
    width: 100%;
    height: 65px;
    border-bottom: #c7c9d0 1px solid;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .track {
      margin-left: 7px;
      width: 286px;
      height: 38px;
      background: rgba(28, 136, 188, 0.5);
      border-radius: 25px;
      font-size: 14px;
      line-height: 38px;
      padding-right: 15px;
      padding-left: 70px;
    }
    .pintuTrue {
      background: #67c23a;
      color: #ffffff;
    }
    .button {
      position: absolute;
      width: 50px;
      height: 50px;
      line-height: 48px;
      background: #ffffff;
      box-shadow: #b9bdc8 0 0 3px;
      border-radius: 50%;
      left: 7px;
      text-align: center;
      font-size: 28px;
      color: #3e5d8b;
      &:hover {
        color: #2181bd;
      }
    }
  }
  .operation {
    width: 100%;
    height: 40px;
    > span {
      color: #9fa3ac;
      display: inline-block;
      width: 40px;
      font-size: 25px;
      line-height: 40px;
      text-align: center;
      &:hover {
        background: #e2e8f5;
      }
    }
  }
}
</style>
