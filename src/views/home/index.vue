<template>
  <div class="mb-6 rounded-xl bg-white p-8 sm:p-10">
    <!--  -->
    <input-one ref="oneInput" @returnRef="getOneInputRef" data="123" @input="getInput" @focus="getFocus" :size="size"></input-one>
    <!--  -->
    <el-button type="primary" @click="onFocus">获取焦点</el-button>
    <el-button type="primary" @click="onblur">失去焦点</el-button>
    <el-button type="primary" @click="onClear">清空inout值</el-button>
    <el-button type="primary" @click="size === 'large' ? (size = 'small') : (size = 'large')">改变size</el-button>
  </div>
  <div class="mb-6 rounded-xl bg-white p-8 sm:p-10">
    <ref-page></ref-page>
  </div>
  <div class="mb-6 rounded-xl bg-white p-8 sm:p-10">
    <reactive-page></reactive-page>
  </div>
  <div class="mb-6 rounded-xl bg-white p-8 sm:p-10">
    <to-ref-page></to-ref-page>
  </div>
  <div class="mb-6 rounded-xl bg-white p-8 sm:p-10">
    <computed-page></computed-page>
  </div>
  <div class="h-96 bg-sky-700 px-4 py-2 hover:bg-sky-800 sm:px-8 sm:py-3">首页</div>
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
