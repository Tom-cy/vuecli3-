import Vue from 'vue'
import BaseIcon from '@/component/BaseIcon/index.vue'

Vue.component('icon-svg', BaseIcon)

const req = require.context('./svg', true, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
