<template>
  <div class="pb-4">安全设置</div>
  <el-card shadow="never" style="border: 0" :body-style="{ padding: 0 }">
    <div class="flex flex-col">
      <!--  -->
      <el-card shadow="never" style="border: 0" :body-style="{ padding: '10px 20px' }">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <div>账户密码</div>
            <div class="mt-1 text-xs text-gray-500">绑定手机和邮箱，并设置密码，帐号更安全</div>
          </div>
          <el-button type="primary" link> 修改 </el-button>
        </div>
      </el-card>
      <el-divider style="margin: 0" />
      <!--  -->
      <el-card shadow="never" style="border: 0" :body-style="{ padding: '10px 20px' }">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <div>绑定手机</div>
            <div class="mt-1 text-xs text-gray-500">已绑定手机号：+86189****4877</div>
          </div>
          <el-button type="primary" link> 修改 </el-button>
        </div>
      </el-card>
      <el-divider style="margin: 0" />
      <!--  -->
      <el-card shadow="never" style="border: 0" :body-style="{ padding: '10px 20px' }">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <div>密保问题</div>
            <div class="mt-1 text-xs text-gray-500">未设置密保问题，密保问题可有效保护账户安全</div>
          </div>
          <el-button type="primary" link> 设置 </el-button>
        </div>
      </el-card>
      <el-divider style="margin: 0" />
      <!--  -->
      <el-card shadow="never" style="border: 0" :body-style="{ padding: '10px 20px' }">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <div>个性域名</div>
            <div class="mt-1 text-xs text-gray-500">已绑定域名：https://www.xxxxxx.com</div>
          </div>
          <el-button type="primary" link> 修改 </el-button>
        </div>
      </el-card>
    </div>
  </el-card>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss"></style>
