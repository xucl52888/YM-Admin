<template>
  <el-card style="border: 0" shadow="never">
    <MdEditor v-model="text" :theme="useProjectSetting.elementTheme" :toolbars="toolbars" style="height: 80vh">
      <!-- <template #defToolbars>
        <Emoji />
      </template> -->
    </MdEditor>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useProjectSettingStore } from '@/store/projectSetting'
const useProjectSetting = useProjectSettingStore()
import { toolbars } from './toolbars'
// import { Emoji } from '@vavt/v3-extension'

const text = ref('# Hello Editor')
</script>

<style scoped lang="scss"></style>
