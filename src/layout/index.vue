<template>
  <div class="flex">
    <!-- left -->
    <div class="box-border h-screen" style="background-color: #282c34">
      <Sidebar></Sidebar>
    </div>
    <!-- right -->
    <div class="flex-1">
      <Header></Header>
      <Content></Content>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from './sidebar/index.vue'
import Header from './header/index.vue'
import Content from './content/index.vue'
</script>

<style lang="scss" scoped></style>
