<template>
  <el-card style="border: 0; min-height: 1000px" shadow="never">
    <el-tabs tab-position="left" class="demo-tabs">
      <el-tab-pane label="基本设置">
        <basic-settings></basic-settings>
      </el-tab-pane>
      <el-tab-pane label="显示设置">
        <display-settings></display-settings>
      </el-tab-pane>
      <el-tab-pane label="邮件设置">
        <email-settings></email-settings>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import basicSettings from './components/basicSettings.vue'
import displaySettings from './components/displaySettings.vue'
import emailSettings from './components/emailSettings.vue'
</script>

<style scoped lang="scss">
.demo-tabs > ::v-deep .el-tabs__header {
  width: 150px;
}
::v-deep .el-tabs--left .el-tabs__item.is-left {
  height: 70px;
}
</style>
