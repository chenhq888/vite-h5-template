import axios from "axios"
import { getToken } from "./cache/cookies"

const defultConfig = {
  baseURL: import.meta.env.VITE_BASE_URL || '',
  timeout: 0,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
}
class RequestHttp {
  constructor(config) {
    this.service = axios.create(config)
    this.interceptors.request.use(
      config => {
        if (getToken()) {
          config.headers.Authorization = getToken()
        }
        return config;
      },
      error => {
        return Promise.reject(error)
      }
    )
    this.interceptors.response.use(
      res => {
        const { code, result } = res.data
        const isSuccess =
          code === '200' && Reflect.has(res.data, 'code') && result
        if (isSuccess) {
          return result
        } else {
          return Promise.reject(res.data)
        }
      },
      error => {
        // 处理 HTTP 网络错误
        let message = ""
        // HTTP 状态码
        const status = error.response?.status
        switch (status) {
          case 400:
            message = "请求错误";
            break;
          case 401:
            message = "未授权，请登录";
            break;
          case 403:
            message = "拒绝访问";
            break;
          case 404:
            message = `请求地址出错: ${error.response?.config?.url}`;
            break;
          case 500:
            message = "服务器内部错误";
            break;
          case 504:
            message = "网关超时"
            break;
          default:
            message = "网络连接故障";
        }
        return Promise.reject(message)
      }
    )
  }
  get(url, params, config = {}) {
    return this.service.get(url, { params, ...config })
  }
  post(url, params, config = {}) {
    return this.service.post(url, params, config)
  }
  put(url, params, config = {}) {
    return this.service.post(url, params, config)
  }
}

export default new RequestHttp(defultConfig)
