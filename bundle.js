/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 主题发布
 * @class Dep
 */
var Dep = function () {
  function Dep() {
    _classCallCheck(this, Dep);

    // 主题的订阅者们
    this.subs = [];
  }

  /**
   * 添加订阅者
   * @param {watcher} sub 订阅者
   * @memberof Dep
   */


  _createClass(Dep, [{
    key: "addSub",
    value: function addSub(sub) {
      this.subs.push(sub);
    }

    /**
     * 发布信息（通知订阅者）
     * @memberof Dep
     */

  }, {
    key: "notify",
    value: function notify() {
      this.subs.forEach(function (sub) {
        return sub.update();
      });
    }
  }]);

  return Dep;
}();

exports.default = Dep;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _observe = __webpack_require__(2);

var _observe2 = _interopRequireDefault(_observe);

var _compile = __webpack_require__(3);

var _compile2 = _interopRequireDefault(_compile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Vue 对象
 * @class Vue
 */
var Vue = function Vue(options) {
  _classCallCheck(this, Vue);

  this.el = options.el;
  this.data = options.data;

  // 监听this(vm) 这个对象的 data 属性
  new _observe2.default(this.data, this);

  // 初始化 文档上数据
  var el = document.querySelector(this.el);
  el.appendChild(new _compile2.default(el, this).node2Fragment());
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dep = __webpack_require__(0);

var _dep2 = _interopRequireDefault(_dep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 观察者
 * @class Observe
 */
var Observe = function () {
  /**
   * 监听 vm 中 data 的各个属性
   * @param {Object} obj 
   * @param {Vue} vm 
   * @memberof Observe
   */
  function Observe(obj, vm) {
    var _this = this;

    _classCallCheck(this, Observe);

    this.obj = obj;
    this.vm = vm;
    Object.keys(obj).forEach(function (key) {
      return _this.defineReactive(vm, key, obj[key]);
    });
  }

  /**
   * 响应式的数据绑定函数
   * @param {Object} obj 目标对象(vm)
   * @param {String} key 属性key
   * @param {String} val 属性value
   * @memberof Observe
   */


  _createClass(Observe, [{
    key: 'defineReactive',
    value: function defineReactive(obj, key, val) {
      // 定义一个主题类， 每个 data 中的属性都对应一个主题类，负责添加订阅者和发布信息
      var dep = new _dep2.default();

      Object.defineProperty(obj, key, {
        get: function get() {
          // 添加订阅者 watcher 到主题对象 Dep 中
          if (_dep2.default.target) {
            dep.addSub(_dep2.default.target);
          }
          return val;
        },
        set: function set(newVal) {
          if (newVal === val) {
            return;
          }
          val = newVal;
          // 发布通知
          dep.notify();
        }
      });
    }
  }]);

  return Observe;
}();

exports.default = Observe;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _watcher = __webpack_require__(4);

var _watcher2 = _interopRequireDefault(_watcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 编译 html 节点
 * view -> data: 监听 绑定属性对应的 元素 的事件，并把视图中最新的数据更新到 vue 对象中
 * data -> view: 绑定 vue 对象中对应的属性值，更新对应的 html
 * @class Compile
 */
var Compile = function () {
  /**
   * 构造函数
   * @param {Element} node html 节点
   * @param {Vue} vm vue 实例
   * @memberof Compile
   */
  function Compile(node, vm) {
    _classCallCheck(this, Compile);

    this.node = node;
    this.vm = vm;
  }

  /**
   * 编译
   * @param {Element} node 
   * @param {Vue} vm 
   * @memberof Compile
   */


  _createClass(Compile, [{
    key: '_compile',
    value: function _compile(node, vm) {
      var reg = /\{\{(.*)\}\}/;
      /**
       * 是元素节点
       */
      if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.attributes).filter(function (attr) {
          return attr.nodeName === 'v-model';
        }).forEach(function (attr) {
          var name = attr.nodeValue;
          node.value = vm[name];
          new _watcher2.default(vm, node, name.trim());
          /**
           * 绑定事件，并给相应的属性赋值
           */
          node.addEventListener('input', function (e) {
            vm[name] = e.target.value;
          });
        });
      }
      /**
       * 是文本节点
       */
      else if (node.nodeType === Node.TEXT_NODE) {
          if (reg.test(node.nodeValue)) {
            var name = RegExp.$1;
            // 新增一个订阅者
            new _watcher2.default(vm, node, name.trim());
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

  }, {
    key: '_node2Fragment',
    value: function _node2Fragment(node, vm) {
      var documentFragment = document.createDocumentFragment();
      var child = node.firstChild;
      while (child) {
        this._compile(child, vm);
        documentFragment.appendChild(child);
        child = node.firstChild;
      }
      return documentFragment;
    }

    /**
     * 外部调用
     * @memberof Compile
     */

  }, {
    key: 'node2Fragment',
    value: function node2Fragment() {
      return this._node2Fragment(this.node, this.vm);
    }
  }]);

  return Compile;
}();

exports.default = Compile;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dep = __webpack_require__(0);

var _dep2 = _interopRequireDefault(_dep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 主题订阅
 * @class Watcher
 */
var Watcher = function () {
  /**
   * 构造函数
   * @param {Vue} vm 
   * @param {Node} node 
   * @param {String} name 
   * @memberof Watcher
   */
  function Watcher(vm, node, name) {
    _classCallCheck(this, Watcher);

    this.vm = vm;
    this.node = node;
    this.name = name;

    // Dep.target 存储了当前的观察者
    _dep2.default.target = this;

    // 订阅者执行一次更新视图
    this.update();

    // 设置Dep.target 为 null, 确保再次调用属性 getter 时，不会重复添加 watcher
    _dep2.default.target = null;
  }

  /**
   * 执行 this.vm[this.name] 时，由于数据已经被 observe 了，所以，会调用对应的 getter 方法
   * 
   * 所以，这句话会做两件事
   * 1. 从 vm 中获取数据，并赋值到 this.value 中
   * 2. 添加当前 watcher 对象到属性的 dep 中，即订阅属性的变化
   * @memberof Watcher
   */


  _createClass(Watcher, [{
    key: 'get',
    value: function get() {
      this.value = this.vm[this.name];
    }

    /**
     * 更新 this.value ，更新视图，这个方法初始化时需要调用
     * 当主题发布信息时 调用 notify 方法，也会调用
     * @memberof Watcher
     */

  }, {
    key: 'update',
    value: function update() {
      // 更新 this.value
      this.get();

      // 更新视图，实际处理过程中会更复杂
      if (this.node.nodeValue === null) {
        // Element 文档节点
        this.node.value = this.value;
        return;
      }
      this.node.nodeValue = this.value;
    }
  }]);

  return Watcher;
}();

exports.default = Watcher;

/***/ })
/******/ ]);