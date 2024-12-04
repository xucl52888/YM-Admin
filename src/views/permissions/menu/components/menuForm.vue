<template>
  <el-form ref="ruleFormRef" :model="formInline" label-width="auto" :rules="rules">
    <el-form-item label="标题" prop="title">
      <el-input v-model="formInline.title" placeholder="请输入标题" clearable :disabled="!formInline.title" />
    </el-form-item>
    <el-form-item label="副标题" prop="viceTitle">
      <el-input v-model="formInline.viceTitle" placeholder="请输入副标题" clearable :disabled="!formInline.title" />
    </el-form-item>
    <el-form-item label="路径" prop="route">
      <el-input v-model="formInline.route" placeholder="请输入路劲" clearable :disabled="!formInline.title" />
    </el-form-item>
    <el-form-item label="打开方式" prop="openingMethod">
      <el-radio-group v-model="formInline.openingMethod" :disabled="!formInline.title">
        <el-radio value="currentWindow">当前窗口</el-radio>
        <el-radio value="newWindow">新窗口</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="菜单权限" prop="menuPurview">
      <el-input v-model="formInline.menuPurview" :disabled="!formInline.title" placeholder="请输入权限，多个权限用,隔开" clearable />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit(ruleFormRef)" :disabled="!formInline.title">保存修改</el-button>
      <el-button :disabled="!formInline.title" @click="resetFields(selectData)">重置</el-button>
      <el-button :disabled="!formInline.title" @click="remove">删除</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

// 订阅事件
import emitter from '@/utils/mitt'
const selectData = ref()
emitter.on('on-tree-node', (data: any) => {
  selectData.value = data
  formInline.title = data.name
  formInline.viceTitle = ''
  formInline.route = data.path
  formInline.openingMethod = 'currentWindow'
  formInline.menuPurview = ''
})

const formInline = reactive({
  title: '',
  viceTitle: '',
  route: '',
  openingMethod: '',
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
const resetFields = (data: any) => {
  formInline.title = data.name
  formInline.viceTitle = ''
  formInline.route = data.path
  formInline.openingMethod = 'currentWindow'
  formInline.menuPurview = ''
}
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
const remove = () => {
  console.log('删除')
  ElMessageBox.confirm('确定删除吗?')
    .then(() => {
      console.log('删除成功')
    })
    .catch(() => {
      // catch error
    })
}
</script>

<style scoped lang="scss"></style>
