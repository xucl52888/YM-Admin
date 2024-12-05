<template>
  <el-input v-model="filterText" size="large" suffix-icon="Search" placeholder="筛选关键字" class="mb-4" />
  <el-tree
    ref="treeRef"
    :data="data"
    @node-click="onTreeNodeClick"
    node-key="id"
    :expand-on-click-node="false"
    default-expand-all
    highlight-current
    :props="defaultProps"
    :filter-node-method="filterNode"
  >
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span>
          <el-button @click="appendChildren(data)" type="primary" link> 添加子菜单 </el-button>
        </span>
      </span>
    </template>
  </el-tree>

  <!--  -->
  <el-dialog
    v-model="dialogVisible"
    :title="`添加${selectData === '-1' ? '顶级' : selectData ? selectData.name + '子' : '子'}菜单`"
    width="500"
    :close-on-click-modal="false"
  >
    <div class="p-4">
      <el-form ref="ruleFormRef" :model="formInline" label-width="auto" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formInline.title" placeholder="请输入标题" clearable />
        </el-form-item>
        <el-form-item label="副标题" prop="viceTitle">
          <el-input v-model="formInline.viceTitle" placeholder="请输入副标题" clearable />
        </el-form-item>
        <el-form-item label="路径" prop="route">
          <el-input v-model="formInline.route" placeholder="请输入路劲" clearable />
        </el-form-item>
        <el-form-item label="打开方式" prop="openingMethod">
          <el-radio-group v-model="formInline.openingMethod">
            <el-radio value="currentWindow">当前窗口</el-radio>
            <el-radio value="newWindow">新窗口</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限" prop="menuPurview">
          <el-input v-model="formInline.menuPurview" placeholder="请输入权限，多个权限用,隔开" clearable />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button type="primary" @click="onSubmit(ruleFormRef)"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { ElTree } from 'element-plus'
import { useMenuStore } from '@/store/useMenuStore'
import type { FormInstance, FormRules } from 'element-plus'

// 发布事件
import emitter from '@/utils/mitt'

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultProps = {
  children: 'children',
  label: 'name',
}

interface Tree {
  [key: string]: any
}
const data: Tree[] = useMenuStore().getMenu
const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.name.includes(value)
}
watch(filterText, (val) => {
  treeRef.value!.filter(val)
})
const onTreeNodeClick = (data) => {
  emitter.emit('on-tree-node', data)
}

const selectData = ref(null)
const appendChildren = (data) => {
  selectData.value = data
  dialogVisible.value = true
}
const dialogVisible = ref(false)
const formInline = reactive({
  title: '',
  viceTitle: '',
  route: '',
  openingMethod: 'currentWindow',
  menuPurview: '',
})

interface RuleForm {
  title: string
  route: string
}
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<RuleForm>>({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  route: [{ required: true, message: '请输入路径', trigger: 'blur' }],
})
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 暴露给父组件使用
defineExpose({
  appendChildren,
})
</script>

<style scoped lang="scss">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
