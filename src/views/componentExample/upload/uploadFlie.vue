<template>
  <div class="upload-container">
    <!-- 文件选择组件 -->
    <el-upload action="#" :auto-upload="false" :on-change="handleFileChange" :show-file-list="false">
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
    </el-upload>

    <!-- 控制按钮 -->
    <el-button type="success" :loading="isUploading" :disabled="!file || isUploading" @click="handleUpload">
      {{ isUploading ? '上传中...' : '开始上传' }}
    </el-button>
    <el-button type="warning" :disabled="!isUploading" @click="pauseUpload"> 暂停 </el-button>

    <!-- 进度显示 -->
    <el-progress :percentage="progress" :status="uploadError ? 'exception' : undefined" class="progress-bar" />
    <div class="upload-status">
      {{ uploadStatusText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps, UploadUserFile, UploadInstance, UploadFile, UploadFiles } from 'element-plus'
import axios from 'axios'
import SparkMD5 from 'spark-md5'

// 类型定义
interface Chunk {
  index: number // 分片序号
  file: Blob // 分片内容
  md5: string // 分片MD5
  retries: number // 重试次数
  cancelToken?: any // 取消令牌
}

// 常量配置
const CHUNK_SIZE = 5 * 1024 * 1024 // 分片大小5MB
const MAX_CONCURRENT = 3 // 最大并发数
const MAX_RETRIES = 3 // 最大重试次数

// 响应式数据
const file = ref<any>(null) // 原始文件对象
const isUploading = ref(false) // 上传状态
const progress = ref(0) // 上传进度
const chunks = ref<Chunk[]>([]) // 全部分片
const uploadedChunks = ref<Set<number>>(new Set()) // 已上传分片索引
const uploadError = ref(false) // 错误状态
const cancelTokens = ref<Set<any>>(new Set()) // 取消令牌集合

// 计算属性：上传状态文本
const uploadStatusText = computed(() => {
  if (uploadError.value) return '上传出错，请重试'
  if (isUploading.value) return `已上传 ${progress.value}%`
  return file.value ? '等待上传' : '请选择文件'
})

/**
 * 计算文件MD5（全文件计算）
 * @param file 文件对象
 * @returns Promise<string> MD5值
 */
const calculateFileMD5 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer()
    const reader = new FileReader()
    const chunkSize = CHUNK_SIZE
    const totalChunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0

    reader.onload = (e) => {
      spark.append(e.target?.result as ArrayBuffer)
      currentChunk++
      if (currentChunk < totalChunks) {
        loadNextChunk()
      } else {
        resolve(spark.end())
      }
    }

    const loadNextChunk = () => {
      const start = currentChunk * chunkSize
      const end = start + chunkSize
      reader.readAsArrayBuffer(file.slice(start, end))
    }

    loadNextChunk()
  })
}

/**
 * 创建文件分片
 * @param file 文件对象
 * @returns 分片数组
 */
const createFileChunks = (file: File): Chunk[] => {
  const chunks: Chunk[] = []
  let index = 0
  for (let i = 0; i < file.size; i += CHUNK_SIZE) {
    const chunk = file.slice(i, i + CHUNK_SIZE)
    chunks.push({
      index: index++,
      file: chunk,
      md5: '',
      retries: 0,
    })
  }
  return chunks
}

/**
 * 上传单个分片
 * @param chunk 分片对象
 */
const uploadChunk = async (chunk: Chunk) => {
  const formData = new FormData()
  formData.append('file', chunk.file)
  formData.append('md5', chunk.md5)
  formData.append('index', chunk.index.toString())
  formData.append('total', chunks.value.length.toString())

  // 创建取消令牌
  const cancelToken = axios.CancelToken.source()
  chunk.cancelToken = cancelToken
  cancelTokens.value.add(cancelToken)

  try {
    await axios.post('/api/upload', formData, {
      cancelToken: cancelToken.token,
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    uploadedChunks.value.add(chunk.index)
    updateProgress()
  } catch (error) {
    if (!axios.isCancel(error)) {
      // 非主动取消的错误
      if (chunk.retries < MAX_RETRIES) {
        chunk.retries++
        chunks.value.push(chunk) // 重新加入队列
      } else {
        uploadError.value = true
        ElMessage.error(`分片 ${chunk.index} 上传失败`)
      }
    }
  } finally {
    cancelTokens.value.delete(cancelToken)
  }
}

/**
 * 控制并发上传
 */
const startConcurrentUpload = async () => {
  isUploading.value = true
  uploadError.value = false

  while (chunks.value.length > 0) {
    const currentBatch = chunks.value.splice(0, MAX_CONCURRENT)
    console.log(currentBatch)
    await Promise.all(currentBatch.map(uploadChunk))
  }

  if (uploadedChunks.value.size === chunks.value.length) {
    await verifyUploadComplete()
  }
}

/**
 * 验证上传完整性
 */
const verifyUploadComplete = async () => {
  try {
    const { data } = await axios.post('/api/verify', {
      md5: file.value?.md5,
    })

    if (data.success) {
      ElMessage.success('上传成功！')
      resetState()
    }
  } catch (error) {
    ElMessage.error('文件验证失败')
  }
}

/**
 * 处理文件选择
 * @param file 选择的文件
 */
const handleFileChange = async (UploadFile: UploadFile) => {
  resetState()
  const fileRaw = UploadFile.raw
  if (!fileRaw) return
  try {
    // 计算文件MD5
    const md5 = await calculateFileMD5(fileRaw)
    file.value = Object.assign(fileRaw, { md5 })

    // 秒传检查
    // const { data } = await axios.get('/api/check', { params: { md5 } })
    // if (data.exists) {
    //   progress.value = 100
    //   ElMessage.success('文件秒传成功！')
    //   return
    // }

    // 初始化分片
    chunks.value = createFileChunks(file.value)
  } catch (error) {
    ElMessage.error('文件处理失败')
  }
}

/**
 * 开始上传
 */
const handleUpload = async () => {
  if (!file.value) return
  await startConcurrentUpload()
}

/**
 * 暂停上传
 */
const pauseUpload = () => {
  isUploading.value = false
  // 取消所有进行中的请求
  cancelTokens.value.forEach((source) => source.cancel('用户暂停'))
  cancelTokens.value.clear()
}

/**
 * 更新进度条
 */
const updateProgress = () => {
  progress.value = Number(((uploadedChunks.value.size / chunks.value.length) * 100).toFixed(2))
}

/**
 * 重置状态
 */
const resetState = () => {
  file.value = null
  isUploading.value = false
  progress.value = 0
  chunks.value = []
  uploadedChunks.value.clear()
  cancelTokens.value.clear()
}
</script>

<style scoped>
.upload-container {
  width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.progress-bar {
  margin: 20px 0;
}

.upload-status {
  color: #666;
  font-size: 14px;
  text-align: center;
}
</style>
