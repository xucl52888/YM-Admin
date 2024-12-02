<template>
  <!-- logo -->
  <div class="layout-content-sidebar-logo flex h-16 items-center justify-center" v-if="useProjectSetting.showLogo">
    <logo-avatar></logo-avatar>
  </div>
  <!-- 菜单 -->
  <el-scrollbar height="calc(100vh - 64px)">
    <nav-menu menuWidth=""></nav-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import navMenu from '../components/navMenu.vue'
import logoAvatar from '../components/logoAvatar.vue'
import { useProjectSettingStore } from '@/store/projectSetting'
const useProjectSetting = useProjectSettingStore()
</script>

<style scoped lang="scss">
.el-scrollbar {
  height: auto;
}
.layout-content-sidebar-logo {
  border-bottom: 1px solid #e0e0e0;
  box-sizing: border-box;
}
</style>
