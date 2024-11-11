//关于路由
export interface Meta {
  title: string
  icon: string
  noCache: boolean
  link: string | null
}
export interface Child {
  id: string
  name: string
  path: string
  hidden: boolean
  component: string
  meta: Meta
}
export interface Parent {
  id?: string
  name?: string
  hidden?: boolean
  redirect?: string
  component?: string
  alwaysShow?: boolean
  query?: string
  path?: string
  meta?: Meta
  children?: Child[]
}
//用户信息
export interface IUserInfo {
  id: string
  username: string
  realName: string
  userType: number
  email: string
  phone: string
  gender: number
  avatar: string
  enabled: number
  delFlag: number
  remark: string | null
}
