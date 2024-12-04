<template>
  <el-form ref="ruleFormRef" :model="form" label-width="auto" style="max-width: 600px" label-position="top" :rules="rules">
    <el-form-item label="网站名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="备案编号" prop="number">
      <el-input v-model="form.number" />
    </el-form-item>
    <el-form-item label="联系电话" prop="iphone">
      <el-input v-model="form.iphone" />
    </el-form-item>
    <el-form-item label="联系地址" prop="desc">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item label="登录验证码" prop="resource">
      <el-radio-group v-model="form.resource">
        <el-radio value="TRUE">开启</el-radio>
        <el-radio value="FALSE">关闭</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="网站开启访问" prop="delivery">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item label="网站关闭提示" prop="tips">
      <el-input v-model="form.tips" type="textarea" />
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
  name: 'YM-Admin',
  number: '粤ICP备20230xxx号-1',
  iphone: '15xxxxxx',
  desc: '深圳市xxxx',
  resource: 'TRUE',
  delivery: false,
  tips: '网站维护中，暂时无法访问！本网站正在进行系统维护和技术升级，网站暂时无法访问，敬请谅解！',
})
interface RuleForm {
  name: string
  iphone: string
}
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: '请输入网站名称', trigger: 'blur' }],
  iphone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
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
