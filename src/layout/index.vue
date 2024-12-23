<template>
  <el-container class="layout-container" style="height: 100vh">
    <!-- 菜单侧边栏 -->
    <el-aside class="layout-content-sidebar" style="width: auto" v-if="useProjectSetting?.navigationBarMode === 'leftMenu'">
      <Sidebar></Sidebar>
    </el-aside>

    <el-container class="layout-content">
      <!-- 头部 -->
      <el-header class="layout-content-header">
        <Header></Header>
      </el-header>

      <!-- 标签页 -->
      <div class="layout-content-tagbar" v-show="useProjectSetting?.showTags">
        <tag-bar></tag-bar>
      </div>

      <!-- 主体区域 -->
      <el-main>
        <Content :isRouterAlive="isRouterAlive"></Content>
      </el-main>
    </el-container>
  </el-container>
  <!-- 设置抽屉 -->
  <el-drawer v-model="drawer" :with-header="false" direction="rtl" :show-close="false" size="300px" custom-class="drawer-box">
    <div class="text-16px pb-2 text-center font-bold">主题设置</div>
    <Drawer></Drawer>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, nextTick, provide } from 'vue'
import Sidebar from './sidebar/index.vue'
import Header from './header/index.vue'
import Content from './content/index.vue'
import TagBar from './components/tagBar.vue'
import Drawer from './components/Drawer.vue'
import { useProjectSettingStore } from '@/store/projectSetting'
const useProjectSetting = useProjectSettingStore()

const isRouterAlive = ref(true)
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)

const drawer = ref(false)
const openDrawer = () => {
  drawer.value = true
}
provide('openDrawer', openDrawer)
</script>

<style lang="scss" scoped>
.layout-container .el-main {
  padding: 0;
}
.layout-container .el-header {
  height: auto;
  padding: 0;
}
.layout-content {
  background-color: #f1f3f6;
}
.layout-content-header,
.layout-content-tagbar {
  background-color: #fff;
}
.layout-content-sidebar {
  border-right: 1px solid #e4e4e7;
  box-sizing: border-box;
}
.layout-content-header {
  border-bottom: 1px solid #e4e4e7;
  box-sizing: border-box;
}
</style>
