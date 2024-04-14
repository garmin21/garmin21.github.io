---
title: popover
author: Garming
tags:
  - element-ui
createTime: 2024/04/14 15:50:04
permalink: /article/w82r5ewm/
---

:::tip
本次示例中使用 的是 `element-ui@2.15.14`
:::

## Popover 弹出框

在 element-ui 中使用 popper.js 提供强大定位功能使其可以让元素任意的定位到某一个元素。

## 使用方式

```html
<el-popover
  placement="top-start"
  title="标题"
  width="200"
  trigger="hover"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
>
  <el-button slot="reference">hover 激活</el-button>
</el-popover>
```

可以看到 一个 popover 定义了 `placement 出现的位置` `trigger 触发模式` `content 内容` 这是最基本的定义

## Popover 组件

```vue
<template>
  <span>
    <transition
      :name="transition"
      @after-enter="handleAfterEnter"
      @after-leave="handleAfterLeave"
    >
      <div
        class="el-popover el-popper"
        :class="[popperClass, content && 'el-popover--plain']"
        ref="popper"
        v-show="!disabled && showPopper"
        :style="{ width: width + 'px' }"
        role="tooltip"
        :id="tooltipId"
        :aria-hidden="disabled || !showPopper ? 'true' : 'false'"
      >
        <div class="el-popover__title" v-if="title" v-text="title"></div>
        <slot>{{ content }}</slot>
      </div>
    </transition>
    <span class="el-popover__reference-wrapper" ref="wrapper">
      <slot name="reference"></slot>
    </span>
  </span>
</template>
```

我们可以看到定义了 `popper` ref `reference` slot 正是 popover.js 必须要的 `const instance = createPopper(reference, popper);`;

定义了四种触发方式 hover 激活 click 激活 focus 激活 手动激活

```js
mounted() {
    // 获取 popper.js 需要的 触发器和绑定元素
    let reference = this.referenceElm = this.reference || this.$refs.reference;
    const popper = this.popper || this.$refs.popper;
    // 如果没找，就直接 用 第一个子元素
    if (!reference && this.$refs.wrapper.children) {
      reference = this.referenceElm = this.$refs.wrapper.children[0];
    }
    // 可访问性
    if (reference) {
      // 设置属性
      addClass(reference, 'el-popover__reference');
      reference.setAttribute('aria-describedby', this.tooltipId);
      reference.setAttribute('tabindex', this.tabindex); // tab序列
      popper.setAttribute('tabindex', 0);

      // 默认绑定的是 hover 或者 手动触发的时候
      if (this.trigger !== 'click') {

        on(reference, 'focusin', () => {
          this.handleFocus();
          const instance = reference.__vue__;
          if (instance && typeof instance.focus === 'function') {
            instance.focus();
          }
        });
        on(popper, 'focusin', this.handleFocus);
        on(reference, 'focusout', this.handleBlur);
        on(popper, 'focusout', this.handleBlur);
      }
      // 点击或者键盘事件，把 popup 关闭
      on(reference, 'keydown', this.handleKeydown);
      on(reference, 'click', this.handleClick);
    }
    // 当触发是click 的时候
    if (this.trigger === 'click') {
      on(reference, 'click', this.doToggle);
      on(document, 'click', this.handleDocumentClick);
    } else if (this.trigger === 'hover') {
      on(reference, 'mouseenter', this.handleMouseEnter);
      on(popper, 'mouseenter', this.handleMouseEnter);
      on(reference, 'mouseleave', this.handleMouseLeave);
      on(popper, 'mouseleave', this.handleMouseLeave);
      // 当触发是 focus 的时候
    } else if (this.trigger === 'focus') {
      if (this.tabindex < 0) {
        console.warn('[Element Warn][Popover]a negative taindex means that the element cannot be focused by tab key');
      }
      if (reference.querySelector('input, textarea')) {
        on(reference, 'focusin', this.doShow);
        on(reference, 'focusout', this.doClose);
      } else {
        on(reference, 'mousedown', this.doShow);
        on(reference, 'mouseup', this.doClose);
      }
    }
  }

```

这也仅仅是在组件挂载的时候，做了一些的监听动作，使其 popover 可以消失 和显示， 这还没有 重点，我们可以看到 ，他引入了一个 vue-popover 的 js 文件 作为 mixins 合并到当前的组件中去。

::: tabs

@tab vue-popper.js

