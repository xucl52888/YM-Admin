<template>
  <el-space direction="vertical" fill class="w-full">
    <!-- 主题 -->
    <div class="w-full">
      <el-divider content-position="center">主题</el-divider>
      <div class="flex items-center justify-center">
        <el-icon :size="20" @click="handleThemeSwitch($event)">
          <Sunny v-if="useProjectSetting?.elementTheme === 'dark'" />
          <Moon v-else />
        </el-icon>
      </div>
    </div>
    <!-- 系统主题色 -->
    <div>
      <el-divider content-position="center">系统主题色</el-divider>
      <div class="flex items-center justify-center">
        <el-color-picker v-model="themeColor" :predefine="predefineColors" @change="changeThemeColor" />
      </div>
    </div>
    <!-- 导航栏模式 -->
    <div>
      <el-divider content-position="center">导航栏模式</el-divider>
      <div class="flex justify-around">
        <!-- 左侧菜单模式 -->
        <div
          class="menu-mode-box w-28 cursor-pointer rounded-md border p-4"
          :class="useProjectSetting?.elementTheme === 'dark' ? 'border-slate-600' : 'border-slate-300'"
          :style="{
            border: useProjectSetting.navigationBarMode === 'leftMenu' ? '1px solid var(--el-color-primary)' : '',
          }"
          @click="useProjectSetting.setNavigationBarMode('leftMenu')"
        >
          <el-tooltip class="box-item" effect="dark" content="左侧菜单模式" placement="top">
            <div class="flex">
              <div class="mr-1 h-10 w-2" style="background-color: var(--el-color-primary)"></div>
              <div class="h-10 flex-1">
                <div class="h-2 w-full" style="background-color: var(--el-color-primary-light-3)"></div>
                <div class="mt-1 h-7" style="background-color: var(--el-color-primary-light-5)"></div>
              </div>
            </div>
          </el-tooltip>
        </div>
        <!-- 顶部菜单模式 -->
        <div
          class="menu-mode-box w-28 cursor-pointer rounded-md border p-4"
          :class="useProjectSetting?.elementTheme === 'dark' ? 'border-slate-600' : 'border-slate-300'"
          :style="{
            border: useProjectSetting.navigationBarMode === 'topMenu' ? '1px solid var(--el-color-primary)' : '',
          }"
          @click="useProjectSetting.setNavigationBarMode('topMenu')"
        >
          <el-tooltip class="box-item" effect="dark" content="顶部菜单模式" placement="top">
            <div class="h-10 w-full cursor-pointer">
              <div class="h-2 w-full" style="background-color: var(--el-color-primary)"></div>
              <div class="mt-1 h-7" style="background-color: var(--el-color-primary-light-5)"></div>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <!-- 界面 -->
    <div>
      <el-divider content-position="center">界面功能</el-divider>
      <div class="flex flex-col">
        <div class="mb-2 flex items-center justify-between">
          <span>显示Logo</span>
          <el-switch v-model="useProjectSetting.showLogo" />
        </div>
        <div class="mb-2 flex items-center justify-between">
          <span>菜单折叠</span>
          <el-switch v-model="useProjectSetting.collapsed" />
        </div>
        <div class="mb-2 flex items-center justify-between">
          <span>显示多页签</span>
          <el-switch v-model="useProjectSetting.showTags" />
        </div>
        <div class="mb-2 flex items-center justify-between">
          <span>显示面包屑</span>
          <el-switch v-model="useProjectSetting.showBreadcrumb" />
        </div>
        <div class="flex items-center justify-between">
          <span>显示面包屑图标</span>
          <el-switch v-model="useProjectSetting.showBreadcrumbIcon" />
        </div>
      </div>
    </div>
    <!-- 动画 -->
    <div>
      <el-divider content-position="center">界面功能</el-divider>
      <div class="flex flex-col">
        <div class="mb-2 flex items-center justify-between">
          <span>禁用动画</span>
          <el-switch v-model="useProjectSetting.isPageAnimate" />
        </div>
        <div class="flex items-center justify-between">
          <span>动画类型</span>
          <el-select v-model="useProjectSetting.pageAnimateType" placeholder="Select" size="large" style="width: 100px">
            <el-option v-for="item in animates" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
    </div>
  </el-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useThemeSwitcher } from '@/hooks/useThemeSwitcher'
import { useThemeColor } from '@/hooks/useThemeSwitcher'
import { useProjectSettingStore } from '@/store/projectSetting'
const useProjectSetting = useProjectSettingStore()

const animates = [
  { value: 'zoom-fade', label: '渐变' },
  { value: 'zoom-out', label: '闪现' },
  { value: 'fade-slide', label: '滑动' },
  { value: 'fade', label: '消退' },
  { value: 'fade-bottom', label: '底部消退' },
  { value: 'fade-scale', label: '缩放消退' },
]

//换肤
const { changeThemeWithTransition } = useThemeSwitcher()
const handleThemeSwitch = (e) => {
  changeThemeWithTransition(e)
}

// 设置主题色
const { setDarkThemeColor, setThemeColor } = useThemeColor()
let themeColor = ref(useProjectSetting.themeColor)
const predefineColors = ref(['#409eff', '#009688', '#ff5c93', '#ee4f12', '#9c27b0', '#ff0000', '#42b883', '#C62549', '#BA5322', '#27B0B0'])
const changeThemeColor = (color: string) => {
  if (color) {
    useProjectSetting.setThemeColor(color)
    setThemeColor(color)
    if (useProjectSetting.elementTheme === 'dark') {
      setDarkThemeColor()
    }
  } else {
    themeColor.value = '#409eff'
    useProjectSetting.setThemeColor('#409eff')
    setThemeColor('#409eff')
    if (useProjectSetting.elementTheme === 'dark') {
      setDarkThemeColor()
    }
  }
}
</script>

<style scoped lang="scss">
.menu-mode-box:hover {
  border: 1px solid var(--el-color-primary);
  // box-sizing: border-box;
}
</style>
