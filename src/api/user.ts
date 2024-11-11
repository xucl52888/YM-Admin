import http from '@/utils/http/axios'
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
export const login = (data: UserRuleForm) => {
  return http.post('/login', data)
}
//用户退出
export const logout = (data?: UserRuleForm) => {
  return http.post('/logout')
}
export const getInfo = () => {
  return http.post('/getInfo')
}
export const getUserMenu = (data?: String): any => {
  return http.post('/getUserMenu', data)
}
