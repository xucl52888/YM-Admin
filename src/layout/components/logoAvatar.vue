<template>
  <div class="flex h-16 items-center justify-center" @click="onIsCollapsed">
    <el-avatar :src="logoImgUrl" />
  </div>
</template>

<script lang="ts" setup>
import logoImgUrl from '@/assets/logo.png'
import { useProjectSettingStore } from '@/store/projectSetting'

const onIsCollapsed = () => useProjectSettingStore().setCollapsed()
</script>

<style scoped lang="scss"></style>
