<template>
  <div class="flex items-center">
    <!-- 左侧菜单折叠按钮 -->
    <el-icon :size="20" @click="onIsCollapsed" class="mr-4 cursor-pointer">
      <Expand v-if="useProjectSettingStore()?.collapsed" />
      <Fold v-else />
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <template v-for="(item, index) in breadList" :key="item.path">
        <el-breadcrumb-item v-if="item.path != '/'" :key="item.path">
          <!-- 有二级菜单 -->
          <el-dropdown placement="bottom" size="large" v-if="item.children && item.children.length > 0" @command="handleCommand">
            <span>
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
import { Parent } from '@/interface/user'
import router from '@/router'
import { useRoute } from 'vue-router'
const route = useRoute()

// 左侧菜单折叠发布事件
import { useProjectSettingStore } from '@/store/projectSetting'
const onIsCollapsed = () => useProjectSettingStore().setCollapsed()

// 点击面包屑菜单
const handleCommand = (item: any) => {
  if (item.path) router.push(item.path)
}

// 面包屑数据
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

// 放弃了使用发布订阅方法
// import emitter from '@/utils/mitt'
// const onIsCollapsed = () => emitter.emit('on-isCollapsed')
</script>
<style lang="scss" scoped></style>
