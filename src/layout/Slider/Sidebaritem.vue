<template>

  <div
    v-if="!item.hidden"
    class="menu-wrapper"
  >
    <template v-if="hasOwnShowingChild(item.children,item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">

    </template>
  </div>
</template>
<script>
import { isExternal } from '@/untils/validate'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      required: true
    },
    isNest: {
      type: Boolean,
      required: true
    }
  },
  data() {
    this.onlyOnechild = null
    return {}
  },

  methods: {
    hasOwnShowingChild(children, parent) {
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