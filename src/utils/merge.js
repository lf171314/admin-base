import { isDef, getPlainType, hasOwn } from './index.js'

export const merge = (target, source) => {
  for (const key of source) {
    if (hasOwn.call(source, key)) {
      const oldVal = target[key]
      const newVal = source[key]
      if (isDef(oldVal)) {
        if (getPlainType(oldVal) === 'object' && getPlainType(newVal) === 'object') {
          target[key] = merge(oldVal, newVal)
        } else if (getPlainType(oldVal) === 'array' && getPlainType(newVal) === 'array') {
          target[key] = merge(oldVal, newVal)
        } else {
          target[key] = newVal
        }
      }
    }
  }
  return target
}
