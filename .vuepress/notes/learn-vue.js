import { definePlumeNotesItemConfig } from 'vuepress-theme-plume'

export default definePlumeNotesItemConfig({
  link: '/learn-vue/',
  dir: 'vue学习简记',
  sidebar: [
    '',
    // {
    //   dir: '环境准备',
    //   collapsed: false,
    //   items: ['安装', '编辑器扩展', 'Cargo'],
    // },
    {
      dir: '基础入门',
      collapsed: false,
      items: [
        'vue核心概念',
        'vueRouter',
        'render函数',
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
