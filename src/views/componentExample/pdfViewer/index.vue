<template>
  <el-card class="mb-4 rounded-md" style="border: 0" shadow="never">
    <template #header> PDF预览 </template>
    常用于预览PDF文件，增加水印功能，支持文字水印和base64图片水印，水印支持平铺，自适应大小，防止删除篡改功能。
  </el-card>
  <el-card style="border: 0" shadow="never">
    <el-switch
      v-model="delivery"
      active-text="文字水印"
      inactive-text="图片水印"
      inline-prompt
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #409eff"
      @change="onChangeSwitch"
    />
    <el-form v-if="delivery" ref="ruleFormRef" :inline="true" :model="ruleForm" label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
      <el-form-item label="文字水印" prop="water_mark_text">
        <el-input v-model="ruleForm.water_mark_text" placeholder="请输入文字水印" maxlength="10" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 刷新 </el-button>
      </el-form-item>
    </el-form>
    <div v-else class="py-4">base64图片水印</div>

    <!-- <PdfViewer pdfUrl="https://example.com/your-pdf-file.pdf" /> -->
    <!-- frameborder="0" // 设置边框为0  -->
    <!-- <iframe src="https://www.baidu.com" frameborder="0" height="100%" width="100%" style="height: calc(100vh - 210px)"></iframe> -->
    <!-- src="/public/pdfjs/web/viewer.html?file=/public/pdfjs/web/compressed.tracemonkey-pldi-09.pdf" -->
    <!-- <iframe
      src="/public/pdfjs/web/viewer.html?file=/public/sdfs.pdf"
      frameborder="0"
      height="100%"
      width="100%"
      style="height: calc(100vh - 210px)"
    ></iframe> -->
    <iframe v-if="isRefresh" :src="src" frameborder="0" height="100%" width="100%" style="height: calc(100vh - 210px)"></iframe>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

const isRefresh = ref(true)
const delivery = ref(true)
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
interface RuleForm {
  water_mark_text: string
}
const ruleForm = reactive<RuleForm>({
  water_mark_text: '我是水印',
})

// import PdfViewer from '@/components/PdfViewer.vue'
// base64版本
// const src = `${import.meta.env.VITE_BASE_URL}/pdfjs/web/viewer.html?file=${import.meta.env.VITE_BASE_URL}/watermark.pdf#water_mark_url=${import.meta.env.VITE_BASE_URL}/watermark.json`
// 文字版本
let src = `${import.meta.env.VITE_BASE_URL}/pdfjs/web/viewer.html?file=${import.meta.env.VITE_BASE_URL}/watermark.pdf#water_mark_text=${ruleForm.water_mark_text}`

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      isRefresh.value = false
      setTimeout(() => {
        src = `${import.meta.env.VITE_BASE_URL}/pdfjs/web/viewer.html?file=${import.meta.env.VITE_BASE_URL}/watermark.pdf#water_mark_text=${ruleForm.water_mark_text}`
        isRefresh.value = true
      }, 100)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const onChangeSwitch = (val) => {
  isRefresh.value = false
  if (val) {
    setTimeout(() => {
      src = `${import.meta.env.VITE_BASE_URL}/pdfjs/web/viewer.html?file=${import.meta.env.VITE_BASE_URL}/watermark.pdf#water_mark_text=${ruleForm.water_mark_text}`
      isRefresh.value = true
    }, 100)
  } else {
    setTimeout(() => {
      src = `${import.meta.env.VITE_BASE_URL}/pdfjs/web/viewer.html?file=${import.meta.env.VITE_BASE_URL}/watermark.pdf#water_mark_url=${import.meta.env.VITE_BASE_URL}/watermark.json`
      isRefresh.value = true
    }, 100)
  }
}

// http://localhost:5173/public/pdfjs/web/viewer.html?file=http://localhost:5173/public/watermark.pdf#water_mark_url=http://localhost:5173/public/watermark.json
// http://localhost:8888/web/viewer.html#water_mark_text=%E6%88%91%E6%98%AF%E6%B0%B4%E5%8D%B0111111
// http://localhost:8888/web/viewer.html?file=%2Ftest%2Fpdfs%2Frotation.pdf#water_mark_url=http://localhost:8888/test/pdfs/001.json

/**
 * 解决pdfjs上传到服务器后，无法预览问题
 * https://blog.csdn.net/m0_63057114/article/details/140456591
 */
</script>
