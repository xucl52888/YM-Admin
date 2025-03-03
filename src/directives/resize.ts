import type { Directive, DirectiveBinding } from 'vue'

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
    map.set(el, binding.value)
    ob.observe(el)
  },
  unmounted(el: HTMLButtonElement) {
    ob.unobserve(el)
  },
}

export default resize
