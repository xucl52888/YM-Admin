import { resultSuccess, doCustomTimes } from '../_util'

const roleList = (pageSize) => {
  const result: any[] = []
  doCustomTimes(pageSize, () => {
    result.push({
      id: '@integer(10,100)',
      name: '@cname()',
      role: '@ctitle()',
      'sex|1': ['0', '1'],
      'age|1-100': 100,
      address: '@csentence()',
      create_date: `@date('yyyy-MM-dd hh:mm:ss')`,
    })
  })
  return result
}

export default [
  {
    url: '/api/basicList/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query
      const list = roleList(Number(pageSize))
      return resultSuccess({
        page: Number(page),
        pageSize: Number(pageSize),
        pageCount: 60,
        list,
      })
    },
  },
]
