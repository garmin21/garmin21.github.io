---
title: 表单组件 el-form
author: 李嘉明
createTime: 2024/06/30 17:15:47
permalink: /article/9bvwr95d/
tags:
  - element-ui
---


## el-form

el-form 也是我们B端应用中，使用最多的一种组件，其最大的特点就可以 进行 收集、校验、提交数据，原理也非常简单，最外围是一个 `from`标签，内部是使用 `form-item`组件包裹的每一个表单组件，通过 `form-item` 进行包裹后，那我们就可以对每一个控件进行 收集 和 校验，`el-form` 也正是这样做到的


**必须知道的几个问题**

1. 我们的表单组件是如何进行校验的？
    - 1. 当我们使用`el-form-item`包裹控件的时候，触发 mounted 生命周期钩子函数，这时会判断 form-item 是否书写的 `prop`属性，prop 属性是贯穿整个组件的重要属性.
    - 2. 接下来调用 `this.dispatch('ElForm', 'el.form.addField', [this])` 不断递归寻找父组件，将当前的组件实例添加到 `el-from`组件的 fields 数组中完成收集
    - 3. 在然后就是完成对 默认值 以及 焦点事件的绑定
    - 4. 比如 在 `el-input`控件中 通过监听其 value 的变化 触发 `this.dispatch('ElFormItem', 'el.form.change', [val]);` 找到对应的 `el-form-item`组件，将值抛出，一但满足条件就会触发自身的 `validate` 方法，在 `validate`方法中 使用了 <a target="_blank" rel="noreferrer" href="https://github.com/yiminghe/async-validator">async-validator</a> 这个库作底层校验

2. ... 

## 使用方式

```html
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="审批人">
    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select v-model="formInline.region" placeholder="活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
```


## 源码核心逻辑

:::tabs

@tab el-form.vue

```vue
<template>
  <form class="el-form" :class="[
    labelPosition ? 'el-form--label-' + labelPosition : '',
    { 'el-form--inline': inline }
  ]">
    <slot></slot>
  </form>
</template>
<script>
  import objectAssign from 'element-ui/src/utils/merge';
  export default {
    provide() {
      return {
        elForm: this
      };
    },
    data() {
      return {
        fields: [],
      };
    },
    created() {
      // 在created 钩子中 绑定监听事件
      this.$on('el.form.addField', (field) => {
        if (field) {
          this.fields.push(field);
        }
      });
      /* istanbul ignore next */
      this.$on('el.form.removeField', (field) => {
        if (field.prop) {
          this.fields.splice(this.fields.indexOf(field), 1);
        }
      });
    },
  };
</script>


```

@tab el-form-item.vue
```vue
<template>
  <div class="el-form-item">
    <label-wrap
      :is-auto-width="labelStyle && labelStyle.width === 'auto'"
      :update-all="form.labelWidth === 'auto'">
      <label :for="labelFor" class="el-form-item__label" :style="labelStyle" v-if="label || $slots.label">
        <slot name="label">{{label + form.labelSuffix}}</slot>
      </label>
    </label-wrap>
    <div class="el-form-item__content" :style="contentStyle">
      <slot></slot>
      <transition name="el-zoom-in-top">
        <!-- 异常出现的位置 -->
      </transition>
    </div>
  </div>
</template>
<script>
  import AsyncValidator from 'async-validator';
  import emitter from 'element-ui/src/mixins/emitter';
  export default {
    mixins: [emitter],

    provide() {
      return {
        elFormItem: this
      };
    },

    inject: ['elForm'],
    watch: {
      error: {
        immediate: true,
        handler(value) {
          this.validateMessage = value;
          this.validateState = value ? 'error' : '';
        }
      },
      validateStatus(value) {
        this.validateState = value;
      },
      rules(value) {
        if ((!value || value.length === 0) && this.required === undefined) {
          this.clearValidate();
        }
      }
    },
    data() {
      return {
        validateState: '',
        validateMessage: '',
        validateDisabled: false,
        validator: {},
        isNested: false,
        computedLabelWidth: ''
      };
    },
    methods: {
      // 核心校验方法 
      validate(trigger, callback = noop) {
        this.validateDisabled = false;
        const rules = this.getFilteredRule(trigger);
        if ((!rules || rules.length === 0) && this.required === undefined) {
          callback();
          return true;
        }

        this.validateState = 'validating';

        const descriptor = {};
        if (rules && rules.length > 0) {
          rules.forEach(rule => {
            delete rule.trigger;
          });
        }
        descriptor[this.prop] = rules;

        const validator = new AsyncValidator(descriptor);
        const model = {};

        model[this.prop] = this.fieldValue;

        validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
          this.validateState = !errors ? 'success' : 'error';
          this.validateMessage = errors ? errors[0].message : '';

          callback(this.validateMessage, invalidFields);
          this.elForm && this.elForm.$emit('validate', this.prop, !errors, this.validateMessage || null);
        });
      },
      onFieldBlur() {
        this.validate('blur');
      },
      onFieldChange() {
        // 当表单控件的值触发 `el.form.change` 执行当前方法进行校验
        if (this.validateDisabled) {
          this.validateDisabled = false;
          return;
        }

        this.validate('change');
      },

      addValidateEvents() {
        const rules = this.getRules();
        if (rules.length || this.required !== undefined) {
          this.$on('el.form.blur', this.onFieldBlur);
          this.$on('el.form.change', this.onFieldChange);
        }
      },
      removeValidateEvents() {
        this.$off();
      }
    },
    mounted() {
      if (this.prop) {
        // 一切的前提都在 有 prop 下，向父组件添加 this, 以及默认值 以及绑定事件等操作
        this.dispatch('ElForm', 'el.form.addField', [this]);

        let initialValue = this.fieldValue;
        if (Array.isArray(initialValue)) {
          initialValue = [].concat(initialValue);
        }
        Object.defineProperty(this, 'initialValue', {
          value: initialValue
        });

        this.addValidateEvents();
      }
    },
    beforeDestroy() {
      this.dispatch('ElForm', 'el.form.removeField', [this]);
    }
  };
</script>


```


:::


## 分析总结

1. el-form 是搭配 form-item 进行使用的，每一个 具有 prop 属性的 form-item 都会将自身实例添加给 el-form 的 数组中
2. el-form 的校验方法实际上就是调用了每一个 form-item 上的校验方法， 进行校验的


:::tip
本次示例中使用 的是 `element-ui@2.15.14`
:::
