<!-- 饼图 -->
<template>
  <chart-pie :series-data="pieDataList" :extra-option="extraOption" style="width: 100%; height: 500px" />
</template>

<script lang="ts" setup>
import chartPie from '@/components/echart/chartPie/index.vue'

const pieDataList = [
  { name: 'Vue', value: 40 },
  { name: 'HTML', value: 15 },
  { name: 'CSS', value: 10 },
  { name: 'JavaScript', value: 20 },
  { name: 'Node.js', value: 5 },
]
// 饼图配置
const extraOption = {
  color: ['#42b983', '#e44c27', '#61dafb', '#0059e9', '#f4ff00'],
  title: {
    text: '技术栈',
    left: 'center',
    textStyle: {
      fontSize: 20,
    },
  },
}
</script>

<style scoped lang="scss"></style>
