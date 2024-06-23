---
title: Vue.extend
author: 李嘉明
createTime: 2024/06/23 13:10:00
permalink: /learn-vue/w16ckh6m/
---

==Vue.extend 实际上是在创建一个新的构造函数，它继承了 Vue 的功能，并可以用于创建具有独立选项和逻辑的组件实例。==

```js
function initExtend (Vue) {
  /**
   * 每个实例构造函数(包括Vue)都有一个惟一的cid。
   * 这使我们能够创建包装的 子 构造函数 用于原型继承并缓存它们。
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Vue的类继承方法
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // 对于props和 computed ，我们定义代理getter
    // 扩展时在扩展原型上的Vue实例。
    // 这避免对每个创建的实例调用Object.defineProperty。
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // 允许进一步的扩展/mixin/插件使用
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    //给当前的子类扩展其父类的私有属性
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    //在扩展时保持对父类实例的引用。
    //稍后在实例化时，我们可以检查 父类 的选项是否有 已更新。
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // 设置缓存钩子函数，下次就从缓存里面直接拿
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

```