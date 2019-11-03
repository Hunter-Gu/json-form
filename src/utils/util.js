/**
 * @description 判断一个对象是否是纯对象
 * @param obj {any}
 * @return {Boolean}
 */
export function isPlainObj(obj) {
  return Object.prototype.toString.call(obj).toLowerCase() === '[object object]'
}

export function isRegExp(reg) {
  return Object.prototype.toString.call(reg).toLowerCase() === '[object regexp]'
}
