import http from '@/utils/http/axios'
// 用户登录
interface UserRuleForm {
  name: string
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
//用户登录
export const logout = (data?: UserRuleForm) => {
  return http.post('/logout')
}
