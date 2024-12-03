import Mock from 'mockjs'

export function resultSuccess(result, { message = 'ok' } = {}) {
  return Mock.mock({
    code: 200,
    result,
    message,
    type: 'success',
  })
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export function doCustomTimes(times: number, callback: any) {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}
