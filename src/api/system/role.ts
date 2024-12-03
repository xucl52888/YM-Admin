import http from '@/utils/http'

/**
 * @description: 角色列表
 */
export function getRoleList(): any {
  return http.request({
    url: '/role/list',
    method: 'GET',
  })
}
