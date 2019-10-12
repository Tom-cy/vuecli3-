<template>
  <div class="slider">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        mode="vertical"
        :collapse="isCollapse"
        collapse-transition
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
import bus from '@/common/bus'
import { mapGetters } from 'vuex'
import SidebarItem from './Sidebaritem'
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters(['assessedRoutes'])
  },
  mounted() {
    bus.$on('collapse', msg => {
      this.isCollapse = msg
    })
  }
}
</script>
