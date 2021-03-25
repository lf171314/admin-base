export * from './formatter'
export * from './query'
export * from './merge'
export * from './storage'
export * from './constants'
export * from './user'

export const noop = () => {}

export const identity = _ => _

const hasOwnProperty = Object.prototype.hasOwnProperty

export const hasOwn = (obj, prop) => hasOwnProperty.call(obj, prop)

/**
 * @description 删除数组的某一项
 * @author lf
 * @param {array} arr 源数组
 * @param {boolean|string|number} item 数组内的一项
 */
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * @description 判断该值不是一个空值
 * @author lf
 * @param {any} val
 */
export function isDef(val) {
  return val !== null && val !== undefined
}

/**
 * @description 判断该值是一个空值
 * @author lf
 * @param {any} val
 */
export function isUndef(val) {
  return val == null
}

/**
 * @description 获取一个数据的数据类型
 * @author lf
 * @param {any} value
 */
export function getPlainType(value) {
  return Object.prototype.toString
    .call(value)
    .slice(8, -1)
    .toLowerCase()
}

/**
 * @description 首字母大写
 * @author lf
 * @export
 * @param {string} str 需要被处理的字符串
 */
export function capitalize(str) {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1)
}

/**
 * @description 获取当前域名完整地址
 * @author lf
 */
export function getOriginAddress() {
  if (location.origin) return location.origin
  return `${location.protocol}//${location.hostname}${location.port ? ':' + location.prot : ''}`
}

/**
 * @description 下载操作
 * @author lf
 * @param {object} file 下载文件配置 filePath, fileName
 */
export function downloadFile(file) {
  if (typeof file.filePath !== 'string') return
  const a = document.createElement('a')
  const filePath = window.URL.createObjectURL(file.filePath)
  a.href = filePath
  a.download = file.fileName
  document.body.appendChild(a)
  a.click()
  document.removeChild(a)
  window.URL.revokeObjectURL(filePath)
}
