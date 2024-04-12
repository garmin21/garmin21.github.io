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
          {
            text: 'vite-plugin-image-placeholder',
            link: 'https://github.com/garmin21/vite-plugin-image-placeholder',
            icon: 'bi:image-fill',
          },
        ],
      },
      {
        text: 'Vuepress',
        icon: 'vscode-icons:file-type-vue',
        items: [
          {
            text: 'vuepress-theme-plume',
            link: 'https://plume.jm-garming',
            icon: 'mdi:paper-airplane',
          },
          {
            text: 'plugin-caniuse',
            link: 'https://plume.jm-garming/plugins/plugin-caniuse/',
            icon: 'pajamas:feature-flag',
          },
          {
            text: 'plugin-shikiji',
            link: 'https://plume.jm-garming/plugins/plugin-shikiji/',
            icon: 'material-symbols-light:code-blocks-outline-rounded',
          },
          {
            text: 'plugin-iconify',
            link: 'https://plume.jm-garming/plugins/plugin-iconify/',
            icon: 'line-md:iconify1',
          },
          {
            text: 'plugin-netlify-functions',
            link: 'https://plume.jm-garming/plugins/plugin-netlify-functions/',
            icon: 'teenyicons:netlify-solid',
          },
        ],
      },
    ],
  },
  {
    text: '笔记',
    icon: 'icon-park-solid:bookshelf',
    items: [
      {
        text: '重生之我在深圳重学CSS',
        link: '/defensive-css/',
        activeMatch: '^/note/defensive-css/',
        icon: 'streamline:css-three',
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
        text: '构建工具',
        link: '/learn-build/',
        activeMatch: '^/note/learn-build/',
        icon: 'noto-v1:building-construction',
      }, //skill-icons:gulp
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
