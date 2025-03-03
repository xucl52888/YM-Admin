import type { Directive, DirectiveBinding } from 'vue'
import throttle from 'lodash/throttle' // 引入 lodash 的 throttle 方法

const map = new WeakMap()
const ob = new ResizeObserver((entries: ResizeObserverEntry[]) => {
  for (const entry of entries) {
    const handler = map.get(entry.target)
    handler &&
      handler({
        width: entry.borderBoxSize[0].inlineSize,
        height: entry.borderBoxSize[0].blockSize,
      })
  }
})

const resize: Directive = {
  // 指令的钩子函数，指令绑定到元素时触发
  mounted(el: HTMLButtonElement, binding: DirectiveBinding) {
    const throttledHandler = throttle(binding.value, 200) // 200ms 节流
    map.set(el, throttledHandler)
    ob.observe(el)
  },
  unmounted(el: HTMLButtonElement) {
    ob.unobserve(el)
  },
}

export default resize
