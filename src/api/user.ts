import http from '@/utils/http'
// 用户登录
interface UserRuleForm {
  username: string
  password: string
}
interface ILoginRequest {
  code: string
  message: string
  data?: string | null
}
//用户登录
export const login = (params: UserRuleForm) => {
  return http.request(
    {
      url: '/login',
      method: 'POST',
      params,
    },
    {
      isShowSuccessMessage: true,
    },
  )
}
//用户退出
export const logout = (params: UserRuleForm) => {
  return http.request(
    {
      url: '/logout',
      method: 'POST',
      params,
    },
    {
      isShowSuccessMessage: true,
    },
  )
}
// 获取用户信息
export const getInfo = (params?: object) => {
  return http.request(
    {
      url: '/getInfo',
      method: 'POST',
      params,
    },
    {
      isShowSuccessMessage: false,
    },
  )
}
// 获取菜单列表
export const getUserMenu = (params?: object): any => {
  return http.request(
    {
      url: '/getUserMenu',
      method: 'POST',
      params,
    },
    {
      isShowSuccessMessage: false,
    },
  )
}
