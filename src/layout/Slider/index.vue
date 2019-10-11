<template>
  <div class="slider">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in assessedRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './Sidebaritem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['assessedRoutes'])
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.slider {
  width: 250px;
}
</style>
