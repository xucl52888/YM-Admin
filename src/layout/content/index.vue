<template>
  <el-scrollbar>
    <div class="px-6 pb-6 pt-12">
      <!--  -->
      <router-view>
        <template #default="{ Component, route }">
          <!-- <transition name="zoom-fade" mode="out-in" appear> -->
          <keep-alive :include="tagStore.keepAlive">
            <component :is="Component" :key="route.fullPath"></component>
          </keep-alive>
          <!-- </transition> -->
        </template>
      </router-view>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useTagStore } from '@/store/useTagStore'

const tagStore = useTagStore()
</script>

<style scoped lang="scss"></style>
