<template>
  <div class="home_top">
    <div class="home_top_left">
      <div
        class="home_top_menu"
        @click="handCollapse"
      >
        <el-tooltip content="菜单">
          <svg-icon icon-class="menu" />
        </el-tooltip>

      </div>
      <div>智能管理系统</div>
    </div>
    <div class="home_top_right">
      <div
        class="home_ping"
        @click="handFullscreen"
      >
        <el-tooltip :content="fullscreen? '取消全屏': '全屏'">
          <svg-icon icon-class="ping" />
        </el-tooltip>
      </div>
      <div class="home_ling">
        <el-tooltip
          effect="dark"
          content="信息"
        >
          <svg-icon icon-class="ling" />
        </el-tooltip>
      </div>
      <div class="ani_img">
        <img
          class="home_gif"
          src="../../assets/1.gif"
          alt=""
        >
      </div>
      <div>
        <el-dropdown
          class="home_dropdown"
          trigger="click"
          @command="handchose"
        >
          <span>
            用户名
            <i class="el-icon-arrow-down el-icon--right" />
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Myself">账号资料设置</el-dropdown-item>
            <el-dropdown-item command="Whatsee">你瞅啥</el-dropdown-item>
            <el-dropdown-item
              divided
              command="Signout"
            >退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/common/bus'
export default {
  data() {
    return {
      fullscreen: false,
      isCollapse: false
    }
  },
  methods: {
    handchose(e) {
      if (e === 'Signout') {
        this.$router.replace({ path: '/login' })
      }
    },
    handCollapse(e) {
      this.isCollapse = !this.isCollapse
      bus.$emit('collapse', this.isCollapse)
    },
    handFullscreen() {
      const element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>

<style lang="scss" scoped>
.home_top {
  position: relative;
  box-sizing: border-box;
  font-size: 22px;
  color: #fff;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #242f42;
  color: #fff;
  .home_top_left {
    // margin-left: 30px;
    display: flex;
    .home_top_menu {
      width: 65px;
      // height: 70px;
      text-align: center;
    }
  }
  .home_top_right {
    margin-right: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    .home_gif {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .home_ling {
      margin-right: 15px;
    }
    .home_ping {
      margin-right: 15px;
    }
    .ani_img {
      // animation: userImg 1s linear infinite;
      &:hover {
        // animation-play-state:paused
        transition: all 999s;
        transform: rotate(9999turn);
      }
    }

    .home_dropdown {
      color: #fff;
      margin-left: 10px;
    }
  }
}

@keyframes userImg {
  // 0% {
  //   transform: rotate(0deg);
  // }
  // 25% {
  //   transform: rotate(90deg);
  // }
  // 50% {
  //   transform: rotate(180deg)
  // }
  // 75% {
  //   transform: rotate(270deg)
  // }
  // 100% {
  //   transform: rotate(360deg)
  // }
  // 0%{
  //    transform: rotate(60deg);
  // }
  // 10%{
  //    transform: rotate(120deg);
  // }
  // 20%{
  //    transform: rotate(180deg);
  // }
  // 30%{
  //    transform: rotate(240deg);
  // }
  // 40%{
  //    transform: rotate(300deg);
  // }
  // 50%{
  //    transform: rotate(360deg);
  // }
  // 60%{
  //    transform: rotate(72deg);
  // }
  // 70%{
  //    transform: rotate(144deg);
  // }
  // 80%{
  //    transform: rotate(216deg);
  // }
  // 90%{
  //    transform: rotate(288deg);
  // }
  // 100%{
  //    transform: rotate(360deg);
  // }
}
</style>
