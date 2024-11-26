// hooks/useThemeSwitcher.js
import { ref } from 'vue'
import { useProjectSettingStore } from '@/store/projectSetting'

// 深色模式切换
export function useThemeSwitcher() {
  const isDarkMode = ref(false)

  // 切换主题
  const changeTheme = () => {
    isDarkMode.value = !isDarkMode.value
    const dark = ref<string | null>(useProjectSettingStore().elementTheme)
    const element = document.querySelector('html') as HTMLElement | null
    if (element) {
      if (element.className === 'dark') element.className = 'light'
      else element.className = 'dark'

      dark.value = element.className
      useProjectSettingStore().setElementTheme(dark.value)
    }
  }

  const changeThemeWithTransition = (e) => {
    const x = e.clientX
    const y = e.clientY

    // 计算鼠标点击位置距离视窗的最大圆半径
    const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    document.documentElement.style.setProperty('--x', `${x}px`)
    document.documentElement.style.setProperty('--y', `${y}px`)
    document.documentElement.style.setProperty('--r', `${endRadius}px`)

    // 判断浏览器是否支持 `startViewTransition`
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        changeTheme()
      })
    } else {
      changeTheme()
    }
  }

  return {
    isDarkMode,
    changeThemeWithTransition,
  }
}

// 动态切换主题色
import { useCssVar } from '@vueuse/core'
import { useElementPlusTheme } from 'use-element-plus-theme'
export function useThemeColor() {
  // 暗色模式下修改部分主题色
  const setDarkThemeColor = () => {
    const elRoot = document.documentElement
    const light9Primary = useCssVar('--el-color-primary-light-9', elRoot)
    const light7Primary = useCssVar('--el-color-primary-light-7', elRoot)
    const light8Primary = useCssVar('--el-color-primary-light-8', elRoot)
    light9Primary.value = '#242424' // transparent  #242424
    light7Primary.value = '#4c4d4f'
    light8Primary.value = '#525252'
  }
  // 动态修改主题色
  const setThemeColor = (color: string) => {
    const { changeTheme } = useElementPlusTheme(useProjectSettingStore().themeColor) // 初始化主题色
    changeTheme(color)
  }

  return {
    setDarkThemeColor,
    setThemeColor,
  }
}
