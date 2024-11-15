<template>
  <div class="flex items-center">
    <el-icon :size="20" @click="onIsCollapsed" class="mr-4">
      <Operation />
    </el-icon>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>主控台</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { Operation } from '@element-plus/icons-vue'
import emitter from '@/utils/mitt'

// 发布事件
const onIsCollapsed = () => emitter.emit('on-isCollapsed')
</script>
<style lang="scss" scoped></style>
