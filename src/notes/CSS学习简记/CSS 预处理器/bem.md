---
title: BEM scss 混入
author: 李嘉明
createTime: 2024/06/11 13:54:31
permalink: /defensive-css/urmw5rz3/
---

:::tip
BEM css 规范
1. B(block): 独立且有意义的实体, header, container, menu, checkbox.
2. E(element) : Block 的一部分且没有独立的意义, header title, menu item, list item
3. M(modifier) : Blocks 或 Elements 的一种标志，可以用它改变其表现形式、行为、状态 disabled, checked, fixed

命名规则: 通过双下划线__连接后代 block 或者 element ,用双连字符--连接修饰语。
:::


使用scss 来编写 BEM 规范的混入，借鉴 element-ui

## 全局变量

```scss
$namespace: 'el';
$element-separator: '__';
$modifier-separator: '--';
$state-prefix: 'is-';
```

## B

```scss
@mixin b($block) {
  $B: $namespace+'-'+$block !global;

  .#{$B} {
    @content;
  }
}


// ==================> 使用
@include b(steps) {
  display: flex;
}
```

**生成**
```css
.el-steps {
  display: flex;
}
```


## E

```scss
@mixin e($element) {
  $E: $element !global;
  $selector: &;
  $currentSelector: "";
  @each $unit in $element {
    $currentSelector: #{$currentSelector + "." + $B + $element-separator + $unit + ","};
  }

  @if hitAllSpecialNestRule($selector) {
    @at-root {
      #{$selector} {
        #{$currentSelector} {
          @content;
        }
      }
    }
  } @else {
    @at-root {
      #{$currentSelector} {
        @content;
      }
    }
  }
}


// =======================> 使用
@include b(steps) {
  @include e(line-inner) {
    display: block;
  }
}
```

**生成**
```css
.el-steps .el-steps__line-inner {
  display: block;
}
```


## M


```scss
@mixin m($modifier) {
  $selector: &;
  $currentSelector: "";
  @each $unit in $modifier {
    $currentSelector: #{$currentSelector + & + $modifier-separator + $unit + ","};
  }

  @at-root {
    #{$currentSelector} {
      @content;
    }
  }
}


// ====================> 使用
@include b(steps) {
  @include m(simple) {
    padding: 13px 8%;
    border-radius: 4px;
    background: red;
  }
}

```

**生成**
```css
.el-steps--simple {
  padding: 13px 8%;
  border-radius: 4px;
  background: red;
}
```