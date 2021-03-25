import axios from 'axios'
import qs from 'qs'
import { notification } from 'ant-design-vue'
import { isDef, isUndef, getPlainType, accessToken } from '../utils'

const pending = new Map()

const addPending = config => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pending.has(url)) {
        pending.set(url, cancel)
      }
    })
}

const removePending = config => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  if (pending.has(url)) {
    const cancel = pending.get(url)
    cancel(config.url)
    pending.delete(url)
  }
}

// 基本实例
const service = axios.create()
// request 拦截器
service.interceptors.request.use(config => {
  removePending(config)
  // 表单序列化
  if (
    config.headers['Content-Type'] === 'application/x-www-form-urlencoded' &&
    getPlainType(config.data) === '[object Object]'
  ) {
    config.data = qs.stringify(config.data)
  }

  // 处理 token
  config.headers[accessToken] = ''

  // 序列化 get 请求参数
  config.paramsSerializer = params => {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  }
  // 取消非 get 的重复请求
  if (config.method.toUpperCase() !== 'GET') {
    addPending(config)
  }
  return config
})

/**
 * @description 接口返回数据说明
 * @version 1.0.0
 * code 状态码 200 => success
 * data 请求返回数据
 * msg 返回信息
 */
// response 拦截器
service.interceptors.response.use(
  response => {
    const { code, data, message } = response.data

    // 后续增加多个 code
    // 细化不同业务场景

    // 后台错误
    if (code === '500') {
      notification.error({
        title: '系统错误',
        description: message
      })
      return Promise.reject(message)
    }

    // 后端检查传参错误
    if (code === '406') {
      notification.warning({
        title: '参数错误',
        description: message
      })
      return Promise.reject(message)
    }

    if (code === '206') {
      notification.warning({
        title: '查看限制',
        description: message
      })
    }

    // 204 仅需要 alert message 时
    // 此时不需要关注 data 数据
    // 处理图片接口数据问题
    if (code === '204' || (isUndef(data) && response.data?.type.indexOf('image') === -1)) {
      notification.success({
        title: message || '提交成功'
      })
    }
    // 200
    // 后端约定 data 不为 null 跟 undefined
    if (code === '200' && isDef(data)) {
      return data
    }
    // 其余
    return response.data
  },
  err => {
    let message = err.message
    if (!err.__CANCEL__) {
      // 处理 取消请求报错问题
      switch (err.response?.status) {
        case 404:
          message = `没有找到资源路径：${err.config.url}`
          break
        case 500:
          message = '服务器错误，请联系管理员!'
          break
        case 502:
          message = '服务器宕机，请联系管理员!'
          break
        case 503:
          message = '当前访问人数过多，请稍后访问!'
          break
      }
      notification.error({
        title: '警告',
        description: message || '服务器错误，请联系管理员!'
      })
    }

    return Promise.reject(message)
  }
)

// 清除请求
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}

export default service
