<template>
  <div>
    <h1>PDF.js in Vue 3 (Composition API)</h1>

    <!-- Loading 状态 -->
    <div v-if="loading">Loading PDF...</div>

    <!-- 错误信息 -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- 渲染 PDF 的 canvas -->
    <canvas ref="pdfCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
// import * as pdfjsLib from 'pdfjs-dist';
import * as pdfjsLib from '/public/pdfJs/build/pdf.mjs'

// 设置 pdf.js 的工作器路径（如果需要）
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.min.js'

export default {
  name: 'PdfViewer',
  props: {
    pdfUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // 响应式变量
    const pdfCanvas = ref(null) // 用于渲染 PDF 的 canvas 元素
    const loading = ref(true) // PDF 是否正在加载
    const error = ref(null) // 错误信息
    const pdfDocument = ref(null) // 保存加载的 PDF 文档

    // 渲染 PDF 的函数
    const renderPdf = async (pdf) => {
      try {
        // 获取第一页
        const page = await pdf.getPage(1)

        const scale = 1.5 // 设置缩放比例
        const viewport = page.getViewport({ scale })

        // 获取 canvas 的 context
        const canvas = pdfCanvas.value
        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width

        // 渲染 PDF 页面到 canvas
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        }

        await page.render(renderContext).promise
        loading.value = false // 渲染完成，设置 loading 为 false
      } catch (err) {
        error.value = 'Error rendering PDF: ' + err.message
        loading.value = false
      }
    }

    // 加载 PDF 文件
    const loadPdf = async (url) => {
      try {
        const loadingTask = pdfjsLib.getDocument(url)
        pdfDocument.value = await loadingTask.promise
        renderPdf(pdfDocument.value)
      } catch (err) {
        error.value = 'Error loading PDF: ' + err.message
        loading.value = false
      }
    }

    // 在组件挂载后加载 PDF
    onMounted(() => {
      loadPdf(props.pdfUrl)
    })

    // 返回响应式数据给模板
    return {
      pdfCanvas,
      loading,
      error,
    }
  },
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
