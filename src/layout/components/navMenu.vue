<template>
  <el-menu :default-active="route.path" class="el-menu-vertical-demo border-r-0" router :collapse="useProjectSettingStore().collapsed">
    <menu-tree :menu="menuList"></menu-tree>
  </el-menu>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
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
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  border-right: 0;
}
</style>
