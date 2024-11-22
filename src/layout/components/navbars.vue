<template>
  <!-- <div class="flex items-center justify-between"> -->
  <div class="grid grid-cols-4 gap-1">
    <div class="flex items-center">
      <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
        <el-icon :size="20" @click="reloadPage">
          <Refresh />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="flex cursor-pointer items-center">
      <el-tooltip class="box-item" effect="dark" content="换肤" placement="bottom">
        <el-icon :size="20" @click="configDark">
          <Sunny v-if="dark === 'dark'" />
          <Moon v-else />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="flex items-center">
      <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
        <el-icon :size="20" @click="toggleFullScreen">
          <FullScreen />
        </el-icon>
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
import { ref, reactive } from 'vue'
import logoImgUrl from '@/assets/logo.png'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userStore } from '@/store/userStore'
import { storage } from '@/utils/Storage'
import router from '@/router'
import { useRouter } from 'vue-router'

const routera = useRouter()

// 全屏切换
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) document.exitFullscreen()
  }
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
const dark = ref<string | null>(storage.get('dark'))
const configDark = (): void => {
  const element = document.querySelector('html') as HTMLElement | null
  if (element) {
    if (element.className === 'dark') element.className = ''
    else element.className = 'dark'

    dark.value = element.className
    storage.set('dark', element.className)
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
