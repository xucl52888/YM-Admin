<template>
  <el-container class="layout-container h-screen">
    <!--  -->
    <el-aside style="width: auto" v-if="useProjectSettingStore()?.navigationBarMode === 'leftMenu'">
      <Sidebar class="layout-content-sidebar"></Sidebar>
    </el-aside>

    <el-container class="layout-content">
      <!--  -->
      <el-header class="layout-content-header">
        <Header></Header>
      </el-header>

      <!--  -->
      <el-main>
        <div
          class="layout-content-tagbar fixed z-50 transition-all"
          :style="{ width: `calc(100vw - ${menuWidth} - 10px)`, left: `calc(1px + ${menuWidth})`, 'transition-duration': '450ms' }"
        >
          <tag-bar></tag-bar>
        </div>
        <Content></Content>
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
  if (useProjectSettingStore().navigationBarMode === 'leftMenu') {
    if (useProjectSettingStore().collapsed) {
      return '64px'
    } else {
      return '200px'
    }
  } else return '0px'
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
.layout-content,
.layout-content-tagbar {
  background-color: #f5f7f9;
}
.layout-content-header {
  background-color: #fff;
}
.layout-content-sidebar {
  border-right: 1px solid #e0e0e0;
  box-sizing: border-box;
}
</style>
