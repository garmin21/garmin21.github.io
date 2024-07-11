import { definePlumeNotesItemConfig } from 'vuepress-theme-plume'

export default definePlumeNotesItemConfig({
  link: '/learn-py/',
  dir: 'Python学习简记',
  sidebar: [
    '',
    {
      dir: '基础入门',
      collapsed: false,
      items: [
        '基础语法和变量',
        '表达式和运算符',
        // '基本类型',
        // '数字类型',
        // '字符,布尔,单元类型',
        // '语句和表达式',
        // '函数',
        // '复合类型',
        // '字符串与切片',
        // '元组',
        // '结构体',
        // '枚举',
        // '数组',
        // '所有权',
        // '引用与借用',
      ],
    },
  ],
})
