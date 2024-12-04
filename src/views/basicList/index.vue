<template>
  <el-card style="border: 0" shadow="never">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="formInline.user" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="formInline.region" placeholder="请选择" clearable>
          <el-option label="玻璃侧透" value="shanghai" />
          <el-option label="北京" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="上市时间">
        <el-date-picker v-model="formInline.date" type="date" placeholder="选择一个日期" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!--  -->
    <el-table :data="tableData" stripe style="width: 100%" highlight-current-row>
      <el-table-column type="index" label="#" width="50" />
      <el-table-column prop="brand" label="品牌" width="180" />
      <el-table-column prop="name" label="商品名称" width="180" />
      <el-table-column prop="length" label="长度" width="80" />
      <el-table-column prop="width" label="宽度" width="80" />
      <el-table-column prop="height" label="高度" width="80" />
      <el-table-column prop="heatDissipation" label="CPU散热器限高" width="150" />
      <el-table-column prop="gpuLength" label="显卡限长" width="80" />
      <el-table-column prop="price" label="价格" width="80" />
      <el-table-column prop="type" label="类型" width="180" />
      <el-table-column prop="describe" label="描述" min-width="350" />
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
}
const tableData = [
  {
    brand: '机械大师',
    name: '机械大师 f36',
    length: '40.2cm',
    width: '21.6cm',
    height: '36.9cm',
    price: '359',
    heatDissipation: '16.6cm',
    gpuLength: '38cm',
    type: '玻璃侧透机箱',
    describe: '支持MATX主板，散热器风冷可以支持15.7cm，体积偏大，价格偏高',
  },
  {
    brand: '机械大师',
    name: '机械大师 if17',
    length: '34.6cm',
    width: '18.9cm',
    height: '28.5cm',
    price: '398',
    heatDissipation: '14.2cm',
    gpuLength: '33cm',
    type: '玻璃侧透机箱',
    describe: '支持MATX主板，但散热器风冷只能是13.5cm的，价格偏高，支持背插主板',
  },
  {
    brand: '乔思伯',
    name: '乔思伯 Z20',
    length: '37.0cm',
    width: '18.6cm',
    height: '29.5cm',
    price: '347',
    heatDissipation: '16.3cm',
    gpuLength: '36cm',
    type: '玻璃侧透机箱',
    describe: '支持MATX主板，散热器风冷可以支持15.7cm，有多色可选，颜值不错，但是撞色价格偏贵',
  },
  {
    brand: '吕小宝',
    name: '吕小宝 E90Pro',
    length: '37.7cm',
    width: '18.7cm',
    height: '29.8cm',
    price: '139',
    heatDissipation: '16.0cm',
    gpuLength: '35cm',
    type: '玻璃侧透机箱',
    describe: '支持MATX主板，散热器风冷可以支持15.7cm，价格便宜，性价比较高，不支持背插主板',
  },
  {
    brand: '鱼巢',
    name: '鱼巢 X7',
    length: '37.7cm',
    width: '18.7cm',
    height: '29.8cm',
    price: '158',
    heatDissipation: '16.0cm',
    gpuLength: '37cm',
    type: '玻璃侧透机箱',
    describe: '支持MATX主板，散热器风冷可以支持15.7cm，价格便宜，性价比较高，支持背插主板，但是后面距离不是很够需要直角转接头',
  },
  {
    brand: '闪鳞',
    name: '闪鳞 G400',
    length: '35.2cm',
    width: '18.8cm',
    height: '28.5cm',
    price: '398',
    heatDissipation: '16.4cm',
    gpuLength: '34cm',
    type: '玻璃侧透机箱',
    describe: '支持MATX主板，散热器风冷可以支持15.7cm，价格偏高',
  },
  {
    brand: '笨牛',
    name: '笨牛 N20',
    length: '38.1cm',
    width: '19.9cm',
    height: '30.0cm',
    price: '169',
    heatDissipation: '16.5cm',
    gpuLength: '36.4cm',
    type: '玻璃侧透机箱',
    describe: '支持MATX主板，散热器风冷可以支持15.7cm，支持走背线，性价比较高',
  },
]
</script>

<style scoped lang="scss">
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
