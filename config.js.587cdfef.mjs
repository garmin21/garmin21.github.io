// config.js
import { viteBundler } from "@vuepress/bundler-vite";
import { getDirname, path } from "vuepress/utils";

// .vuepress/theme.js
import { plumeTheme } from "vuepress-theme-plume";

// .vuepress/notes/index.js
import { definePlumeNotesConfig } from "vuepress-theme-plume";

// .vuepress/notes/vuepress-theme-plume.js
import { definePlumeNotesItemConfig } from "vuepress-theme-plume";
var vuepress_theme_plume_default = definePlumeNotesItemConfig({
  dir: "vuepress-theme-plume",
  link: "/vuepress-theme-plume/",
  sidebar: [
    "",
    {
      text: "\u6307\u5357",
      items: ["\u5FEB\u901F\u5F00\u59CB", "\u7F16\u5199\u6587\u7AE0", "\u6548\u679C\u9884\u89C8"]
    },
    {
      text: "\u914D\u7F6E",
      items: [
        "\u4E3B\u9898\u914D\u7F6E",
        "\u591A\u8BED\u8A00\u914D\u7F6E",
        "\u4E3B\u9898\u63D2\u4EF6\u914D\u7F6E",
        "\u5BFC\u822A\u680F\u914D\u7F6E",
        "notes\u914D\u7F6E",
        "\u9875\u9762\u914D\u7F6E",
        "\u5185\u5BB9\u641C\u7D22",
        "\u6587\u7AE0\u8BC4\u8BBA",
        "\u52A0\u5BC6",
        "\u81EA\u5B9A\u4E49\u6837\u5F0F",
        "\u6269\u5C55\u9875\u9762"
      ]
    },
    {
      text: "\u529F\u80FD",
      items: [
        "\u57FA\u7840\u529F\u80FD",
        "\u5185\u7F6E\u63D2\u4EF6",
        "\u5168\u5C40\u7EC4\u4EF6",
        "\u4EE3\u7801\u5757\u9AD8\u4EAE",
        "markdown\u589E\u5F3A",
        "\u5B9E\u9A8C\u6027\u529F\u80FD"
      ]
    }
  ]
});

// .vuepress/notes/interview-question.js
import { definePlumeNotesItemConfig as definePlumeNotesItemConfig2 } from "vuepress-theme-plume";
var interview_question_default = definePlumeNotesItemConfig2({
  link: "/interview-question/",
  dir: "\u9762\u8BD5\u9898",
  sidebar: [
    {
      dir: "HTML",
      items: ["DOCTYPE", "\u5143\u7D20\u7684\u5206\u7C7B", "HTML5\u65B0\u7279\u6027", "\u8BED\u4E49\u5316\u7406\u89E3"]
    },
    {
      dir: "CSS",
      items: [
        "\u76D2\u6A21\u578B",
        "\u5916\u8FB9\u8DDD\u5408\u5E76",
        "BFC\u5757\u7EA7\u683C\u5F0F\u5316\u4E0A\u4E0B\u6587",
        "IFC,GFC,FFC",
        "\u50CF\u7D20",
        "CSS\u6D6E\u52A8",
        "\u5143\u7D20\u5782\u76F4\u5C45\u4E2D",
        "Flex\u5F39\u6027\u5E03\u5C40",
        "css\u4E09\u89D2\u5F62\u539F\u7406"
      ]
    },
    // {
    //   dir: 'JavaScript',
    //   items: [
    //     '变量',
    //     '数据类型',
    //     '数据类型转换',
    //     '栈和堆',
    //     '原型和原型链',
    //     '执行上下文和执行栈',
    //     '作用域链',
    //     '闭包',
    //     '严格模式',
    //     '字符串',
    //     'NaN',
    //     '数组和对象',
    //     '集合对象',
    //     'this对象',
    //     '函数与箭头函数',
    //     'new操作符',
    //     '函数柯里化',
    //     '事件',
    //     '写一个通用事件侦听器',
    //     '模块化',
    //     '模块加载器原理',
    //     '浅拷贝和深拷贝',
    //     'DOM节点操作',
    //     '跨域',
    //     '节流与防抖',
    //     'promise',
    //     '设计模式',
    //     'MV-设计模式',
    //   ],
    // },
    {
      dir: "\u6D4F\u89C8\u5668",
      items: [
        "\u5BF9\u6D4F\u89C8\u5668\u7684\u7406\u89E3",
        "\u6D4F\u89C8\u5668\u5185\u6838",
        "\u6E32\u67D3\u539F\u7406",
        "\u6D4F\u89C8\u5668\u89E3\u6790\u8FC7\u7A0B",
        "\u6D4F\u89C8\u5668\u6E32\u67D3\u8FC7\u7A0B",
        "\u91CD\u7ED8\u4E0E\u56DE\u6D41",
        "\u6D4F\u89C8\u5668\u5B58\u50A8",
        "\u5783\u573E\u56DE\u6536\u673A\u5236",
        "\u5185\u5B58\u6CC4\u9732",
        "\u4E8B\u4EF6\u5FAA\u73AF",
        "\u6D4F\u89C8\u5668\u8F93\u5165URL"
      ]
    },
    {
      dir: "\u8BA1\u7B97\u673A\u7F51\u7EDC",
      items: ["http\u534F\u8BAE", "http\u7F13\u5B58", "http2", "TCP\u534F\u8BAE", "UDP\u534F\u8BAE", "CDN", "\u4EE3\u7406", "\u8D1F\u8F7D\u5747\u8861"]
    },
    {
      dir: "Vue",
      items: [
        "VirtualDom",
        "v-if\u548Cv-show\u7684\u533A\u522B",
        "computed\u548Cwatch",
        "keep-alive",
        "vue2\u548Cvue3\u7684\u533A\u522B",
        "\u5BF9vuex\u7684\u7406\u89E3",
        {
          text: "vue@3",
          dir: "v3",
          items: [
            "\u54CD\u5E94\u5F0F\u539F\u7406",
            "\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F",
            "\u751F\u547D\u5468\u671F",
            "v-model",
            "v-if\u548Cv-for\u4F18\u5148\u7EA7",
            "\u6307\u4EE4",
            "\u8DEF\u7531",
            "nextTick",
            "watch-watchEffect"
          ]
        },
        {
          text: "vue@2",
          dir: "v2",
          items: [
            "\u54CD\u5E94\u5F0F\u539F\u7406",
            "data\u4E3A\u4EC0\u4E48\u5FC5\u987B\u662F\u51FD\u6570",
            "v-if\u548Cv-for\u4F18\u5148\u7EA7",
            "\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F",
            "\u751F\u547D\u5468\u671F",
            "\u6307\u4EE4",
            "\u8DEF\u7531"
          ]
        }
      ]
    },
    {
      dir: "React",
      items: []
    },
    {
      dir: "NodeJs",
      items: []
    },
    {
      dir: "\u5DE5\u5177",
      items: ["git", "git-hook", "jenkins", "\u4EE3\u7801\u68C0\u67E5\u5DE5\u5177", "\u6A21\u5757\u6253\u5305\u5668", "webpack", "pm2"]
    },
    {
      dir: "\u5E38\u7528\u5E93",
      items: ["axios", "lodash", "UI\u6846\u67B6"]
    },
    {
      dir: "\u5B89\u5168",
      items: ["XSS\u653B\u51FB", "CSRF\u653B\u51FB", "SQL\u6CE8\u5165\u653B\u51FB", "CSP\u5185\u5BB9\u5B89\u5168", "\u70B9\u51FB\u52AB\u6301"]
    },
    {
      dir: "\u7B97\u6CD5",
      items: [
        {
          text: "\u6392\u5E8F\u7B97\u6CD5",
          dir: "\u6392\u5E8F",
          items: ["\u5192\u6CE1\u6392\u5E8F", "\u9009\u62E9\u6392\u5E8F", "\u63D2\u5165\u6392\u5E8F", "\u5E0C\u5C14\u6392\u5E8F", "\u5F52\u5E76\u6392\u5E8F", "\u5FEB\u901F\u6392\u5E8F", "\u6392\u5E8F\u7B97\u6CD5\u603B\u7ED3"]
        },
        {
          text: "\u67E5\u627E\u7B97\u6CD5",
          dir: "\u67E5\u627E",
          items: ["\u4E8C\u5206\u67E5\u627E\u6CD5"]
        },
        {
          text: "\u4F18\u5316\u7B97\u6CD5",
          dir: "\u4F18\u5316",
          items: ["LRU\u7F13\u5B58\u673A\u5236\u7B97\u6CD5"]
        }
      ]
    },
    {
      dir: "\u5176\u4ED6",
      items: ["\u524D\u7AEFSEO", "\u524D\u7AEF\u6027\u80FD\u4F18\u5316"]
    }
  ]
});

// .vuepress/notes/vuepress-plugin.js
import { definePlumeNotesItemConfig as definePlumeNotesItemConfig3 } from "vuepress-theme-plume";
var vuepress_plugin_default = definePlumeNotesItemConfig3({
  dir: "vuepress-plugin",
  link: "/vuepress-plugin/",
  sidebar: [
    {
      text: "Vuepress Plugin",
      items: [
        "caniuse/README",
        "auto-frontmatter/README",
        "blog-data/README",
        "notes-data/README",
        "shikiji/README",
        "content-update/README",
        "iconify/README",
        {
          dir: "netlify-functions",
          text: "plugin-netlify-functions",
          link: "/note/vuepress-plugin/netlify-functions/",
          items: ["\u4ECB\u7ECD", "\u4F7F\u7528", "\u529F\u80FD", "API", "functions\u5F00\u53D1\u6307\u5357"]
        }
      ]
    }
  ]
});

// .vuepress/notes/type-challenges.js
import { definePlumeNotesItemConfig as definePlumeNotesItemConfig4 } from "vuepress-theme-plume";
var type_challenges_default = definePlumeNotesItemConfig4({
  link: "/type-challenges/",
  dir: "type-challenges",
  sidebar: [
    "",
    {
      dir: "\u70ED\u8EAB",
      text: "\u70ED\u8EAB(1)",
      collapsed: false,
      items: ["HelloWorld"]
    },
    {
      dir: "\u7B80\u5355",
      text: "\u7B80\u5355(13)",
      collapsed: false,
      items: [
        "pick",
        "readonly",
        "tupleToObject",
        "firstOfArray",
        "lengthOfTuple",
        "exclude",
        "awaited",
        "if",
        "concat",
        "includes",
        "push",
        "unshift",
        "parameters"
      ]
    },
    {
      dir: "\u4E2D\u7B49",
      text: "\u4E2D\u7B49(75)",
      collapsed: false,
      items: [
        "getReturnType",
        "omit",
        "readonly2",
        "deepReadonly",
        "tupleToUnion",
        "chainableOptions",
        "lastOfArray",
        "pop",
        "promiseAll",
        "typeLookup",
        "trimLeft",
        "trim",
        "capitalize",
        "replace",
        "replaceAll",
        "appendArgument",
        "permutation",
        "lengthOfString",
        "flatten",
        "appendToObject",
        "absolute",
        "stringToUnion",
        "merge",
        "kebabCase",
        "diff",
        "anyOf",
        "isNever",
        "isUnion",
        "replaceKeys",
        "removeIndexSignature",
        "percentageParser",
        "dropChar",
        "minusOne",
        "pickByType",
        "startsWith",
        "endsWith",
        "mutable",
        "omitByType",
        "objectEntries",
        "shift",
        "tupleToNestedObject",
        "reverse",
        "flipArguments",
        "flattenDepth",
        "bemStyleString",
        "inorderTraversal",
        "flip",
        "fibonacciSequence",
        "allCombinations",
        "greaterThan",
        "zip",
        "isTuple",
        "chunk",
        "fill",
        "trimRight",
        "without",
        "trunc",
        "indexOf",
        "join",
        "lastIndexOf",
        "unique",
        "mapTypes",
        "constructTuple",
        "numberRange",
        "combination",
        "subsequence",
        "firstUniqueCharIndex",
        "getMiddleElement",
        "integer",
        "toPrimitive",
        "deepMutable",
        "all",
        "filter"
      ]
    },
    {
      dir: "\u56F0\u96BE",
      text: "\u56F0\u96BE(43)",
      collapsed: true,
      items: [
        "simpleVue",
        "currying1",
        "unionToIntersection",
        "getRequired",
        "getOptional",
        "requiredKeys",
        "optionalKeys",
        "capitalizeWords",
        "camelCase",
        "cPrintfParser",
        "vueBasicProps",
        "isAny",
        "typedGet",
        "stringToNumber",
        "tupleFilter",
        "tupleToEnumObject",
        "printf",
        "deepObjectToUnique",
        "lengthOfString2",
        "unionToTuple",
        "stringJoin",
        "deepPick",
        "pinia",
        "camelize",
        "dropString",
        "split",
        "classPublicKeys",
        "isRequiredKey",
        "objectFromEntries",
        "isPalindrome",
        "mutableKeys",
        "intersection",
        "binaryToDecimal",
        "objectKeyPaths",
        "twoSum",
        "validDate",
        "assign",
        "maximum",
        "capitalizeNestObjectKeys",
        "replaceUnion",
        "fizzBuzz",
        "runLengthEncoding",
        "treePathArray"
      ]
    },
    {
      dir: "\u5730\u72F1",
      text: "\u5730\u72F1(14)",
      collapsed: true,
      items: [
        "getReadonlyKeys",
        "queryStringParser",
        "slice",
        "integersComparator",
        "currying2",
        "sum",
        "multiply",
        "tag",
        "inclusiveRange",
        "sort",
        "distributeUnions",
        "assertArrayIndex",
        "jsonParser",
        "subtract"
      ]
    }
  ]
});

