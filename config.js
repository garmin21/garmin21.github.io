import { viteBundler } from '@vuepress/bundler-vite'
import { getDirname, path } from 'vuepress/utils'
import theme from './.vuepress/theme'
import { defineUserConfig } from 'vuepress'

const __dirname = getDirname(import.meta.url)

const resolve = (...dirs) => path.resolve(__dirname, ...dirs)

const isDev = () => process.env.NODE_ENV === 'development'

console.log(isDev())
export default defineUserConfig({
  bundler: viteBundler(),
  theme,
  // base: '/jm-garming/',
  base: '/',
  // plugins: [googleAnalyticsPlugin({ id: 'G-TMXNCJR2K7' })],
  lang: 'zh-CN',
  locales: {
    '/': { lang: 'zh-CN', title: '李嘉明', description: '热爱生活' },
  },
  dest: 'dist',
  public: resolve('public'),
  temp: resolve('.vuepress/.temp'),
  cache: resolve('.vuepress/.cache'),
  head: [
    // [
    //   'link',
    //   {
    //     rel: 'icon',
    //     type: 'image/png',
    //     sizes: '32x32',
    //     href: '/favicon-32x32.png',
    //   },
    // ],
    // [
    //   'link',
    //   {
    //     rel: 'icon',
    //     type: 'image/png',
    //     sizes: '16x16',
    //     href: '/favicon-16x16.png',
    //   },
    // ],
    // [
    //   'link',
    //   {
    //     rel: 'apple-touch-icon',
    //     sizes: '180x180',
    //     href: '/apple-touch-icon.png',
    //   },
    // ],
    // [
    //   'link',
    //   { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
    // ],
    ['meta', { name: 'keywords', content: '李嘉明,前端,front-end' }],
    ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edg' }],
    ['meta', { name: 'msapplication-TileColor', content: '#da532c' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    [
      'meta',
      { name: 'msvalidate.01', content: 'F93FF013B8AA2553779A91388C14A0F7' },
    ],
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'X5YSaTDn-pKqQBUKD_05_dQcxVItzEq7Rlbg2ZEU7AM',
      },
    ],
  ],
  // title: '你好， VuePress ！',
  // description: '这是我的第一个 VuePress 站点',
})
