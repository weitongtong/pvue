import Watcher from './watcher'

/**
 * 编译 html 节点
 * view -> data: 监听 绑定属性对应的 元素 的事件，并把视图中最新的数据更新到 vue 对象中
 * data -> view: 绑定 vue 对象中对应的属性值，更新对应的 html
 * @class Compile
 */
class Compile {
  /**
   * 构造函数
   * @param {Element} node html 节点
   * @param {Vue} vm vue 实例
   * @memberof Compile
   */
  constructor(node, vm) {
    this.node = node
    this.vm = vm
  }

  /**
   * 编译
   * @param {Element} node 
   * @param {Vue} vm 
   * @memberof Compile
   */
  _compile(node, vm) {
    const reg = /\{\{(.*)\}\}/
    /**
     * 是元素节点
     */
    if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.attributes)
      .filter(attr => (attr.nodeName === 'v-model'))
      .forEach(attr => {
        const name = attr.nodeValue
        node.value = vm[name]
        new Watcher(vm, node, name.trim())
        /**
         * 绑定事件，并给相应的属性赋值
         */
        node.addEventListener('input', e => {
          vm[name] = e.target.value
        })
      })
    }
    /**
     * 是文本节点
     */
    else if (node.nodeType === Node.TEXT_NODE) {
      if (reg.test(node.nodeValue)) {
        const name = RegExp.$1
        // 新增一个订阅者
        new Watcher(vm, node, name.trim())
      }
    }
  }

  /**
   * 将节点装成文档片段，并编译各个节点
   * @param {Element} node 节点
   * @param {Vue} vm vue 实例
   * @returns {DocumentFragment} 文档片段
   * @memberof Compile
   */
  _node2Fragment(node, vm) {
    const documentFragment = document.createDocumentFragment()
    let child = node.firstChild
    while (child) {
      this._compile(child, vm)
      documentFragment.appendChild(child)
      child = node.firstChild
    }
    return documentFragment
  }

  /**
   * 外部调用
   * @memberof Compile
   */
  node2Fragment() {
    return this._node2Fragment(this.node, this.vm)
  }

}

export default Compile