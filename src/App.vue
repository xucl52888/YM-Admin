<template>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, watch } from 'vue'
// console.log('环境变量', import.meta.env.MODE, import.meta.env.VITE_ENV)
// console.log('环境变量接口地址', import.meta.env.VITE_BASE_URL)
// console.log('环境变量标题', import.meta.env.VITE_TITLE)

// 主题
import { useProjectSettingStore } from '@/store/projectSetting'
onBeforeMount(() => {
  // 获取当前主题
  const dark = ref<string | null>(useProjectSettingStore().elementTheme)
  const element = document.querySelector('html') as HTMLElement | null
  if (element) {
    if (dark.value === 'dark') element.className = 'dark'
    else element.className = 'light'
  }
})

// 监听主题变化
watch(
  () => useProjectSettingStore().elementTheme,
  () => {},
)
</script>
<style lang="scss">
@import './styles/style.scss';
</style>
