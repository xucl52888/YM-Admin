<!-- 柱状图 -->
<template>
  <chart-bar :series-data="pieDataList" :extra-option="extraOption" style="width: 100%; height: 500px" />
</template>

<script lang="ts" setup>
import chartBar from '@/components/echart/chartBar/index.vue'

const pieDataList = [120, 200, 150, 80, 70, 110, 130]
const extraOption = {
  color: ['#2d90d1', '#2d90d1', '#f75981', '#90e2a9'],
  xAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
  },
}
</script>

<style scoped lang="scss"></style>
