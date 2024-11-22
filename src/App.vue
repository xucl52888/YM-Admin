<template>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { storage } from '@/utils/Storage'
// console.log('环境变量', import.meta.env.MODE, import.meta.env.VITE_ENV)
// console.log('环境变量接口地址', import.meta.env.VITE_BASE_URL)
// console.log('环境变量标题', import.meta.env.VITE_TITLE)

// vue生命周期回调函数
onBeforeMount(() => {
  // 获取当前主题
  const dark = ref<string | null>(storage.get('dark'))
  const element = document.querySelector('html') as HTMLElement | null
  if (element) {
    if (dark.value === 'dark') element.className = 'dark'
    else element.className = ''
  }
})
</script>
<style lang="scss">
@import './styles/style.scss';
</style>
