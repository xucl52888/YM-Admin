<template>
  <el-card style="border: 0" shadow="never">
    <el-tabs>
      <el-tab-pane label="基本设置">
        <basic-settings></basic-settings>
      </el-tab-pane>
      <el-tab-pane label="安全设置">
        <security-setting></security-setting>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import basicSettings from './components/basicSettings.vue'
import securitySetting from './components/securitySetting.vue'
</script>

<style scoped lang="scss"></style>
