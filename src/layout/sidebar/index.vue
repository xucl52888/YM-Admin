<template>
  <div class="layout-content-sidebar h-screen">
    <!-- logo -->
    <div class="layout-content-sidebar-logo flex h-16 items-center justify-center" @click="onIsCollapsed">
      <el-avatar :src="logoImgUrl" />
    </div>
    <!-- 菜单 -->
    <el-scrollbar :height="height + 'px'">
      <nav-menu></nav-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import navMenu from '../components/navMenu.vue'
import logoImgUrl from '@/assets/logo.png'

import { useProjectSettingStore } from '@/store/projectSetting'
const onIsCollapsed = () => useProjectSettingStore().setCollapsed()
// 放弃发布订阅方式
// import emitter from '@/utils/mitt'
// const onIsCollapsed = () => emitter.emit('on-isCollapsed')

const height = ref(window.innerHeight - 64)
// 定义一个方法更新宽高
const updateDimensions = () => {
  height.value = window.innerHeight - 64
}
// 组件挂载时添加监听器
onMounted(() => {
  window.addEventListener('resize', updateDimensions)
})

// 组件卸载时移除监听器
onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions)
})
</script>

<style scoped lang="scss">
.el-scrollbar {
  height: auto;
}
.layout-content-sidebar {
  border-right: 1px solid #e0e0e0;
  box-sizing: border-box;
}
.layout-content-sidebar-logo {
  border-bottom: 1px solid #e0e0e0;
  box-sizing: border-box;
}
</style>
