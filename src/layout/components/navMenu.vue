<template>
  <el-menu class="el-menu-vertical-demo" :default-active="route.path" :mode="props.mode" router :collapse="useProjectSettingStore().collapsed">
    <menu-tree :menu="menuList"></menu-tree>
  </el-menu>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import menuTree from './menuTree.vue'
import { useMenuStore } from '@/store/useMenuStore'
import { useProjectSettingStore } from '@/store/projectSetting'
import { useRoute } from 'vue-router'
const route = useRoute()

// 订阅事件:放弃此方法
// import emitter from '@/utils/mitt'
// const isCollapsed = ref(false)
// emitter.on('on-isCollapsed', () => {
//   isCollapsed.value = !isCollapsed.value
// })

const menuList = ref(useMenuStore().menu)
const props = defineProps({
  mode: {
    type: String,
    default: 'vertical', // horizontal
  },
  menuWidth: {
    type: String,
    default: 'auto',
  },
})
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  border-right: 0;
  border-bottom: 0;
  width: 100%;
  :hover {
    color: var(--el-color-primary);
  }
}
</style>
