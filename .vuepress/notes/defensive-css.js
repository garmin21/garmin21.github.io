import { definePlumeNotesItemConfig } from 'vuepress-theme-plume'

export default definePlumeNotesItemConfig({
  link: '/defensive-css/',
  dir: 'CSS学习简记',
  sidebar: [
    '',
    {
      dir: '基础篇',
      collapsed: true,
      items: [
        'selector',
        'line-height',
        'vertical-align',
        'background',
        'box-sizing',
        'margin',
        'float',
        'position',
        'min-max',
        'after',
        'calc',
        '@container'
      ],
    },
    {
      dir: '技巧篇',
      collapsed: true,
      items: [
        'scroll-behavior',
        '扩大点击区域',
        'element-fil-container',
        'flex-box-wrapping',
        'image-distortion',
        'long-content',
        'component-spacing',
        'auto-fit-fill',
        'background-repeat',
        'grid-fixed-values',
        'variable-fallback',
        'fixed-sizes',
        'minimum-content-size-in-flexbox',
        'minimum-content-size-in-grid',
        'grouping-vendor-selector',
        'image-maximum-width',
        'sticky-with-grid',
        'scroll-chaining',
        'scroll-gutter',
        'scrollbar-on-demand',
        'using-space-between',
        'text-over-image',
        'vertical-media-queries',
        'accidental-hover-on-mobile',
        'image-inner-border',
        'default-flexbox-stretching',
        'input-zoom-on-ios-safari',
        'button-minimum-width',
      ],
    },
    {
      dir: '进阶篇',
      collapsed: true,
      items: [
        '粘性布局'
      ],
    },
    // {
    //   text: '大神篇',
    //   collapsed: false,
    //   items: [
    //     ''
    //   ],
    // },
    {
      dir: 'CSS 预处理器',
      collapsed: true,
      items: [
        'SCSS',
        'bem'
      ],
    },
  ],
})
