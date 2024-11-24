// hooks/useThemeSwitcher.js
import { ref } from 'vue'
import { useProjectSettingStore } from '@/store/projectSetting'

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
