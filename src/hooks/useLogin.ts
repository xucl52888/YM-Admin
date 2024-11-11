//路由
import router from '@/router'

//store
import { userStore } from '@/store/userStore'
import { useMenuStore } from '@/store/useMenuStore'

//element-plus
import { ElMessage } from 'element-plus'

const useLogin = async (res) => {
  //判断是否登录成功
  if (res.code != '200') return ElMessage.error(res.msg)

  //1. 持久化存储token
  const token = res.data
  localStorage.setItem('TOKEN', token || '')

  //2. 获取用户信息
  await userStore().getUserInfo()

  //3. 获取路由
  await useMenuStore().getMenu()

  //4. 跳转后台管理系统首页
  router.push('/home')

  return
}

export default useLogin
