<template>
  <div>
    <div>
      <base-header></base-header>
    </div>
    <!-- <div>
      <base-slider></base-slider>
    </div> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import BaseHeader from './Header'
import BaseSlider from './Slider'
// 引入头部区域
export default {
  components: { BaseHeader, BaseSlider }
}
</script>