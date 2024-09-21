import { definePlumeNotesItemConfig } from 'vuepress-theme-plume'

export default definePlumeNotesItemConfig({
  link: '/learn-vue3/',
  dir: 'vue3学习简记',
  sidebar: [
    '',
    {
      dir: '基础入门',
      collapsed: false,
      items: [
        'v-memo',
      ],
    }
  ],
})
