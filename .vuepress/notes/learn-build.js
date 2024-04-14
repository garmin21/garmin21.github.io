import { definePlumeNotesItemConfig } from 'vuepress-theme-plume'

export default definePlumeNotesItemConfig({
  link: '/learn-build/',
  dir: '构建工具',
  sidebar: [
    {
      dir: 'Gulp',
      collapsed: false,
      items: [
        'Gulp入门',
      ],
    },
    {
      dir: 'Webpack',
      collapsed: false,
      items: [
        'webpack快速入门教程',
      ],
    },
  ],
})
