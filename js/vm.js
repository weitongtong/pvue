import Observe from './observe.js'
import Compile from './compile.js'

/**
 * Vue 对象
 * @class Vue
 */
class Vue{
  constructor(options) {
    this.el = options.el
    this.data = options.data

    // 监听this(vm) 这个对象的 data 属性
    new Observe(this.data, this)

    // 初始化 文档上数据
    const el = document.querySelector(this.el)
    el.appendChild(new Compile(el, this).node2Fragment())
    
  }
}
