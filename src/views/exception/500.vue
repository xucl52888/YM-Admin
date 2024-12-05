<template>
  <div class="h-36"></div>
  <el-empty :image-size="200" description="抱歉，服务器出错了" :image="imageUrl">
    <el-button type="primary" @click="onGoHome">回到工作台</el-button>
  </el-empty>
</template>

<script lang="ts" setup>
import router from '@/router'
import imageUrl from '@/assets/exception/500.svg'
const onGoHome = () => {
  router.push('/dashboard/workplace')
}
</script>

<style scoped lang="scss"></style>
