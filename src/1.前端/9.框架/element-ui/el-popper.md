---
title: 弹框组件 el-popper
author: 李嘉明
createTime: 2024/04/14 15:50:04
permalink: /article/w82r5ewm/
tags:
  - element-ui
---

## el-popper

在 element-ui 中其核心 是 使用 popper.js 提供强大定位功能使其可以让元素任意的定位到某一个元素

**几个核心文件**

1. `popup-manager.js`: 用于管理弹出框 相当于是 CEO，集中控制弹出框的一些行为，抽象成一个对象。这个 CEO 可以可以帮助我管理 属性 比如 z-index 递增 或者递减 等等..
  - 怎么控制的 z-index?
    - `this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();` 通过其 `_popper` 拿到真实的页面元素，给其赋值为一个最大的 数值

2. `vue-popper.js` : 这个为组件提供的一个 mixin 文件，其作用 是监听内置响应式属性 `showPopper`的变化，控制 创建 popper 或者销毁 | 更新 popper

## 使用方式

```html
<el-popover
  placement="top-start"
  title="标题"
  width="200"
  trigger="click"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
>
  <el-button slot="reference">click 激活</el-button>
</el-popover>
```

可以看到 一个 popover 定义了 `placement 出现的位置` `trigger 触发模式` `content 内容` 这是最基本的定义，但是如果你没有定义 默认 `placement='bottom'` `trigger='click'`

::: tabs

@tab popup-manager.js

```js
import Vue from 'vue';
import { addClass, removeClass } from 'element-ui/src/utils/dom';

let hasModal = false;
let hasInitZIndex = false;
let zIndex;

const getModal = function () {
  let modalDom = PopupManager.modalDom;
  if (modalDom) {
    hasModal = true;
  } else {
    hasModal = false;
    modalDom = document.createElement('div');
    PopupManager.modalDom = modalDom;

    modalDom.addEventListener('touchmove', function (event) {
      event.preventDefault();
      event.stopPropagation();
    });

    modalDom.addEventListener('click', function () {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick();
    });
  }

  return modalDom;
};

const instances = {};

const PopupManager = {
  modalFade: true,

  getInstance: function (id) {
    return instances[id];
  },
  register: function (id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },

  deregister: function (id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },
  // TODO: 获取最大的ZIndex 
  nextZIndex: function () {
    return PopupManager.zIndex++;
  },

  modalStack: [],

  doOnModalClick: function () {
    const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topItem) return;

    const instance = PopupManager.getInstance(topItem.id);
    if (instance && instance.closeOnClickModal) {
      instance.close();
    }
  },

  openModal: function (id, zIndex, dom, modalClass, modalFade) {
    if (Vue.prototype.$isServer) return;
    if (!id || zIndex === undefined) return;
    this.modalFade = modalFade;

    const modalStack = this.modalStack;

    for (let i = 0, j = modalStack.length; i < j; i++) {
      const item = modalStack[i];
      if (item.id === id) {
        return;
      }
    }

    const modalDom = getModal();

    addClass(modalDom, 'v-modal');
    if (this.modalFade && !hasModal) {
      addClass(modalDom, 'v-modal-enter');
    }
    if (modalClass) {
      let classArr = modalClass.trim().split(/\s+/);
      classArr.forEach((item) => addClass(modalDom, item));
    }
    setTimeout(() => {
      removeClass(modalDom, 'v-modal-enter');
    }, 200);

    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom);
    } else {
      document.body.appendChild(modalDom);
    }

    if (zIndex) {
      modalDom.style.zIndex = zIndex;
    }
    modalDom.tabIndex = 0;
    modalDom.style.display = '';

    this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
  },

  closeModal: function (id) {
    const modalStack = this.modalStack;
    const modalDom = getModal();

    if (modalStack.length > 0) {
      const topItem = modalStack[modalStack.length - 1];
      if (topItem.id === id) {
        if (topItem.modalClass) {
          let classArr = topItem.modalClass.trim().split(/\s+/);
          classArr.forEach((item) => removeClass(modalDom, item));
        }

        modalStack.pop();
        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
        }
      } else {
        for (let i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }

    if (modalStack.length === 0) {
      if (this.modalFade) {
        addClass(modalDom, 'v-modal-leave');
      }
      setTimeout(() => {
        if (modalStack.length === 0) {
          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
          modalDom.style.display = 'none';
          PopupManager.modalDom = undefined;
        }
        removeClass(modalDom, 'v-modal-leave');
      }, 200);
    }
  },
};

Object.defineProperty(PopupManager, 'zIndex', {
  configurable: true,
  get() {
    if (!hasInitZIndex) {
      zIndex = zIndex || (Vue.prototype.$ELEMENT || {}).zIndex || 2000;
      hasInitZIndex = true;
    }
    return zIndex;
  },
  set(value) {
    zIndex = value;
  },
});

const getTopPopup = function () {
  if (Vue.prototype.$isServer) return;
  if (PopupManager.modalStack.length > 0) {
    const topPopup =
      PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topPopup) return;
    const instance = PopupManager.getInstance(topPopup.id);

    return instance;
  }
};

if (!Vue.prototype.$isServer) {
  // handle `esc` key when the popup is shown
  window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      const topPopup = getTopPopup();

      if (topPopup && topPopup.closeOnPressEscape) {
        topPopup.handleClose
          ? topPopup.handleClose()
          : topPopup.handleAction
          ? topPopup.handleAction('cancel')
          : topPopup.close();
      }
    }
  });
}

export default PopupManager;
```

