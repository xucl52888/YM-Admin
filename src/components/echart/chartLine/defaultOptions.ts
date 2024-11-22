// 这里的数据会被深度合并
const BASEOPTIONS = {
  title: {
    text: '折线图',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: [],
  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '0%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [],
}
export { BASEOPTIONS }
