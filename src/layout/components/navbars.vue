<template>
  <!-- <div class="flex items-center justify-between"> -->
  <div class="grid grid-cols-5 gap-1">
    <div class="flex items-center">
      <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
        <el-icon :size="20" @click="reloadPage">
          <Refresh />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="flex cursor-pointer items-center">
      <el-tooltip class="box-item" effect="dark" content="换肤" placement="bottom">
        <el-icon :size="20" @click="handleThemeSwitch($event)">
          <Sunny v-if="useProjectSetting?.elementTheme === 'dark'" />
          <Moon v-else />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="flex items-center">
      <el-tooltip class="box-item" effect="dark" :content="useProjectSetting?.fullScreen ? '缩小' : '放大'" placement="bottom">
        <el-icon :size="20" @click="toggleFullScreen">
          <Aim v-if="useProjectSetting?.fullScreen" />
          <FullScreen v-else />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="flex items-center">
      <el-tooltip class="box-item" effect="dark" content="设置主题色" placement="bottom">
        <div>
          <el-color-picker v-model="themeColor" :predefine="predefineColors" @change="changeThemeColor" />
        </div>
      </el-tooltip>
    </div>
    <div class="flex items-center">
      <el-dropdown placement="bottom-end" size="large">
        <el-avatar :size="40" :src="logoImgUrl" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="onPersonalCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="onLoginOut" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import logoImgUrl from '@/assets/logo.png'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userStore } from '@/store/userStore'
import { storage } from '@/utils/Storage'
import router from '@/router'
import { useRouter } from 'vue-router'
import { useThemeSwitcher } from '@/hooks/useThemeSwitcher'
import { useThemeColor } from '@/hooks/useThemeSwitcher'
import { useProjectSettingStore } from '@/store/projectSetting'
const useProjectSetting = useProjectSettingStore()

const routera = useRouter()

// 全屏切换
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) document.exitFullscreen()
  }
  useProjectSetting.setFullScreen()
}

// 刷新页面
const reloadPage = () => {
  console.log(routera.getRoutes(), '路由')
  // router.push({
  //   path: '/redirect' + unref(route).fullPath,
  // })
}

// 个人中心
const onPersonalCenter = () => {
  ElMessage({
    type: 'success',
    message: '个人中心',
  })
}

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

// 退出登录
const onLoginOut = () => {
  ElMessageBox.confirm('是否退出登录', '退出登录', {
    type: 'warning',
    cancelButtonText: '取消',
    confirmButtonText: '退出',
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '退出登录',
      })
      storage.set('TOKEN', '')
      userStore().setToken('')
      router.replace({
        path: '/login',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出',
      })
    })
}
</script>

<style scoped lang="scss">
.a {
  width: 100px;
}
</style>
