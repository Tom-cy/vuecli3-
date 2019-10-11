<template>
  <div
    class="slider"
    :class="{'slider-isCollapse': isCollapse}"
  >
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

<style scoped>
.slider {
  display: block;
  position: absolute;
  top: 70px;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
  background-color: rgb(84, 92, 100);
  overflow: hidden;
}
.slider-isCollapse {
  width: 65px;
  overflow: hidden;
}
.slider::-webkit-scrollbar {
  width: 0;
}
.slider /deep/ .el-scrollbar {
  width: 250px;
  overflow: hidden;
}

.slider /deep/ .scrollbar-wrapper {
  margin-right: -18px !important;
}
</style>
