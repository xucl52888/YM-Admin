<template>
  <div>firstNama：{{ firstNama }}</div>
  <div>lastNama：{{ lastNama }}</div>
  <!-- computed -->
  <div>fullName1：{{ fullName1 }}</div>
  <div>fullName2：{{ fullName2 }}</div>
  <el-button type="primary" @click="onSetName">修改fullName2值</el-button>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
let firstNama = ref('张')
let lastNama = ref('三')
/**
 * 计算属性
 */
// 函数式写法，不能修改值
let fullName1 = computed(() => {
  return firstNama.value + lastNama.value
})
// 对象式写法，可以修改值
let fullName2 = computed({
  get() {
    return firstNama.value + lastNama.value
  },
  set(value) {
    firstNama.value = value.split(' ')[0]
    lastNama.value = value.split(' ')[1]
  },
})
// 修改值
const onSetName = () => {
  fullName2.value = '李 四'
}
</script>

<style scoped lang="scss"></style>
