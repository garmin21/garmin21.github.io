import { plumeTheme } from 'vuepress-theme-plume'
import notes from './notes/index.js'
import navbar from './navbar.js'
// import encrypt from './encrypt.js'

export default plumeTheme({
  hostname: 'http://garmin21.github.io/',
  docsDir: 'src',
  contributors: false,
  navbar,
  notes,
  logo: '/jm.jpg',
  avatar: {
    url: '/51853339.jpeg',
    name: '李嘉明',
    description: '世间的美好总是不期而遇',
    circle: true,
    location: '深圳，中国',
    organization: '跨越速递',
  },
  social: [{ icon: 'github', link: 'https://github.com/garmin21' }],
  editLinkText: '在 GitHub 上编辑此页',
  // footer: { copyright: 'Copyright © 2024-present garming' },
  footer: '',
  plugins: {
    externalLinkIcon: false,
    baiduTongji: { key: '49ebcb8d1abfcde890ef6f320a101db7' },
    shiki: { twoslash: true },
    markdownEnhance: { demo: true },
  },
  // encrypt
})
