<template>
  <MdEditor v-model="props.modelValue" />
</template>

<script setup>
import { ref } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  config: {
    type: Object,
    default: () => ({}),
  },
})
const text = ref('')
</script>
