<template>
  <div class="login flex h-screen w-screen items-center justify-center">
    <div class="rounded-xl bg-white p-8">
      <h1 class="mb-4 text-center">登录</h1>
      <el-form :model="form" label-width="auto" class="w-96">
        <el-form-item label="账号">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="primary" @click="onSubmit">登录</el-button>
          <el-button class="w-full" type="primary" @click="onlogout">退出登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { login, logout } from '@/api/user'
const form = reactive({
  name: 'admin',
  password: '111111',
})

const onSubmit = async () => {
  console.log('submit!', form)
  let res = await login(form)
  if (res) {
    console.log(res, 'login')
  }
}
const onlogout = async () => {
  let res = await logout()
  if (res) {
    console.log(res, 'login')
  }
}
</script>

<style lang="scss" scoped>
.login {
  background-image: url('@/assets/bg.webp');
}
</style>
