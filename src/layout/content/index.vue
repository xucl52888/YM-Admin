<template>
  <el-scrollbar>
    <div class="px-6 pb-6">
      <!--  -->
      <router-view v-slot="{ Component }">
        <!-- <Transition name="fade" mode="out-in" appear> -->
        <keep-alive :include="tagStore.keepAlive">
          <component :is="Component"></component>
        </keep-alive>
        <!-- </Transition> -->
      </router-view>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useTagStore } from '@/store/useTagStore'
const tagStore = useTagStore()
</script>

<style scoped lang="scss"></style>
