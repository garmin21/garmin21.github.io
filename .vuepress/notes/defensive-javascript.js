import { definePlumeNotesItemConfig } from 'vuepress-theme-plume'

export default definePlumeNotesItemConfig({
  link: '/defensive-javascript/',
  dir: 'JAVASCRIPT学习简记',
  sidebar: [
    '',
    {
      dir: '基础篇',
      collapsed: true,
      items: [
        'ECMAScript内置对象',
        '变量',
        'NaN',
        '数据类型',
        '数据类型转换',
        '作用域链',
        '执行上下文和执行栈',
        '栈和堆',
        '原型和原型链',
        '字符串',
        '数组和对象',
        '函数与箭头函数',
        '集合对象',
        '闭包',
        '严格模式',
        '异步请求',
        'new操作符',
        'Class',
        'promise',
        'RegExp',
        'this对象'
      ],
    },
  ],
})
