---
title: js实现瀑布流布局
author: 李嘉明
createTime: 2024/05/25 17:23:20
permalink: /article/7j8un7vp/
tags:
  - FE
---


:::tip
开发中我们可能会遇到一些布局上的需求，使用 css 可能实现的不是那么灵活，所以就采用 js 来实现布局。

瀑布流布局的原理：**就是通过定位，将元素 一个一个 定位到对应的位置上**

怎么实现？
1. 计算 容器中 要存放几列元素，并且计算去每一列元素的宽度，（tips: 每一列的宽度都是固定的，如果不固定，就可能会超出容器对应的宽度）
2. 将子元素，拆分成 一个 二维的数据格式， 每一个维度 满足 列数即可，不满足能放几个放几个
3. 循环二维数组，设置每一个 子元素 他的 `left` 和 `top` 偏移的距离， 这样就实现了瀑布流的布局
:::


## 封装瀑布流


```js

function WaterFull(options) {
    /**
     * 容器 container string | DOM
     * 列数 column 默认 6 number
     */
    this.container =
        typeof options.container === "string"
            ? document.querySelector(options.container)
            : options.container;
    if (this.container.nodeType !== 1) {
        throw new Error("DOM is not find");
    }
    this.column = options.column || 6;
    this.itemWidth = Math.floor(this.container.getBoundingClientRect().width / this.column)
    this._elements = [];
}

WaterFull.prototype = {
    render() {
        this.setStyle(this.container, "position", "relative");
        // 1. 获取每一列元素高度
        const children = this.getRowsWH(this.container);
        if(!children.length) return
        // 2. 拆分 对应 的列数
        const splitArray = this.splitArrayIntoChunks(
            this._elements,
            this.column
        );
        // 3. 设置元素的定位
        this.setPosition(splitArray);
    },

    getRowsWH(container) {
        const children_s = container.children;
        const self = this;
        [].forEach.call(children_s, function (item, index) {
            const rect = item.getBoundingClientRect();
            self.setStyle(item, "position", "absolute");
            self.setStyle(item, "width", self.itemWidth);
            self._elements.push({
                dom: item,
                width: self.itemWidth,
                height: rect.height,
                index
            });
        });
        return children_s
    },
    splitArrayIntoChunks(array, chunkSize) {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            result.push(chunk);
        }
        return result;
    },
    setPosition(splits) {
        for (let i = 0; i < splits.length; i++) {
            for (let j = 0; j < splits[i].length; j++) {
                const item = splits[i][j];
                this.setStyle(item.dom, "left", j * item.width);
                this.setStyle(
                    item.dom,
                    "top",
                    splits[i - 1]
                        ? splits[i - 1][j].dom.getBoundingClientRect().bottom
                        : 0
                );
            }
        }
    },
    setStyle(element, styleName, value) {
        if (!element || !styleName) return;
        if (typeof styleName === "object") {
            for (var prop in styleName) {
                if (styleName.hasOwnProperty(prop)) {
                    setStyle(element, prop, styleName[prop]);
                }
            }
        } else {
            element.style.setProperty(styleName, value);
        }
    },
};

if (window) {
    window.WaterFull = WaterFull;
}
```


## 使用

```js

const waterFull = new WaterFull({
    container: document.querySelector('.box'),
    column: 7
})
waterFull.render()
```


<!-- ## 注意
单渲染的元素超出一屏的高度时，


```css
body::-webkit-scrollbar {
    width: 0;
}
body::-webkit-scrollbar-thumb {
    background-color: transparent;
}

body::-webkit-scrollbar-track {
    background-color: transparent;
}

``` -->