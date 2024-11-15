<template>
  <el-empty :image-size="200" description="抱歉，你访问的页面不存在">
    <el-button type="primary" @click="onGoHome">回到首页</el-button>
  </el-empty>
</template>

<script lang="ts" setup>
import router from '@/router'
const onGoHome = () => {
  router.push('/home')
}
</script>

<style scoped lang="scss"></style>
