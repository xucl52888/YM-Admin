<template>
  <div class="login-container flex h-screen items-center justify-center">
    <div class="login-box flex items-center justify-around">
      <!-- 换肤 -->
      <el-button
        @click="handleThemeSwitch($event)"
        :icon="useProjectSettingStore()?.elementTheme === 'dark' ? 'Sunny' : 'Moon'"
        circle
        size="large"
        class="absolute right-10 top-10"
      />

      <!-- 登录页图片 -->
      <el-image :src="loginImg" style="width: 720px; height: 720px" />

      <!-- 登录表单区域 -->
      <el-card style="width: 400px">
        <el-form :model="loginForm" ref="LoginForm" label-width="0" class="w-full" @submit.prevent="onLogin" size="large">
          <h2 class="mb-6 text-center text-xl font-semibold">登录</h2>

          <!-- 用户名输入框 -->
          <el-form-item prop="username">
            <el-input prefix-icon="user" clearable v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <!-- 密码输入框 -->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="lock" clearable show-password></el-input>
          </el-form-item>

          <!-- 记住密码选项 -->
          <el-form-item>
            <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
          </el-form-item>

          <!-- 登录按钮 -->
          <el-form-item>
            <el-button type="primary" class="w-full" @click="onLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { login } from '@/api/user'
import loginImg from '@/assets/login-left.svg'
import { useProjectSettingStore } from '@/store/projectSetting'
import { useThemeSwitcher } from '@/hooks/useThemeSwitcher'

const loginForm = ref({
  username: 'admin',
  password: '111111',
  remember: false,
})

//换肤
const { changeThemeWithTransition } = useThemeSwitcher()
const handleThemeSwitch = (e) => {
  changeThemeWithTransition(e)
}

//hooks
import useLogin from '@/hooks/useLogin'
const onLogin = async () => {
  let res = await login(loginForm.value)
  if (res) {
    // console.log(res, 'login')
    //调用hooks
    useLogin(res)
    //记住密码
    // setMemoPassWord()
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background: #eee;
  background-image: url('@/assets/login-bg.svg');
  background-size: cover;
  padding: 50px;
  .login-box {
    position: relative;
    box-sizing: border-box;
    padding: 0 50px;
    width: 100%;
    height: 100%;
    background-color: #fffc;
    border-radius: 10px;
  }
}
</style>
