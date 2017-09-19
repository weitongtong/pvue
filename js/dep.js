/**
 * 主题发布
 * @class Dep
 */
class Dep {
  constructor() {
    // 主题的订阅者们
    this.subs = []
  }

  /**
   * 添加订阅者
   * @param {watcher} sub 订阅者
   * @memberof Dep
   */
  addSub(sub) {
    this.subs.push(sub)
  }

  /**
   * 发布信息（通知订阅者）
   * @memberof Dep
   */
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

export default Dep