<template>
  <el-menu
    class="el-menu-vertical-demo"
    :default-active="route.path"
    :mode="props.mode"
    router
    :collapse="useProjectSettingStore().collapsed"
    :style="{ width: props.menuWidth }"
  >
    <menu-tree :menu="menuList"></menu-tree>
  </el-menu>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import menuTree from './menuTree.vue'
import { useMenuStore } from '@/store/useMenuStore'
import { useRoute } from 'vue-router'
const route = useRoute()

import { useProjectSettingStore } from '@/store/projectSetting'
// 订阅事件:放弃此方法
// import emitter from '@/utils/mitt'
// const isCollapsed = ref(false)
// emitter.on('on-isCollapsed', () => {
//   isCollapsed.value = !isCollapsed.value
// })

const menuList = ref(useMenuStore().menu)
const props = defineProps({
  mode: {
    type: String,
    default: 'vertical', // horizontal
  },
  menuWidth: {
    type: String,
    default: 'auto',
  },
})
console.log(props.mode)
console.log(props.menuWidth)
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  border-right: 0;
  border-bottom: 0;
}
</style>
