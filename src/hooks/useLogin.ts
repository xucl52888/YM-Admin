//路由
import router from '@/router'

//store
import { userStore } from '@/store/userStore'
import { useMenuStore } from '@/store/useMenuStore'

import { storage } from '@/utils/Storage'

//element-plus
import { ElMessage } from 'element-plus'

const useLogin = async (res) => {
  //1. 持久化存储token
  const token = res.token
  const ex = 7 * 24 * 60 * 60
  storage.set('TOKEN', token || '', ex)
  userStore().setToken(token)

  //2. 获取用户信息
  await userStore().getUserInfo()

  //3. 获取路由
  await useMenuStore().getMenu()

  //4. 跳转后台管理系统首页
  router.push('/home')

  return
}

export default useLogin
