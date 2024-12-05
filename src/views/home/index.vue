<template>
  <div class="home-container">
    <div class="flex justify-between">
      <el-card class="rounded-md" shadow="never" style="width: 30%">
        <div class="flex">
          <div class="mr-5 flex items-center justify-center">
            <el-avatar :src="logoImgUrl" :size="60" />
          </div>
          <div class="flex items-center">
            <div class="flex flex-col">
              <div>Hello, 超级管理员</div>
              <div class="mt-2 text-sm text-gray-500">当前角色：系统管理员</div>
            </div>
          </div>
        </div>
        <div class="py-4 text-right text-gray-500">root用户【超级管理员】无需授权，本身拥有最高权限</div>
      </el-card>
      <el-card class="rounded-md" shadow="never" style="width: calc(70% - 20px)">
        <div>
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold">✨欢迎使用 YM-Admin</h1>
            <el-tag type="primary"> v0.9.1-Beta</el-tag>
          </div>
          <p class="text-gray-500">这是一个基于 Vue3 + Element Plus 的后台管理系统模板</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logoImgUrl from '@/assets/logo.png'
</script>

<style scoped lang="scss">
.home-container {
  width: 100%;
  height: calc(100vh - 140px);
  // background-image: url('@/assets/homeBg.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
