<template>
  <template v-for="item in props.menu" :key="item.id">
    <!--  -->
    <template v-if="item.children && item.children.length">
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta?.icon.replace('el-icon-', '')" />
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <menu-tree :menu="item.children"></menu-tree>
      </el-sub-menu>
    </template>
    <!--  -->
    <template v-else>
      <el-menu-item v-if="item.path !== '/external'" :index="item.path">
        <el-icon>
          <component :is="item.meta?.icon ? item.meta?.icon.replace('el-icon-', '') : 'Loading'" />
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
      <el-menu-item v-else :index="item.path" @click="onChant(item)">
        <el-icon>
          <component :is="item.meta?.icon ? item.meta?.icon.replace('el-icon-', '') : 'Loading'" />
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </template>
  </template>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import { Parent } from '@/interface/user'

// 菜单数据
const props = defineProps({
  menu: {
    type: Array<Parent>,
    default: () => [],
  },
})
const onChant = (item: Parent) => {
  window.open(item.meta.link)
}
</script>
<style lang="scss" scoped></style>
