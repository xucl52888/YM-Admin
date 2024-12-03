<template>
  <el-card class="mb-4 rounded-md" style="border: 0" shadow="never">
    <template #header> 角色权限管理 </template>
    页面数据为 Mock 示例数据，非真实数据。
  </el-card>
  <!--  -->
  <el-card class="rounded-md" style="border: 0" shadow="never">
    <div class="mb-4 flex items-center justify-between">
      <div>
        <el-button>添加</el-button>
      </div>
      <el-space size="large">
        <el-switch v-model="isStripe" />
        <el-button @click="loadDataTable" icon="Refresh" circle />
      </el-space>
    </div>
    <el-table :data="tableData" style="width: 100%" :stripe="isStripe">
      <el-table-column type="index" label="id" width="50" />
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="explain" label="说明" />
      <el-table-column prop="isDefault" label="是否默认角色">
        <template #default="{ row }">
          <el-tag v-if="row.isDefault" type="success">是</el-tag>
          <el-tag v-else type="info">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_date" label="创建时间" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="primary" link>菜单权限</el-button>
          <el-button type="primary" link>编辑</el-button>
          <el-button type="danger" link>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getRoleList } from '@/api/system/role'

const isStripe = ref(true)
const tableData = ref([])
const loadDataTable = async () => {
  const res = await getRoleList()
  tableData.value = res?.list
}
onMounted(() => {
  loadDataTable()
})
</script>

<style scoped lang="scss"></style>
