import Dep from './dep.js'

/**
 * 观察者
 * @class Observe
 */
class Observe{
  /**
   * 监听 vm 中 data 的各个属性
   * @param {Object} obj 
   * @param {Vue} vm 
   * @memberof Observe
   */
  constructor(obj, vm) {
    this.obj = obj
    this.vm = vm
    Object.keys(obj).forEach(key => this.defineReactive(vm, key, obj[key]))
  }
  
  /**
   * 响应式的数据绑定函数
   * @param {Object} obj 目标对象(vm)
   * @param {String} key 属性key
   * @param {String} val 属性value
   * @memberof Observe
   */
  defineReactive(obj, key, val) {
    // 定义一个主题类， 每个 data 中的属性都对应一个主题类，负责添加订阅者和发布信息
    const dep = new Dep()

    Object.defineProperty(obj, key, {
      get() {
        // 添加订阅者 watcher 到主题对象 Dep 中
        if (Dep.target) {
          dep.addSub(Dep.target)
        }
        return val
      },
      set(newVal) {
        if (newVal === val) {
          return
        }
        val = newVal
        // 发布通知
        dep.notify()
      }
    })
  }
}

export default Observe