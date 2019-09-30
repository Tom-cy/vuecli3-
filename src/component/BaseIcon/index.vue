<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:herf="iconName" />
  </svg>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: 0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>