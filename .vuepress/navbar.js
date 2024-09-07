import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/', icon: 'material-symbols:home' },
  {
    text: '博客',
    link: '/blog/',
    activeMatch: '^/(blog|article)/',
    icon: 'material-symbols:menu-book',
  },
  // { text: 'Projects', link: '/projects/', icon: 'ri:open-source-fill' },
  {
    text: '技术文档',
    icon: 'mdi:idea',
    activeMatch: '^/(vuepress-theme-plume|vuepress-plugin)/',
    items: [
      {
        text: 'Vite',
        icon: 'vscode-icons:file-type-vite',
        items: [
          {
            text: 'vite-plugin-mock-dev-server',
            link: 'https://vite-plugin-mock-dev-server.netlify.app/',
            icon: 'carbon:server-proxy',
          },
          
        ],
      },
      {
        text: 'Vuepress',
        icon: 'vscode-icons:file-type-vue',
        items: [
          {
            text: 'vuepress-theme-plume',
            link: 'https://plume.pengzhanbo.cn/guide/intro/',
            icon: 'mdi:paper-airplane',
          }
        ],
      },
    ],
  },
  {
    text: '笔记',
    icon: 'icon-park-solid:bookshelf',
    items: [
      {
        text: '网页三剑客',
        icon: 'game-icons:spider-web',
        items: [
          {
            text: 'CSS学习简记',
            link: '/defensive-css/',
            activeMatch: '^/note/defensive-css/',
            icon: 'streamline:css-three',
          },
          {
            text: 'JAVASCRIPT学习简记',
            link: '/defensive-javascript/',
            activeMatch: '^/note/defensive-javascript/',
            icon: 'skill-icons:javascript',
          },
        ],
      },
      {
        text: '前端框架',
        icon: 'emojione-v1:frame-with-tiles',
        items: [
          {
            text: 'vue2学习简记',
            link: '/learn-vue/',
            activeMatch: '^/note/learn-vue/',
            icon: 'logos:vue',
          },
          {
            text: 'react学习简记',
            link: '/learn-react/',
            activeMatch: '^/note/learn-react/',
            icon: 'skill-icons:react-dark',
          },
          {
            text: 'vue3学习简记',
            link: '/learn-vue3/',
            activeMatch: '^/note/learn-vue3/',
            icon: 'logos:vue',
          },
        ],
      },
      {
        text: 'Python学习简记',
        link: '/learn-py/',
        activeMatch: '^/note/learn-py/',
        icon: 'bxl:python',
      },
      {
        text: '工程化',
        icon: 'flat-color-icons:engineering',
        items: [
          {
            text: '构建工具',
            link: '/learn-build/',
            activeMatch: '^/note/learn-build/',
            icon: 'noto-v1:building-construction',
          }
        ],
      },
      {
        text: '前端面试题',
        link: '/interview-question/',
        activeMatch: '^/note/interview-question/',
        icon: 'codicon:comment-unresolved',
      },
      {
        text: 'type-challenges',
        link: '/type-challenges/',
        activeMatch: '^/note/type-challenges/',
        icon: 'mdi:language-typescript',
      },
      {
        text: 'Rust学习简记',
        link: '/learn-rust/',
        activeMatch: '^/note/learn-rust/',
        icon: 'mdi:language-rust',
      },
    ],
  },
  {
    text: '更多',
    icon: 'mingcute:more-3-fill',
    items: [
      {
        text: '书籍推荐',
        link: '/ebooks/',
        icon: 'material-symbols:recommend',
        activeMatch: '^/ebooks/',
      },
      {
        text: '站点导航',
        link: '/sites-collect/',
        icon: 'mdi:roadmap',
        activeMatch: '^/sites-collect',
      },
      {
        text: 'Command-Line Interface',
        link: '/cli/',
        icon: 'grommet-icons:cli',
        activeMatch: '^/cli',
      },
      {
        text: 'You-Need-Know-Vite',
        link: 'https://you-need-know-vite.netlify.app/',
        icon: 'vscode-icons:file-type-vite',
      },
      {
        text: 'iconify',
        link: 'https://iconify.design/',
        icon: 'simple-icons:iconify',
      },
    ],
  },
])
