<template>
  <el-card class="mb-6 rounded-md" shadow="never">
    <template #header>
      <div class="card-header">
        <span>工作台</span>
      </div>
    </template>
    <div class="flex">
      <div class="flex">
        <div class="mr-3 flex items-center justify-center">
          <el-avatar :src="logoImgUrl" :size="60" />
        </div>
        <div class="flex items-center">
          <div class="flex flex-col">
            <div>早安，Ah jung，开始您一天的工作吧！</div>
            <div class="mt-2 text-sm text-gray-500">今日阴转大雨，15℃ - 25℃，出门记得带伞哦。</div>
          </div>
        </div>
      </div>
      <div class="flex flex-shrink flex-grow">
        <div class="text-md basis-1/3 pr-4 text-right">
          <div>项目数</div>
          <div class="mt-2 text-lg font-bold">16</div>
        </div>
        <div class="text-md basis-1/3 pr-4 text-right">
          <div>项目数</div>
          <div class="mt-2 text-lg font-bold">16</div>
        </div>
        <div class="text-md basis-1/3 pr-4 text-right">
          <div>项目数</div>
          <div class="mt-2 text-lg font-bold">16</div>
        </div>
      </div>
    </div>
  </el-card>

  <el-row :gutter="20">
    <el-col :span="12">
      <!-- 1 -->
      <el-card class="rounded-md" shadow="never" :body-style="{ padding: 0 }" header="项目">
        <div class="project-card flex flex-wrap">
          <!-- 1 -->
          <el-card class="project-card-item ms:w-1/2 cursor-pointer rounded-md md:w-1/3" shadow="hover">
            <div class="flex">
              <span>
                <el-icon size="30" color="#5cdbd3"><ColdDrink /></el-icon>
              </span>
              <span class="ml-4 text-lg">Github</span>
            </div>
            <div class="mt-2 flex h-10 text-gray-400">是一个面向开源及私有软件项目的托管平台。</div>
            <div class="mt-2 flex h-10 text-gray-400">开源君，2021-07-04</div>
          </el-card>
          <!-- 2 -->
          <el-card class="project-card-item ms:w-1/2 cursor-pointer rounded-md md:w-1/3" shadow="hover">
            <div class="flex">
              <span>
                <el-icon size="30" color="#42b983"><ColdDrink /></el-icon>
              </span>
              <span class="ml-4 text-lg">Vue</span>
            </div>
            <div class="mt-2 flex h-10 text-gray-400">渐进式 JavaScript 框架</div>
            <div class="mt-2 flex h-10 text-gray-400">学不动也要学，2021-07-04</div>
          </el-card>
          <!-- 3 -->
          <el-card class="project-card-item ms:w-1/2 cursor-pointer rounded-md md:w-1/3" shadow="hover">
            <div class="flex">
              <span>
                <el-icon size="30" color="#e44c27"><ColdDrink /></el-icon>
              </span>
              <span class="ml-4 text-lg">Html5</span>
            </div>
            <div class="mt-2 flex h-10 text-gray-400">HTML5是互联网的下一代标准。</div>
            <div class="mt-2 flex h-10 text-gray-400">撸码也是一种艺术 2021-04-01</div>
          </el-card>
          <!-- 4 -->
          <el-card class="project-card-item ms:w-1/2 cursor-pointer rounded-md md:w-1/3" shadow="hover">
            <div class="flex">
              <span>
                <el-icon size="30" color="#dd0031"><ColdDrink /></el-icon>
              </span>
              <span class="ml-4 text-lg">Angular</span>
            </div>
            <div class="mt-2 flex h-10 text-gray-400">现代 Web 开发平台，百万粉丝热捧。</div>
            <div class="mt-2 flex h-10 text-gray-400">铁粉君 2021-07-04。</div>
          </el-card>
          <!-- 5 -->
          <el-card class="project-card-item ms:w-1/2 cursor-pointer rounded-md md:w-1/3" shadow="hover">
            <div class="flex">
              <span>
                <el-icon size="30" color="#61dafb"><ColdDrink /></el-icon>
              </span>
              <span class="ml-4 text-lg">React</span>
            </div>
            <div class="mt-2 flex h-10 text-gray-400">用于构建用户界面的 JavaScript 库。</div>
            <div class="mt-2 flex h-10 text-gray-400">技术牛 2021-07-04。</div>
          </el-card>
          <!-- 6 -->
          <el-card class="project-card-item ms:w-1/2 cursor-pointer rounded-md md:w-1/3" shadow="hover">
            <div class="flex">
              <span>
                <el-icon size="30" color="#61dafb"><ColdDrink /></el-icon>
              </span>
              <span class="ml-4 text-lg">Js</span>
            </div>
            <div class="mt-2 flex h-10 text-gray-400">路是走出来的，而不是空想出来的。</div>
            <div class="mt-2 flex h-10 text-gray-400">架构组 2021-07-04</div>
          </el-card>
        </div>
      </el-card>
      <!-- 2 -->
      <el-card class="mt-6 rounded-md" shadow="never" :body-style="{ padding: 0 }">
        <template #header>
          <div class="card-header flex justify-between">
            <span>动态</span>
            <span>更多</span>
          </div>
        </template>
        <div class="flex flex-col">
          <!--  -->
          <template v-for="item in 7" :key="item">
            <el-card shadow="never" style="border: 0" :body-style="{ padding: '10px 20px' }">
              <div class="flex">
                <div class="mr-3 flex items-center justify-center">
                  <el-avatar :src="logoImgUrl" :size="40" />
                </div>
                <div class="flex items-center">
                  <div class="flex flex-col">
                    <div>刚才把工作台页面随便写了一些，凑合能看了！</div>
                    <div class="mt-1 text-xs text-gray-500">2024-07-04 22:37:16。</div>
                  </div>
                </div>
              </div>
            </el-card>
            <el-divider v-if="item !== 7" style="margin: 0" />
          </template>
        </div>
      </el-card>
    </el-col>
    <!--  -->
    <el-col :span="12">
      <el-card class="rounded-md" shadow="never" :body-style="{ padding: 0 }" header="快捷操作">
        <div class="project-card flex flex-wrap">
          <!-- 1 -->
          <el-card class="project-card-item ms:w-1/2 cursor-pointer rounded-md md:w-1/3" shadow="hover">
            <div class="flex flex-col items-center">
              <span>
                <el-icon size="30" color="#5cdbd3"><ColdDrink /></el-icon>
              </span>
              <div class="mt-2 flex h-10 text-gray-400">主控台</div>
            </div>
          </el-card>
          <!-- 2 -->
          <el-card class="project-card-item ms:w-1/2 cursor-pointer rounded-md md:w-1/3" shadow="hover">
            <div class="flex flex-col items-center">
              <span>
                <el-icon size="30" color="#5cdbd3"><ColdDrink /></el-icon>
              </span>
              <div class="mt-2 flex h-10 text-gray-400">列表</div>
            </div>
          </el-card>
          <!-- 3 -->
          <el-card class="project-card-item ms:w-1/2 cursor-pointer rounded-md md:w-1/3" shadow="hover">
            <div class="flex flex-col items-center">
              <span>
                <el-icon size="30" color="#5cdbd3"><ColdDrink /></el-icon>
              </span>
              <div class="mt-2 flex h-10 text-gray-400">表单</div>
            </div>
          </el-card>
          <!-- 4 -->
          <el-card class="project-card-item ms:w-1/2 cursor-pointer rounded-md md:w-1/3" shadow="hover">
            <div class="flex flex-col items-center">
              <span>
                <el-icon size="30" color="#5cdbd3"><ColdDrink /></el-icon>
              </span>
              <div class="mt-2 flex h-10 text-gray-400">权限管理</div>
            </div>
          </el-card>
          <!-- 5 -->
          <el-card class="project-card-item ms:w-1/2 cursor-pointer rounded-md md:w-1/3" shadow="hover">
            <div class="flex flex-col items-center">
              <span>
                <el-icon size="30" color="#5cdbd3"><ColdDrink /></el-icon>
              </span>
              <div class="mt-2 flex h-10 text-gray-400">系统管理</div>
            </div>
          </el-card>
          <!-- 6 -->
          <el-card class="project-card-item ms:w-1/2 cursor-pointer rounded-md md:w-1/3" shadow="hover">
            <div class="flex flex-col items-center">
              <span>
                <el-icon size="30" color="#5cdbd3"><ColdDrink /></el-icon>
              </span>
              <div class="mt-2 flex h-10 text-gray-400">主控台</div>
            </div>
          </el-card>
        </div>
      </el-card>
      <el-card class="mt-6 rounded-md" shadow="never">
        <el-calendar v-model="nowDate" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import logoImgUrl from '@/assets/logo.png'
const nowDate = ref(new Date())
</script>

<style scoped lang="scss">
.project-card {
  margin-right: -6px;

  &-item {
    margin: -1px;
    width: 33.333333%;
  }
}
</style>
