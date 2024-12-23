<template>
  <iframe :src="iframeSrc" frameborder="0" width="100%" height="100%" :style="{ height: height }"></iframe>
</template>

<script lang="ts" setup>
defineProps({
  iframeSrc: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: 'calc(100vh - 210px)',
  },
})
</script>

<style lang="scss" scoped></style>
