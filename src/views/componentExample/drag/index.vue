<template>
  <el-card class="mb-4 rounded-md" style="border: 0" shadow="never">
    <template #header> 拖拽 </template>
    常用于卡片，事项，预约，流程，计划等，
  </el-card>
  <el-alert
    title="花式拖拽演示，每个卡片，都可以上下拖拽顺序，另外不同卡片，也可以拖拽过去，拖拽过来，都不在话下呢，快试试O(∩_∩)O哈哈~"
    type="success"
    show-icon
  />
  <el-card style="border: 0" shadow="never" class="mt-4">
    <el-row :gutter="20">
      <!-- 需求池  -->
      <el-col :span="6">
        <el-card class="rounded-md" shadow="never" :body-style="{ padding: '0' }">
          <template #header>
            <div class="card-header flex justify-between">
              <span>需求池</span>
              <el-tag type="primary">日</el-tag>
            </div>
          </template>

          <VueDraggable v-model="demandList" :animation="150" ghostClass="ghost" group="people" style="min-height: 30px">
            <div v-for="(item, index) in demandList" :key="item.id">
              <div class="flex cursor-move items-center px-4 py-4">
                <el-tag type="info" class="mr-2">需求</el-tag>
                <div>{{ item.name }}</div>
              </div>
              <el-divider v-if="demandList.length > 0 && index < demandList.length - 1" style="margin: 0" />
            </div>
          </VueDraggable>
        </el-card>
      </el-col>
      <!-- 开发中 -->
      <el-col :span="6">
        <el-card class="rounded-md" shadow="never" :body-style="{ padding: '0' }">
          <template #header>
            <div class="card-header flex justify-between">
              <span>开发中</span>
              <el-tag type="primary">月</el-tag>
            </div>
          </template>
          <VueDraggable v-model="exploitList" :animation="150" ghostClass="ghost" group="people" style="min-height: 30px">
            <div v-for="(item, index) in exploitList" :key="item.id">
              <div class="flex cursor-move items-center px-4 py-4">
                <el-tag type="warning" class="mr-2">需求</el-tag>
                <div>{{ item.name }}</div>
              </div>
              <el-divider v-if="index < exploitList.length - 1" style="margin: 0" />
            </div>
          </VueDraggable>
        </el-card>
      </el-col>
      <!-- 已完成 -->
      <el-col :span="6">
        <el-card class="rounded-md" shadow="never" :body-style="{ padding: '0' }">
          <template #header>
            <div class="card-header flex justify-between">
              <span>已完成</span>
              <el-tag type="primary">月</el-tag>
            </div>
          </template>
          <VueDraggable v-model="completeList" :animation="150" ghostClass="ghost" group="people" style="min-height: 30px">
            <div v-for="(item, index) in completeList" :key="item.id">
              <div class="flex cursor-move items-center px-4 py-4">
                <el-tag type="primary" class="mr-2">需求</el-tag>
                <div>{{ item.name }}</div>
              </div>
              <el-divider v-if="index < completeList.length - 1" style="margin: 0" />
            </div>
          </VueDraggable>
        </el-card>
      </el-col>
      <!-- 已验收 -->
      <el-col :span="6">
        <el-card class="rounded-md" shadow="never" :body-style="{ padding: '0' }">
          <template #header>
            <div class="card-header flex justify-between">
              <span>已验收</span>
              <el-tag type="primary">月</el-tag>
            </div>
          </template>
          <VueDraggable v-model="approvedList" :animation="150" ghostClass="ghost" group="people" style="min-height: 30px">
            <div v-for="(item, index) in approvedList" :key="item.id">
              <div class="flex cursor-move items-center px-4 py-4">
                <el-tag type="success" class="mr-2">需求</el-tag>
                <div>{{ item.name }}</div>
              </div>
              <el-divider v-if="index < approvedList.length - 1" style="margin: 0" />
            </div>
          </VueDraggable>
        </el-card>
      </el-col>
    </el-row>
    <div class="flex justify-between">
      <preview-list :list="demandList" />
      <preview-list :list="exploitList" />
      <preview-list :list="completeList" />
      <preview-list :list="approvedList" />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const demandList = ref([
  { name: '促销活动页面，包含促销广告展示222', id: 2 },
  { name: '商品需要一个评价功能444', id: 4 },
  { name: '据说Vue3.2发布了，setup啥时候支持？8888', id: 8 },
])

const exploitList = ref([
  { name: '商品图片需要提供放大镜999', id: 9 },
  { name: '用户头像上传，需要支持裁剪7777', id: 7 },
  { name: '订单需要提供删除到回收站666', id: 6 },
  { name: '商品图片需要提供放大镜555', id: 5 },
])

const completeList = ref([{ name: '商品图片需要提供放大镜000', id: 10 }])

const approvedList = ref([
  { name: '商品图片需要提供放大镜111', id: 1 },
  { name: '商品列表，需要一个到货提醒功能333', id: 3 },
])
</script>

<style scoped lang="scss"></style>
