<!-- 折线图 -->
<template>
  <chart-line :series-data="pieDataList" :extra-option="extraOption" style="width: 100%; height: 500px" />
</template>

<script lang="ts" setup>
import chartLine from '@/components/echart/chartLine/index.vue'
const pieDataList = [
  {
    name: '邮箱',
    type: 'line',
    stack: 'Total',
    areaStyle: {},
    data: [200, 232, 201, 234, 190, 430, 310],
  },
  {
    name: '联盟广告',
    type: 'line',
    stack: 'Total',
    areaStyle: {},
    data: [220, 382, 191, 234, 290, 330, 310],
  },
  {
    name: '视频广告',
    type: 'line',
    stack: 'Total',
    areaStyle: {},
    data: [150, 232, 201, 154, 190, 330, 410],
  },
  {
    name: '直接访问',
    type: 'line',
    stack: 'Total',
    areaStyle: {},
    data: [320, 432, 301, 334, 390, 330, 320],
  },
  {
    name: '搜索引擎',
    type: 'line',
    stack: 'Total',
    areaStyle: {},
    data: [820, 932, 901, 934, 1290, 1330, 1320],
  },
]
const extraOption = {
  color: ['#42b983', '#e44c27', '#61dafb', '#0059e9', '#E60000'],
  legend: {
    data: ['邮箱', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
  },
  xAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
  },
}
</script>

<style scoped lang="scss"></style>
