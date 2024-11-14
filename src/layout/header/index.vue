<template>
  <div class="flex h-16 items-center justify-between px-4">
    <div>
      <breadcrumb></breadcrumb>
    </div>
    <navbars></navbars>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import breadcrumb from '../components/breadcrumb.vue'
import navbars from '../components/navbars.vue'
const formRef = ref()
const formReactive = reactive({
  name: 'vue3',
})
console.log(formRef.value, formReactive.name)
</script>

<style scoped lang="scss">
.a {
  width: 100px;
}
</style>
