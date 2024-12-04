<template>
  <el-form ref="ruleFormRef" :model="form" label-width="auto" style="max-width: 600px" label-position="top">
    <el-form-item label="商品图片（大）" prop="bigSize">
      <el-input v-model="form.bigSize" />
    </el-form-item>
    <el-form-item label="商品图片(小)" prop="smallSize">
      <el-input v-model="form.smallSize" />
    </el-form-item>
    <el-form-item label="水印透明度" prop="watermarkTransparency">
      <el-input v-model="form.watermarkTransparency" />
    </el-form-item>
    <el-form-item label="水印位置" prop="watermarkPosition">
      <el-select v-model="form.watermarkPosition" placeholder="请选择">
        <el-option label="左上" value="leftTop" />
        <el-option label="右上" value="rightTop" />
        <el-option label="居中" value="center" />
        <el-option label="左下" value="leftBottom" />
        <el-option label="右下" value="rightBottom" />
      </el-select>
    </el-form-item>
    <el-form-item label="价格精确位数" prop="pricePrecisionDigits">
      <el-select v-model="form.pricePrecisionDigits" placeholder="请选择">
        <el-option label="2位" value="two" />
        <el-option label="3位" value="three" />
        <el-option label="4位" value="four" />
      </el-select>
    </el-form-item>
    <el-form-item label="价格精确方式" prop="pricePrecisionMethod">
      <el-select v-model="form.pricePrecisionMethod" placeholder="请选择">
        <el-option label="四舍五入" value="rounding" />
        <el-option label="向上取整" value="roundUp" />
        <el-option label="向下取整" value="roundDown" />
      </el-select>
    </el-form-item>

    <el-form-item label="前台显示市场价" prop="delivery">
      <el-switch v-model="form.delivery" />
    </el-form-item>

    <el-form-item class="flex justify-end">
      <el-button type="primary" @click="submitForm(ruleFormRef)">更新显示信息</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const form = reactive({
  bigSize: '500*500',
  smallSize: '100*100',
  watermarkTransparency: '0.5',
  watermarkPosition: 'center',
  pricePrecisionDigits: 'two',
  pricePrecisionMethod: 'rounding',
  delivery: false,
})

const ruleFormRef = ref<FormInstance>()
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
