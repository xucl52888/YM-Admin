<template>
  <el-card class="mb-4 rounded-md" style="border: 0" shadow="never">
    <template #header> 菜单权限管理 </template>
    页面数据为 Mock 示例数据，非真实数据。
  </el-card>

  <div class="flex justify-between">
    <el-card class="rounded-md" style="border: 0; width: 30%" shadow="never">
      <template #header>
        <div class="h-10">
          <el-button type="primary">
            添加菜单<el-icon class="el-icon--right"><Upload /></el-icon>
          </el-button>
          <el-button type="primary" icon="Search">全部收起</el-button>
        </div>
      </template>
      <div>
        <el-tree
          style="max-width: 600px"
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps"
        />
      </div>
    </el-card>
    <el-card class="rounded-md" style="border: 0; width: calc(70% - 16px)" shadow="never">
      <template #header>
        <div class="h-10">编辑菜单</div>
      </template>
      <el-form :model="formInline">
        <el-form-item label="Approved by">
          <el-input v-model="formInline.user" placeholder="Approved by" clearable />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-select v-model="formInline.region" placeholder="Activity zone" clearable>
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity time">
          <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Query</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
}

const defaultProps = {
  children: 'children',
  label: 'label',
}
const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
</script>

<style scoped lang="scss"></style>
