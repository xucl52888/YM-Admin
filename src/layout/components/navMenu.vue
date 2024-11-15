<template>
  <el-menu
    :default-active="route.path"
    class="el-menu-vertical-demo border-r-0"
    background-color="#282c34"
    text-color="#fff"
    router
    :collapse="isCollapsed"
  >
    <menu-tree :menu="menuList"></menu-tree>
  </el-menu>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import menuTree from './menuTree.vue'
import emitter from '@/utils/mitt'
import { useMenuStore } from '@/store/useMenuStore'
import { useRoute } from 'vue-router'
const route = useRoute()

const isCollapsed = ref(false)

// 订阅事件
emitter.on('on-isCollapsed', () => {
  isCollapsed.value = !isCollapsed.value
})

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
