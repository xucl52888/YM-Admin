<template>
  <div style="height: calc(100vh - 140px)" class="relative">
    <el-card class="mb-4">
      <template #header> 复制指令 </template>
      <el-space wrap size="large">
        <el-input v-model="data" style="width: 240px" placeholder="输入内容试试" />
        <el-button v-copy="data" type="primary" @click="a">复制</el-button>
      </el-space>
    </el-card>
    <el-card class="mb-4">
      <template #header> 防抖指令 </template>
      <el-button type="primary" v-debounce="b">防抖指令</el-button>
    </el-card>
    <el-card class="mb-4">
      <template #header> 节流指令 </template>
      <el-button type="primary" v-throttle="c">节流指令</el-button>
    </el-card>
    <el-card class="mb-4">
      <template #header> 拖拽指令 </template>
      鼠标放到矩形上面拖拽试试
    </el-card>
    <div class="h-24 w-24 rounded-lg" style="background-color: var(--el-color-primary)" v-draggable></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const data = ref<string>()
const a = () => {
  ElMessage({
    message: '复制成功:' + data.value,
    type: 'success',
  })
}
const b = () => {
  ElMessage({
    message: '防抖',
    type: 'success',
  })
  console.log(data.value)
}
const c = () => {
  ElMessage({
    message: '节流',
    type: 'success',
  })
  console.log(data.value)
}
</script>

<style scoped lang="scss"></style>
