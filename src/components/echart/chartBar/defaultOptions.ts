// 这里的数据会被深度合并
const BASEOPTIONS = {
  backgroundColor: 'transparent',
  xAxis: {
    type: 'category',
    data: [],
  },
  grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [],
      type: 'bar',
    },
  ],
}
export { BASEOPTIONS }
