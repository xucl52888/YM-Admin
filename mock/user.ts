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

const adminMenu = [
  {
    id: '1',
    name: '首页',
    path: '/home',
    redirect: null,
    parentView: 'layout',
    component: 'home/index',
    query: null,
    alwaysShow: null,
    type: 1,
    meta: {
      title: '首页',
      icon: 'el-icon-house',
      noCache: false,
      hidden: false,
      affix: true,
      link: '',
    },
    children: null,
  },
  {
    id: '2',
    name: '仪表盘',
    path: '/dashboard',
    redirect: null,
    parentView: 'layout',
    component: null,
    query: null,
    alwaysShow: true,
    type: 0,
    meta: {
      title: '仪表盘',
      icon: 'el-icon-copy-document',
      noCache: false,
      hidden: false,
      affix: false,
      link: '',
    },
    children: [
      {
        id: '1564631321353',
        name: '主控台',
        path: '/dashboard/console',
        redirect: null,
        parentView: 'layout',
        component: 'dashboard/consol/index',
        query: null,
        alwaysShow: null,
        type: 1,
        meta: {
          title: '主控台',
          icon: 'el-icon-house',
          noCache: false,
          hidden: false,
          affix: true,
          link: '',
        },
        children: null,
      },
      {
        id: '1647154306278797312',
        name: '工作台',
        path: '/dashboard/workplace',
        redirect: '',
        parentView: 'layout',
        component: 'dashboard/workplace/index',
        query: null,
        alwaysShow: null,
        type: 1,
        meta: {
          title: '工作台',
          icon: 'el-icon-user',
          noCache: false,
          hidden: false,
          affix: false,
          link: '',
        },
        children: null,
      },
    ],
  },
]

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
