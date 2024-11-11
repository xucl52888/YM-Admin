<template>
  <div class="login-bg flex h-screen items-center justify-center bg-cover bg-center">
    <!-- 登录表单区域 -->
    <div class="w-full max-w-md rounded-lg bg-white bg-opacity-80 p-8 shadow-lg backdrop-blur-sm">
      <el-form :model="loginForm" ref="LoginForm" label-width="80px" class="w-full" @submit.prevent="onLogin">
        <h2 class="mb-6 text-center text-2xl font-semibold text-gray-800">登录</h2>

        <!-- 用户名输入框 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <!-- 密码输入框 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { login } from '@/api/user'
const loginForm = ref({
  username: 'admin',
  password: '111111',
  remember: false,
})

//hooks
import useLogin from '@/hooks/useLogin'
const onLogin = async () => {
  let res = await login(loginForm.value)
  if (res) {
    console.log(res, 'login')
    //调用hooks
    useLogin(res)
    //记住密码
    // setMemoPassWord()
  }
}
</script>

<style lang="scss" scoped>
.login-bg {
  background-image: url('@/assets/bg.webp');
}
</style>
