<template>

  <div
    v-if="!item.hidden"
    class="menu-wrapper"
  >
    <!-- 没有子元素 ， 即为一级目录     -->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown' : !isNest}"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <!-- 拥有子元素 二级目录 -->
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
        <!-- <siderbar-item
          v-for="child in item.children"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        /> -->
      </template>
    </el-submenu>
  </div>
</template>
<script>
import path from 'path'
import { isExternal } from '@/untils/validate'
import AppLink from './Link'
import Item from './Item'
export default {
  name: 'SidebarItem',
  components: { AppLink, Item },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      required: true
    }
    // isNest: {
    //   type: Boolean,
    //   required: true
    // }
  },
  data() {
    this.onlyOnechild = null
    return {}
  },
  mounted() {},
  methods: {
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOnechild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        this.onlyOnechild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },

    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
