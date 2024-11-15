<template>
  <div class="mb-4 text-2xl font-bold">toRef、toRefs</div>
  <!-- reactive -->
  <div class="mb-3 text-black">reactive：{{ text1 }}</div>
  <div class="mb-3 text-black">toRef：{{ text2 }}</div>
  <div class="mb-3 text-black">toRefs：{{ name }}---{{ age }}</div>
  <el-button type="primary" @click="onSetText1">reactive点击</el-button>
</template>

<script lang="ts" setup>
import { reactive, toRef, toRefs, toRaw } from 'vue'
/**
 * toRef 只能修改响应式数据中的某个属性
 * toRef 可以将 reactive 对象中的某个属性转换为 ref 对象
 */
let text1 = reactive({ name: 'hello', age: 18 })

const text2 = toRef(text1, 'name') // 将 reactive 对象中的 name 属性转换为 ref 对象

const { name, age } = toRefs(text1) // 将 reactive 对象中的所有属性转换为 ref 对象
const onSetText1 = () => {
  text2.value = 'world' // 这里会影响text1中的name属性
}

const text3 = reactive({ name: 'hello', age: 18 })
console.log('toRaw', text3)
console.log('toRaw', toRaw(text3)) // toRaw 可以将响应式对象转换为普通对象
</script>

<style scoped lang="scss"></style>
