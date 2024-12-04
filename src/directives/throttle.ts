/*
  需求：防止按钮在短时间内被多次点击，使用节流函数限制规定时间内只能点击一次。

  思路：
    1、第一次点击，立即调用方法并禁用按钮，等延迟结束再次激活按钮
    2、将需要触发的方法绑定在指令上
  
  使用：给 Dom 加上 v-throttle 及回调函数即可
  <button v-throttle="debounceClick">节流提交</button>
*/
import type { Directive, DirectiveBinding } from 'vue'

interface ElType extends HTMLElement {
  // 扩展el类型，添加自定义属性
  __handleClick__: () => any
  disabled: boolean
}
const throttle: Directive = {
  // 指令的钩子函数，指令绑定到元素时触发
  mounted(el: ElType, binding: DirectiveBinding) {
    // 判断指令绑定的值是否为函数
    if (typeof binding.value !== 'function') {
      throw '回调必须是函数'
    }
    let timer: NodeJS.Timeout | null = null // 定时器
    el.__handleClick__ = function () {
      if (timer) clearTimeout(timer)
      if (!el.disabled) {
        el.disabled = true
        binding.value()
        timer = setTimeout(() => {
          el.disabled = false
        }, 1000)
      }
    }
    el.addEventListener('click', el.__handleClick__) // 绑定点击事件
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.__handleClick__) // 解绑点击事件
  },
}

export default throttle
