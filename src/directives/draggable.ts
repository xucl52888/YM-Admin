/*
	需求：实现一个拖拽指令，可在父元素区域任意拖拽元素。

	思路：
		1、设置需要拖拽的元素为absolute，其父元素为relative。
		2、鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值。
		3、鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值
		4、鼠标松开(onmouseup)时完成一次拖拽

	使用：在 Dom 上加上 v-draggable 即可
	<div class="dialog-model" v-draggable></div>
*/
import type { Directive } from 'vue'

interface ElType extends HTMLElement {
  // 扩展el类型，添加自定义属性
  parentNode: any
}
const draggable: Directive = {
  // 指令的钩子函数，指令绑定到元素时触发
  mounted: function (el: ElType) {
    el.style.cursor = 'move' // 鼠标样式
    el.style.position = 'absolute' // 设置元素为绝对定位
    // 鼠标按下
    el.onmousedown = function (e) {
      const disX = e.pageX - el.offsetLeft // 鼠标按下时距离元素左边的距离
      const disY = e.pageY - el.offsetTop // 鼠标按下时距离元素上边的距离
      // 鼠标移动
      document.onmousemove = function (e) {
        let x = e.pageX - disX // 鼠标移动时距离元素左边的距离
        let y = e.pageY - disY // 鼠标移动时距离元素上边的距离
        const maxX = el.parentNode.offsetWidth - el.offsetWidth // 元素可移动的最大横向距离
        const maxY = el.parentNode.offsetHeight - el.offsetHeight // 元素可移动的最大纵向距离
        // 元素不能超出父元素的范围
        if (x < 0) {
          x = 0
        } else if (x > maxX) {
          x = maxX
        }
        // 元素不能超出父元素的范围
        if (y < 0) {
          y = 0
        } else if (y > maxY) {
          y = maxY
        }
        el.style.left = x + 'px' // 改变元素的 left 值
        el.style.top = y + 'px' // 改变元素的 top 值
      }
      // 鼠标松开
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null
      }
    }
  },
}
export default draggable
