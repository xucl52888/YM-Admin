<template>
  <div class="mb-4 text-2xl font-bold">reactive、shallowReactive</div>
  <!-- reactive -->
  <div class="mb-3 text-black">reactive：{{ text1 }}</div>
  <el-button type="primary" @click="onSetText1">reactive点击</el-button>
  <!-- shallowReactive -->
  <div class="mb-3 text-black">shallowReactive：{{ text2 }}</div>
  <el-button type="primary" @click="onSetText2">shallowReactive点击</el-button>
</template>

<script lang="ts" setup>
import { reactive, shallowReactive, isReactive, readonly } from 'vue'

/**
 * reactive：将一个对象转换为响应式对象，只能是引用类型比如 object对象、array数组、Map对象、Set对象
 * isReactive：判断一个值是否是 reactive 创建的响应式对象
 */
let text1 = reactive({ name: 'hello', age: 18 })
const onSetText1 = () => {
  text1.name = 'world' // 可以正常更新视图
  text1.age = 22 // 可以正常更新视图

  // text1 = { name: 'world', age: 22 } // 不能直接赋值，否则会破坏响应式对象，失去响应式
  console.log('isReactive---text1', isReactive(text1)) // true
  console.log('text1', text1)
}

/**
 * readonly：将一个对象转换为只读对象，只能读取，不能修改
 * 会被响应式代理，但是不能修改
 */
const readonlyText1 = readonly(text1) // 将响应式对象转换为只读对象
console.log(readonlyText1) // readonly({ name: 'hello', age: 18 })

/**
 * shallowReactive：浅层响应式，只对对象的第一层属性进行响应式处理，如果对象的属性是对象，那么这个属性不会变成响应式对象
 */
let text2 = shallowReactive({ name: 'hello', age: 18, obj: { name: 'hello' } })
const onSetText2 = () => {
  // text2.name = 'world' // 可以正常更新视图
  // text2.age = 22 // 可以正常更新视图
  text2.obj.name = 'world' // 不会更新视图，因为 obj 不是一个响应式对象,但会被其他响应式影响
  // text2 = { name: 'world', age: 22 } // 不能直接赋值，否则会破坏响应式对象，失去响应式
  console.log('isReactive---text2', isReactive(text2)) // true
  console.log('text2', text2)
}

/**
 * reactive源码：
 * 1. 创建一个响应式对象，使用 Proxy 进行代理
 * 2. 使用 Reflect 进行操作，保证操作的一致性
 * 3. 使用 get 和 set 进行拦截，当访问属性时，会触发 get，当修改属性时，会触发 set
 * 4. 使用 reactive 函数时，会判断传入的值是否是对象，如果不是对象，会直接返回
 * 5. 使用 reactive 函数时，会判断传入的值是否是响应式对象，如果是响应式对象，会直接返回
 * 6. 使用 reactive 函数时，会判断传入的值是否是只读对象，如果是只读对象，会直接返回
 * 7. 使用 reactive 函数时，会判断传入的值是否是浅层响应式对象，如果是浅层响应式对象，会直接返回
 * 8. 使用 reactive 函数时，会判断传入的值是否是深层次响应式对象，如果是深层次响应式对象，会递归调用 reactive 函数，将所有的属性都变成响应式对象
 * 9. 使用 reactive 函数时，会判断传入的值是否是数组，如果是数组，会使用 reactiveArray 函数进行代理
 * 10. 使用 reactive 函数时，会判断传入的值是否是 Map 或 Set，如果是 Map 或 Set，会使用 reactiveMap 或 reactiveSet 函数进行代理
 * 11. 使用 reactive 函数时，会判断传入的值是否是函数，如果是函数，会使用 reactiveFunction 函数进行代理
 * 12. 使用 reactive 函数时，会判断传入的值是否是 Symbol，如果是 Symbol，会使用 reactiveSymbol 函数进行代理
 * 13. 使用 reactive 函数时，会判断传入的值是否是 Date，如果是 Date，会使用 reactiveDate 函数进行代理
 * 14. 使用 reactive 函数时，会判断传入的值是否是 RegExp，如果是 RegExp，会使用 reactiveRegExp 函数进行代理
 * 15. 使用 reactive 函数时，会判断传入的值是否是 Error，如果是 Error，会使用 reactiveError 函数进行代理
 * 16. 使用 reactive 函数时，会判断传入的值是否是 Promise，如果是 Promise，会使用 reactivePromise 函数进行代理
 * 17. 使用 reactive 函数时，会判断传入的值是否是 ArrayBuffer，如果是 ArrayBuffer，会使用 reactiveArrayBuffer 函数进行代理
 * 18. 使用 reactive 函数时，会判断传入的值是否是 DataView，如果是 DataView，会使用 reactiveDataView 函数进行代理
 * 19. 使用 reactive 函数时，会判断传入的值是否是 TypedArray，如果是 TypedArray，会使用 reactiveTypedArray 函数进行代理
 * 20. 使用 reactive 函数时，会判断传入的值是否是 WeakMap，如果是 WeakMap，会使用 reactiveWeakMap 函数进行代理
 * 21. 使用 reactive 函数时，会判断传入的值是否是 WeakSet，如果是 WeakSet，会使用 reactiveWeakSet 函数进行代理
 * 22. 使用 reactive 函数时，会判断传入的值是否是 Proxy，如果是 Proxy，会使用 reactiveProxy 函数进行代理
 * 23. 使用 reactive 函数时，会判断传入的值是否是 Reflect，如果是 Reflect，会使用 reactiveReflect 函数进行代理
 * 24. 使用 reactive 函数时，会判断传入的值是否是 Function，如果是 Function，会使用 reactiveFunction 函数进行代理
 * 25. 使用 reactive 函数时，会判断传入的值是否是 Object，如果是 Object，会使用 reactiveObject 函数进行代理
 * 26. 使用 reactive 函数时，会判断传入的值是否是 Array，如果是 Array，会使用 reactiveArray 函数进行代理
 * 27. 使用 reactive 函数时，会判断传入的值是否是 Map，如果是 Map，会使用 reactiveMap 函数进行代理
 * 28. 使用 reactive 函数时，会判断传入的值是否是 Set，如果是 Set，会使用 reactiveSet 函数进行代理
 */
</script>

<style scoped lang="scss"></style>
