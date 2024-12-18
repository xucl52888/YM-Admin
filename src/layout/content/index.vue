<template>
  <el-scrollbar>
    <div class="p-6">
      <!--  -->
      <RouterView v-if="isRouterAlive" v-slot="{ Component, route }">
        <!-- <transition :name="useProjectSetting.isPageAnimate ? '' : useProjectSetting.pageAnimateType"> -->
        <!-- <keep-alive :include="tagStore.keepAlive"> -->
        <keep-alive>
          <component :is="Component" :key="route.fullPath"></component>
        </keep-alive>
        <!-- </transition> -->
      </RouterView>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { defineProps, watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import { useTagStore } from '@/store/useTagStore'
import { useProjectSettingStore } from '@/store/projectSetting'
const useProjectSetting = useProjectSettingStore()
defineProps({
  isRouterAlive: {
    type: Boolean,
    default: true,
  },
})
watchEffect(() => {})

const tagStore = useTagStore()
</script>

<style scoped lang="scss"></style>
