<template>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, watch, nextTick } from 'vue'
import { useCssVar, useStorage } from '@vueuse/core'
import { useElementPlusTheme } from 'use-element-plus-theme'
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
if (useProjectSettingStore().elementTheme === 'dark') {
  nextTick(() => {
    // const layoutThemeColor = useStorage('layout-theme-color', '2d8cf0') // 默认主题色
    // const { changeTheme } = useElementPlusTheme(layoutThemeColor.value) // 初始化主题色
    // changeTheme(layoutThemeColor.value)

    setTimeout(() => {
      const elRoot = document.documentElement
      const cssVarPrimary = useCssVar('--el-color-primary-light-9', elRoot)
      cssVarPrimary.value = '#242424'
      console.log(123132)
    }, 500)
  })
}
// 监听主题变化
watch(
  () => useProjectSettingStore().elementTheme,
  (newVal) => {
    if (newVal === 'dark') {
      // 使用 CSS 变量
      const elRoot = document.documentElement
      const cssVarPrimary = useCssVar('--el-color-primary-light-9', elRoot)
      cssVarPrimary.value = '#242424'
    } else {
      const layoutThemeColor = useStorage('layout-theme-color', '2d8cf0') // 默认主题色
      const { changeTheme } = useElementPlusTheme(layoutThemeColor.value) // 初始化主题色
      changeTheme(layoutThemeColor.value)
    }
  },
)
</script>
<style lang="scss"></style>
