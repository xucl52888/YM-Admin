<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { userStore } from '@/store/userStore'
import { storage } from '@/utils/Storage'

import router from '@/router'
const onLoginOut = () => {
  console.log('退出登录')
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
<style lang="scss" scoped></style>
