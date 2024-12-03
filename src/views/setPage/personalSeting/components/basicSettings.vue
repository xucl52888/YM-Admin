<template>
  <el-form ref="ruleFormRef" :model="form" label-width="auto" style="max-width: 600px" label-position="top" :rules="rules">
    <el-form-item label="昵称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="联系电话" prop="iphone">
      <el-input v-model="form.iphone" />
    </el-form-item>
    <el-form-item label="联系地址" prop="desc">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item class="flex justify-end">
      <el-button type="primary" @click="submitForm(ruleFormRef)">更新基本信息</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const form = reactive({
  name: '',
  email: '',
  iphone: '',
  desc: '',
})
interface RuleForm {
  name: string
  email: string
  iphone: string
  desc: string
}
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 3, max: 5, message: '长度应为2到5', trigger: 'blur' },
  ],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  iphone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入联系地址', trigger: 'blur' }],
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped lang="scss"></style>
