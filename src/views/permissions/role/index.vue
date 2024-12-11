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
        <el-button @click="loadDataTable" icon="Refresh" circle type="primary" />
      </el-space>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" :stripe="isStripe">
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
          <el-button type="primary" link @click="onMenuPermissions">菜单权限</el-button>
          <el-button type="primary" link>编辑</el-button>
          <el-button type="danger" link @click="remove">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-4 flex items-center justify-end">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[100, 200, 300, 400]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>

  <!--  -->
  <el-dialog v-model="dialogVisible" title="分配菜单" width="500" :close-on-click-modal="false">
    <div class="p-4">
      <el-tree
        ref="treeRef"
        show-checkbox
        :data="data"
        :default-checked-keys="['528545323536', '23425567575632232', '1564631321353', '345356657532']"
        node-key="id"
        :expand-on-click-node="false"
        default-expand-all
        highlight-current
        :props="defaultProps"
      />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getRoleList } from '@/api/system/role'
import { ElMessageBox, ElTree } from 'element-plus'
import { useMenuStore } from '@/store/useMenuStore'

const loading = ref(false)
const isStripe = ref(true)
const tableData = ref([])
const loadDataTable = async () => {
  loading.value = true
  const res = await getRoleList()
  tableData.value = res?.list
  loading.value = false
}
onMounted(() => {
  loadDataTable()
})

const currentPage = ref(4)
const pageSize = ref(100)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
const remove = () => {
  ElMessageBox.confirm('确定删除吗?')
    .then(() => {
      console.log('删除成功')
    })
    .catch(() => {
      // catch error
    })
}

interface Tree {
  [key: string]: any
}
const dialogVisible = ref(false)
const data: Tree[] = useMenuStore().getMenu
console.log(useMenuStore().getMenu)
const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultProps = {
  children: 'children',
  label: 'name',
}

const onMenuPermissions = () => {
  dialogVisible.value = true
}
</script>

<style scoped lang="scss"></style>
