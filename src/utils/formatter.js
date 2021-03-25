/**
 * @description 毫秒转换成时分秒显示
 * @author lf
 * @export
 * @param {string|number} time 毫秒数
 * @param {string} [emptyText='-'] 空文本显示
 * @param {boolean} [isSecond=false] time 是否为秒
 */
export function formatTime(time, emptyText = '-', isSecond = false) {
  let result = emptyText === '-' ? '' : emptyText
  // 检查 time 是否为一个有效的数字或者字符串数字
  if (typeof time !== 'string' && typeof time !== 'number') return emptyText
  if (isNaN(Number(time)) || time === '') return emptyText

  // 转换成秒计算
  if (!isSecond) time = time / 1000

  const TIME_MAP = {
    60: '分钟',
    3600: '小时',
    [24 * 3600]: '天',
    [30 * 24 * 3600]: '个月',
    [12 * 30 * 24 * 3600]: '年'
  }
  // Object.keys 内部会排序
  const TIME_KEYS = Object.keys(TIME_MAP).reverse()
  // 查找单位索引
  const current = TIME_KEYS[TIME_KEYS.findIndex(key => time >= key)] || 1

  if (time < 60 && time >= 0) return result + time + '秒'
  // 计算当前单位的数量
  const num = parseInt(time / current)
  result += num + TIME_MAP[current]
  // 将当前值传给下次循环
  // 优化 0 值
  const over = time - current * num
  if (!over) return result
  return formatTime(over, result, true)
}

/**
 * @description 字节大小转换成最大单位显示
 * @author lf
 * @param {string|number|object} opts 配置 {emptyText, decimal, isByte, native}
 */
export function formatSize(opts) {
  // 处理配置信息 默认值
  // emptyText 0 或者 空 时显示的内容 默认 '-'
  // isByte 传入的是不是 byte 单位 默认 true
  // decimal 保留几位小数 默认 2
  // native 是否显示原本内容 默认 false
  const emptyText = opts.emptyText || '-'
  const isByte = opts.isByte || true
  const decimal = opts.decimal || 2
  const native = opts.native || false
  let size = opts
  if (typeof opts === 'object') size = opts.size

  // 检查 time 是否为一个有效的数字或者字符串数字
  if (typeof size !== 'string' && typeof size !== 'number') return emptyText
  if (isNaN(Number(size) || size === '')) return emptyText

  // 默认传入是 KB
  // 转换成 Byte
  if (!isByte) size = size * 1024

  const SIZE_KEYS = ['B', 'KB', 'MB', 'GB', 'TB']
  // 找到第一个比 size 大的索引
  const index = SIZE_KEYS.findIndex((v, i) => Math.pow(2, 10 * i) > size) - 1

  if (index < 2 && !native) return '小于1MB'

  const result = parseFloat(size / Math.pow(2, 10 * index)).toFixed(decimal) + SIZE_KEYS[index]
  // 去除 .00
  return result.replace(/\.0*$/, '')
}

/**
 * @description 字符串截取显示省略号
 * @author lf
 * @param {string} str 被截取的字符串
 * @param {number} [L=20] 截取长度，按照字节截取，默认为 20
 * @param {boolean} [addEllipsis=true] 是否添加省略号，默认添加
 * @returns 截取后的字符串
 */
export function cutStr(str, L = 20, addEllipsis = true) {
  if (typeof str !== 'string') {
    return str
  }
  let result = ''
  const strlen = str.length // 字符串长度
  // eslint-disable-next-line no-control-regex
  const chrlen = str.replace(/[^\x00-\xff]/g, '**').length // 字节长度

  if (chrlen <= L) {
    return str
  }

  for (var i = 0, j = 0; i < strlen; i++) {
    var chr = str.charAt(i)
    // eslint-disable-next-line no-control-regex
    if (/[\x00-\xff]/.test(chr)) {
      j++ // ascii码为0-255，一个字符就是一个字节的长度
    } else {
      j += 2 // ascii码为0-255 以外，一个字符就是两个字节的长度
    }
    if (j <= L) {
      // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
      result += chr
    } else {
      // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
      if (addEllipsis) {
        return result + '...'
      }
      return result
    }
  }
}

/**
 * @description 日期格式化
 * @author lf
 * @param {string|date|number} time 格式化的时间
 * @param {string} [format='yyyy-mm-dd'] 需要显示的格式
 * @returns 格式化的日期字符串
 */
export function formatDate(time, format = 'yyyy-mm-dd') {
  if (!time) return ''
  const date = new Date(time)
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const dateStr = format.replace(/(y|m|d|h|i|s|a)+/gi, (match, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return dateStr
}

/**
 * @description 空值过滤 NaN null undefined '' 'null' 'undefined' 算为空值
 * @author lf
 * @param {string|number|null|undefined} val 被判断的值
 * @param {string} [emptyText='-'] 当被判断的值为空时显示的内容，默认为 '-'
 */
export function emptyFilter(val, emptyText = '-') {
  if (val == null || val === '' || isNaN(val) || val === 'null' || val === 'undefined')
    return emptyText
  return val
}

/**
 * @description 数字货币化显示 10000 => "10,000"
 * @author lf
 * @param {number} num
 */
// export function toThousandFilter(num) {
//   return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
// }
// const numberFormat = (local = 'en-US', options = {}) => new Intl.NumberFormat(local, options)
export function toThousandFilter(num, local, options) {
  // return numberFormat(local, options).format(num)
  return num.toLocaleString()
}
