/**
 * v-debounce
 * 按钮防抖指令，可自行扩展至input
 * 接收参数：function类型
 */
import type { Directive, DirectiveBinding } from 'vue'

interface ElType extends HTMLElement {
  // 扩展el类型，添加自定义属性
  __handleClick__: () => any
}
const debounce: Directive = {
  // 指令的钩子函数，指令绑定到元素时触发
  mounted(el: ElType, binding: DirectiveBinding) {
    // 判断指令参数是否为函数
    if (typeof binding.value !== 'function') {
      throw '回调必须是函数'
    }
    let timer: NodeJS.Timeout | null = null // 定义定时器
    el.__handleClick__ = function () {
      if (timer) clearInterval(timer) // 清除定时器
      timer = setTimeout(() => {
        binding.value()
      }, 500)
    }

    el.addEventListener('click', el.__handleClick__) // 绑定事件
  },
  // 指令与元素解绑时触发
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.__handleClick__) // 移除事件
  },
}

export default debounce
