<template>
  <div class="h-36"></div>
  <el-empty :image-size="200" description="抱歉，你无权访问该页面" :image="imageUrl">
    <el-button type="primary" @click="onGoHome">回到首页</el-button>
  </el-empty>
</template>

<script lang="ts" setup>
import router from '@/router'
import imageUrl from '@/assets/exception/403.svg'
const onGoHome = () => {
  router.push('/home')
}
</script>

<style scoped lang="scss"></style>
