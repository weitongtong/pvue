## Quick Start

``` bash
$ npm run webpack
$ open index.html
```

## Introduction

- vm.js

  定义了 Vue 类，构造函数传入 options 参数。

  内部声明 el data 等属性。

  调用observe。

  调用compile，并挂载到dom。

- observe.js

  定义了 Observe (观察者) 类，构造函数传入 obj(数据对象) 和 vm(vue实例)。

  Object.defineProperty 监听数据对象的所有属性，并给每个属性创建Dep(管理当前属性的所有订阅者watcher)类

    getter: dep.addSub() 添加订阅者watcher(在compile时会创建watcher，然后会挂到Dep的静态属性中，方便这边获取)到 当前的Dep对象中。

    setter: dep.notify() 发布信息，通知当前属性的所有订阅者watcher们。

- compile.js

  定义了 Compile (编译) 类，构造函数传入 node(Element节点) 和 vm(vue实例)。

  遍历所有节点，给每个必要的节点创建订阅者(watcher),监听事件等。

- dep.js

  定义了 Dep (主题) 类。

  subs：订阅者数组

  addSub 方法：添加订阅者。

  notify 方法：向订阅者发布通知。

- watcher.js

  定义了 Watcher (订阅者) 类，构造函数传入 vm(vue实例)， node(节点) 和 name(绑定的属性的名称)

  获取属性值，并更新到view。
