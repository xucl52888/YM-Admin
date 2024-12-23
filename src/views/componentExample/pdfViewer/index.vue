<template>
  <div>
    <PdfViewer pdfUrl="https://example.com/your-pdf-file.pdf" />
    <!-- frameborder="0" // 设置边框为0  -->
    <iframe 
    src="https://example.com/public/pdfjs/web/viewer.html?file=https://example.com/your-pdf-file.pdf"
    frameborder="0"
    height="100%"
    width="100%"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
import PdfViewer from "@/components/PdfViewer.vue"

</script>
