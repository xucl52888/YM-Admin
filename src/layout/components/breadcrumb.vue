<template>
  <div class="flex items-center">
    <!-- 左侧菜单折叠按钮 -->
    <el-icon :size="20" @click="onIsCollapsed" class="mr-4 cursor-pointer">
      <Operation />
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <template v-for="(item, index) in breadList" :key="item.path">
        <el-breadcrumb-item v-if="item.path != '/'" :key="item.path">
          <!-- 有二级菜单 -->
          <el-dropdown placement="bottom" size="large" v-if="item.children && item.children.length > 0" @command="handleCommand">
            <span class="text-black">
              <el-icon>
                <component :is="item.meta?.icon.replace('el-icon-', '')" />
              </el-icon>
              {{ item.meta?.title }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="i in item.children" :key="i.path" :command="i">{{ i.name }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- 无二级菜单 -->
          <template v-else>
            <el-icon>
              <component :is="item.meta?.icon.replace('el-icon-', '')" />
            </el-icon>
            {{ item.meta?.title }}
          </template>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue'
import { Operation } from '@element-plus/icons-vue'
import emitter from '@/utils/mitt'
import { Parent } from '@/interface/user'
import router from '@/router'
import { useRoute } from 'vue-router'
const route = useRoute()

// 左侧菜单折叠发布事件
const onIsCollapsed = () => emitter.emit('on-isCollapsed')

// 点击面包屑菜单
const handleCommand = (item: any) => {
  if (item.path) router.push(item.path)
}

const breadList = ref<Parent[]>([])
const getBreadcrumb = () => {
  let matched: Parent[] = route.meta.breadcrumb as Parent[]
  breadList.value = matched
}

// 初始化
onBeforeMount(() => {
  getBreadcrumb()
})

// 监听路由变化
watch(route, () => {
  getBreadcrumb()
})
</script>
<style lang="scss" scoped></style>
