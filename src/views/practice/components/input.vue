<template>
  <div class="mb-4 text-2xl font-bold">组件封装暴露所有方法</div>
  <el-input ref="inputOne" v-model="input" placeholder="请输入内容" class="mb-6" />
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  data: {
    type: String,
    default: '',
  },
})
const input = ref(props.data)
const inputOne = ref(null)
const emit = defineEmits(['returnRef'])
onMounted(() => {
  emit('returnRef', inputOne)
})
const appendCenter = (val: string) => {
  input.value += val
}
// 需要通过defineExpose暴露出去才能被父组件调用
defineExpose({
  appendCenter,
})
</script>
<style lang="scss" scoped></style>
