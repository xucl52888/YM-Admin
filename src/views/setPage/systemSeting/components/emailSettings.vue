<template>
  <el-form ref="ruleFormRef" :model="form" label-width="auto" style="max-width: 600px" label-position="top" :rules="rules">
    <el-form-item label="发件人邮箱" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="SMTP服务器地址" prop="serverAddress">
      <el-input v-model="form.serverAddress" />
    </el-form-item>
    <el-form-item label="SMTP服务器端口" prop="serverPort">
      <el-input v-model="form.serverPort" />
    </el-form-item>
    <el-form-item label="SMTP用户名" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="SMTP密码" prop="password">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item label="邮件测试" prop="resource">
      <el-button type="primary" bg text>邮件测试</el-button>
    </el-form-item>
    <el-form-item class="flex justify-end">
      <el-button type="primary" @click="submitForm(ruleFormRef)">更新邮件信息</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const form = reactive({
  email: '',
  serverAddress: '',
  serverPort: '',
  name: '',
  password: '',
})
interface RuleForm {
  email: string
}
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<RuleForm>>({
  email: [{ required: true, message: '请输入发件人邮箱', trigger: 'blur' }],
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
