<template lang="">
  <el-card class="mb-6">
    <template #header>
      <div class="card-header">
        <span>关于</span>
      </div>
    </template>
    <p>
      element-plus-admin 是一个基于 vue3，vite2，TypeScript
      的中后台解决方案，它可以帮助你快速搭建企业级中后台项目，相信不管是从新技术使用还是其他方面，都能帮助到你，持续更新中。
    </p>
  </el-card>
  <!-- 项目信息 -->
  <el-card class="mb-6">
    <template #header>
      <div class="card-header">
        <span>项目信息</span>
      </div>
    </template>
    <el-descriptions :column="3" border size="large">
      <el-descriptions-item label="版本">
        <el-tag>{{ version }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="最后编译时间">
        <el-tag>{{ lastBuildTime }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="框架">
        <el-tag>vue3</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="构建工具">
        <el-tag>vite</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="gitee">
        <div class="flex items-center">
          <a href="https://gitee.com/xcl52888/vite-project" target="_blank">查看Github地址</a>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <!-- 开发环境依赖 -->
  <el-card class="mb-6">
    <template #header>
      <div class="card-header">
        <span>开发环境依赖</span>
      </div>
    </template>
    <el-descriptions :column="3" border size="large">
      <el-descriptions-item v-for="(item, index) in devSchema" :key="index" :label="item.field"> {{ item.label }} </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <!-- 生产环境依赖 -->
  <el-card>
    <template #header>
      <div class="card-header">
        <span>生产环境依赖</span>
      </div>
    </template>
    <el-descriptions :column="3" border size="large">
      <el-descriptions-item v-for="(item, index) in schema" :key="index" :label="item.field"> {{ item.label }} </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>
<script setup lang="ts">
export interface schemaItem {
  field: string
  label: string
}

const { pkg, lastBuildTime } = __APP_INFO__
const { dependencies, devDependencies, name, version } = pkg

const schema: schemaItem[] = []
const devSchema: schemaItem[] = []

Object.keys(dependencies).forEach((key) => {
  schema.push({ field: key, label: dependencies[key] })
})

Object.keys(devDependencies).forEach((key) => {
  devSchema.push({ field: key, label: devDependencies[key] })
})
</script>
<style lang=""></style>
