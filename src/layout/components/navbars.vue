<template>
  <el-space size="small">
    <!-- 刷新 -->
    <div class="bars-hover flex cursor-pointer items-center p-2" @click="reloadPage">
      <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
        <el-icon :size="20">
          <Refresh />
        </el-icon>
      </el-tooltip>
    </div>
    <!-- 放大缩小 -->
    <div class="bars-hover flex cursor-pointer items-center p-2" @click="toggleFullScreen">
      <el-tooltip class="box-item" effect="dark" :content="useProjectSetting?.fullScreen ? '缩小' : '放大'" placement="bottom">
        <el-icon :size="20">
          <Aim v-if="useProjectSetting?.fullScreen" />
          <FullScreen v-else />
        </el-icon>
      </el-tooltip>
    </div>
    <!-- 主题切换 -->
    <div class="bars-hover flex cursor-pointer items-center p-2" @click="handleThemeSwitch($event)">
      <el-tooltip class="box-item" effect="dark" content="主题切换" placement="bottom">
        <el-icon :size="20">
          <Sunny v-if="useProjectSetting?.elementTheme === 'dark'" />
          <Moon v-else />
        </el-icon>
      </el-tooltip>
    </div>
    <!-- 设置 -->
    <div class="bars-hover flex cursor-pointer items-center p-2" @click="openDrawer">
      <el-icon :size="20">
        <Setting />
      </el-icon>
    </div>

    <!-- 头像 -->
    <div class="flex items-center">
      <el-dropdown placement="bottom-end" size="large">
        <el-avatar :size="40" :src="logoImgUrl" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="onPersonalCenter">关于项目</el-dropdown-item>
            <el-dropdown-item @click="onLoginOut" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-space>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import logoImgUrl from '@/assets/logo.png'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userInfoStore } from '@/store/userInfoStore'
import router from '@/router'
import { useRouter } from 'vue-router'
import { useThemeSwitcher } from '@/hooks/useThemeSwitcher'
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
const reload = inject('reload', () => {})
const reloadPage = () => {
  console.log(routera.getRoutes(), '路由')
  reload()
}

// 抽屉
const openDrawer = inject('openDrawer', () => {})

//换肤
const { changeThemeWithTransition } = useThemeSwitcher()
const handleThemeSwitch = (e) => {
  changeThemeWithTransition(e)
}
// 个人中心
const onPersonalCenter = () => {
  router.push('/about')
  // ElMessage({
  //   type: 'success',
  //   message: '个人中心',
  // })
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
      userInfoStore().setToken('')
      // router.replace({
      //   path: '/login',
      // })
      router.push('/login')
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
.bars-hover:hover {
  border-radius: 50%;
  background-color: #f5f5f5;
}
</style>
