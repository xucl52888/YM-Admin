<template>
  <el-card style="border: 0" shadow="never">
    <!-- <PdfViewer pdfUrl="https://example.com/your-pdf-file.pdf" /> -->
    <!-- frameborder="0" // 设置边框为0  -->
    <!-- <iframe src="https://www.baidu.com" frameborder="0" height="100%" width="100%" style="height: calc(100vh - 210px)"></iframe> -->
    <!-- src="/public/pdfjs/web/viewer.html?file=/public/pdfjs/web/compressed.tracemonkey-pldi-09.pdf" -->
    <iframe
      src="/public/pdfjs/web/viewer.html?file=/public/sdfs.pdf"
      frameborder="0"
      height="100%"
      width="100%"
      style="height: calc(100vh - 210px)"
    ></iframe>
  </el-card>
</template>

<script lang="ts" setup>
// import PdfViewer from '@/components/PdfViewer.vue'
</script>
