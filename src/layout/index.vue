<template>
  <div>
    <div>
      <base-header></base-header>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import BaseHeader from './Header'
// 引入头部区域
export default {
  components: { BaseHeader }
}
</script>