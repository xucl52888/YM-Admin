<template>
  <el-scrollbar>
    <div class="bg-[#007fff] px-6 pb-6">
      <tag-bar></tag-bar>
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
import TagBar from '../components/tagBar.vue'
import { useTagStore } from '@/store/useTagStore'
const tagStore = useTagStore()
</script>

<style scoped lang="scss"></style>