// .vuepress/notes/learn-rust.js
import { definePlumeNotesItemConfig as definePlumeNotesItemConfig5 } from "vuepress-theme-plume";
var learn_rust_default = definePlumeNotesItemConfig5({
  link: "/learn-rust/",
  dir: "rust\u5B66\u4E60\u7B80\u8BB0",
  sidebar: [
    "",
    {
      dir: "\u73AF\u5883\u51C6\u5907",
      collapsed: false,
      items: ["\u5B89\u88C5", "\u7F16\u8F91\u5668\u6269\u5C55", "Cargo"]
    },
    {
      dir: "\u57FA\u7840\u5165\u95E8",
      collapsed: false,
      items: [
        "\u53D8\u91CF",
        "\u7C7B\u578B\u63A8\u5BFC",
        "\u57FA\u672C\u7C7B\u578B",
        "\u6570\u5B57\u7C7B\u578B",
        "\u5B57\u7B26,\u5E03\u5C14,\u5355\u5143\u7C7B\u578B",
        "\u8BED\u53E5\u548C\u8868\u8FBE\u5F0F",
        "\u51FD\u6570",
        "\u590D\u5408\u7C7B\u578B",
        "\u5B57\u7B26\u4E32\u4E0E\u5207\u7247",
        "\u5143\u7EC4",
        "\u7ED3\u6784\u4F53",
        "\u679A\u4E3E",
        "\u6570\u7EC4",
        "\u6240\u6709\u6743",
        "\u5F15\u7528\u4E0E\u501F\u7528"
      ]
    }
  ]
});

// .vuepress/notes/defensive-css.js
import { definePlumeNotesItemConfig as definePlumeNotesItemConfig6 } from "vuepress-theme-plume";
var defensive_css_default = definePlumeNotesItemConfig6({
  link: "/defensive-css/",
  dir: "CSS\u5B66\u4E60\u7B80\u8BB0",
  sidebar: [
    "",
    {
      dir: "\u57FA\u7840\u7BC7",
      collapsed: true,
      items: [
        "CSS\u9009\u62E9\u5668",
        "line-height",
        "vertical-align",
        "\u80CC\u666F",
        "\u76D2\u6A21\u578B",
        "margin",
        "float",
        "\u5B9A\u4F4D",
        "min-max",
        "\u4F2A\u5143\u7D20",
        "css\u51FD\u6570"
      ]
    },
    {
      dir: "\u6280\u5DE7\u7BC7",
      collapsed: true,
      items: [
        "\u6269\u5927\u70B9\u51FB\u533A\u57DF",
        "element-fil-container",
        "flex-box-wrapping",
        "image-distortion",
        "long-content",
        "component-spacing",
        "auto-fit-fill",
        "background-repeat",
        "grid-fixed-values",
        "variable-fallback",
        "fixed-sizes",
        "minimum-content-size-in-flexbox",
        "minimum-content-size-in-grid",
        "grouping-vendor-selector",
        "image-maximum-width",
        "sticky-with-grid",
        "scroll-chaining",
        "scroll-gutter",
        "scrollbar-on-demand",
        "using-space-between",
        "text-over-image",
        "vertical-media-queries",
        "accidental-hover-on-mobile",
        "image-inner-border",
        "default-flexbox-stretching",
        "input-zoom-on-ios-safari",
        "button-minimum-width"
      ]
    },
    {
      dir: "\u8FDB\u9636\u7BC7",
      collapsed: true,
      items: [
        "\u7C98\u6027\u5E03\u5C40"
      ]
    },
    // {
    //   text: '大神篇',
    //   collapsed: false,
    //   items: [
    //     ''
    //   ],
    // },
    {
      dir: "CSS \u9884\u5904\u7406\u5668",
      collapsed: true,
      items: [
        "SCSS",
        "bem"
      ]
    }
  ]
});

// .vuepress/notes/learn-react.js
import { definePlumeNotesItemConfig as definePlumeNotesItemConfig7 } from "vuepress-theme-plume";
var learn_react_default = definePlumeNotesItemConfig7({
  link: "/learn-react/",
  dir: "react\u5B66\u4E60\u7B80\u8BB0",
  sidebar: [
    "",
    // {
    //   dir: '环境准备',
    //   collapsed: false,
    //   items: ['安装', '编辑器扩展', 'Cargo'],
    // },
    {
      dir: "\u57FA\u7840\u5165\u95E8",
      collapsed: false,
      items: [
        "React\u6838\u5FC3\u6982\u5FF5",
        "React\u4E2D\u8DEF\u7531",
        "React\u4E2D\u4EE3\u7801\u5206\u5272",
        "React \u6027\u80FD\u4F18\u5316 ",
        "React Hooks",
        "React Ref"
        // '函数',
        // '复合类型',
        // '字符串与切片',
        // '元组',
        // '结构体',
        // '枚举',
        // '数组',
        // '所有权',
        // '引用与借用',
      ]
    }
  ]
});

// .vuepress/notes/learn-vue.js
import { definePlumeNotesItemConfig as definePlumeNotesItemConfig8 } from "vuepress-theme-plume";
var learn_vue_default = definePlumeNotesItemConfig8({
  link: "/learn-vue/",
  dir: "vue\u5B66\u4E60\u7B80\u8BB0",
  sidebar: [
    "",
    // {
    //   dir: '环境准备',
    //   collapsed: false,
    //   items: ['安装', '编辑器扩展', 'Cargo'],
    // },
    {
      dir: "\u57FA\u7840\u5165\u95E8",
      collapsed: false,
      items: [
        "vue\u6838\u5FC3\u6982\u5FF5",
        "\u8DEF\u7531",
        "render\u51FD\u6570",
        "\u63D2\u69FD"
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
      ]
    }
  ]
});

// .vuepress/notes/learn-build.js
import { definePlumeNotesItemConfig as definePlumeNotesItemConfig9 } from "vuepress-theme-plume";
var learn_build_default = definePlumeNotesItemConfig9({
  link: "/learn-build/",
  dir: "\u6784\u5EFA\u5DE5\u5177",
  sidebar: [
    {
      dir: "Gulp",
      collapsed: false,
      items: [
        "Gulp\u5165\u95E8"
      ]
    },
    {
      dir: "Webpack",
      collapsed: false,
      items: [
        "webpack\u5FEB\u901F\u5165\u95E8\u6559\u7A0B"
      ]
    }
  ]
});

// .vuepress/notes/index.js
var notes_default = definePlumeNotesConfig({
  dir: "notes",
  link: "/",
  notes: [
    vuepress_theme_plume_default,
    interview_question_default,
    vuepress_plugin_default,
    type_challenges_default,
    learn_rust_default,
    defensive_css_default,
    learn_react_default,
    learn_vue_default,
    learn_build_default
  ]
});

// .vuepress/navbar.js
import { defineNavbarConfig } from "vuepress-theme-plume";
var navbar_default = defineNavbarConfig([
  { text: "\u9996\u9875", link: "/", icon: "material-symbols:home" },
  {
    text: "\u535A\u5BA2",
    link: "/blog/",
    activeMatch: "^/(blog|article)/",
    icon: "material-symbols:menu-book"
  },
  // { text: 'Projects', link: '/projects/', icon: 'ri:open-source-fill' },
  {
    text: "\u6280\u672F\u6587\u6863",
    icon: "mdi:idea",
    activeMatch: "^/(vuepress-theme-plume|vuepress-plugin)/",
    items: [
      {
        text: "Vite",
        icon: "vscode-icons:file-type-vite",
        items: [
          {
            text: "vite-plugin-mock-dev-server",
            link: "https://vite-plugin-mock-dev-server.netlify.app/",
            icon: "carbon:server-proxy"
          },
          {
            text: "vite-plugin-image-placeholder",
            link: "https://github.com/garmin21/vite-plugin-image-placeholder",
            icon: "bi:image-fill"
          }
        ]
      },
      {
        text: "Vuepress",
        icon: "vscode-icons:file-type-vue",
        items: [
          // {
          //   text: 'vuepress-theme-plume',
          //   link: 'https://plume.jm-garming',
          //   icon: 'mdi:paper-airplane',
          // },
          // {
          //   text: 'plugin-caniuse',
          //   link: 'https://plume.jm-garming/plugins/plugin-caniuse/',
          //   icon: 'pajamas:feature-flag',
          // },
          // {
          //   text: 'plugin-shikiji',
          //   link: 'https://plume.jm-garming/plugins/plugin-shikiji/',
          //   icon: 'material-symbols-light:code-blocks-outline-rounded',
          // },
          // {
          //   text: 'plugin-iconify',
          //   link: 'https://plume.jm-garming/plugins/plugin-iconify/',
          //   icon: 'line-md:iconify1',
          // },
          // {
          //   text: 'plugin-netlify-functions',
          //   link: 'https://plume.jm-garming/plugins/plugin-netlify-functions/',
          //   icon: 'teenyicons:netlify-solid',
          // },
        ]
      }
    ]
  },
  {
    text: "\u7B14\u8BB0",
    icon: "icon-park-solid:bookshelf",
    items: [
      {
        text: "CSS\u5B66\u4E60\u7B80\u8BB0",
        link: "/defensive-css/",
        activeMatch: "^/note/defensive-css/",
        icon: "streamline:css-three"
      },
      {
        text: "\u524D\u7AEF\u9762\u8BD5\u9898",
        link: "/interview-question/",
        activeMatch: "^/note/interview-question/",
        icon: "codicon:comment-unresolved"
      },
      {
        text: "type-challenges",
        link: "/type-challenges/",
        activeMatch: "^/note/type-challenges/",
        icon: "mdi:language-typescript"
      },
      {
        text: "Rust\u5B66\u4E60\u7B80\u8BB0",
        link: "/learn-rust/",
        activeMatch: "^/note/learn-rust/",
        icon: "mdi:language-rust"
      },
      {
        text: "vue2\u5B66\u4E60\u7B80\u8BB0",
        link: "/learn-vue/",
        activeMatch: "^/note/learn-vue/",
        icon: "logos:vue"
      },
      {
        text: "react\u5B66\u4E60\u7B80\u8BB0",
        link: "/learn-react/",
        activeMatch: "^/note/learn-react/",
        icon: "skill-icons:react-dark"
      },
      {
        text: "\u6784\u5EFA\u5DE5\u5177",
        link: "/learn-build/",
        activeMatch: "^/note/learn-build/",
        icon: "noto-v1:building-construction"
      }
      //skill-icons:gulp
    ]
  },
  {
    text: "\u66F4\u591A",
    icon: "mingcute:more-3-fill",
    items: [
      {
        text: "\u4E66\u7C4D\u63A8\u8350",
        link: "/ebooks/",
        icon: "material-symbols:recommend",
        activeMatch: "^/ebooks/"
      },
      {
        text: "\u7AD9\u70B9\u5BFC\u822A",
        link: "/sites-collect/",
        icon: "mdi:roadmap",
        activeMatch: "^/sites-collect"
      },
      {
        text: "Command-Line Interface",
        link: "/cli/",
        icon: "grommet-icons:cli",
        activeMatch: "^/cli"
      },
      {
        text: "You-Need-Know-Vite",
        link: "https://you-need-know-vite.netlify.app/",
        icon: "vscode-icons:file-type-vite"
      },
      {
        text: "iconify",
        link: "https://iconify.design/",
        icon: "simple-icons:iconify"
      }
    ]
  }
]);

// .vuepress/encrypt.js
var encrypt_default = {
  global: true,
  admin: ["www26uuucom"]
  // rules: {
  //   '/learn-vue/': 'www26uuucom',
  //   可以是 md 文件的相对路径，对该文件加密
  //   "前端/基础.md": "123456",
  //   可以是 文件夹的路径，对该目录下所有文章加密
  //   "/notes/vuepress-theme-plume/": "123456",
  //   可以是 访问地址的请求路径，对该访问路径下所有文章加密
  //   "/vuepress-theme-plume/": "123456",
  //   可以是 具体的某个页面的请求路径，对该页面加密
  //   "/article/f8dnci3/": "123456",
  //   如果是 `^` 开头，则匹配该正则表达式的页面也会加密
  //   "^/(a|b)/": "123456",
  // },
};

// .vuepress/theme.js
var theme_default = plumeTheme({
  hostname: "http://garmin21.github.io/",
  docsDir: "src",
  contributors: false,
  navbar: navbar_default,
  notes: notes_default,
  logo: "/jm.jpg",
  avatar: {
    url: "/51853339.jpeg",
    name: "\u674E\u5609\u660E",
    description: "\u4E16\u95F4\u7684\u7F8E\u597D\u603B\u662F\u4E0D\u671F\u800C\u9047",
    circle: true,
    location: "\u6DF1\u5733\uFF0C\u4E2D\u56FD",
    organization: "\u8DE8\u8D8A\u901F\u9012"
  },
  social: [{ icon: "github", link: "https://github.com/garmin21" }],
  editLinkText: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875",
  // footer: { copyright: 'Copyright © 2024-present garming' },
  footer: "",
  plugins: {
    externalLinkIcon: false,
    baiduTongji: { key: "49ebcb8d1abfcde890ef6f320a101db7" },
    shiki: { twoslash: true },
    markdownEnhance: { demo: true }
  },
  encrypt: encrypt_default
});