```js
import Vue from 'vue'
import PopupManager from 'element-ui/src/utils/popup-manager.js'

const PopperJS = Vue.prototype.$isServer ? function () {} : require('./popper')
const stop = (e) => e.stopPropagation()

/**
 * @param {HTMLElement} [reference=$refs.reference] - The reference element used to position the popper.
 * @param {HTMLElement} [popper=$refs.popper] - The HTML element used as popper, or a configuration used to generate the popper.
 * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)
 * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Boolean} [visible=false] Visibility of the popup element.
 * @param {Boolean} [visible-arrow=false] Visibility of the arrow, no style.
 */
export default {
  props: {
    transformOrigin: {
      type: [Boolean, String],
      default: true,
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    boundariesPadding: {
      type: Number,
      default: 5,
    },
    reference: {},
    popper: {},
    offset: {
      default: 0,
    },
    // TODO: 外部 v-model 控制 手动 或者 hover 控制
    value: Boolean,
    visibleArrow: Boolean,
    arrowOffset: {
      type: Number,
      default: 35,
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    // popover.js 配置对象
    popperOptions: {
      type: Object,
      default() {
        return {
          gpuAcceleration: false,
        }
      },
    },
  },

  data() {
    return {
      showPopper: false,
      currentPlacement: '',
    }
  },

  watch: {
    // 监听vue showPopper 
    value: {
      immediate: true,
      handler(val) {
        this.showPopper = val
        this.$emit('input', val)
      },
    },
    showPopper(val) {
      if (this.disabled) return
      val ? this.updatePopper() : this.destroyPopper()
      this.$emit('input', val)
    },
  },

  methods: {
    // 生成一个 popper 
    createPopper() {
      if (this.$isServer) return
      this.currentPlacement = this.currentPlacement || this.placement
      if (
        !/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)
      ) {
        return
      }

      const options = this.popperOptions
      const popper = (this.popperElm =
        this.popperElm || this.popper || this.$refs.popper)
      let reference = (this.referenceElm =
        this.referenceElm || this.reference || this.$refs.reference)

      if (!reference && this.$slots.reference && this.$slots.reference[0]) {
        reference = this.referenceElm = this.$slots.reference[0].elm
      }

      if (!popper || !reference) return
      if (this.visibleArrow) this.appendArrow(popper)
      if (this.appendToBody) document.body.appendChild(this.popperElm)
      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy()
      }

      options.placement = this.currentPlacement
      options.offset = this.offset
      options.arrowOffset = this.arrowOffset
      this.popperJS = new PopperJS(reference, popper, options)
      // 初始化的时候，对元素位置进行矫正
      this.popperJS.onCreate((_) => {
        this.$emit('created', this)
        this.resetTransformOrigin()
        this.$nextTick(this.updatePopper)
      })
      // 如果你传入了 onUpdate 可以设置其更新方法
      if (typeof options.onUpdate === 'function') {
        this.popperJS.onUpdate(options.onUpdate)
      }
      // 设置z-index 借助 PopupManager 进行管理
      this.popperJS._popper.style.zIndex = PopupManager.nextZIndex()
      // 阻止事件冒泡
      this.popperElm.addEventListener('click', stop)
    },

    updatePopper() {
      // popperJS 是否存在，如果存在就走更新，不存在实例化 一个 popper
      const popperJS = this.popperJS
      if (popperJS) {
        popperJS.update()
        if (popperJS._popper) {
          popperJS._popper.style.zIndex = PopupManager.nextZIndex()
        }
      } else {
        this.createPopper()
      }
    },

    doDestroy(forceDestroy) {
      /* istanbul ignore if */
      if (!this.popperJS || (this.showPopper && !forceDestroy)) return
      this.popperJS.destroy()
      this.popperJS = null
    },

    destroyPopper() {
      if (this.popperJS) {
        this.resetTransformOrigin()
      }
    },

    resetTransformOrigin() {
      if (!this.transformOrigin) return
      let placementMap = {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left',
      }
      let placement = this.popperJS._popper
        .getAttribute('x-placement')
        .split('-')[0]
      let origin = placementMap[placement]
      this.popperJS._popper.style.transformOrigin =
        typeof this.transformOrigin === 'string'
          ? this.transformOrigin
          : ['top', 'bottom'].indexOf(placement) > -1
          ? `center ${origin}`
          : `${origin} center`
    },

    appendArrow(element) {
      let hash
      if (this.appended) {
        return
      }

      this.appended = true

      for (let item in element.attributes) {
        if (/^_v-/.test(element.attributes[item].name)) {
          hash = element.attributes[item].name
          break
        }
      }

      const arrow = document.createElement('div')

      if (hash) {
        arrow.setAttribute(hash, '')
      }
      arrow.setAttribute('x-arrow', '')
      arrow.className = 'popper__arrow'
      element.appendChild(arrow)
    },
  },

  beforeDestroy() {
    this.doDestroy(true)
    if (this.popperElm && this.popperElm.parentNode === document.body) {
      this.popperElm.removeEventListener('click', stop)
      document.body.removeChild(this.popperElm)
    }
  },

  // call destroy in keep-alive mode
  deactivated() {
    this.$options.beforeDestroy[0].call(this)
  },
}
```

