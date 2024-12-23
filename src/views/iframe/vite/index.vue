<template>
  <el-card style="border: 0" shadow="never">
    <ym-iframe :iframeSrc="iframeSrc"></ym-iframe>
  </el-card>
</template>

<script lang="ts" setup>
import ymIframe from '@/components/iframe/index.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const iframeSrc = ref('')
const route = useRoute()
iframeSrc.value = route.meta.link as string
</script>

<style lang="scss" scoped></style>
