<template>
  <el-input ref="inputOne" v-model="input" placeholder="请输入内容" />
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
</script>
<style lang="scss" scoped></style>