@tab popup-manager.js

```js
import Vue from 'vue'
import { addClass, removeClass } from 'element-ui/src/utils/dom'

let hasModal = false
let hasInitZIndex = false
let zIndex

const getModal = function () {
  if (Vue.prototype.$isServer) return
  let modalDom = PopupManager.modalDom
  if (modalDom) {
    hasModal = true
  } else {
    hasModal = false
    modalDom = document.createElement('div')
    PopupManager.modalDom = modalDom

    // 移动端
    modalDom.addEventListener('touchmove', function (event) {
      event.preventDefault()
      event.stopPropagation()
    })

    // 绑定事件
    modalDom.addEventListener('click', function () {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick()
    })
  }

  return modalDom
}

// 创建多个集合，实例集合
const instances = {}

const PopupManager = {
  modalFade: true,

  getInstance: function (id) {
    return instances[id]
  },
  // 注册id
  register: function (id, instance) {
    if (id && instance) {
      instances[id] = instance
    }
  },

  deregister: function (id) {
    if (id) {
      instances[id] = null
      delete instances[id]
    }
  },

  nextZIndex: function () {
    return PopupManager.zIndex++
  },

  // 放置 许多 modal

  modalStack: [],

  doOnModalClick: function () {
    const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1]
    if (!topItem) return

    const instance = PopupManager.getInstance(topItem.id)
    if (instance && instance.closeOnClickModal) {
      instance.close()
    }
  },

  openModal: function (id, zIndex, dom, modalClass, modalFade) {
    if (Vue.prototype.$isServer) return
    if (!id || zIndex === undefined) return
    this.modalFade = modalFade

    const modalStack = this.modalStack

    for (let i = 0, j = modalStack.length; i < j; i++) {
      const item = modalStack[i]
      if (item.id === id) {
        return
      }
    }

    const modalDom = getModal()

    addClass(modalDom, 'v-modal')
    if (this.modalFade && !hasModal) {
      addClass(modalDom, 'v-modal-enter')
    }
    if (modalClass) {
      let classArr = modalClass.trim().split(/\s+/)
      classArr.forEach((item) => addClass(modalDom, item))
    }
    setTimeout(() => {
      removeClass(modalDom, 'v-modal-enter')
    }, 200)

    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom)
    } else {
      document.body.appendChild(modalDom)
    }

    if (zIndex) {
      modalDom.style.zIndex = zIndex
    }
    modalDom.tabIndex = 0
    modalDom.style.display = ''

    this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass })
  },

  closeModal: function (id) {
    const modalStack = this.modalStack
    const modalDom = getModal()

    if (modalStack.length > 0) {
      const topItem = modalStack[modalStack.length - 1]
      if (topItem.id === id) {
        if (topItem.modalClass) {
          let classArr = topItem.modalClass.trim().split(/\s+/)
          classArr.forEach((item) => removeClass(modalDom, item))
        }

        modalStack.pop()
        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex
        }
      } else {
        for (let i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1)
            break
          }
        }
      }
    }

    if (modalStack.length === 0) {
      if (this.modalFade) {
        addClass(modalDom, 'v-modal-leave')
      }
      setTimeout(() => {
        if (modalStack.length === 0) {
          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom)
          modalDom.style.display = 'none'
          PopupManager.modalDom = undefined
        }
        removeClass(modalDom, 'v-modal-leave')
      }, 200)
    }
  },
}

Object.defineProperty(PopupManager, 'zIndex', {
  configurable: true,
  get() {
    if (!hasInitZIndex) {
      zIndex = zIndex || (Vue.prototype.$ELEMENT || {}).zIndex || 2000
      hasInitZIndex = true
    }
    return zIndex
  },
  set(value) {
    zIndex = value
  },
})

const getTopPopup = function () {
  if (Vue.prototype.$isServer) return
  if (PopupManager.modalStack.length > 0) {
    const topPopup = PopupManager.modalStack[PopupManager.modalStack.length - 1]
    if (!topPopup) return
    const instance = PopupManager.getInstance(topPopup.id)

    return instance
  }
}

if (!Vue.prototype.$isServer) {
  // handle `esc` key when the popup is shown
  window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      const topPopup = getTopPopup()

      if (topPopup && topPopup.closeOnPressEscape) {
        topPopup.handleClose
          ? topPopup.handleClose()
          : topPopup.handleAction
          ? topPopup.handleAction('cancel')
          : topPopup.close()
      }
    }
  })
}

export default PopupManager
```


:::


## 分析图

::: demo-wrapper img no-padding
![hero](/images/frame/viewport.png)
:::