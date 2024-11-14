<template>
  <!-- <div class="flex items-center justify-between"> -->
  <div class="grid grid-cols-4 gap-1">
    <div class="flex items-center">
      <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
        <el-icon :size="20">
          <Refresh />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="flex items-center">
      <el-tooltip class="box-item" effect="dark" content="菜单搜索" placement="bottom">
        <el-icon :size="20">
          <Search />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="flex items-center">
      <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
        <el-icon :size="20">
          <FullScreen />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="flex items-center">
      <el-dropdown placement="bottom-end" size="large">
        <el-avatar :size="40" :src="logoImgUrl" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Search, Refresh, FullScreen } from '@element-plus/icons-vue'
import logoImgUrl from '@/assets/logo.png'
</script>

<style scoped lang="scss">
.a {
  width: 100px;
}
</style>
