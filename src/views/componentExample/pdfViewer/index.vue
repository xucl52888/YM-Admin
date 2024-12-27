<template>
  <el-card style="border: 0" shadow="never">
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
    <iframe :src="src" frameborder="0" height="100%" width="100%" style="height: calc(100vh - 210px)"></iframe>
  </el-card>
</template>

<script lang="ts" setup>
// import PdfViewer from '@/components/PdfViewer.vue'
const src = `${import.meta.env.VITE_BASE_URL}/pdfjs/web/viewer.html?file=${import.meta.env.VITE_BASE_URL}/sdfs.pdf`
/**
 * 解决pdfjs上传到服务器后，无法预览问题
 * https://blog.csdn.net/m0_63057114/article/details/140456591
 */
</script>
