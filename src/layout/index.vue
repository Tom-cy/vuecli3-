<template>
  <div>
    <base-header />
    <base-slider />
    <div
      class="content_box"
      :class="{'content-isCollapse': isCollapse}"
    >

      <div class="allInfo">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import './Slider/slider.css'
import BaseHeader from './Header'
import BaseSlider from './Slider'
import bus from '@/common/bus'
// 引入头部区域
export default {
  components: { BaseHeader, BaseSlider },
  data() {
    return {
      isCollapse: false
    }
  },
  mounted() {
    bus.$on('collapse', msg => {
      this.isCollapse = msg
    })
  }
}
</script>

<style lang="scss" scoped>
.content_box {
  position: absolute;
  left: 250px;
  top: 70px;
  right: 0;
  bottom: 0;
  transition: left 0.7s ease;
  background-color: #f0f0f0;
  .allInfo {
    width: auto;
    height: 100%;
    padding: 10px;

    overflow-y: scroll;
    box-sizing: border-box;
  }
}
.content-isCollapse {
  left: 65px;
}
 
</style>