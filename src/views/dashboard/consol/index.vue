<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="(item, index) in cardList" :key="item">
      <el-card class="rounded-md" shadow="hover">
        <template #header>
          <div class="card-header flex justify-between">
            <span>{{ item.name }}</span>
            <el-tag :type="item.type === '日' ? 'primary' : item.type === '月' ? 'success' : 'warning'" effect="plain">{{ item.type }}</el-tag>
          </div>
        </template>
        <div>
          <el-statistic class="mb-2 text-2xl font-bold" :value="item.data" />
          <div v-if="index === 1">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="70" />
          </div>
          <div v-else class="flex justify-between">
            <span>日同比 {{ item.dayOnDay }}</span>
            <span>周同比 {{ item.monthOnMonth }}</span>
          </div>
        </div>
        <template #footer>
          <div class="flex justify-between">
            <span>{{ item.totalName }}：</span>
            <span>{{ item.total }}</span>
          </div>
        </template>
      </el-card>
    </el-col>
  </el-row>

  <el-row :gutter="20" class="mt-6">
    <el-col :span="3" v-for="(item, index) in dataList" :key="index">
      <el-card class="rounded-md" shadow="hover">
        <div class="flex flex-col items-center justify-center">
          <el-icon size="24" :color="item.color">
            <component :is="item.icon"></component>
          </el-icon>
          <span class="mt-3">{{ item.name }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-card class="mt-6 rounded-md" shadow="never">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="浏览趋势" name="first">
        <el-card style="border: 0" :body-style="{ padding: 0 }">
          <chart-candlestick :series-data="pieDataList" :extra-option="extraOption" style="width: 100%; height: 500px" />
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="访问量" name="second">
        <el-card style="border: 0" :body-style="{ padding: 0 }">
          <chart-bar :series-data="pieDataList" :extra-option="extraOption" style="width: 100%; height: 500px" />
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="饼图" name="third">
        <el-card style="border: 0" :body-style="{ padding: 0 }">
          <chart-pie :series-data="pieDataList" :extra-option="extraOption" style="width: 100%; height: 500px" />
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="折线图" name="fourth">
        <el-card style="border: 0" :body-style="{ padding: 0 }">
          <chart-line :series-data="pieDataList" :extra-option="extraOption" style="width: 100%; height: 500px" />
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import chartPie from '@/components/echart/chartPie/index.vue'
import chartBar from '@/components/echart/chartBar/index.vue'
import chartLine from '@/components/echart/chartLine/index.vue'
import chartCandlestick from '@/components/echart/chartCandlestick/index.vue'
const pieDataList = [
  { name: 'Vue', value: 20 },
  { name: 'React', value: 20 },
  { name: 'Angular', value: 20 },
]
const extraOption = {
  color: ['#fe883a', '#2d90d1', '#f75981', '#90e2a9'],
}
const cardList = ref([
  {
    name: '访问量',
    data: 80481,
    total: '875,233',
    totalName: '总访问量',
    dayOnDay: '63%',
    monthOnMonth: '41%',
    type: '日',
  },
  {
    name: '销售额',
    data: 787788,
    total: '787,44',
    totalName: '总销售额',
    dayOnDay: '56%',
    monthOnMonth: '12%',
    type: '周',
  },
  {
    name: '订单量',
    data: 88786,
    total: '35%',
    totalName: '转化率',
    dayOnDay: '63%',
    monthOnMonth: '41%',
    type: '周',
  },
  {
    name: '成交额',
    data: 65786,
    total: '253,235',
    totalName: '总成交额',
    dayOnDay: '31%',
    monthOnMonth: '51%',
    type: '月',
  },
])
const activeName = ref('first')

const dataList = ref([
  {
    name: '用户',
    icon: 'User',
    color: '#E8A47C',
  },
  {
    name: '分析',
    icon: 'TrendCharts',
    color: '#C38D9E',
  },
  {
    name: '商品',
    icon: 'Watermelon',
    color: '#41B3A3',
  },
  {
    name: '订单',
    icon: 'Platform',
    color: '#F7DC6F',
  },
  {
    name: '票据',
    icon: 'Tickets',
    color: '#A9CCE3',
  },
  {
    name: '消息',
    icon: 'ChatLineRound',
    color: '#D2B4DE',
  },
  {
    name: '标签',
    icon: 'Discount',
    color: '#85C1E9',
  },
  {
    name: '配置',
    icon: 'DocumentCopy',
    color: '#5cdbd3',
  },
])

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event)
}
</script>

<style scoped lang="scss"></style>
