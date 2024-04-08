import { definePlumeNotesItemConfig } from 'vuepress-theme-plume'

export default definePlumeNotesItemConfig({
  link: '/learn-react/',
  dir: 'react学习简记',
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
        'React核心概念',
        'React中路由',
        'React中代码分割',
        'React 性能优化 ',
        'React Hooks',
        'React Ref',
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
