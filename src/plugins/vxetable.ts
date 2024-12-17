import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'

// 按需引入vxe-table
import { App } from 'vue'
export function setupVxetable(app: App<Element>) {
  app.use(VxeUI)
  app.use(VxeUITable)
}
