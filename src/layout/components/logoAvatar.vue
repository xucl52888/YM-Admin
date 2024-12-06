<template>
  <div class="flex items-center justify-center gap-2">
    <!-- <el-avatar :src="logoImgUrl"/> -->
    <img :src="logoImgUrl" alt="" width="30" height="30" class="logoImg" />
    <div class="text-lg font-bold" v-show="!useProjectSettingStore()?.collapsed && useProjectSettingStore()?.navigationBarMode === 'leftMenu'">
      YM-Admin
    </div>
  </div>
</template>

<script lang="ts" setup>
import logoImgUrl from '@/assets/logo.svg'
import { useProjectSettingStore } from '@/store/projectSetting'
</script>

<style scoped lang="scss">
.logoImg {
  position: relative;
  left: -20000px;
  filter: drop-shadow(var(--el-color-primary) 20000px 0);
}
</style>
