//路由
import router from '@/router'

//store
import { userInfoStore } from '@/store/userInfoStore'
import { useMenuStore } from '@/store/useMenuStore'

import { getUserMenu } from '@/api/user'
import { getInfo } from '@/api/user'
import { initRouter } from '@/hooks/useInitTouter'

const useLogin = async (res) => {
  //1. 持久化存储token
  const token = res.token
  userInfoStore().setToken(token)

  //2. 获取用户信息
  await getInfo({ userId: userInfoStore().rolePerm })

  //3. 获取路由
  const data = await getUserMenu({ userId: userInfoStore().rolePerm })
  await useMenuStore().setMenu(data)
  await initRouter()

  //4. 跳转后台管理系统首页
  router.push('/dashboard/workplace')

  return
}

export default useLogin
