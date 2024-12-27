<template>
  <div ref="watermarkContainer" class="watermark-container">
    <slot></slot>
    <div ref="watermarkLayer" class="watermark-layer"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
const props = defineProps({
  text: {
    type: String,
    default: 'Confidential', // 默认水印文本
  },
  fontSize: {
    type: String,
    default: '16px', // 水印字体大小
  },
  color: {
    type: String,
    default: 'rgba(200, 200, 200, 0.3)', // 水印颜色
  },
  angle: {
    type: Number,
    default: -30, // 水印倾斜角度
  },
  gap: {
    type: Number,
    default: 200, // 水印之间的间距
  },
})
const watermarkContainer = ref(null)
const watermarkLayer = ref(null)
let observer = null

const addWatermark = () => {
  if (!watermarkContainer.value || !watermarkLayer.value) return

  const container = watermarkContainer.value
  const layer = watermarkLayer.value

  const containerWidth = container.offsetWidth
  const containerHeight = container.offsetHeight

  const canvas = document.createElement('canvas')
  canvas.width = props.gap * 2
  canvas.height = props.gap

  const ctx = canvas.getContext('2d')
  ctx.font = `${props.fontSize} Arial`
  ctx.fillStyle = props.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((props.angle * Math.PI) / 180)
  ctx.fillText(props.text, 0, 0)

  const watermarkUrl = canvas.toDataURL()
  layer.style.width = `${containerWidth}px`
  layer.style.height = `${containerHeight}px`
  layer.style.backgroundImage = `url(${watermarkUrl})`
  layer.style.backgroundRepeat = 'repeat'
  layer.style.pointerEvents = 'none'
}

const initMutationObserver = () => {
  if (!watermarkContainer.value || !watermarkLayer.value) return

  const config = {
    childList: true,
    attributes: true,
    subtree: true,
  }

  observer = new MutationObserver((mutations) => {
    let resetNeeded = false

    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // 检测水印是否被删除
        if (!watermarkContainer.value.contains(watermarkLayer.value) || mutation.removedNodes.length > 0) {
          resetNeeded = true
        }
      } else if (mutation.type === 'attributes') {
        // 检测水印的样式是否被修改
        if (mutation.target === watermarkLayer.value) {
          resetNeeded = true
        }
      }
    })

    if (resetNeeded) {
      nextTick(() => addWatermark())
    }
  })

  observer.observe(watermarkContainer.value, config)
}

onMounted(() => {
  nextTick(() => {
    addWatermark()
    initMutationObserver()
  })
})

watch(
  () => [props.text, props.fontSize, props.color, props.angle, props.gap],
  () => {
    addWatermark()
  },
)

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
<style scoped>
.watermark-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.watermark-layer {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none; /* 防止水印影响用户操作 */
  z-index: 10;
}
</style>
