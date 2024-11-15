<template>
  <div class="mb-4 text-2xl font-bold">ref、shallowRef、customRef、dom</div>
  <!-- ref -->
  <div class="mb-3 text-black">ref：{{ text1 }}</div>
  <el-button type="primary" @click="onSetText1">ref点击</el-button>
  <!-- shallowRef -->
  <div class="mb-3 text-black">shallowRef：{{ text2 }}</div>
  <el-button type="primary" @click="onSetText2">shallowRef点击</el-button>
  <!-- customRef -->
  <div class="mb-3 text-black">customRef：{{ text3 }}</div>
  <el-button type="primary" @click="onSetText3">customRef点击</el-button>
  <!-- dom -->
  <div class="my-3">
    <el-input ref="domTag" v-model="input" style="width: 240px" placeholder="请输入内容" />
  </div>
  <el-button type="primary" @click="onGetDom">获取dom</el-button>
</template>

<script lang="ts" setup>
import { ref, isRef, shallowRef, triggerRef, customRef } from 'vue'

/**
 * ref：响应式，当修改对象的属性时，会触发视图更新
 * ref 取值 赋值 时需要加.value
 * isRef：判断一个值是否是ref
 */
const text1 = ref({ name: 'hello' })
const onSetText1 = () => {
  // text1.value = { name: 'world' } // 可以正常更新视图
  text1.value.name = 'world' // 可以正常更新视图
  console.log('isRef---text1', isRef(text1)) // true
  console.log('text1', text1)
}
/**
 * shallowRef：浅层响应式，只对对象的第一层属性进行响应式处理
 * 当修改对象的属性时，不会触发视图更新，需要手动调用triggerRef来触发更新
 * 如果和ref一起使用，ref会触发triggerRef，所以可以正常更新视图
 */
const text2 = shallowRef({ name: 'hello' })
const onSetText2 = () => {
  // text2.value = { name: 'world' } // 可以正常更新视图 浅层响应式，只对对象的第一层属性进行响应式处理
  text2.value.name = 'world' // 不会触发视图更新，当页面有ref时，会触发triggerRef，所以可以正常更新视图
  triggerRef(text2) // 使用triggerRef手动触发更新
  console.log('isRef---text2', isRef(text2)) // true
  console.log('text2', text2)
}

/**
 * track：收集依赖
 * trigger：触发更新
 * @param value 需要响应式的值
 */
function myRef<T>(value: T) {
  return customRef((track, trigger) => {
    return {
      get() {
        track() // 收集依赖
        return value
      },
      set(newValue: T) {
        value = newValue
        trigger() // 触发更新
      },
    }
  })
}
const text3 = myRef({ name: 'hello' })
const onSetText3 = () => {
  // text3.value = { name: 'world' } // 可以正常更新视图
  text3.value.name = 'world' // 不会触发视图更新，当页面有ref时，会触发triggerRef，所以可以正常更新视图
  triggerRef(text2) // 使用triggerRef手动触发更新
  console.log('isRef---text3', isRef(text3)) // true
  console.log('text3', text3)
}

/**
 * 使用ref获取dom
 */
const input = ref('我是dom，点击获取')
const domTag = ref<HTMLDivElement>(null)
const onGetDom = () => {
  console.log('domTag', domTag.value)
  domTag.value.focus() // 获取焦点
}

/**
 * ref源码逻辑
 * 如果传入的是字符串或者数字会直接把值赋给 value 然后返回
 * 如果传入的是对象，会调用 toReactive 把对象变成响应式对象，然后走 reactive 的逻辑
 */
// function ref(value) {
//   return createRef(value, false)
// }
// function createRef(rawValue, shallow) {
//   if (isRef(rawValue)) {
//     return rawValue
//   }
//   return new RefImpl(rawValue, shallow)
// }
// class RefImpl {
//   constructor(value, _shallow) {
//     this._value = _shallow ? value : toReactive(value)
//     this._rawValue = value
//     this._shallow = _shallow
//     this.dep = undefined
//   }
//   get value() {
//     trackRefValue(this)
//     return this._value
//   }
//   set value(newVal) {
//     const useDirectValue = this._shallow || isShallow(newVal) || isReadonly(newVal)
//     if (useDirectValue) {
//       newVal = this._rawValue = toRaw(newVal)
//     } else {
//       newVal = this._rawValue = toReactive(newVal)
//     }
//   }
// }
</script>
<style scoped></style>
