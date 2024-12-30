import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

export function useWatermark(initialSettings = {}) {
  // 默认水印设置
  const defaultSettings = {
    watermark_id: 'wm_div_id', // 水印总体的id
    watermark_prefix: 'mask_div_id', // 小水印的id前缀
    watermark_txt: 'YMAdmin', // 水印的内容
    watermark_x: 20, // 水印起始位置x轴坐标
    watermark_y: 20, // 水印起始位置Y轴坐标
    watermark_rows: 0, // 水印行数
    watermark_cols: 0, // 水印列数
    watermark_x_space: 50, // 水印x轴间隔
    watermark_y_space: 50, // 水印y轴间隔
    watermark_font: '微软雅黑', // 水印字体
    watermark_color: 'black', // 水印字体颜色
    watermark_fontsize: '18px', // 水印字体大小
    watermark_alpha: 0.15, // 水印透明度，要求设置在大于等于0.005
    watermark_width: 100, // 水印宽度
    watermark_height: 100, // 水印长度
    watermark_angle: 15, // 水印倾斜度数
    watermark_parent_node: null, // 水印插件挂载的父元素
    monitor: true, // 是否监控，true：不可删除水印；false：可删除水印
    ...initialSettings, // 合并用户传入的自定义设置
  }

  const forceRemove = ref(false)
  const watermarkDom = ref(null)

  // 水印加载方法
  const loadMark = (settings) => {
    // 替换默认设置
    for (const key in settings) {
      if (settings[key] !== undefined) {
        defaultSettings[key] = settings[key]
      }
    }

    // 移除已有水印
    const watermarkElement = document.getElementById(defaultSettings.watermark_id)
    if (watermarkElement && watermarkElement.parentNode) {
      watermarkElement.parentNode.removeChild(watermarkElement)
    }

    const watermarkHookElement = defaultSettings.watermark_parent_node
      ? document.getElementById(defaultSettings.watermark_parent_node)
      : document.body

    const pageWidth = Math.max(watermarkHookElement.scrollWidth, watermarkHookElement.clientWidth)
    const pageHeight = Math.max(watermarkHookElement.scrollHeight, watermarkHookElement.clientHeight)

    const watermarkElementContainer = document.createElement('div')
    watermarkElementContainer.id = defaultSettings.watermark_id
    watermarkElementContainer.style.pointerEvents = 'none'
    watermarkElementContainer.style.display = 'block'
    watermarkHookElement.appendChild(watermarkElementContainer)

    // 生成水印
    const rows = Math.floor((pageHeight - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space))
    const cols = Math.floor((pageWidth - defaultSettings.watermark_x) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space))

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const watermarkDiv = document.createElement('div')
        watermarkDiv.textContent = defaultSettings.watermark_txt
        watermarkDiv.style.position = 'absolute'
        watermarkDiv.style.left = `${defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j}px`
        watermarkDiv.style.top = `${defaultSettings.watermark_y + (defaultSettings.watermark_height + defaultSettings.watermark_y_space) * i}px`
        watermarkDiv.style.fontSize = defaultSettings.watermark_fontsize
        watermarkDiv.style.fontFamily = defaultSettings.watermark_font
        watermarkDiv.style.color = defaultSettings.watermark_color
        watermarkDiv.style.transform = `rotate(-${defaultSettings.watermark_angle}deg)`
        watermarkDiv.style.opacity = defaultSettings.watermark_alpha as unknown as string
        watermarkDiv.style.zIndex = '9999999'
        watermarkDiv.style.pointerEvents = 'none'
        watermarkElementContainer.appendChild(watermarkDiv)
      }
    }
  }

  // 移除水印
  const removeMark = () => {
    const watermarkElement = document.getElementById(defaultSettings.watermark_id)
    if (watermarkElement && watermarkElement.parentNode) {
      watermarkElement.parentNode.removeChild(watermarkElement)
    }
  }

  // 初始化水印
  const initWatermark = () => {
    loadMark(defaultSettings)
    window.addEventListener('resize', () => loadMark(defaultSettings))
  }

  // 清除水印
  const clearWatermark = () => {
    forceRemove.value = true
    removeMark()
  }

  // Vue 生命周期钩子
  onMounted(() => {
    // 执行初始化
    // initWatermark()
  })

  onBeforeUnmount(() => {
    // 清理水印
    clearWatermark()
  })

  return {
    watermarkSettings: defaultSettings, // 直接暴露水印设置
    loadMark,
    removeMark,
    clearWatermark,
  }
}
