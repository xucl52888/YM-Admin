<template>
  <!-- <div class="flex">
    <div class="box-border h-screen" style="background-color: #282c34">
      <Sidebar></Sidebar>
    </div>

    <div class="flex-1">
      <Header></Header>
      <Content></Content>
    </div>
  </div> -->

  <el-container class="layout-container" style="height: 100vh">
    <el-aside style="width: auto">
      <Sidebar></Sidebar>
    </el-aside>

    <el-container>
      <el-header>
        <Header></Header>
      </el-header>

      <el-main>
        <Content></Content>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Sidebar from './sidebar/index.vue'
import Header from './header/index.vue'
import Content from './content/index.vue'
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