// config.js
import { defineUserConfig } from "vuepress";
var __vite_injected_original_import_meta_url = "file:///D:/garmin21.github.io/config.js";
var __dirname = getDirname(__vite_injected_original_import_meta_url);
var resolve = (...dirs) => path.resolve(__dirname, ...dirs);
var config_default = defineUserConfig({
  // port: 9527, // 指定端口号为 8080
  bundler: viteBundler(),
  theme: theme_default,
  base: "/",
  // plugins: [googleAnalyticsPlugin({ id: 'G-TMXNCJR2K7' })],
  lang: "zh-CN",
  locales: {
    "/": { lang: "zh-CN", title: "Garming", description: "\u70ED\u7231\u751F\u6D3B" }
  },
  dest: "dist",
  public: resolve("public"),
  temp: resolve(".vuepress/.temp"),
  cache: resolve(".vuepress/.cache"),
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/jpg",
        sizes: "32x32",
        href: "/jm.jpg"
      }
    ],
    // [
    //   'link',
    //   {
    //     rel: 'icon',
    //     type: 'image/png',
    //     sizes: '16x16',
    //     href: '/favicon.ico',
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
    ["meta", { name: "keywords", content: "\u674E\u5609\u660E,\u524D\u7AEF,front-end" }],
    ["meta", { "http-equiv": "X-UA-Compatible", content: "IE=edg" }],
    ["meta", { name: "msapplication-TileColor", content: "#da532c" }],
    ["meta", { name: "theme-color", content: "#ffffff" }],
    [
      "meta",
      { name: "msvalidate.01", content: "F93FF013B8AA2553779A91388C14A0F7" }
    ],
    [
      "meta",
      {
        name: "google-site-verification",
        content: "X5YSaTDn-pKqQBUKD_05_dQcxVItzEq7Rlbg2ZEU7AM"
      }
    ]
  ]
  // title: '你好， VuePress ！',
  // description: '这是我的第一个 VuePress 站点',
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29uZmlnLmpzIiwgIi52dWVwcmVzcy90aGVtZS5qcyIsICIudnVlcHJlc3Mvbm90ZXMvaW5kZXguanMiLCAiLnZ1ZXByZXNzL25vdGVzL3Z1ZXByZXNzLXRoZW1lLXBsdW1lLmpzIiwgIi52dWVwcmVzcy9ub3Rlcy9pbnRlcnZpZXctcXVlc3Rpb24uanMiLCAiLnZ1ZXByZXNzL25vdGVzL3Z1ZXByZXNzLXBsdWdpbi5qcyIsICIudnVlcHJlc3Mvbm90ZXMvdHlwZS1jaGFsbGVuZ2VzLmpzIiwgIi52dWVwcmVzcy9ub3Rlcy9sZWFybi1ydXN0LmpzIiwgIi52dWVwcmVzcy9ub3Rlcy9kZWZlbnNpdmUtY3NzLmpzIiwgIi52dWVwcmVzcy9ub3Rlcy9sZWFybi1yZWFjdC5qcyIsICIudnVlcHJlc3Mvbm90ZXMvbGVhcm4tdnVlLmpzIiwgIi52dWVwcmVzcy9ub3Rlcy9sZWFybi1idWlsZC5qcyIsICIudnVlcHJlc3MvbmF2YmFyLmpzIiwgIi52dWVwcmVzcy9lbmNyeXB0LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDovZ2FybWluMjEuZ2l0aHViLmlvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxnYXJtaW4yMS5naXRodWIuaW9cXFxcY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9nYXJtaW4yMS5naXRodWIuaW8vY29uZmlnLmpzXCI7aW1wb3J0IHsgdml0ZUJ1bmRsZXIgfSBmcm9tICdAdnVlcHJlc3MvYnVuZGxlci12aXRlJ1xyXG5pbXBvcnQgeyBnZXREaXJuYW1lLCBwYXRoIH0gZnJvbSAndnVlcHJlc3MvdXRpbHMnXHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLy52dWVwcmVzcy90aGVtZSdcclxuaW1wb3J0IHsgZGVmaW5lVXNlckNvbmZpZyB9IGZyb20gJ3Z1ZXByZXNzJ1xyXG5cclxuY29uc3QgX19kaXJuYW1lID0gZ2V0RGlybmFtZShpbXBvcnQubWV0YS51cmwpXHJcbmNvbnN0IHJlc29sdmUgPSAoLi4uZGlycykgPT4gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgLi4uZGlycylcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVVzZXJDb25maWcoe1xyXG4gIC8vIHBvcnQ6IDk1MjcsIC8vIFx1NjMwN1x1NUI5QVx1N0FFRlx1NTNFM1x1NTNGN1x1NEUzQSA4MDgwXHJcbiAgYnVuZGxlcjogdml0ZUJ1bmRsZXIoKSxcclxuICB0aGVtZSxcclxuICBiYXNlOiAnLycsXHJcbiAgLy8gcGx1Z2luczogW2dvb2dsZUFuYWx5dGljc1BsdWdpbih7IGlkOiAnRy1UTVhOQ0pSMks3JyB9KV0sXHJcbiAgbGFuZzogJ3poLUNOJyxcclxuICBsb2NhbGVzOiB7XHJcbiAgICAnLyc6IHsgbGFuZzogJ3poLUNOJywgdGl0bGU6ICdHYXJtaW5nJywgZGVzY3JpcHRpb246ICdcdTcwRURcdTcyMzFcdTc1MUZcdTZEM0InIH0sXHJcbiAgfSxcclxuICBkZXN0OiAnZGlzdCcsXHJcbiAgcHVibGljOiByZXNvbHZlKCdwdWJsaWMnKSxcclxuICB0ZW1wOiByZXNvbHZlKCcudnVlcHJlc3MvLnRlbXAnKSxcclxuICBjYWNoZTogcmVzb2x2ZSgnLnZ1ZXByZXNzLy5jYWNoZScpLFxyXG4gIGhlYWQ6IFtcclxuICAgIFtcclxuICAgICAgJ2xpbmsnLFxyXG4gICAgICB7XHJcbiAgICAgICAgcmVsOiAnaWNvbicsXHJcbiAgICAgICAgdHlwZTogJ2ltYWdlL2pwZycsXHJcbiAgICAgICAgc2l6ZXM6ICczMngzMicsXHJcbiAgICAgICAgaHJlZjogJy9qbS5qcGcnLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIC8vIFtcclxuICAgIC8vICAgJ2xpbmsnLFxyXG4gICAgLy8gICB7XHJcbiAgICAvLyAgICAgcmVsOiAnaWNvbicsXHJcbiAgICAvLyAgICAgdHlwZTogJ2ltYWdlL3BuZycsXHJcbiAgICAvLyAgICAgc2l6ZXM6ICcxNngxNicsXHJcbiAgICAvLyAgICAgaHJlZjogJy9mYXZpY29uLmljbycsXHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyBdLFxyXG4gICAgLy8gW1xyXG4gICAgLy8gICAnbGluaycsXHJcbiAgICAvLyAgIHtcclxuICAgIC8vICAgICByZWw6ICdhcHBsZS10b3VjaC1pY29uJyxcclxuICAgIC8vICAgICBzaXplczogJzE4MHgxODAnLFxyXG4gICAgLy8gICAgIGhyZWY6ICcvYXBwbGUtdG91Y2gtaWNvbi5wbmcnLFxyXG4gICAgLy8gICB9LFxyXG4gICAgLy8gXSxcclxuICAgIC8vIFtcclxuICAgIC8vICAgJ2xpbmsnLFxyXG4gICAgLy8gICB7IHJlbDogJ21hc2staWNvbicsIGhyZWY6ICcvc2FmYXJpLXBpbm5lZC10YWIuc3ZnJywgY29sb3I6ICcjNWJiYWQ1JyB9LFxyXG4gICAgLy8gXSxcclxuICAgIFsnbWV0YScsIHsgbmFtZTogJ2tleXdvcmRzJywgY29udGVudDogJ1x1Njc0RVx1NTYwOVx1NjYwRSxcdTUyNERcdTdBRUYsZnJvbnQtZW5kJyB9XSxcclxuICAgIFsnbWV0YScsIHsgJ2h0dHAtZXF1aXYnOiAnWC1VQS1Db21wYXRpYmxlJywgY29udGVudDogJ0lFPWVkZycgfV0sXHJcbiAgICBbJ21ldGEnLCB7IG5hbWU6ICdtc2FwcGxpY2F0aW9uLVRpbGVDb2xvcicsIGNvbnRlbnQ6ICcjZGE1MzJjJyB9XSxcclxuICAgIFsnbWV0YScsIHsgbmFtZTogJ3RoZW1lLWNvbG9yJywgY29udGVudDogJyNmZmZmZmYnIH1dLFxyXG4gICAgW1xyXG4gICAgICAnbWV0YScsXHJcbiAgICAgIHsgbmFtZTogJ21zdmFsaWRhdGUuMDEnLCBjb250ZW50OiAnRjkzRkYwMTNCOEFBMjU1Mzc3OUE5MTM4OEMxNEEwRjcnIH0sXHJcbiAgICBdLFxyXG4gICAgW1xyXG4gICAgICAnbWV0YScsXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiAnZ29vZ2xlLXNpdGUtdmVyaWZpY2F0aW9uJyxcclxuICAgICAgICBjb250ZW50OiAnWDVZU2FURG4tcEtxUUJVS0RfMDVfZFFjeFZJdHpFcTdSbGJnMlpFVTdBTScsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIF0sXHJcbiAgLy8gdGl0bGU6ICdcdTRGNjBcdTU5N0RcdUZGMEMgVnVlUHJlc3MgXHVGRjAxJyxcclxuICAvLyBkZXNjcmlwdGlvbjogJ1x1OEZEOVx1NjYyRlx1NjIxMVx1NzY4NFx1N0IyQ1x1NEUwMFx1NEUyQSBWdWVQcmVzcyBcdTdBRDlcdTcwQjknLFxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6L2dhcm1pbjIxLmdpdGh1Yi5pby8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGdhcm1pbjIxLmdpdGh1Yi5pb1xcXFwudnVlcHJlc3NcXFxcdGhlbWUuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2dhcm1pbjIxLmdpdGh1Yi5pby8udnVlcHJlc3MvdGhlbWUuanNcIjtpbXBvcnQgeyBwbHVtZVRoZW1lIH0gZnJvbSAndnVlcHJlc3MtdGhlbWUtcGx1bWUnXHJcbmltcG9ydCBub3RlcyBmcm9tICcuL25vdGVzL2luZGV4LmpzJ1xyXG5pbXBvcnQgbmF2YmFyIGZyb20gJy4vbmF2YmFyLmpzJ1xyXG5pbXBvcnQgZW5jcnlwdCBmcm9tICcuL2VuY3J5cHQuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBwbHVtZVRoZW1lKHtcclxuICBob3N0bmFtZTogJ2h0dHA6Ly9nYXJtaW4yMS5naXRodWIuaW8vJyxcclxuICBkb2NzRGlyOiAnc3JjJyxcclxuICBjb250cmlidXRvcnM6IGZhbHNlLFxyXG4gIG5hdmJhcixcclxuICBub3RlcyxcclxuICBsb2dvOiAnL2ptLmpwZycsXHJcbiAgYXZhdGFyOiB7XHJcbiAgICB1cmw6ICcvNTE4NTMzMzkuanBlZycsXHJcbiAgICBuYW1lOiAnXHU2NzRFXHU1NjA5XHU2NjBFJyxcclxuICAgIGRlc2NyaXB0aW9uOiAnXHU0RTE2XHU5NUY0XHU3Njg0XHU3RjhFXHU1OTdEXHU2MDNCXHU2NjJGXHU0RTBEXHU2NzFGXHU4MDBDXHU5MDQ3JyxcclxuICAgIGNpcmNsZTogdHJ1ZSxcclxuICAgIGxvY2F0aW9uOiAnXHU2REYxXHU1NzMzXHVGRjBDXHU0RTJEXHU1NkZEJyxcclxuICAgIG9yZ2FuaXphdGlvbjogJ1x1OERFOFx1OEQ4QVx1OTAxRlx1OTAxMicsXHJcbiAgfSxcclxuICBzb2NpYWw6IFt7IGljb246ICdnaXRodWInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2dhcm1pbjIxJyB9XSxcclxuICBlZGl0TGlua1RleHQ6ICdcdTU3MjggR2l0SHViIFx1NEUwQVx1N0YxNlx1OEY5MVx1NkI2NFx1OTg3NScsXHJcbiAgLy8gZm9vdGVyOiB7IGNvcHlyaWdodDogJ0NvcHlyaWdodCBcdTAwQTkgMjAyNC1wcmVzZW50IGdhcm1pbmcnIH0sXHJcbiAgZm9vdGVyOiAnJyxcclxuICBwbHVnaW5zOiB7XHJcbiAgICBleHRlcm5hbExpbmtJY29uOiBmYWxzZSxcclxuICAgIGJhaWR1VG9uZ2ppOiB7IGtleTogJzQ5ZWJjYjhkMWFiZmNkZTg5MGVmNmYzMjBhMTAxZGI3JyB9LFxyXG4gICAgc2hpa2k6IHsgdHdvc2xhc2g6IHRydWUgfSxcclxuICAgIG1hcmtkb3duRW5oYW5jZTogeyBkZW1vOiB0cnVlIH0sXHJcbiAgfSxcclxuICBlbmNyeXB0XHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDovZ2FybWluMjEuZ2l0aHViLmlvLy52dWVwcmVzcy9ub3Rlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZ2FybWluMjEuZ2l0aHViLmlvXFxcXC52dWVwcmVzc1xcXFxub3Rlc1xcXFxpbmRleC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZ2FybWluMjEuZ2l0aHViLmlvLy52dWVwcmVzcy9ub3Rlcy9pbmRleC5qc1wiO2ltcG9ydCB7IGRlZmluZVBsdW1lTm90ZXNDb25maWcgfSBmcm9tICd2dWVwcmVzcy10aGVtZS1wbHVtZSdcclxuaW1wb3J0IHZ1ZXByZXNzVGhlbWVQbHVtZSBmcm9tICcuL3Z1ZXByZXNzLXRoZW1lLXBsdW1lJ1xyXG5pbXBvcnQgaW50ZXJ2aWV3UXVlc3Rpb24gZnJvbSAnLi9pbnRlcnZpZXctcXVlc3Rpb24uanMnXHJcbmltcG9ydCB2dWVwcmVzc1BsdWdpbiBmcm9tICcuL3Z1ZXByZXNzLXBsdWdpbi5qcydcclxuaW1wb3J0IHR5cGVDaGFsbGVuZ2VzIGZyb20gJy4vdHlwZS1jaGFsbGVuZ2VzLmpzJ1xyXG5pbXBvcnQgbGVhcm5SdXN0IGZyb20gJy4vbGVhcm4tcnVzdC5qcydcclxuaW1wb3J0IGRlZmVuc2l2ZUNzcyBmcm9tICcuL2RlZmVuc2l2ZS1jc3MuanMnXHJcbmltcG9ydCBsZWFyblJlYWN0IGZyb20gJy4vbGVhcm4tcmVhY3QuanMnXHJcbmltcG9ydCBsZWFyblZ1ZSBmcm9tICcuL2xlYXJuLXZ1ZS5qcydcclxuaW1wb3J0IGxlYXJuQnVpbGQgZnJvbSAnLi9sZWFybi1idWlsZC5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVBsdW1lTm90ZXNDb25maWcoe1xyXG4gIGRpcjogJ25vdGVzJyxcclxuICBsaW5rOiAnLycsXHJcbiAgbm90ZXM6IFtcclxuICAgIHZ1ZXByZXNzVGhlbWVQbHVtZSxcclxuICAgIGludGVydmlld1F1ZXN0aW9uLFxyXG4gICAgdnVlcHJlc3NQbHVnaW4sXHJcbiAgICB0eXBlQ2hhbGxlbmdlcyxcclxuICAgIGxlYXJuUnVzdCxcclxuICAgIGRlZmVuc2l2ZUNzcyxcclxuICAgIGxlYXJuUmVhY3QsXHJcbiAgICBsZWFyblZ1ZSxcclxuICAgIGxlYXJuQnVpbGRcclxuICBdLFxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6L2dhcm1pbjIxLmdpdGh1Yi5pby8udnVlcHJlc3Mvbm90ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGdhcm1pbjIxLmdpdGh1Yi5pb1xcXFwudnVlcHJlc3NcXFxcbm90ZXNcXFxcdnVlcHJlc3MtdGhlbWUtcGx1bWUuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2dhcm1pbjIxLmdpdGh1Yi5pby8udnVlcHJlc3Mvbm90ZXMvdnVlcHJlc3MtdGhlbWUtcGx1bWUuanNcIjtpbXBvcnQgeyBkZWZpbmVQbHVtZU5vdGVzSXRlbUNvbmZpZyB9IGZyb20gJ3Z1ZXByZXNzLXRoZW1lLXBsdW1lJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lUGx1bWVOb3Rlc0l0ZW1Db25maWcoe1xyXG4gIGRpcjogJ3Z1ZXByZXNzLXRoZW1lLXBsdW1lJyxcclxuICBsaW5rOiAnL3Z1ZXByZXNzLXRoZW1lLXBsdW1lLycsXHJcbiAgc2lkZWJhcjogW1xyXG4gICAgJycsXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6ICdcdTYzMDdcdTUzNTcnLFxyXG4gICAgICBpdGVtczogWydcdTVGRUJcdTkwMUZcdTVGMDBcdTU5Q0InLCAnXHU3RjE2XHU1MTk5XHU2NTg3XHU3QUUwJywgJ1x1NjU0OFx1Njc5Q1x1OTg4NFx1ODlDOCddLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogJ1x1OTE0RFx1N0Y2RScsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgJ1x1NEUzQlx1OTg5OFx1OTE0RFx1N0Y2RScsXHJcbiAgICAgICAgJ1x1NTkxQVx1OEJFRFx1OEEwMFx1OTE0RFx1N0Y2RScsXHJcbiAgICAgICAgJ1x1NEUzQlx1OTg5OFx1NjNEMlx1NEVGNlx1OTE0RFx1N0Y2RScsXHJcbiAgICAgICAgJ1x1NUJGQ1x1ODIyQVx1NjgwRlx1OTE0RFx1N0Y2RScsXHJcbiAgICAgICAgJ25vdGVzXHU5MTREXHU3RjZFJyxcclxuICAgICAgICAnXHU5ODc1XHU5NzYyXHU5MTREXHU3RjZFJyxcclxuICAgICAgICAnXHU1MTg1XHU1QkI5XHU2NDFDXHU3RDIyJyxcclxuICAgICAgICAnXHU2NTg3XHU3QUUwXHU4QkM0XHU4QkJBJyxcclxuICAgICAgICAnXHU1MkEwXHU1QkM2JyxcclxuICAgICAgICAnXHU4MUVBXHU1QjlBXHU0RTQ5XHU2ODM3XHU1RjBGJyxcclxuICAgICAgICAnXHU2MjY5XHU1QzU1XHU5ODc1XHU5NzYyJyxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6ICdcdTUyOUZcdTgwRkQnLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgICdcdTU3RkFcdTc4NDBcdTUyOUZcdTgwRkQnLFxyXG4gICAgICAgICdcdTUxODVcdTdGNkVcdTYzRDJcdTRFRjYnLFxyXG4gICAgICAgICdcdTUxNjhcdTVDNDBcdTdFQzRcdTRFRjYnLFxyXG4gICAgICAgICdcdTRFRTNcdTc4MDFcdTU3NTdcdTlBRDhcdTRFQUUnLFxyXG4gICAgICAgICdtYXJrZG93blx1NTg5RVx1NUYzQScsXHJcbiAgICAgICAgJ1x1NUI5RVx1OUE4Q1x1NjAyN1x1NTI5Rlx1ODBGRCcsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDovZ2FybWluMjEuZ2l0aHViLmlvLy52dWVwcmVzcy9ub3Rlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZ2FybWluMjEuZ2l0aHViLmlvXFxcXC52dWVwcmVzc1xcXFxub3Rlc1xcXFxpbnRlcnZpZXctcXVlc3Rpb24uanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2dhcm1pbjIxLmdpdGh1Yi5pby8udnVlcHJlc3Mvbm90ZXMvaW50ZXJ2aWV3LXF1ZXN0aW9uLmpzXCI7aW1wb3J0IHsgZGVmaW5lUGx1bWVOb3Rlc0l0ZW1Db25maWcgfSBmcm9tICd2dWVwcmVzcy10aGVtZS1wbHVtZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnKHtcclxuICBsaW5rOiAnL2ludGVydmlldy1xdWVzdGlvbi8nLFxyXG4gIGRpcjogJ1x1OTc2Mlx1OEJENVx1OTg5OCcsXHJcbiAgc2lkZWJhcjogW1xyXG4gICAge1xyXG4gICAgICBkaXI6ICdIVE1MJyxcclxuICAgICAgaXRlbXM6IFsnRE9DVFlQRScsICdcdTUxNDNcdTdEMjBcdTc2ODRcdTUyMDZcdTdDN0InLCAnSFRNTDVcdTY1QjBcdTcyNzlcdTYwMjcnLCAnXHU4QkVEXHU0RTQ5XHU1MzE2XHU3NDA2XHU4OUUzJ10sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBkaXI6ICdDU1MnLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgICdcdTc2RDJcdTZBMjFcdTU3OEInLFxyXG4gICAgICAgICdcdTU5MTZcdThGQjlcdThERERcdTU0MDhcdTVFNzYnLFxyXG4gICAgICAgICdCRkNcdTU3NTdcdTdFQTdcdTY4M0NcdTVGMEZcdTUzMTZcdTRFMEFcdTRFMEJcdTY1ODcnLFxyXG4gICAgICAgICdJRkMsR0ZDLEZGQycsXHJcbiAgICAgICAgJ1x1NTBDRlx1N0QyMCcsXHJcbiAgICAgICAgJ0NTU1x1NkQ2RVx1NTJBOCcsXHJcbiAgICAgICAgJ1x1NTE0M1x1N0QyMFx1NTc4Mlx1NzZGNFx1NUM0NVx1NEUyRCcsXHJcbiAgICAgICAgJ0ZsZXhcdTVGMzlcdTYwMjdcdTVFMDNcdTVDNDAnLFxyXG4gICAgICAgICdjc3NcdTRFMDlcdTg5RDJcdTVGNjJcdTUzOUZcdTc0MDYnLFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgZGlyOiAnSmF2YVNjcmlwdCcsXHJcbiAgICAvLyAgIGl0ZW1zOiBbXHJcbiAgICAvLyAgICAgJ1x1NTNEOFx1OTFDRicsXHJcbiAgICAvLyAgICAgJ1x1NjU3MFx1NjM2RVx1N0M3Qlx1NTc4QicsXHJcbiAgICAvLyAgICAgJ1x1NjU3MFx1NjM2RVx1N0M3Qlx1NTc4Qlx1OEY2Q1x1NjM2MicsXHJcbiAgICAvLyAgICAgJ1x1NjgwOFx1NTQ4Q1x1NTgwNicsXHJcbiAgICAvLyAgICAgJ1x1NTM5Rlx1NTc4Qlx1NTQ4Q1x1NTM5Rlx1NTc4Qlx1OTRGRScsXHJcbiAgICAvLyAgICAgJ1x1NjI2N1x1ODg0Q1x1NEUwQVx1NEUwQlx1NjU4N1x1NTQ4Q1x1NjI2N1x1ODg0Q1x1NjgwOCcsXHJcbiAgICAvLyAgICAgJ1x1NEY1Q1x1NzUyOFx1NTdERlx1OTRGRScsXHJcbiAgICAvLyAgICAgJ1x1OTVFRFx1NTMwNScsXHJcbiAgICAvLyAgICAgJ1x1NEUyNVx1NjgzQ1x1NkEyMVx1NUYwRicsXHJcbiAgICAvLyAgICAgJ1x1NUI1N1x1N0IyNlx1NEUzMicsXHJcbiAgICAvLyAgICAgJ05hTicsXHJcbiAgICAvLyAgICAgJ1x1NjU3MFx1N0VDNFx1NTQ4Q1x1NUJGOVx1OEM2MScsXHJcbiAgICAvLyAgICAgJ1x1OTZDNlx1NTQwOFx1NUJGOVx1OEM2MScsXHJcbiAgICAvLyAgICAgJ3RoaXNcdTVCRjlcdThDNjEnLFxyXG4gICAgLy8gICAgICdcdTUxRkRcdTY1NzBcdTRFMEVcdTdCQURcdTU5MzRcdTUxRkRcdTY1NzAnLFxyXG4gICAgLy8gICAgICduZXdcdTY0Q0RcdTRGNUNcdTdCMjYnLFxyXG4gICAgLy8gICAgICdcdTUxRkRcdTY1NzBcdTY3RUZcdTkxQ0NcdTUzMTYnLFxyXG4gICAgLy8gICAgICdcdTRFOEJcdTRFRjYnLFxyXG4gICAgLy8gICAgICdcdTUxOTlcdTRFMDBcdTRFMkFcdTkwMUFcdTc1MjhcdTRFOEJcdTRFRjZcdTRGQTZcdTU0MkNcdTU2NjgnLFxyXG4gICAgLy8gICAgICdcdTZBMjFcdTU3NTdcdTUzMTYnLFxyXG4gICAgLy8gICAgICdcdTZBMjFcdTU3NTdcdTUyQTBcdThGN0RcdTU2NjhcdTUzOUZcdTc0MDYnLFxyXG4gICAgLy8gICAgICdcdTZENDVcdTYyRjdcdThEMURcdTU0OENcdTZERjFcdTYyRjdcdThEMUQnLFxyXG4gICAgLy8gICAgICdET01cdTgyODJcdTcwQjlcdTY0Q0RcdTRGNUMnLFxyXG4gICAgLy8gICAgICdcdThERThcdTU3REYnLFxyXG4gICAgLy8gICAgICdcdTgyODJcdTZENDFcdTRFMEVcdTk2MzJcdTYyOTYnLFxyXG4gICAgLy8gICAgICdwcm9taXNlJyxcclxuICAgIC8vICAgICAnXHU4QkJFXHU4QkExXHU2QTIxXHU1RjBGJyxcclxuICAgIC8vICAgICAnTVYtXHU4QkJFXHU4QkExXHU2QTIxXHU1RjBGJyxcclxuICAgIC8vICAgXSxcclxuICAgIC8vIH0sXHJcbiAgICB7XHJcbiAgICAgIGRpcjogJ1x1NkQ0Rlx1ODlDOFx1NTY2OCcsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgJ1x1NUJGOVx1NkQ0Rlx1ODlDOFx1NTY2OFx1NzY4NFx1NzQwNlx1ODlFMycsXHJcbiAgICAgICAgJ1x1NkQ0Rlx1ODlDOFx1NTY2OFx1NTE4NVx1NjgzOCcsXHJcbiAgICAgICAgJ1x1NkUzMlx1NjdEM1x1NTM5Rlx1NzQwNicsXHJcbiAgICAgICAgJ1x1NkQ0Rlx1ODlDOFx1NTY2OFx1ODlFM1x1Njc5MFx1OEZDN1x1N0EwQicsXHJcbiAgICAgICAgJ1x1NkQ0Rlx1ODlDOFx1NTY2OFx1NkUzMlx1NjdEM1x1OEZDN1x1N0EwQicsXHJcbiAgICAgICAgJ1x1OTFDRFx1N0VEOFx1NEUwRVx1NTZERVx1NkQ0MScsXHJcbiAgICAgICAgJ1x1NkQ0Rlx1ODlDOFx1NTY2OFx1NUI1OFx1NTBBOCcsXHJcbiAgICAgICAgJ1x1NTc4M1x1NTczRVx1NTZERVx1NjUzNlx1NjczQVx1NTIzNicsXHJcbiAgICAgICAgJ1x1NTE4NVx1NUI1OFx1NkNDNFx1OTczMicsXHJcbiAgICAgICAgJ1x1NEU4Qlx1NEVGNlx1NUZBQVx1NzNBRicsXHJcbiAgICAgICAgJ1x1NkQ0Rlx1ODlDOFx1NTY2OFx1OEY5M1x1NTE2NVVSTCcsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBkaXI6ICdcdThCQTFcdTdCOTdcdTY3M0FcdTdGNTFcdTdFREMnLFxyXG4gICAgICBpdGVtczogWydodHRwXHU1MzRGXHU4QkFFJywgJ2h0dHBcdTdGMTNcdTVCNTgnLCAnaHR0cDInLCAnVENQXHU1MzRGXHU4QkFFJywgJ1VEUFx1NTM0Rlx1OEJBRScsICdDRE4nLCAnXHU0RUUzXHU3NDA2JywgJ1x1OEQxRlx1OEY3RFx1NTc0N1x1ODg2MSddLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgZGlyOiAnVnVlJyxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICAnVmlydHVhbERvbScsXHJcbiAgICAgICAgJ3YtaWZcdTU0OEN2LXNob3dcdTc2ODRcdTUzM0FcdTUyMkInLFxyXG4gICAgICAgICdjb21wdXRlZFx1NTQ4Q3dhdGNoJyxcclxuICAgICAgICAna2VlcC1hbGl2ZScsXHJcbiAgICAgICAgJ3Z1ZTJcdTU0OEN2dWUzXHU3Njg0XHU1MzNBXHU1MjJCJyxcclxuICAgICAgICAnXHU1QkY5dnVleFx1NzY4NFx1NzQwNlx1ODlFMycsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogJ3Z1ZUAzJyxcclxuICAgICAgICAgIGRpcjogJ3YzJyxcclxuICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICdcdTU0Q0RcdTVFOTRcdTVGMEZcdTUzOUZcdTc0MDYnLFxyXG4gICAgICAgICAgICAnXHU3RUM0XHU0RUY2XHU5MDFBXHU0RkUxXHU2NUI5XHU1RjBGJyxcclxuICAgICAgICAgICAgJ1x1NzUxRlx1NTQ3RFx1NTQ2OFx1NjcxRicsXHJcbiAgICAgICAgICAgICd2LW1vZGVsJyxcclxuICAgICAgICAgICAgJ3YtaWZcdTU0OEN2LWZvclx1NEYxOFx1NTE0OFx1N0VBNycsXHJcbiAgICAgICAgICAgICdcdTYzMDdcdTRFRTQnLFxyXG4gICAgICAgICAgICAnXHU4REVGXHU3NTMxJyxcclxuICAgICAgICAgICAgJ25leHRUaWNrJyxcclxuICAgICAgICAgICAgJ3dhdGNoLXdhdGNoRWZmZWN0JyxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiAndnVlQDInLFxyXG4gICAgICAgICAgZGlyOiAndjInLFxyXG4gICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgJ1x1NTRDRFx1NUU5NFx1NUYwRlx1NTM5Rlx1NzQwNicsXHJcbiAgICAgICAgICAgICdkYXRhXHU0RTNBXHU0RUMwXHU0RTQ4XHU1RkM1XHU5ODdCXHU2NjJGXHU1MUZEXHU2NTcwJyxcclxuICAgICAgICAgICAgJ3YtaWZcdTU0OEN2LWZvclx1NEYxOFx1NTE0OFx1N0VBNycsXHJcbiAgICAgICAgICAgICdcdTdFQzRcdTRFRjZcdTkwMUFcdTRGRTFcdTY1QjlcdTVGMEYnLFxyXG4gICAgICAgICAgICAnXHU3NTFGXHU1NDdEXHU1NDY4XHU2NzFGJyxcclxuICAgICAgICAgICAgJ1x1NjMwN1x1NEVFNCcsXHJcbiAgICAgICAgICAgICdcdThERUZcdTc1MzEnLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgZGlyOiAnUmVhY3QnLFxyXG4gICAgICBpdGVtczogW10sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBkaXI6ICdOb2RlSnMnLFxyXG4gICAgICBpdGVtczogW10sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBkaXI6ICdcdTVERTVcdTUxNzcnLFxyXG4gICAgICBpdGVtczogWydnaXQnLCAnZ2l0LWhvb2snLCAnamVua2lucycsICdcdTRFRTNcdTc4MDFcdTY4QzBcdTY3RTVcdTVERTVcdTUxNzcnLCAnXHU2QTIxXHU1NzU3XHU2MjUzXHU1MzA1XHU1NjY4JywgJ3dlYnBhY2snLCAncG0yJ10sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBkaXI6ICdcdTVFMzhcdTc1MjhcdTVFOTMnLFxyXG4gICAgICBpdGVtczogWydheGlvcycsICdsb2Rhc2gnLCAnVUlcdTY4NDZcdTY3QjYnXSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGRpcjogJ1x1NUI4OVx1NTE2OCcsXHJcbiAgICAgIGl0ZW1zOiBbJ1hTU1x1NjUzQlx1NTFGQicsICdDU1JGXHU2NTNCXHU1MUZCJywgJ1NRTFx1NkNFOFx1NTE2NVx1NjUzQlx1NTFGQicsICdDU1BcdTUxODVcdTVCQjlcdTVCODlcdTUxNjgnLCAnXHU3MEI5XHU1MUZCXHU1MkFCXHU2MzAxJ10sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBkaXI6ICdcdTdCOTdcdTZDRDUnLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6ICdcdTYzOTJcdTVFOEZcdTdCOTdcdTZDRDUnLFxyXG4gICAgICAgICAgZGlyOiAnXHU2MzkyXHU1RThGJyxcclxuICAgICAgICAgIGl0ZW1zOiBbJ1x1NTE5Mlx1NkNFMVx1NjM5Mlx1NUU4RicsICdcdTkwMDlcdTYyRTlcdTYzOTJcdTVFOEYnLCAnXHU2M0QyXHU1MTY1XHU2MzkyXHU1RThGJywgJ1x1NUUwQ1x1NUMxNFx1NjM5Mlx1NUU4RicsICdcdTVGNTJcdTVFNzZcdTYzOTJcdTVFOEYnLCAnXHU1RkVCXHU5MDFGXHU2MzkyXHU1RThGJywgJ1x1NjM5Mlx1NUU4Rlx1N0I5N1x1NkNENVx1NjAzQlx1N0VEMyddLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogJ1x1NjdFNVx1NjI3RVx1N0I5N1x1NkNENScsXHJcbiAgICAgICAgICBkaXI6ICdcdTY3RTVcdTYyN0UnLFxyXG4gICAgICAgICAgaXRlbXM6IFsnXHU0RThDXHU1MjA2XHU2N0U1XHU2MjdFXHU2Q0Q1J10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiAnXHU0RjE4XHU1MzE2XHU3Qjk3XHU2Q0Q1JyxcclxuICAgICAgICAgIGRpcjogJ1x1NEYxOFx1NTMxNicsXHJcbiAgICAgICAgICBpdGVtczogWydMUlVcdTdGMTNcdTVCNThcdTY3M0FcdTUyMzZcdTdCOTdcdTZDRDUnXSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgZGlyOiAnXHU1MTc2XHU0RUQ2JyxcclxuICAgICAgaXRlbXM6IFsnXHU1MjREXHU3QUVGU0VPJywgJ1x1NTI0RFx1N0FFRlx1NjAyN1x1ODBGRFx1NEYxOFx1NTMxNiddLFxyXG4gICAgfSxcclxuICBdLFxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6L2dhcm1pbjIxLmdpdGh1Yi5pby8udnVlcHJlc3Mvbm90ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGdhcm1pbjIxLmdpdGh1Yi5pb1xcXFwudnVlcHJlc3NcXFxcbm90ZXNcXFxcdnVlcHJlc3MtcGx1Z2luLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9nYXJtaW4yMS5naXRodWIuaW8vLnZ1ZXByZXNzL25vdGVzL3Z1ZXByZXNzLXBsdWdpbi5qc1wiO2ltcG9ydCB7IGRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIH0gZnJvbSAndnVlcHJlc3MtdGhlbWUtcGx1bWUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVQbHVtZU5vdGVzSXRlbUNvbmZpZyh7XHJcbiAgZGlyOiAndnVlcHJlc3MtcGx1Z2luJyxcclxuICBsaW5rOiAnL3Z1ZXByZXNzLXBsdWdpbi8nLFxyXG4gIHNpZGViYXI6IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogJ1Z1ZXByZXNzIFBsdWdpbicsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgJ2Nhbml1c2UvUkVBRE1FJyxcclxuICAgICAgICAnYXV0by1mcm9udG1hdHRlci9SRUFETUUnLFxyXG4gICAgICAgICdibG9nLWRhdGEvUkVBRE1FJyxcclxuICAgICAgICAnbm90ZXMtZGF0YS9SRUFETUUnLFxyXG4gICAgICAgICdzaGlraWppL1JFQURNRScsXHJcbiAgICAgICAgJ2NvbnRlbnQtdXBkYXRlL1JFQURNRScsXHJcbiAgICAgICAgJ2ljb25pZnkvUkVBRE1FJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBkaXI6ICduZXRsaWZ5LWZ1bmN0aW9ucycsXHJcbiAgICAgICAgICB0ZXh0OiAncGx1Z2luLW5ldGxpZnktZnVuY3Rpb25zJyxcclxuICAgICAgICAgIGxpbms6ICcvbm90ZS92dWVwcmVzcy1wbHVnaW4vbmV0bGlmeS1mdW5jdGlvbnMvJyxcclxuICAgICAgICAgIGl0ZW1zOiBbJ1x1NEVDQlx1N0VDRCcsICdcdTRGN0ZcdTc1MjgnLCAnXHU1MjlGXHU4MEZEJywgJ0FQSScsICdmdW5jdGlvbnNcdTVGMDBcdTUzRDFcdTYzMDdcdTUzNTcnXSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICBdLFxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6L2dhcm1pbjIxLmdpdGh1Yi5pby8udnVlcHJlc3Mvbm90ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGdhcm1pbjIxLmdpdGh1Yi5pb1xcXFwudnVlcHJlc3NcXFxcbm90ZXNcXFxcdHlwZS1jaGFsbGVuZ2VzLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9nYXJtaW4yMS5naXRodWIuaW8vLnZ1ZXByZXNzL25vdGVzL3R5cGUtY2hhbGxlbmdlcy5qc1wiO2ltcG9ydCB7IGRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIH0gZnJvbSAndnVlcHJlc3MtdGhlbWUtcGx1bWUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVQbHVtZU5vdGVzSXRlbUNvbmZpZyh7XHJcbiAgbGluazogJy90eXBlLWNoYWxsZW5nZXMvJyxcclxuICBkaXI6ICd0eXBlLWNoYWxsZW5nZXMnLFxyXG4gIHNpZGViYXI6IFtcclxuICAgICcnLFxyXG4gICAge1xyXG4gICAgICBkaXI6ICdcdTcwRURcdThFQUInLFxyXG4gICAgICB0ZXh0OiAnXHU3MEVEXHU4RUFCKDEpJyxcclxuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgaXRlbXM6IFsnSGVsbG9Xb3JsZCddLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgZGlyOiAnXHU3QjgwXHU1MzU1JyxcclxuICAgICAgdGV4dDogJ1x1N0I4MFx1NTM1NSgxMyknLFxyXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgICdwaWNrJyxcclxuICAgICAgICAncmVhZG9ubHknLFxyXG4gICAgICAgICd0dXBsZVRvT2JqZWN0JyxcclxuICAgICAgICAnZmlyc3RPZkFycmF5JyxcclxuICAgICAgICAnbGVuZ3RoT2ZUdXBsZScsXHJcbiAgICAgICAgJ2V4Y2x1ZGUnLFxyXG4gICAgICAgICdhd2FpdGVkJyxcclxuICAgICAgICAnaWYnLFxyXG4gICAgICAgICdjb25jYXQnLFxyXG4gICAgICAgICdpbmNsdWRlcycsXHJcbiAgICAgICAgJ3B1c2gnLFxyXG4gICAgICAgICd1bnNoaWZ0JyxcclxuICAgICAgICAncGFyYW1ldGVycycsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBkaXI6ICdcdTRFMkRcdTdCNDknLFxyXG4gICAgICB0ZXh0OiAnXHU0RTJEXHU3QjQ5KDc1KScsXHJcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgJ2dldFJldHVyblR5cGUnLFxyXG4gICAgICAgICdvbWl0JyxcclxuICAgICAgICAncmVhZG9ubHkyJyxcclxuICAgICAgICAnZGVlcFJlYWRvbmx5JyxcclxuICAgICAgICAndHVwbGVUb1VuaW9uJyxcclxuICAgICAgICAnY2hhaW5hYmxlT3B0aW9ucycsXHJcbiAgICAgICAgJ2xhc3RPZkFycmF5JyxcclxuICAgICAgICAncG9wJyxcclxuICAgICAgICAncHJvbWlzZUFsbCcsXHJcbiAgICAgICAgJ3R5cGVMb29rdXAnLFxyXG4gICAgICAgICd0cmltTGVmdCcsXHJcbiAgICAgICAgJ3RyaW0nLFxyXG4gICAgICAgICdjYXBpdGFsaXplJyxcclxuICAgICAgICAncmVwbGFjZScsXHJcbiAgICAgICAgJ3JlcGxhY2VBbGwnLFxyXG4gICAgICAgICdhcHBlbmRBcmd1bWVudCcsXHJcbiAgICAgICAgJ3Blcm11dGF0aW9uJyxcclxuICAgICAgICAnbGVuZ3RoT2ZTdHJpbmcnLFxyXG4gICAgICAgICdmbGF0dGVuJyxcclxuICAgICAgICAnYXBwZW5kVG9PYmplY3QnLFxyXG4gICAgICAgICdhYnNvbHV0ZScsXHJcbiAgICAgICAgJ3N0cmluZ1RvVW5pb24nLFxyXG4gICAgICAgICdtZXJnZScsXHJcbiAgICAgICAgJ2tlYmFiQ2FzZScsXHJcbiAgICAgICAgJ2RpZmYnLFxyXG4gICAgICAgICdhbnlPZicsXHJcbiAgICAgICAgJ2lzTmV2ZXInLFxyXG4gICAgICAgICdpc1VuaW9uJyxcclxuICAgICAgICAncmVwbGFjZUtleXMnLFxyXG4gICAgICAgICdyZW1vdmVJbmRleFNpZ25hdHVyZScsXHJcbiAgICAgICAgJ3BlcmNlbnRhZ2VQYXJzZXInLFxyXG4gICAgICAgICdkcm9wQ2hhcicsXHJcbiAgICAgICAgJ21pbnVzT25lJyxcclxuICAgICAgICAncGlja0J5VHlwZScsXHJcbiAgICAgICAgJ3N0YXJ0c1dpdGgnLFxyXG4gICAgICAgICdlbmRzV2l0aCcsXHJcbiAgICAgICAgJ211dGFibGUnLFxyXG4gICAgICAgICdvbWl0QnlUeXBlJyxcclxuICAgICAgICAnb2JqZWN0RW50cmllcycsXHJcbiAgICAgICAgJ3NoaWZ0JyxcclxuICAgICAgICAndHVwbGVUb05lc3RlZE9iamVjdCcsXHJcbiAgICAgICAgJ3JldmVyc2UnLFxyXG4gICAgICAgICdmbGlwQXJndW1lbnRzJyxcclxuICAgICAgICAnZmxhdHRlbkRlcHRoJyxcclxuICAgICAgICAnYmVtU3R5bGVTdHJpbmcnLFxyXG4gICAgICAgICdpbm9yZGVyVHJhdmVyc2FsJyxcclxuICAgICAgICAnZmxpcCcsXHJcbiAgICAgICAgJ2ZpYm9uYWNjaVNlcXVlbmNlJyxcclxuICAgICAgICAnYWxsQ29tYmluYXRpb25zJyxcclxuICAgICAgICAnZ3JlYXRlclRoYW4nLFxyXG4gICAgICAgICd6aXAnLFxyXG4gICAgICAgICdpc1R1cGxlJyxcclxuICAgICAgICAnY2h1bmsnLFxyXG4gICAgICAgICdmaWxsJyxcclxuICAgICAgICAndHJpbVJpZ2h0JyxcclxuICAgICAgICAnd2l0aG91dCcsXHJcbiAgICAgICAgJ3RydW5jJyxcclxuICAgICAgICAnaW5kZXhPZicsXHJcbiAgICAgICAgJ2pvaW4nLFxyXG4gICAgICAgICdsYXN0SW5kZXhPZicsXHJcbiAgICAgICAgJ3VuaXF1ZScsXHJcbiAgICAgICAgJ21hcFR5cGVzJyxcclxuICAgICAgICAnY29uc3RydWN0VHVwbGUnLFxyXG4gICAgICAgICdudW1iZXJSYW5nZScsXHJcbiAgICAgICAgJ2NvbWJpbmF0aW9uJyxcclxuICAgICAgICAnc3Vic2VxdWVuY2UnLFxyXG4gICAgICAgICdmaXJzdFVuaXF1ZUNoYXJJbmRleCcsXHJcbiAgICAgICAgJ2dldE1pZGRsZUVsZW1lbnQnLFxyXG4gICAgICAgICdpbnRlZ2VyJyxcclxuICAgICAgICAndG9QcmltaXRpdmUnLFxyXG4gICAgICAgICdkZWVwTXV0YWJsZScsXHJcbiAgICAgICAgJ2FsbCcsXHJcbiAgICAgICAgJ2ZpbHRlcicsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBkaXI6ICdcdTU2RjBcdTk2QkUnLFxyXG4gICAgICB0ZXh0OiAnXHU1NkYwXHU5NkJFKDQzKScsXHJcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICAnc2ltcGxlVnVlJyxcclxuICAgICAgICAnY3VycnlpbmcxJyxcclxuICAgICAgICAndW5pb25Ub0ludGVyc2VjdGlvbicsXHJcbiAgICAgICAgJ2dldFJlcXVpcmVkJyxcclxuICAgICAgICAnZ2V0T3B0aW9uYWwnLFxyXG4gICAgICAgICdyZXF1aXJlZEtleXMnLFxyXG4gICAgICAgICdvcHRpb25hbEtleXMnLFxyXG4gICAgICAgICdjYXBpdGFsaXplV29yZHMnLFxyXG4gICAgICAgICdjYW1lbENhc2UnLFxyXG4gICAgICAgICdjUHJpbnRmUGFyc2VyJyxcclxuICAgICAgICAndnVlQmFzaWNQcm9wcycsXHJcbiAgICAgICAgJ2lzQW55JyxcclxuICAgICAgICAndHlwZWRHZXQnLFxyXG4gICAgICAgICdzdHJpbmdUb051bWJlcicsXHJcbiAgICAgICAgJ3R1cGxlRmlsdGVyJyxcclxuICAgICAgICAndHVwbGVUb0VudW1PYmplY3QnLFxyXG4gICAgICAgICdwcmludGYnLFxyXG4gICAgICAgICdkZWVwT2JqZWN0VG9VbmlxdWUnLFxyXG4gICAgICAgICdsZW5ndGhPZlN0cmluZzInLFxyXG4gICAgICAgICd1bmlvblRvVHVwbGUnLFxyXG4gICAgICAgICdzdHJpbmdKb2luJyxcclxuICAgICAgICAnZGVlcFBpY2snLFxyXG4gICAgICAgICdwaW5pYScsXHJcbiAgICAgICAgJ2NhbWVsaXplJyxcclxuICAgICAgICAnZHJvcFN0cmluZycsXHJcbiAgICAgICAgJ3NwbGl0JyxcclxuICAgICAgICAnY2xhc3NQdWJsaWNLZXlzJyxcclxuICAgICAgICAnaXNSZXF1aXJlZEtleScsXHJcbiAgICAgICAgJ29iamVjdEZyb21FbnRyaWVzJyxcclxuICAgICAgICAnaXNQYWxpbmRyb21lJyxcclxuICAgICAgICAnbXV0YWJsZUtleXMnLFxyXG4gICAgICAgICdpbnRlcnNlY3Rpb24nLFxyXG4gICAgICAgICdiaW5hcnlUb0RlY2ltYWwnLFxyXG4gICAgICAgICdvYmplY3RLZXlQYXRocycsXHJcbiAgICAgICAgJ3R3b1N1bScsXHJcbiAgICAgICAgJ3ZhbGlkRGF0ZScsXHJcbiAgICAgICAgJ2Fzc2lnbicsXHJcbiAgICAgICAgJ21heGltdW0nLFxyXG4gICAgICAgICdjYXBpdGFsaXplTmVzdE9iamVjdEtleXMnLFxyXG4gICAgICAgICdyZXBsYWNlVW5pb24nLFxyXG4gICAgICAgICdmaXp6QnV6eicsXHJcbiAgICAgICAgJ3J1bkxlbmd0aEVuY29kaW5nJyxcclxuICAgICAgICAndHJlZVBhdGhBcnJheScsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBkaXI6ICdcdTU3MzBcdTcyRjEnLFxyXG4gICAgICB0ZXh0OiAnXHU1NzMwXHU3MkYxKDE0KScsXHJcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICAnZ2V0UmVhZG9ubHlLZXlzJyxcclxuICAgICAgICAncXVlcnlTdHJpbmdQYXJzZXInLFxyXG4gICAgICAgICdzbGljZScsXHJcbiAgICAgICAgJ2ludGVnZXJzQ29tcGFyYXRvcicsXHJcbiAgICAgICAgJ2N1cnJ5aW5nMicsXHJcbiAgICAgICAgJ3N1bScsXHJcbiAgICAgICAgJ211bHRpcGx5JyxcclxuICAgICAgICAndGFnJyxcclxuICAgICAgICAnaW5jbHVzaXZlUmFuZ2UnLFxyXG4gICAgICAgICdzb3J0JyxcclxuICAgICAgICAnZGlzdHJpYnV0ZVVuaW9ucycsXHJcbiAgICAgICAgJ2Fzc2VydEFycmF5SW5kZXgnLFxyXG4gICAgICAgICdqc29uUGFyc2VyJyxcclxuICAgICAgICAnc3VidHJhY3QnLFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICBdLFxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6L2dhcm1pbjIxLmdpdGh1Yi5pby8udnVlcHJlc3Mvbm90ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGdhcm1pbjIxLmdpdGh1Yi5pb1xcXFwudnVlcHJlc3NcXFxcbm90ZXNcXFxcbGVhcm4tcnVzdC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZ2FybWluMjEuZ2l0aHViLmlvLy52dWVwcmVzcy9ub3Rlcy9sZWFybi1ydXN0LmpzXCI7aW1wb3J0IHsgZGVmaW5lUGx1bWVOb3Rlc0l0ZW1Db25maWcgfSBmcm9tICd2dWVwcmVzcy10aGVtZS1wbHVtZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnKHtcclxuICBsaW5rOiAnL2xlYXJuLXJ1c3QvJyxcclxuICBkaXI6ICdydXN0XHU1QjY2XHU0RTYwXHU3QjgwXHU4QkIwJyxcclxuICBzaWRlYmFyOiBbXHJcbiAgICAnJyxcclxuICAgIHtcclxuICAgICAgZGlyOiAnXHU3M0FGXHU1ODgzXHU1MUM2XHU1OTA3JyxcclxuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgaXRlbXM6IFsnXHU1Qjg5XHU4OEM1JywgJ1x1N0YxNlx1OEY5MVx1NTY2OFx1NjI2OVx1NUM1NScsICdDYXJnbyddLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgZGlyOiAnXHU1N0ZBXHU3ODQwXHU1MTY1XHU5NUU4JyxcclxuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICAnXHU1M0Q4XHU5MUNGJyxcclxuICAgICAgICAnXHU3QzdCXHU1NzhCXHU2M0E4XHU1QkZDJyxcclxuICAgICAgICAnXHU1N0ZBXHU2NzJDXHU3QzdCXHU1NzhCJyxcclxuICAgICAgICAnXHU2NTcwXHU1QjU3XHU3QzdCXHU1NzhCJyxcclxuICAgICAgICAnXHU1QjU3XHU3QjI2LFx1NUUwM1x1NUMxNCxcdTUzNTVcdTUxNDNcdTdDN0JcdTU3OEInLFxyXG4gICAgICAgICdcdThCRURcdTUzRTVcdTU0OENcdTg4NjhcdThGQkVcdTVGMEYnLFxyXG4gICAgICAgICdcdTUxRkRcdTY1NzAnLFxyXG4gICAgICAgICdcdTU5MERcdTU0MDhcdTdDN0JcdTU3OEInLFxyXG4gICAgICAgICdcdTVCNTdcdTdCMjZcdTRFMzJcdTRFMEVcdTUyMDdcdTcyNDcnLFxyXG4gICAgICAgICdcdTUxNDNcdTdFQzQnLFxyXG4gICAgICAgICdcdTdFRDNcdTY3ODRcdTRGNTMnLFxyXG4gICAgICAgICdcdTY3OUFcdTRFM0UnLFxyXG4gICAgICAgICdcdTY1NzBcdTdFQzQnLFxyXG4gICAgICAgICdcdTYyNDBcdTY3MDlcdTY3NDMnLFxyXG4gICAgICAgICdcdTVGMTVcdTc1MjhcdTRFMEVcdTUwMUZcdTc1MjgnLFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICBdLFxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6L2dhcm1pbjIxLmdpdGh1Yi5pby8udnVlcHJlc3Mvbm90ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGdhcm1pbjIxLmdpdGh1Yi5pb1xcXFwudnVlcHJlc3NcXFxcbm90ZXNcXFxcZGVmZW5zaXZlLWNzcy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZ2FybWluMjEuZ2l0aHViLmlvLy52dWVwcmVzcy9ub3Rlcy9kZWZlbnNpdmUtY3NzLmpzXCI7aW1wb3J0IHsgZGVmaW5lUGx1bWVOb3Rlc0l0ZW1Db25maWcgfSBmcm9tICd2dWVwcmVzcy10aGVtZS1wbHVtZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnKHtcclxuICBsaW5rOiAnL2RlZmVuc2l2ZS1jc3MvJyxcclxuICBkaXI6ICdDU1NcdTVCNjZcdTRFNjBcdTdCODBcdThCQjAnLFxyXG4gIHNpZGViYXI6IFtcclxuICAgICcnLFxyXG4gICAge1xyXG4gICAgICBkaXI6ICdcdTU3RkFcdTc4NDBcdTdCQzcnLFxyXG4gICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgJ0NTU1x1OTAwOVx1NjJFOVx1NTY2OCcsXHJcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JyxcclxuICAgICAgICAndmVydGljYWwtYWxpZ24nLFxyXG4gICAgICAgICdcdTgwQ0NcdTY2NkYnLFxyXG4gICAgICAgICdcdTc2RDJcdTZBMjFcdTU3OEInLFxyXG4gICAgICAgICdtYXJnaW4nLFxyXG4gICAgICAgICdmbG9hdCcsXHJcbiAgICAgICAgJ1x1NUI5QVx1NEY0RCcsXHJcbiAgICAgICAgJ21pbi1tYXgnLFxyXG4gICAgICAgICdcdTRGMkFcdTUxNDNcdTdEMjAnLFxyXG4gICAgICAgICdjc3NcdTUxRkRcdTY1NzAnXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBkaXI6ICdcdTYyODBcdTVERTdcdTdCQzcnLFxyXG4gICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgJ1x1NjI2OVx1NTkyN1x1NzBCOVx1NTFGQlx1NTMzQVx1NTdERicsXHJcbiAgICAgICAgJ2VsZW1lbnQtZmlsLWNvbnRhaW5lcicsXHJcbiAgICAgICAgJ2ZsZXgtYm94LXdyYXBwaW5nJyxcclxuICAgICAgICAnaW1hZ2UtZGlzdG9ydGlvbicsXHJcbiAgICAgICAgJ2xvbmctY29udGVudCcsXHJcbiAgICAgICAgJ2NvbXBvbmVudC1zcGFjaW5nJyxcclxuICAgICAgICAnYXV0by1maXQtZmlsbCcsXHJcbiAgICAgICAgJ2JhY2tncm91bmQtcmVwZWF0JyxcclxuICAgICAgICAnZ3JpZC1maXhlZC12YWx1ZXMnLFxyXG4gICAgICAgICd2YXJpYWJsZS1mYWxsYmFjaycsXHJcbiAgICAgICAgJ2ZpeGVkLXNpemVzJyxcclxuICAgICAgICAnbWluaW11bS1jb250ZW50LXNpemUtaW4tZmxleGJveCcsXHJcbiAgICAgICAgJ21pbmltdW0tY29udGVudC1zaXplLWluLWdyaWQnLFxyXG4gICAgICAgICdncm91cGluZy12ZW5kb3Itc2VsZWN0b3InLFxyXG4gICAgICAgICdpbWFnZS1tYXhpbXVtLXdpZHRoJyxcclxuICAgICAgICAnc3RpY2t5LXdpdGgtZ3JpZCcsXHJcbiAgICAgICAgJ3Njcm9sbC1jaGFpbmluZycsXHJcbiAgICAgICAgJ3Njcm9sbC1ndXR0ZXInLFxyXG4gICAgICAgICdzY3JvbGxiYXItb24tZGVtYW5kJyxcclxuICAgICAgICAndXNpbmctc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgJ3RleHQtb3Zlci1pbWFnZScsXHJcbiAgICAgICAgJ3ZlcnRpY2FsLW1lZGlhLXF1ZXJpZXMnLFxyXG4gICAgICAgICdhY2NpZGVudGFsLWhvdmVyLW9uLW1vYmlsZScsXHJcbiAgICAgICAgJ2ltYWdlLWlubmVyLWJvcmRlcicsXHJcbiAgICAgICAgJ2RlZmF1bHQtZmxleGJveC1zdHJldGNoaW5nJyxcclxuICAgICAgICAnaW5wdXQtem9vbS1vbi1pb3Mtc2FmYXJpJyxcclxuICAgICAgICAnYnV0dG9uLW1pbmltdW0td2lkdGgnLFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgZGlyOiAnXHU4RkRCXHU5NjM2XHU3QkM3JyxcclxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgICdcdTdDOThcdTYwMjdcdTVFMDNcdTVDNDAnXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICB0ZXh0OiAnXHU1OTI3XHU3OTVFXHU3QkM3JyxcclxuICAgIC8vICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgIC8vICAgaXRlbXM6IFtcclxuICAgIC8vICAgICAnJ1xyXG4gICAgLy8gICBdLFxyXG4gICAgLy8gfSxcclxuICAgIHtcclxuICAgICAgZGlyOiAnQ1NTIFx1OTg4NFx1NTkwNFx1NzQwNlx1NTY2OCcsXHJcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICAnU0NTUycsXHJcbiAgICAgICAgJ2JlbSdcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgXSxcclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOi9nYXJtaW4yMS5naXRodWIuaW8vLnZ1ZXByZXNzL25vdGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxnYXJtaW4yMS5naXRodWIuaW9cXFxcLnZ1ZXByZXNzXFxcXG5vdGVzXFxcXGxlYXJuLXJlYWN0LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9nYXJtaW4yMS5naXRodWIuaW8vLnZ1ZXByZXNzL25vdGVzL2xlYXJuLXJlYWN0LmpzXCI7aW1wb3J0IHsgZGVmaW5lUGx1bWVOb3Rlc0l0ZW1Db25maWcgfSBmcm9tICd2dWVwcmVzcy10aGVtZS1wbHVtZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnKHtcclxuICBsaW5rOiAnL2xlYXJuLXJlYWN0LycsXHJcbiAgZGlyOiAncmVhY3RcdTVCNjZcdTRFNjBcdTdCODBcdThCQjAnLFxyXG4gIHNpZGViYXI6IFtcclxuICAgICcnLFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICBkaXI6ICdcdTczQUZcdTU4ODNcdTUxQzZcdTU5MDcnLFxyXG4gICAgLy8gICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgLy8gICBpdGVtczogWydcdTVCODlcdTg4QzUnLCAnXHU3RjE2XHU4RjkxXHU1NjY4XHU2MjY5XHU1QzU1JywgJ0NhcmdvJ10sXHJcbiAgICAvLyB9LFxyXG4gICAge1xyXG4gICAgICBkaXI6ICdcdTU3RkFcdTc4NDBcdTUxNjVcdTk1RTgnLFxyXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgICdSZWFjdFx1NjgzOFx1NUZDM1x1Njk4Mlx1NUZGNScsXHJcbiAgICAgICAgJ1JlYWN0XHU0RTJEXHU4REVGXHU3NTMxJyxcclxuICAgICAgICAnUmVhY3RcdTRFMkRcdTRFRTNcdTc4MDFcdTUyMDZcdTUyNzInLFxyXG4gICAgICAgICdSZWFjdCBcdTYwMjdcdTgwRkRcdTRGMThcdTUzMTYgJyxcclxuICAgICAgICAnUmVhY3QgSG9va3MnLFxyXG4gICAgICAgICdSZWFjdCBSZWYnLFxyXG4gICAgICAgIC8vICdcdTUxRkRcdTY1NzAnLFxyXG4gICAgICAgIC8vICdcdTU5MERcdTU0MDhcdTdDN0JcdTU3OEInLFxyXG4gICAgICAgIC8vICdcdTVCNTdcdTdCMjZcdTRFMzJcdTRFMEVcdTUyMDdcdTcyNDcnLFxyXG4gICAgICAgIC8vICdcdTUxNDNcdTdFQzQnLFxyXG4gICAgICAgIC8vICdcdTdFRDNcdTY3ODRcdTRGNTMnLFxyXG4gICAgICAgIC8vICdcdTY3OUFcdTRFM0UnLFxyXG4gICAgICAgIC8vICdcdTY1NzBcdTdFQzQnLFxyXG4gICAgICAgIC8vICdcdTYyNDBcdTY3MDlcdTY3NDMnLFxyXG4gICAgICAgIC8vICdcdTVGMTVcdTc1MjhcdTRFMEVcdTUwMUZcdTc1MjgnLFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICBdLFxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6L2dhcm1pbjIxLmdpdGh1Yi5pby8udnVlcHJlc3Mvbm90ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGdhcm1pbjIxLmdpdGh1Yi5pb1xcXFwudnVlcHJlc3NcXFxcbm90ZXNcXFxcbGVhcm4tdnVlLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9nYXJtaW4yMS5naXRodWIuaW8vLnZ1ZXByZXNzL25vdGVzL2xlYXJuLXZ1ZS5qc1wiO2ltcG9ydCB7IGRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIH0gZnJvbSAndnVlcHJlc3MtdGhlbWUtcGx1bWUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVQbHVtZU5vdGVzSXRlbUNvbmZpZyh7XHJcbiAgbGluazogJy9sZWFybi12dWUvJyxcclxuICBkaXI6ICd2dWVcdTVCNjZcdTRFNjBcdTdCODBcdThCQjAnLFxyXG4gIHNpZGViYXI6IFtcclxuICAgICcnLFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICBkaXI6ICdcdTczQUZcdTU4ODNcdTUxQzZcdTU5MDcnLFxyXG4gICAgLy8gICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgLy8gICBpdGVtczogWydcdTVCODlcdTg4QzUnLCAnXHU3RjE2XHU4RjkxXHU1NjY4XHU2MjY5XHU1QzU1JywgJ0NhcmdvJ10sXHJcbiAgICAvLyB9LFxyXG4gICAge1xyXG4gICAgICBkaXI6ICdcdTU3RkFcdTc4NDBcdTUxNjVcdTk1RTgnLFxyXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgICd2dWVcdTY4MzhcdTVGQzNcdTY5ODJcdTVGRjUnLFxyXG4gICAgICAgICdcdThERUZcdTc1MzEnLFxyXG4gICAgICAgICdyZW5kZXJcdTUxRkRcdTY1NzAnLFxyXG4gICAgICAgICdcdTYzRDJcdTY5RkQnXHJcbiAgICAgICAgLy8gJ1x1NTdGQVx1NjcyQ1x1N0M3Qlx1NTc4QicsXHJcbiAgICAgICAgLy8gJ1x1NjU3MFx1NUI1N1x1N0M3Qlx1NTc4QicsXHJcbiAgICAgICAgLy8gJ1x1NUI1N1x1N0IyNixcdTVFMDNcdTVDMTQsXHU1MzU1XHU1MTQzXHU3QzdCXHU1NzhCJyxcclxuICAgICAgICAvLyAnXHU4QkVEXHU1M0U1XHU1NDhDXHU4ODY4XHU4RkJFXHU1RjBGJyxcclxuICAgICAgICAvLyAnXHU1MUZEXHU2NTcwJyxcclxuICAgICAgICAvLyAnXHU1OTBEXHU1NDA4XHU3QzdCXHU1NzhCJyxcclxuICAgICAgICAvLyAnXHU1QjU3XHU3QjI2XHU0RTMyXHU0RTBFXHU1MjA3XHU3MjQ3JyxcclxuICAgICAgICAvLyAnXHU1MTQzXHU3RUM0JyxcclxuICAgICAgICAvLyAnXHU3RUQzXHU2Nzg0XHU0RjUzJyxcclxuICAgICAgICAvLyAnXHU2NzlBXHU0RTNFJyxcclxuICAgICAgICAvLyAnXHU2NTcwXHU3RUM0JyxcclxuICAgICAgICAvLyAnXHU2MjQwXHU2NzA5XHU2NzQzJyxcclxuICAgICAgICAvLyAnXHU1RjE1XHU3NTI4XHU0RTBFXHU1MDFGXHU3NTI4JyxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgXSxcclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOi9nYXJtaW4yMS5naXRodWIuaW8vLnZ1ZXByZXNzL25vdGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxnYXJtaW4yMS5naXRodWIuaW9cXFxcLnZ1ZXByZXNzXFxcXG5vdGVzXFxcXGxlYXJuLWJ1aWxkLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9nYXJtaW4yMS5naXRodWIuaW8vLnZ1ZXByZXNzL25vdGVzL2xlYXJuLWJ1aWxkLmpzXCI7aW1wb3J0IHsgZGVmaW5lUGx1bWVOb3Rlc0l0ZW1Db25maWcgfSBmcm9tICd2dWVwcmVzcy10aGVtZS1wbHVtZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnKHtcclxuICBsaW5rOiAnL2xlYXJuLWJ1aWxkLycsXHJcbiAgZGlyOiAnXHU2Nzg0XHU1RUZBXHU1REU1XHU1MTc3JyxcclxuICBzaWRlYmFyOiBbXHJcbiAgICB7XHJcbiAgICAgIGRpcjogJ0d1bHAnLFxyXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgICdHdWxwXHU1MTY1XHU5NUU4JyxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGRpcjogJ1dlYnBhY2snLFxyXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgICd3ZWJwYWNrXHU1RkVCXHU5MDFGXHU1MTY1XHU5NUU4XHU2NTU5XHU3QTBCJyxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgXSxcclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOi9nYXJtaW4yMS5naXRodWIuaW8vLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxnYXJtaW4yMS5naXRodWIuaW9cXFxcLnZ1ZXByZXNzXFxcXG5hdmJhci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZ2FybWluMjEuZ2l0aHViLmlvLy52dWVwcmVzcy9uYXZiYXIuanNcIjtpbXBvcnQgeyBkZWZpbmVOYXZiYXJDb25maWcgfSBmcm9tICd2dWVwcmVzcy10aGVtZS1wbHVtZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZU5hdmJhckNvbmZpZyhbXHJcbiAgeyB0ZXh0OiAnXHU5OTk2XHU5ODc1JywgbGluazogJy8nLCBpY29uOiAnbWF0ZXJpYWwtc3ltYm9sczpob21lJyB9LFxyXG4gIHtcclxuICAgIHRleHQ6ICdcdTUzNUFcdTVCQTInLFxyXG4gICAgbGluazogJy9ibG9nLycsXHJcbiAgICBhY3RpdmVNYXRjaDogJ14vKGJsb2d8YXJ0aWNsZSkvJyxcclxuICAgIGljb246ICdtYXRlcmlhbC1zeW1ib2xzOm1lbnUtYm9vaycsXHJcbiAgfSxcclxuICAvLyB7IHRleHQ6ICdQcm9qZWN0cycsIGxpbms6ICcvcHJvamVjdHMvJywgaWNvbjogJ3JpOm9wZW4tc291cmNlLWZpbGwnIH0sXHJcbiAge1xyXG4gICAgdGV4dDogJ1x1NjI4MFx1NjcyRlx1NjU4N1x1Njg2MycsXHJcbiAgICBpY29uOiAnbWRpOmlkZWEnLFxyXG4gICAgYWN0aXZlTWF0Y2g6ICdeLyh2dWVwcmVzcy10aGVtZS1wbHVtZXx2dWVwcmVzcy1wbHVnaW4pLycsXHJcbiAgICBpdGVtczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1ZpdGUnLFxyXG4gICAgICAgIGljb246ICd2c2NvZGUtaWNvbnM6ZmlsZS10eXBlLXZpdGUnLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICd2aXRlLXBsdWdpbi1tb2NrLWRldi1zZXJ2ZXInLFxyXG4gICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly92aXRlLXBsdWdpbi1tb2NrLWRldi1zZXJ2ZXIubmV0bGlmeS5hcHAvJyxcclxuICAgICAgICAgICAgaWNvbjogJ2NhcmJvbjpzZXJ2ZXItcHJveHknLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dDogJ3ZpdGUtcGx1Z2luLWltYWdlLXBsYWNlaG9sZGVyJyxcclxuICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9nYXJtaW4yMS92aXRlLXBsdWdpbi1pbWFnZS1wbGFjZWhvbGRlcicsXHJcbiAgICAgICAgICAgIGljb246ICdiaTppbWFnZS1maWxsJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdWdWVwcmVzcycsXHJcbiAgICAgICAgaWNvbjogJ3ZzY29kZS1pY29uczpmaWxlLXR5cGUtdnVlJyxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgLy8gICB0ZXh0OiAndnVlcHJlc3MtdGhlbWUtcGx1bWUnLFxyXG4gICAgICAgICAgLy8gICBsaW5rOiAnaHR0cHM6Ly9wbHVtZS5qbS1nYXJtaW5nJyxcclxuICAgICAgICAgIC8vICAgaWNvbjogJ21kaTpwYXBlci1haXJwbGFuZScsXHJcbiAgICAgICAgICAvLyB9LFxyXG4gICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgLy8gICB0ZXh0OiAncGx1Z2luLWNhbml1c2UnLFxyXG4gICAgICAgICAgLy8gICBsaW5rOiAnaHR0cHM6Ly9wbHVtZS5qbS1nYXJtaW5nL3BsdWdpbnMvcGx1Z2luLWNhbml1c2UvJyxcclxuICAgICAgICAgIC8vICAgaWNvbjogJ3BhamFtYXM6ZmVhdHVyZS1mbGFnJyxcclxuICAgICAgICAgIC8vIH0sXHJcbiAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAvLyAgIHRleHQ6ICdwbHVnaW4tc2hpa2lqaScsXHJcbiAgICAgICAgICAvLyAgIGxpbms6ICdodHRwczovL3BsdW1lLmptLWdhcm1pbmcvcGx1Z2lucy9wbHVnaW4tc2hpa2lqaS8nLFxyXG4gICAgICAgICAgLy8gICBpY29uOiAnbWF0ZXJpYWwtc3ltYm9scy1saWdodDpjb2RlLWJsb2Nrcy1vdXRsaW5lLXJvdW5kZWQnLFxyXG4gICAgICAgICAgLy8gfSxcclxuICAgICAgICAgIC8vIHtcclxuICAgICAgICAgIC8vICAgdGV4dDogJ3BsdWdpbi1pY29uaWZ5JyxcclxuICAgICAgICAgIC8vICAgbGluazogJ2h0dHBzOi8vcGx1bWUuam0tZ2FybWluZy9wbHVnaW5zL3BsdWdpbi1pY29uaWZ5LycsXHJcbiAgICAgICAgICAvLyAgIGljb246ICdsaW5lLW1kOmljb25pZnkxJyxcclxuICAgICAgICAgIC8vIH0sXHJcbiAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAvLyAgIHRleHQ6ICdwbHVnaW4tbmV0bGlmeS1mdW5jdGlvbnMnLFxyXG4gICAgICAgICAgLy8gICBsaW5rOiAnaHR0cHM6Ly9wbHVtZS5qbS1nYXJtaW5nL3BsdWdpbnMvcGx1Z2luLW5ldGxpZnktZnVuY3Rpb25zLycsXHJcbiAgICAgICAgICAvLyAgIGljb246ICd0ZWVueWljb25zOm5ldGxpZnktc29saWQnLFxyXG4gICAgICAgICAgLy8gfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIHtcclxuICAgIHRleHQ6ICdcdTdCMTRcdThCQjAnLFxyXG4gICAgaWNvbjogJ2ljb24tcGFyay1zb2xpZDpib29rc2hlbGYnLFxyXG4gICAgaXRlbXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdDU1NcdTVCNjZcdTRFNjBcdTdCODBcdThCQjAnLFxyXG4gICAgICAgIGxpbms6ICcvZGVmZW5zaXZlLWNzcy8nLFxyXG4gICAgICAgIGFjdGl2ZU1hdGNoOiAnXi9ub3RlL2RlZmVuc2l2ZS1jc3MvJyxcclxuICAgICAgICBpY29uOiAnc3RyZWFtbGluZTpjc3MtdGhyZWUnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1NTI0RFx1N0FFRlx1OTc2Mlx1OEJENVx1OTg5OCcsXHJcbiAgICAgICAgbGluazogJy9pbnRlcnZpZXctcXVlc3Rpb24vJyxcclxuICAgICAgICBhY3RpdmVNYXRjaDogJ14vbm90ZS9pbnRlcnZpZXctcXVlc3Rpb24vJyxcclxuICAgICAgICBpY29uOiAnY29kaWNvbjpjb21tZW50LXVucmVzb2x2ZWQnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ3R5cGUtY2hhbGxlbmdlcycsXHJcbiAgICAgICAgbGluazogJy90eXBlLWNoYWxsZW5nZXMvJyxcclxuICAgICAgICBhY3RpdmVNYXRjaDogJ14vbm90ZS90eXBlLWNoYWxsZW5nZXMvJyxcclxuICAgICAgICBpY29uOiAnbWRpOmxhbmd1YWdlLXR5cGVzY3JpcHQnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1J1c3RcdTVCNjZcdTRFNjBcdTdCODBcdThCQjAnLFxyXG4gICAgICAgIGxpbms6ICcvbGVhcm4tcnVzdC8nLFxyXG4gICAgICAgIGFjdGl2ZU1hdGNoOiAnXi9ub3RlL2xlYXJuLXJ1c3QvJyxcclxuICAgICAgICBpY29uOiAnbWRpOmxhbmd1YWdlLXJ1c3QnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ3Z1ZTJcdTVCNjZcdTRFNjBcdTdCODBcdThCQjAnLFxyXG4gICAgICAgIGxpbms6ICcvbGVhcm4tdnVlLycsXHJcbiAgICAgICAgYWN0aXZlTWF0Y2g6ICdeL25vdGUvbGVhcm4tdnVlLycsXHJcbiAgICAgICAgaWNvbjogJ2xvZ29zOnZ1ZScsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAncmVhY3RcdTVCNjZcdTRFNjBcdTdCODBcdThCQjAnLFxyXG4gICAgICAgIGxpbms6ICcvbGVhcm4tcmVhY3QvJyxcclxuICAgICAgICBhY3RpdmVNYXRjaDogJ14vbm90ZS9sZWFybi1yZWFjdC8nLFxyXG4gICAgICAgIGljb246ICdza2lsbC1pY29uczpyZWFjdC1kYXJrJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdcdTY3ODRcdTVFRkFcdTVERTVcdTUxNzcnLFxyXG4gICAgICAgIGxpbms6ICcvbGVhcm4tYnVpbGQvJyxcclxuICAgICAgICBhY3RpdmVNYXRjaDogJ14vbm90ZS9sZWFybi1idWlsZC8nLFxyXG4gICAgICAgIGljb246ICdub3RvLXYxOmJ1aWxkaW5nLWNvbnN0cnVjdGlvbicsXHJcbiAgICAgIH0sIC8vc2tpbGwtaWNvbnM6Z3VscFxyXG4gICAgXSxcclxuICB9LFxyXG4gIHtcclxuICAgIHRleHQ6ICdcdTY2RjRcdTU5MUEnLFxyXG4gICAgaWNvbjogJ21pbmdjdXRlOm1vcmUtMy1maWxsJyxcclxuICAgIGl0ZW1zOiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnXHU0RTY2XHU3QzREXHU2M0E4XHU4MzUwJyxcclxuICAgICAgICBsaW5rOiAnL2Vib29rcy8nLFxyXG4gICAgICAgIGljb246ICdtYXRlcmlhbC1zeW1ib2xzOnJlY29tbWVuZCcsXHJcbiAgICAgICAgYWN0aXZlTWF0Y2g6ICdeL2Vib29rcy8nLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1N0FEOVx1NzBCOVx1NUJGQ1x1ODIyQScsXHJcbiAgICAgICAgbGluazogJy9zaXRlcy1jb2xsZWN0LycsXHJcbiAgICAgICAgaWNvbjogJ21kaTpyb2FkbWFwJyxcclxuICAgICAgICBhY3RpdmVNYXRjaDogJ14vc2l0ZXMtY29sbGVjdCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnQ29tbWFuZC1MaW5lIEludGVyZmFjZScsXHJcbiAgICAgICAgbGluazogJy9jbGkvJyxcclxuICAgICAgICBpY29uOiAnZ3JvbW1ldC1pY29uczpjbGknLFxyXG4gICAgICAgIGFjdGl2ZU1hdGNoOiAnXi9jbGknLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1lvdS1OZWVkLUtub3ctVml0ZScsXHJcbiAgICAgICAgbGluazogJ2h0dHBzOi8veW91LW5lZWQta25vdy12aXRlLm5ldGxpZnkuYXBwLycsXHJcbiAgICAgICAgaWNvbjogJ3ZzY29kZS1pY29uczpmaWxlLXR5cGUtdml0ZScsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnaWNvbmlmeScsXHJcbiAgICAgICAgbGluazogJ2h0dHBzOi8vaWNvbmlmeS5kZXNpZ24vJyxcclxuICAgICAgICBpY29uOiAnc2ltcGxlLWljb25zOmljb25pZnknLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG5dKVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6L2dhcm1pbjIxLmdpdGh1Yi5pby8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGdhcm1pbjIxLmdpdGh1Yi5pb1xcXFwudnVlcHJlc3NcXFxcZW5jcnlwdC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZ2FybWluMjEuZ2l0aHViLmlvLy52dWVwcmVzcy9lbmNyeXB0LmpzXCI7ZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdsb2JhbDogdHJ1ZSxcclxuICBhZG1pbjogWyd3d3cyNnV1dWNvbSddLFxyXG4gIC8vIHJ1bGVzOiB7XHJcbiAgLy8gICAnL2xlYXJuLXZ1ZS8nOiAnd3d3MjZ1dXVjb20nLFxyXG4gIC8vICAgXHU1M0VGXHU0RUU1XHU2NjJGIG1kIFx1NjU4N1x1NEVGNlx1NzY4NFx1NzZGOFx1NUJGOVx1OERFRlx1NUY4NFx1RkYwQ1x1NUJGOVx1OEJFNVx1NjU4N1x1NEVGNlx1NTJBMFx1NUJDNlxyXG4gIC8vICAgXCJcdTUyNERcdTdBRUYvXHU1N0ZBXHU3ODQwLm1kXCI6IFwiMTIzNDU2XCIsXHJcbiAgLy8gICBcdTUzRUZcdTRFRTVcdTY2MkYgXHU2NTg3XHU0RUY2XHU1OTM5XHU3Njg0XHU4REVGXHU1Rjg0XHVGRjBDXHU1QkY5XHU4QkU1XHU3NkVFXHU1RjU1XHU0RTBCXHU2MjQwXHU2NzA5XHU2NTg3XHU3QUUwXHU1MkEwXHU1QkM2XHJcbiAgLy8gICBcIi9ub3Rlcy92dWVwcmVzcy10aGVtZS1wbHVtZS9cIjogXCIxMjM0NTZcIixcclxuICAvLyAgIFx1NTNFRlx1NEVFNVx1NjYyRiBcdThCQkZcdTk1RUVcdTU3MzBcdTU3NDBcdTc2ODRcdThCRjdcdTZDNDJcdThERUZcdTVGODRcdUZGMENcdTVCRjlcdThCRTVcdThCQkZcdTk1RUVcdThERUZcdTVGODRcdTRFMEJcdTYyNDBcdTY3MDlcdTY1ODdcdTdBRTBcdTUyQTBcdTVCQzZcclxuICAvLyAgIFwiL3Z1ZXByZXNzLXRoZW1lLXBsdW1lL1wiOiBcIjEyMzQ1NlwiLFxyXG4gIC8vICAgXHU1M0VGXHU0RUU1XHU2NjJGIFx1NTE3N1x1NEY1M1x1NzY4NFx1NjdEMFx1NEUyQVx1OTg3NVx1OTc2Mlx1NzY4NFx1OEJGN1x1NkM0Mlx1OERFRlx1NUY4NFx1RkYwQ1x1NUJGOVx1OEJFNVx1OTg3NVx1OTc2Mlx1NTJBMFx1NUJDNlxyXG4gIC8vICAgXCIvYXJ0aWNsZS9mOGRuY2kzL1wiOiBcIjEyMzQ1NlwiLFxyXG4gIC8vICAgXHU1OTgyXHU2NzlDXHU2NjJGIGBeYCBcdTVGMDBcdTU5MzRcdUZGMENcdTUyMTlcdTUzMzlcdTkxNERcdThCRTVcdTZCNjNcdTUyMTlcdTg4NjhcdThGQkVcdTVGMEZcdTc2ODRcdTk4NzVcdTk3NjJcdTRFNUZcdTRGMUFcdTUyQTBcdTVCQzZcclxuICAvLyAgIFwiXi8oYXxiKS9cIjogXCIxMjM0NTZcIixcclxuICAvLyB9LFxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBPLFNBQVMsbUJBQW1CO0FBQ3RRLFNBQVMsWUFBWSxZQUFZOzs7QUNEc08sU0FBUyxrQkFBa0I7OztBQ0FSLFNBQVMsOEJBQThCOzs7QUNBVCxTQUFTLGtDQUFrQztBQUVuVyxJQUFPLCtCQUFRLDJCQUEyQjtBQUFBLEVBQ3hDLEtBQUs7QUFBQSxFQUNMLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTyxDQUFDLDRCQUFRLDRCQUFRLDBCQUFNO0FBQUEsSUFDaEM7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTDtB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QUNQO0FBQUEsSUFDQTtBQUFBLE1BQ0UsS0FBSztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sV0FBVztBQUFBLE1BQ1gsT0FBTyxDQUFDLFlBQVk7QUFBQSxJQUN0QjtBQUFBLElBQ0E7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLFdBQVc7QUFBQSxNQUNYLE9BQU87QUFBQSxRQUNMO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxLQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixXQUFXO0FBQUEsTUFDWCxPQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsS0FBSztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sV0FBVztBQUFBLE1BQ1gsT0FBTztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLFdBQVc7QUFBQSxNQUNYLE9BQU87QUFBQSxRQUNMO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEs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QUNOLGFBQWE7QUFBQSxJQUNiLE1BQU07QUFBQSxFQUNSO0FBQUE7QUFBQSxFQUVBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsSUFDYixPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBMEJQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxRQUNiLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLFFBQ2IsTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxRQUNiLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLFFBQ2IsTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxRQUNiLE1BQU07QUFBQSxNQUNSO0FBQUE7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsTUFDZjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxNQUNmO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLE1BQ2Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOzs7QUNuSjBRLElBQU8sa0JBQVE7QUFBQSxFQUN4UixRQUFRO0FBQUEsRUFDUixPQUFPLENBQUMsYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBY3ZCOzs7QVpYQSxJQUFPLGdCQUFRLFdBQVc7QUFBQSxFQUN4QixVQUFVO0FBQUEsRUFDVixTQUFTO0FBQUEsRUFDVCxjQUFjO0FBQUEsRUFDZDtBQUFBLEVBQ0E7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLFFBQVE7QUFBQSxJQUNOLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxJQUNiLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxJQUNWLGNBQWM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsUUFBUSxDQUFDLEVBQUUsTUFBTSxVQUFVLE1BQU0sOEJBQThCLENBQUM7QUFBQSxFQUNoRSxjQUFjO0FBQUE7QUFBQSxFQUVkLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxJQUNQLGtCQUFrQjtBQUFBLElBQ2xCLGFBQWEsRUFBRSxLQUFLLG1DQUFtQztBQUFBLElBQ3ZELE9BQU8sRUFBRSxVQUFVLEtBQUs7QUFBQSxJQUN4QixpQkFBaUIsRUFBRSxNQUFNLEtBQUs7QUFBQSxFQUNoQztBQUFBLEVBQ0E7QUFDRixDQUFDOzs7QUQ1QkQsU0FBUyx3QkFBd0I7QUFIOEcsSUFBTSwyQ0FBMkM7QUFLaE0sSUFBTSxZQUFZLFdBQVcsd0NBQWU7QUFDNUMsSUFBTSxVQUFVLElBQUksU0FBUyxLQUFLLFFBQVEsV0FBVyxHQUFHLElBQUk7QUFFNUQsSUFBTyxpQkFBUSxpQkFBaUI7QUFBQTtBQUFBLEVBRTlCLFNBQVMsWUFBWTtBQUFBLEVBQ3JCO0FBQUEsRUFDQSxNQUFNO0FBQUE7QUFBQSxFQUVOLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLEtBQUssRUFBRSxNQUFNLFNBQVMsT0FBTyxXQUFXLGFBQWEsMkJBQU87QUFBQSxFQUM5RDtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sUUFBUSxRQUFRLFFBQVE7QUFBQSxFQUN4QixNQUFNLFFBQVEsaUJBQWlCO0FBQUEsRUFDL0IsT0FBTyxRQUFRLGtCQUFrQjtBQUFBLEVBQ2pDLE1BQU07QUFBQSxJQUNKO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBc0JBLENBQUMsUUFBUSxFQUFFLE1BQU0sWUFBWSxTQUFTLDRDQUFtQixDQUFDO0FBQUEsSUFDMUQsQ0FBQyxRQUFRLEVBQUUsY0FBYyxtQkFBbUIsU0FBUyxTQUFTLENBQUM7QUFBQSxJQUMvRCxDQUFDLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixTQUFTLFVBQVUsQ0FBQztBQUFBLElBQ2hFLENBQUMsUUFBUSxFQUFFLE1BQU0sZUFBZSxTQUFTLFVBQVUsQ0FBQztBQUFBLElBQ3BEO0FBQUEsTUFDRTtBQUFBLE1BQ0EsRUFBRSxNQUFNLGlCQUFpQixTQUFTLG1DQUFtQztBQUFBLElBQ3ZFO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUdGLENBQUM7IiwKICAibmFtZXMiOiBbImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIiwgImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIiwgImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIiwgImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIiwgImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIiwgImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIiwgImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIiwgImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIiwgImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIiwgImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIiwgImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIiwgImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIiwgImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIiwgImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIiwgImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIiwgImRlZmluZVBsdW1lTm90ZXNJdGVtQ29uZmlnIl0KfQo=