@tab vue-popper.js

```js
import Vue from 'vue';
import PopupManager from 'element-ui/src/utils/popup-manager.js';

const PopperJS = require('./popper');
const stop = (e) => e.stopPropagation();

export default {
  props: {
    // .... 省略
    placement: {
      type: String,
      default: 'bottom',
    },
    value: Boolean,
  },

  data() {
    return {
      showPopper: false,
      currentPlacement: '',
    };
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.showPopper = val;
        this.$emit('input', val);
      },
    },
    showPopper(val) {
      if (this.disabled) return;
      val ? this.updatePopper() : this.destroyPopper();
      this.$emit('input', val);
    },
  },

  methods: {
    createPopper() {
      if (this.$isServer) return;
      this.currentPlacement = this.currentPlacement || this.placement;
      if (
        !/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)
      ) {
        return;
      }

      const options = this.popperOptions;
      const popper = (this.popperElm =
        this.popperElm || this.popper || this.$refs.popper);
      let reference = (this.referenceElm =
        this.referenceElm || this.reference || this.$refs.reference);

      if (!reference && this.$slots.reference && this.$slots.reference[0]) {
        reference = this.referenceElm = this.$slots.reference[0].elm;
      }

      if (!popper || !reference) return;
      if (this.visibleArrow) this.appendArrow(popper);
      if (this.appendToBody) document.body.appendChild(this.popperElm);
      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy();
      }

      options.placement = this.currentPlacement;
      options.offset = this.offset;
      options.arrowOffset = this.arrowOffset;
      this.popperJS = new PopperJS(reference, popper, options);
      this.popperJS.onCreate((_) => {
        this.$emit('created', this);
        this.resetTransformOrigin();
        this.$nextTick(this.updatePopper);
      });
      // 如果你传入了 onUpdate 可以设置其更新方法
      if (typeof options.onUpdate === 'function') {
        this.popperJS.onUpdate(options.onUpdate);
      }
      // 设置z-index 借助 PopupManager 进行管理
      this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();
      // 阻止事件冒泡
      this.popperElm.addEventListener('click', stop);
    },
    updatePopper() { 
      const popperJS = this.popperJS;
      if (popperJS) {
        popperJS.update();
        if (popperJS._popper) {
          popperJS._popper.style.zIndex = PopupManager.nextZIndex();
        }
      } else {
        this.createPopper();
      }
    },
    destroyPopper() {
      if (this.popperJS) {
        // 设置 transformOrigin
        this.resetTransformOrigin();
      }
    },
    resetTransformOrigin() {
      if (!this.transformOrigin) return;
      let placementMap = {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left',
      };
      let placement = this.popperJS._popper
        .getAttribute('x-placement')
        .split('-')[0];
      let origin = placementMap[placement];
      this.popperJS._popper.style.transformOrigin =
        typeof this.transformOrigin === 'string'
          ? this.transformOrigin
          : ['top', 'bottom'].indexOf(placement) > -1
          ? `center ${origin}`
          : `${origin} center`;
    },
  },
};
```

:::

## 分析总结

1. popper 是通过 `reference`触发器元素 进行定位的位置，元素位置在哪里，popover 就定位在其 方向上
2. el-popper 的执行逻辑是 ，当我们点击触发器元素时
  - 1. 改变其内置属性 `showPopper` 的值。 showPopper 控制着元素的显示
  - 2. 在`vue-popper.js` 的mixin 文件中监听其 值的改变，触发 `updatePopper` or `destroyPopper`
  - 3. 在`updatePopper` 中如果已存在 popperJS 实例，进行实例更新，并且重新设置 z-index 属性，如果不存在则创建一个 popperJS 实例，此时元素已然显示在页面中



:::tip
本次示例中使用 的是 `element-ui@2.15.14`
:::
