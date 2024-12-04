<template>
  <el-card class="mb-6 rounded-xl">
    <!--  -->
    <input-one ref="oneInput" @returnRef="getOneInputRef" data="123" @input="getInput" @focus="getFocus" :size="size"></input-one>
    <!--  -->
    <el-button type="primary" @click="onFocus">获取焦点</el-button>
    <el-button type="primary" @click="onblur">失去焦点</el-button>
    <el-button type="primary" @click="onClear">清空inout值</el-button>
    <el-button type="primary" @click="size === 'large' ? (size = 'small') : (size = 'large')">改变size</el-button>
    <el-button type="primary" @click="oneInput.appendCenter('触发了子组件自己声明的方法')">触发子组件声明的方法</el-button>
  </el-card>
  <el-card class="rounded-xl0 mb-6">
    <ref-page></ref-page>
  </el-card>
  <el-card class="mb-6 rounded-xl">
    <reactive-page></reactive-page>
  </el-card>
  <el-card class="mb-6 rounded-xl">
    <to-ref-page></to-ref-page>
  </el-card>
  <el-card class="mb-6 rounded-xl">
    <computed-page></computed-page>
  </el-card>
  <el-card class="h-96">首页</el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import inputOne from './components/input.vue'
import refPage from './components/refPage.vue'
import reactivePage from './components/reactivePage.vue'
import toRefPage from './components/toRefPage.vue'
import computedPage from './components/computedPage.vue'

let size = ref('large')
const oneInput = ref(null)
let twoInput = ref(null)

const getOneInputRef = (ref: any) => (twoInput = ref)
// 获取焦点方法
const onFocus = () => twoInput.value?.focus()
// 失去焦点方法
const onblur = () => twoInput.value?.blur()
// 清空input值方法
const onClear = () => twoInput.value?.clear()

// input 事件
const getInput = (val: any) => console.log('input事件', val)
// 获取焦点事件
const getFocus = (val: any) => console.log('获取焦点事件')
</script>

<style lang="scss" scoped></style>
