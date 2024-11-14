<template>
  <el-scrollbar :height="height + 'px'">
    <div class="p-6" style="background-color: #ccc">
      <router-view></router-view>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
const height = ref(window.innerHeight - 64)
// 定义一个方法更新宽高
const updateDimensions = () => {
  height.value = window.innerHeight - 64
}
// 组件挂载时添加监听器
onMounted(() => {
  window.addEventListener('resize', updateDimensions)
})

// 组件卸载时移除监听器
onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions)
})
</script>

<style scoped lang="scss">
.el-scrollbar {
  height: auto;
}
</style>
