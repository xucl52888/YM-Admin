<template>
  <div class="flex h-16 items-center justify-between px-6">
    <div v-if="useProjectSettingStore()?.navigationBarMode === 'topMenu'" class="flex flex-1 items-center">
      <logo-avatar class="mr-6"></logo-avatar>
      <nav-menu mode="horizontal"></nav-menu>
    </div>
    <!-- 面包屑 -->
    <breadcrumb v-else></breadcrumb>
    <!-- 按钮 -->
    <navbars></navbars>
  </div>
</template>

<script lang="ts" setup>
import breadcrumb from '../components/breadcrumb.vue'
import navbars from '../components/navbars.vue'
import navMenu from '../components/navMenu.vue'
import logoAvatar from '../components/logoAvatar.vue'
import { useProjectSettingStore } from '@/store/projectSetting'
</script>

<style scoped lang="scss"></style>
