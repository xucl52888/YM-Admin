import Mock from 'mockjs'

const Random = Mock.Random

const token = Random.string('upper', 32, 32)

const resultSuccess = (result, { message = '操作成功' } = {}) => {
  return Mock.mock({
    code: 200,
    result,
    message,
    type: 'success',
  })
}

const adminInfo = {
  userId: '1',
  username: 'admin',
  realName: 'Admin',
  avatar: Random.image(),
  desc: 'manager',
  password: Random.string('upper', 4, 16),
  token,
  permissions: [
    {
      label: '主控台',
      value: 'dashboard_console',
    },
    {
      label: '监控页',
      value: 'dashboard_monitor',
    },
    {
      label: '工作台',
      value: 'dashboard_workplace',
    },
    {
      label: '基础列表',
      value: 'basic_list',
    },
    {
      label: '基础列表删除',
      value: 'basic_list_delete',
    },
  ],
}

const adminMenu = []

export default [
  {
    url: '/api/login',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess({ token })
    },
  },
  {
    url: '/api/logout',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess(null, { message: '退出成功' })
    },
  },
  {
    url: '/api/getInfo',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess(adminInfo)
    },
  },
  {
    url: '/api/getUserMenu',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess(adminMenu)
    },
  },
]
