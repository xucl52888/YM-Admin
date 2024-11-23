<template>
  <!-- 过度动画 -->
  <section class="loader_ly" v-if="themeIsOverAnimated">
    <div class="slider_ly" style="--i: 0"></div>
    <div class="slider_ly" style="--i: 1"></div>
    <div class="slider_ly" style="--i: 2"></div>
    <div class="slider_ly" style="--i: 3"></div>
  </section>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, watch } from 'vue'
// console.log('环境变量', import.meta.env.MODE, import.meta.env.VITE_ENV)
// console.log('环境变量接口地址', import.meta.env.VITE_BASE_URL)
// console.log('环境变量标题', import.meta.env.VITE_TITLE)

// 主题
import { useProjectSettingStore } from '@/store/projectSetting'
onBeforeMount(() => {
  // 获取当前主题
  const dark = ref<string | null>(useProjectSettingStore().elementTheme)
  const element = document.querySelector('html') as HTMLElement | null
  if (element) {
    if (dark.value === 'dark') element.className = 'dark'
    else element.className = 'light'
  }
})

const themeIsOverAnimated = ref(false)
const themeConversion = () => {
  themeIsOverAnimated.value = true
  setTimeout(() => {
    themeIsOverAnimated.value = false
  }, 1000)
}

watch(
  () => useProjectSettingStore().elementTheme,
  (newVal, oldVal) => {
    console.log(newVal, oldVal, 2222)
    themeConversion()
  },
)
</script>
<style lang="scss">
@import './styles/style.scss';
/* ---------切换路由过度动画------------ */
.loader_ly {
  z-index: 9999999999999999999;
  background-color: white;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  /* 禁止滚动条出现 */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.slider_ly {
  overflow: hidden;
  background-color: white;
  margin: 0 15px;
  height: 85px;
  width: 16px;
  border-radius: 15px;
  box-shadow:
    15px 15px 20px rgba(0, 0, 0, 0.1),
    -15px -15px 30px #fff,
    inset -5px -5px 10px rgba(0, 0, 255, 0.1),
    inset 5px 5px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  transform: translateY(-7px);
}

.slider_ly::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  border-radius: 100%;
  box-shadow:
    inset 0px 0px 0px rgba(0, 0, 0, 0.3),
    0px 420px 0 400px #ff6b6b,
    inset 0px 0px 0px rgba(0, 0, 0, 0.1);
  animation: dhLy 2s ease-in-out infinite;
  animation-delay: calc(-1s * var(--i));
}

@keyframes dhLy {
  0% {
    transform: translateY(60px);
    filter: hue-rotate(0deg);
  }

  50% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(60px);
    filter: hue-rotate(360deg);
  }
}

/* ---------切换路由过度动画end------------ */
</style>
