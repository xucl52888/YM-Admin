<template>
  <div class="h-screen">
    <!-- logo -->
    <logo-avatar class="layout-content-sidebar-logo"></logo-avatar>
    <!-- 菜单 -->
    <el-scrollbar :height="height + 'px'">
      <nav-menu menuWidth=""></nav-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import navMenu from '../components/navMenu.vue'
import logoAvatar from '../components/logoAvatar.vue'

const height = ref(window.innerHeight - 64)
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
