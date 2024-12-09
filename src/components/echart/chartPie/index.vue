<template>
  <div ref="chartRef" class="chart"></div>
</template>
<script lang="ts" setup>
import { defineProps, ref, onMounted, onUnmounted, watch, inject } from 'vue'
import { merge } from 'lodash' // 合并对象
import ResizeListener from 'element-resize-detector' // 监听窗口的变化
import { COLORSARRAY } from '../color' // 颜色数组
import { BASEOPTIONS } from './defaultOptions' // 默认配置
import { useProjectSettingStore } from '@/store/projectSetting'
const useProjectSetting = useProjectSettingStore()

// 导入全局挂载的echarts
const echarts: any = inject('$echarts')

// 使用vue的refs声明dom节点，方便后续操作
const chartRef: any = ref(null)

const props = defineProps({
  // 正常的业务数据，对应echarts饼图配置中series[0].data
  seriesData: {
    type: Array,
    required: true,
    default: () => [],
  },
  // 表示需要特殊定制的配置
  // 一般UI会规定一个统一的设计规范（比如颜色，字体，图例格式，位置等）
  // 但不排除某个图标会和设计规范不同，需要特殊定制样式，所以开放这个配置，增强灵活性
  extraOption: {
    type: Object,
    default: () => ({}),
  },
})

// 监控seriesData的变化，当变化时更新echart视图
watch(
  () => props.seriesData,
  () => {
    updateChartView()
  },
)

/**
 * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
 */
const addChartResizeListener = () => {
  const instance = ResizeListener({
    strategy: 'scroll',
    callOnAdd: true,
  })
  instance.listenTo(chartRef.value, () => {
    if (chartRef.value) {
      echartInstance.resize()
    }
  })
}

// 合并配置项
const assembleDataToOption = () => {
  // 这部分的图例formatter取决于UI要求，如果你的项目中不需要，就可以不写formatter
  // 由于echarts版本的迭代，这里的写法也有稍许改变
  const formatter = (name: any) => {
    const total: any = props.seriesData.reduce((acc, cur: any) => acc + cur.value, 0)
    const data: any = props.seriesData.find((item: any) => item.name === name) || {}
    const percent = data.value ? `${Math.round((data.value / total) * 100)}%` : '0%'
    return `${name} ${percent}`
  }
  // 这里使用lodash的merge方法，将默认配置和用户配置合并
  return merge(
    {},
    BASEOPTIONS,
    { color: COLORSARRAY },
    {
      legend: { formatter },
      series: [{ data: props.seriesData }],
    },
    props.extraOption,
  )
}

/**
 * 初始化图表
 */
let echartInstance: any = null // echart实例
const updateChartView = () => {
  if (!chartRef.value) return
  echartInstance = echarts.init(chartRef.value, useProjectSetting.elementTheme === 'dark' ? 'dark' : '') // 初始化echart实例
  echartSetOption()
}
/**
 * 根据配置项更新echart视图
 */
const echartSetOption = () => {
  const fullOption = assembleDataToOption()
  echartInstance.setOption(fullOption)
}
/**
 * 当窗口缩放时，echart动态调整自身大小
 */
const handleWindowResize = () => {
  if (chartRef.value) {
    echartInstance.resize()
  }
}

// 监听element主题变化，当变化时更新echart视图
watch(
  () => useProjectSetting.elementTheme,
  () => {
    if (echartInstance) echartInstance.dispose() // 销毁实例
    updateChartView()
  },
)

// 监听chartRef的变化，当变化时更新echart视图
onMounted(() => {
  updateChartView()
  // 增加事件监听 resize 监听window的窗口尺寸变化
  window.addEventListener('resize', handleWindowResize)
  addChartResizeListener()
})

onUnmounted(() => {
  // 取消事件监听
  window.removeEventListener('resize', handleWindowResize)
})
</script>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
