<template>
  <!-- <watermark text="内部资料，请勿外传" color="rgba(255, 0, 0, 0.2)" :angle="-45" :gap="150"></watermark> -->
  <el-card style="border: 0" shadow="never">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="formInline.user" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formInline.region" placeholder="请选择" clearable>
          <el-option label="女" value="0" />
          <el-option label="男" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="formInline.date" type="date" placeholder="选择一个日期" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="flex justify-between pb-4">
      <div>
        <el-button @click="dialogVisible = true">新建</el-button>
      </div>
      <div>
        <el-switch v-model="isBorder" inline-prompt active-text="有边框" inactive-text="无边框" class="mr-4" />
        <el-switch v-model="isStripe" inline-prompt active-text="有条纹" inactive-text="无条纹" />
      </div>
    </div>
    <!--  -->
    <vxe-table
      :border="isBorder"
      :stripe="isStripe"
      :loading="loading"
      :column-config="{ resizable: true }"
      :row-config="{ isHover: true }"
      :checkbox-config="{ labelField: 'id', highlight: true, range: true }"
      :data="tableData"
    >
      <vxe-column type="seq" width="70"></vxe-column>
      <vxe-column type="checkbox" title="ID" width="140"></vxe-column>
      <vxe-column field="name" title="名称" sortable></vxe-column>
      <vxe-column field="sex" title="性别" :filters="sexOptions" :filter-multiple="false" :formatter="formatterSex"></vxe-column>
      <vxe-column field="age" title="年龄" :filters="ageOptions" :filter-method="filterAgeMethod" sortable></vxe-column>
      <vxe-column field="address" title="地址" show-overflow></vxe-column>
      <vxe-column field="create_date" title="创建时间" show-overflow></vxe-column>
    </vxe-table>
  </el-card>

  <!--  -->
  <el-dialog v-model="dialogVisible" title="新建" width="500" :close-on-click-modal="false">
    <div class="p-4">
      <el-form label-width="auto" :model="formInline">
        <el-form-item label="名称">
          <el-input v-model="formInline.user" placeholder="请输入名称" clearable />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formInline.region" placeholder="请选择" clearable>
            <el-option label="女" value="0" />
            <el-option label="男" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formInline.user" placeholder="请输入年龄" clearable />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formInline.user" placeholder="请输入年龄" clearable />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button type="primary"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { VxeColumnPropTypes } from 'vxe-table'
import { getBasicList } from '@/api/basicList/basicList'
// import watermark from '@/components/watermark/index.vue'

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  loadDataTable()
}
const isBorder = ref(true)
const isStripe = ref(true)
const dialogVisible = ref(false)

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const loading = ref(false)
const tableData = ref<RowVO[]>([])
const sexOptions = ref([
  { label: '女', value: '0' },
  { label: '男', value: '1' },
])

const ageOptions = ref([
  { label: '大于16岁', value: 16 },
  { label: '大于26岁', value: 26 },
  { label: '大于30岁', value: 30 },
])

const formatterSex: VxeColumnPropTypes.Formatter<RowVO> = ({ cellValue }) => {
  const item = sexOptions.value.find((item) => item.value === cellValue)
  return item ? item.label : ''
}

const filterAgeMethod: VxeColumnPropTypes.FilterMethod<RowVO> = ({ value, row }) => {
  return row.age >= value
}
const loadDataTable = async () => {
  loading.value = true
  const res = await getBasicList()
  tableData.value = res?.list
  loading.value = false
}
onMounted(() => {
  loadDataTable()
})
// onMounted(() => {
//   loading.value = true
//   setTimeout(() => {
//     tableData.value = [
//       { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
//       { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
//       { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
//       { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
//       { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
//       { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' },
//       { id: 10007, name: 'Test7', role: 'Test', sex: '0', age: 29, address: 'test abc' },
//       { id: 10008, name: 'Test8', role: 'Develop', sex: '0', age: 35, address: 'test abc' },
//       { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 21, address: 'test abc' },
//       { id: 10010, name: 'Test10', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
//       { id: 10011, name: 'Test11', role: 'Test', sex: '0', age: 29, address: 'test abc' },
//       { id: 10012, name: 'Test12', role: 'Develop', sex: '1', age: 27, address: 'test abc' },
//       { id: 10013, name: 'Test13', role: 'Test', sex: '0', age: 24, address: 'test abc' },
//       { id: 10014, name: 'Test14', role: 'Develop', sex: '1', age: 34, address: 'test abc' },
//       { id: 10015, name: 'Test15', role: 'Test', sex: '1', age: 21, address: 'test abc' },
//       { id: 10016, name: 'Test16', role: 'Develop', sex: '0', age: 20, address: 'test abc' },
//       { id: 10017, name: 'Test17', role: 'Test', sex: '1', age: 31, address: 'test abc' },
//       { id: 10018, name: 'Test18', role: 'Develop', sex: '0', age: 32, address: 'test abc' },
//       { id: 10019, name: 'Test19', role: 'Test', sex: '1', age: 37, address: 'test abc' },
//       { id: 10020, name: 'Test20', role: 'Develop', sex: '1', age: 41, address: 'test abc' },
//     ]
//     loading.value = false
//   }, 500)
// })
</script>

<style scoped lang="scss">
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
