<template>
  <el-card class="mb-4">
    <template #header> 大文件分片上传 </template>
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      class="upload-demo"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="3"
      :auto-upload="false"
      :on-change="handleChange"
      :on-exceed="handleExceed"
    >
      <el-button type="primary">点击上传</el-button>
      <template #tip>
        <div class="el-upload__tip">大文件分片上传</div>
      </template>
    </el-upload>
    <div>花费的时间：{{ executionTime }}</div>
    <div>分片数据：{{ fileCounts }}</div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile, UploadInstance, UploadFile, UploadFiles } from 'element-plus'

const fileList = ref<UploadUserFile[]>([])

// 文件列表移除文件时的钩子
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}
// 点击文件列表中已上传的文件时的钩子
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}
// 当超出限制时，执行的钩子函数
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length} totally`)
}
// 删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除。
const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
    () => true,
    () => false,
  )
}

import { cutFile } from './cutFile'
const uploadRef = ref<UploadInstance>()
const fileListLengthRef = ref(0)
let fileCounts = ref<any>([])
const executionTime = ref(0)
const handleChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  fileListLengthRef.value = uploadFiles.length
  const startTime = new Date().getTime() // 开始时间
  // 分片方法 传入文件，获取所有分片
  cutFile(uploadFile?.raw as File).then((fileCount) => {
    const endTime = new Date().getTime() // 结束时间
    executionTime.value = endTime - startTime // 花费时间
    fileCounts.value = fileCount
  })
}
</script>

<style scoped lang="scss"></style>
