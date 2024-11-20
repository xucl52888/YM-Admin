<template>
  <div class="flex">
    <!--  -->
    <div class="flex-shrink flex-grow overflow-hidden">
      <el-scrollbar ref="scrollbar" @scroll="handleScroll" :min-size="50" always>
        <div class="flex h-12 items-center">
          <el-button
            @click="onTagBar(item)"
            v-for="item in viewTags"
            :key="item.path"
            text
            bg
            :type="isActive(item) ? 'primary' : ''"
            @contextmenu="handleContextMenu($event)"
          >
            {{ item.name }}
            <el-icon class="el-icon--right" v-if="!item.affix" @click.prevent.stop="closeTag(item)"><Close /></el-icon>
          </el-button>
        </div>
      </el-scrollbar>
    </div>
    <!--  -->
    <div class="flex items-center">
      <el-dropdown placement="bottom-end" size="large" @visible-change="handleVisibleChange">
        <el-icon size="18px" class="ml-2"><ArrowDown /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="closeHandleSelect('1')">
              <el-icon><Refresh /></el-icon>刷新当前
            </el-dropdown-item>
            <el-dropdown-item @click="closeHandleSelect('2')" :disabled="state.isCloseCurrent">
              <el-icon><CloseBold /></el-icon>关闭当前
            </el-dropdown-item>
            <el-dropdown-item @click="closeHandleSelect('3')">
              <el-icon><ScaleToOriginal /></el-icon>关闭其他
            </el-dropdown-item>
            <el-dropdown-item @click="closeHandleSelect('4')">
              <el-icon><SemiSelect /></el-icon>关闭全部
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <!-- 鼠标右击 -->
  <div
    v-show="state.showDropdown"
    class="fixed flex flex-col rounded-md bg-white p-1 shadow-md"
    :style="{ top: state.dropdownY + 'px', left: state.dropdownX + 'px', 'z-index': 999 }"
  >
    <el-button text size="large" @click="closeHandleSelect('1')">
      <el-icon class="el-icon--left"><Refresh /></el-icon>刷新当前
    </el-button>
    <el-button text size="large" @click="closeHandleSelect('2')" style="margin-left: 0" :disabled="state.isCloseCurrent">
      <el-icon class="el-icon--left"><CloseBold /></el-icon>关闭当前
    </el-button>
    <el-button text size="large" @click="closeHandleSelect('3')" style="margin-left: 0">
      <el-icon class="el-icon--left"><ScaleToOriginal /></el-icon>关闭其他
    </el-button>
    <el-button text size="large" @click="closeHandleSelect('4')" style="margin-left: 0">
      <el-icon class="el-icon--left"><SemiSelect /></el-icon>关闭全部
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, reactive, watch, nextTick } from 'vue'
// 滚动条ref
const scrollbar = ref(null)
// 需要滚动的距离
const rollDistance = ref(0)
// 记录滚动条位置
const scrollLeftNum = ref(0)
// 滚动条回调
const handleScroll = ({ scrollLeft }) => {
  // 记录每次滚动的距离
  scrollLeftNum.value = scrollLeft
  // 当用鼠标拖动时要记录滚动的位置
  if (rollDistance.value < scrollLeft) rollDistance.value = scrollLeft
}
onMounted(() => {
  const container = scrollbar.value.$el
  // 监听鼠标滚轮事件
  container.addEventListener('wheel', (event) => {
    // 阻止默认竖向滚动
    event.preventDefault()
    // 滚动距离控制
    if (rollDistance.value < 0) rollDistance.value = 0 // 滚动到最左边时
    if (rollDistance.value > scrollLeftNum.value) rollDistance.value = scrollLeftNum.value // 滚动到最右边时

    rollDistance.value += event.deltaY
    scrollbar.value!.setScrollLeft(rollDistance.value)
  })
  // 监听点击事件
  document.addEventListener('click', closeMenu)
})
onBeforeUnmount(() => {
  // 移除全局点击事件
  document.removeEventListener('click', closeMenu)
})
// 关闭右击菜单
const closeMenu = () => {
  state.showDropdown = false
}

import { useRoute } from 'vue-router'
const route = useRoute()
import router from '@/router'
import { ITagRoute } from '@/interface/tag'
import { useTagStore } from '@/store/useTagStore'
let tagStore = useTagStore()

import { storeToRefs } from 'pinia'
let { viewTags } = storeToRefs(tagStore)
// 点击tabBar
const onTagBar = (item: ITagRoute) => {
  router.push(item.path)
}
// 监听右边tabBar菜单显示关闭
const handleVisibleChange = (val) => {
  if (val) {
    const currentRoute = viewTags.value.find((item) => item.path === route.path)
    if (currentRoute) state.isCloseCurrent = currentRoute?.affix
  }
}
// 初始数据
const state = reactive({
  dropdownX: 0,
  dropdownY: 0,
  showDropdown: false,
  isCloseCurrent: false,
})
// 右击显示菜单
const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault()
  state.showDropdown = false
  nextTick().then(() => {
    // 判断是否为固定标签
    const currentRoute = viewTags.value.find((item) => item.path === route.path)
    if (currentRoute) state.isCloseCurrent = currentRoute?.affix
    state.showDropdown = true
    state.dropdownX = e.clientX + 10
    state.dropdownY = e.clientY + 15
  })
}
//tab 操作
const closeHandleSelect = (key) => {
  switch (key) {
    //刷新
    case '1':
      reloadPage()
      break
    //关闭当前
    case '2':
      removeTab(route)
      break
    //关闭其他
    case '3':
      closeOther(route)
      break
    //关闭所有
    case '4':
      closeAllTabs()
      break
  }
  state.showDropdown = false
}

//高亮tag
const isActive = (routes: ITagRoute) => routes.path == route.path

//删除tag
const closeTag = (tag: ITagRoute) => {
  const nowTagIndex: number = viewTags.value.findIndex((item) => item.path == tag.path)
  tagStore.removeViewTags(tag)
  if (isActive(tag)) {
    const leftView: ITagRoute = viewTags.value[nowTagIndex - 1]
    if (leftView) {
      router.push(leftView.path)
    } else {
      router.push('/')
    }
  }
}
// 刷新页面
const reloadPage = () => {}
// 关闭当前
const removeTab = (val) => {
  closeTag(val)
}
// 关闭其他
const closeOther = (val) => {
  tagStore.closeOtherTabs(val)
}
//关闭全部
const closeAllTabs = () => {
  tagStore.closeAllTabs()
  router.push('/')
}

watch(
  route,
  () => {
    if (route.name) {
      let currentTag = {
        name: route.name,
        path: route.path,
        affix: route.meta.affix,
      } as ITagRoute
      tagStore.pushViewTags(currentTag)
    }
  },
  { immediate: true },
)
</script>

<style scoped lang="scss"></style>
