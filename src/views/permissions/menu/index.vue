<template>
  <el-card class="mb-4 rounded-md" style="border: 0" shadow="never">
    <template #header> 菜单权限管理 </template>
    页面数据为 Mock 示例数据，非真实数据。
  </el-card>

  <div class="flex justify-between">
    <el-card class="rounded-md" style="border: 0; width: 30%" shadow="never">
      <template #header>
        <div class="h-8">
          <el-button type="primary" @click="menuTreeRef.appendChildren('-1')">添加父级菜单</el-button>
        </div>
      </template>
      <menu-tree ref="menuTreeRef"></menu-tree>
    </el-card>
    <el-card class="rounded-md" style="border: 0; width: calc(70% - 16px)" shadow="never">
      <template #header>
        <div class="h-8">编辑菜单</div>
      </template>
      <el-alert title="从菜单列表选择一项后，进行编辑" type="warning" show-icon />
      <menu-form></menu-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import menuForm from './components/menuForm.vue'
import menuTree from './components/menuTree.vue'
const menuTreeRef = ref(null)
</script>

<style scoped lang="scss">
.el-alert {
  margin-bottom: 20px;
}
</style>
