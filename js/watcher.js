import Dep from './dep.js'

/**
 * 主题订阅
 * @class Watcher
 */
class Watcher {
  /**
   * 构造函数
   * @param {Vue} vm vue实例
   * @param {Element} node 节点
   * @param {String} name 绑定的属性的名称
   * @memberof Watcher
   */
  constructor(vm, node, name) {
    this.vm = vm
    this.node = node
    this.name = name

    // Dep.target 存储了当前的观察者
    Dep.target = this

    // 订阅者执行一次更新视图
    this.update()

    // 设置Dep.target 为 null, 确保再次调用属性 getter 时，不会重复添加 watcher
    Dep.target = null
  }

  /**
   * 执行 this.vm[this.name] 时，由于数据已经被 observe 了，所以，会调用对应的 getter 方法
   * 
   * 所以，这句话会做两件事
   * 1. 从 vm 中获取数据，并赋值到 this.value 中
   * 2. 添加当前 watcher 对象到属性的 dep 中，即订阅属性的变化
   * @memberof Watcher
   */
  get() {
    this.value = this.vm[this.name]
  }

  /**
   * 更新 this.value ，更新视图，这个方法初始化时需要调用
   * 当主题发布信息时 调用 notify 方法，也会调用
   * @memberof Watcher
   */
  update() {
    // 更新 this.value
    this.get()

    // 更新视图，实际处理过程中会更复杂
    if (this.node.nodeValue === null) { // Element 文档节点
      this.node.value = this.value
      return
    }
    this.node.nodeValue = this.value
  }
}

export default Watcher