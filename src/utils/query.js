import { getPlainType } from './index'

/**
 * @description 获取url上问号后面参数的值
 * @author lf
 * @param {string} name 想要获取的name
 * @returns 该值的value
 */
export function getQueryString(name) {
  var reg = new RegExp('(^|&|\\?)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.href.match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return null
}

/**
 * @description 路由参数追加
 * @author lf
 * @param {string|object<VueRouter>} url
 * @param {string|object} query
 * @returns
 */
export function appendQuery(url, query) {
  // 处理 router 参数
  if (typeof url === 'object') {
    url = Object.assign({}, url, {
      query
    })
  } else if (typeof url === 'string') {
    url += url.indexOf('?') > -1 ? '&' : '?'
    if (typeof query === 'object') {
      Object.keys(query).forEach(key => {
        url += `${key}=${query[key]}&`
      })
      url.replace(/&$/, '')
    } else {
      url += query
    }
  }
  return url
}

/**
 * @description 判断一个字符串是不是json
 * @author lf
 * @param {string} val 字符串
 */
export function isJSON(val) {
  if (typeof val !== 'string') {
    return false
  }
  try {
    const obj = JSON.parse(val)
    if (['object', 'array'].includes(getPlainType(obj))) {
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

/**
 * @description 将对象放入 FormData 内
 * @author lf
 * @param {object} data 需要处理的数据对象
 */
export function appendFormData(data) {
  const form = new FormData()
  Object.keys(data).forEach(key => {
    form.append(key, data[key])
  })
  return form
}
