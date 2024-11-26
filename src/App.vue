<template>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, watch, nextTick } from 'vue'
import { useThemeColor } from '@/hooks/useThemeSwitcher'

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

// 监听是否为深色模式主题
const { setDarkThemeColor, setThemeColor } = useThemeColor()
if (useProjectSettingStore().elementTheme === 'dark') {
  nextTick(() => {
    setTimeout(() => {
      setDarkThemeColor()
    }, 500)
  })
}
setThemeColor(useProjectSettingStore().themeColor)
// 监听主题变化
watch(
  () => useProjectSettingStore().elementTheme,
  (newVal) => {
    if (newVal === 'dark') {
      setDarkThemeColor()
    } else {
      setThemeColor(useProjectSettingStore().themeColor)
    }
  },
)
</script>
<style lang="scss"></style>
