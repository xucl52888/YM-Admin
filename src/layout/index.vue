<template>
  <el-container class="layout-container" style="height: 100vh">
    <el-aside style="width: auto">
      <Sidebar></Sidebar>
    </el-aside>

    <el-container class="bg-[#eee]">
      <el-header class="bg-white">
        <Header></Header>
      </el-header>

      <el-main>
        <div class="fixed z-50 px-6 transition-all duration-500" :style="{ width: `calc(100vw - ${menuWidth})` }">
          <tag-bar></tag-bar>
        </div>
        <Content class="pt-12"></Content>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Sidebar from './sidebar/index.vue'
import Header from './header/index.vue'
import Content from './content/index.vue'
import TagBar from './components/tagBar.vue'
import { useProjectSettingStore } from '@/store/projectSetting'
const menuWidth = computed(() => {
  if (useProjectSettingStore().collapsed) {
    return '64px'
  } else {
    return '200px'
  }
})
</script>

<style lang="scss" scoped>
.layout-container .el-main {
  padding: 0;
}
.layout-container .el-header {
  height: auto;
  padding: 0;
}
</style>
