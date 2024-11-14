<template>
  <div class="flex h-16 items-center justify-center">
    <el-avatar :src="logoImgUrl" />
  </div>
  <!-- 菜单 -->
  <el-scrollbar :height="height + 'px'">
    <nav-menu></nav-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import navMenu from '../components/navMenu.vue'
import logoImgUrl from '@/assets/logo.png'
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
</style>
