/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */
import type { Directive, DirectiveBinding } from 'vue'

interface ElType extends HTMLElement {
  // 定义指令绑定的元素类型
  copyData: string | number
  __handleClick__: any
}
const copy: Directive = {
  // 当被绑定的元素挂载到 DOM 上时……
  mounted(el: ElType, binding: DirectiveBinding) {
    // 当指令挂载到 DOM 上时，保存传入的值
    el.copyData = binding.value
    // 点击事件处理函数
    el.addEventListener('click', handleClick)
  },
  // 当指令所在组件的 VNode 更新时调用
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value
  },
  // 当指令与元素解绑时调用
  beforeUnmount(el: ElType) {
    // 移除事件监听
    el.removeEventListener('click', el.__handleClick__)
  },
}
function handleClick(this: any) {
  const input = document.createElement('input') // 创建input
  input.value = this.copyData.toLocaleString() // 赋值
  document.body.appendChild(input) // 添加临时节点
  input.select() // 选中
  document.execCommand('Copy') // 执行复制
  document.body.removeChild(input) // 移除临时节点
  console.log('复制成功', this.copyData)
}

export default copy
