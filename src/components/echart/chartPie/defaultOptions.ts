// 这里的数据会被深度合并
const BASEOPTIONS = {
  title: {
    text: '数据',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: '占比',
      type: 'pie',
      radius: '80%', // 饼图的半径大小
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      data: [], // 这里在使用的时候会被业务数据替换
    },
  ],
}
export { BASEOPTIONS }
