<template>
  <el-scrollbar>
    <div class="px-6 pb-6">
      <!--  -->
      <router-view v-if="isRouterAlive" v-slot="{ Component, route }">
        <!-- <transition name="zoom-fade" mode="out-in" appear> -->
        <keep-alive :include="tagStore.keepAlive">
          <component :is="Component" :key="route.fullPath"></component>
        </keep-alive>
        <!-- </transition> -->
      </router-view>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useTagStore } from '@/store/useTagStore'
const props = defineProps({
  isRouterAlive: {
    type: Boolean,
    default: true,
  },
})

const tagStore = useTagStore()
</script>

<style scoped lang="scss"></style>
