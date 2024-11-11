import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { AxiosCanceler } from './axiosCancel'

// 创建axios实例
const request = axios.create({
  baseURL: '/api',
})
const axiosCanceler = new AxiosCanceler()

// 请求拦截器
request.interceptors.request.use(
  function (config: AxiosRequestConfig): any {
    const token: string | null = localStorage.getItem('TOKEN')
    if (token) config.headers['Authorization'] = token

    // 添加请求
    axiosCanceler.addPending(config)

    return config
  },
  function (error) {
    console.log(error, '请求拦截器错误')
  },
)

// 响应拦截器
request.interceptors.response.use(
  //响应成功
  function (response): any {
    axiosCanceler.removePending(response.config)
    const { code, msg } = response.data
    console.log(response.data, 888)
    if (response.data.code === 200) {
    }
    return response
  },
  // 响应错误
  function (error) {
    // 这里要提示错误信息
    console.log(error, '响应拦截器错误')
  },
)

/**
 * @request  封装axios请求
 * @params url 请求地址
 * @params params 请求参数
 * @params config 请求配置
 * @returns Promise
 */
const http = {
  get<T>(url: string, params?: any, config?: object): Promise<T> {
    return new Promise((resolve, reject) => {
      // request get 请求
      request
        .get<T>(url, { params, ...config })
        .then((res: AxiosResponse) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  post<T>(url: string, params?: any, config?: object): Promise<T> {
    return new Promise((resolve, reject) => {
      // request post 请求
      request
        .post<T>(url, params, config)
        .then((res: AxiosResponse) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}

export default http
