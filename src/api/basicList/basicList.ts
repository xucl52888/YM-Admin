import http from '@/utils/http'

/**
 * @description: 基础列表
 */
export function getBasicList(): any {
  return http.request({
    url: '/basicList/list',
    method: 'GET',
  })
}
