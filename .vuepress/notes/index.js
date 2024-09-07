import { definePlumeNotesConfig } from 'vuepress-theme-plume'
import vuepressThemePlume from './vuepress-theme-plume'
import interviewQuestion from './interview-question.js'
import vuepressPlugin from './vuepress-plugin.js'
import typeChallenges from './type-challenges.js'
import learnRust from './learn-rust.js'
import defensiveCss from './defensive-css.js'
import defensiveJavascript from './defensive-javascript.js'
import learnReact from './learn-react.js'
import learnVue from './learn-vue.js'
import learnVue3 from './learn-vue3.js'
import learnBuild from './learn-build.js'
import learnPy from './learn-py.js'

export default definePlumeNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [
    defensiveJavascript,
    vuepressThemePlume,
    interviewQuestion,
    vuepressPlugin,
    typeChallenges,
    learnRust,
    defensiveCss,
    learnReact,
    learnVue,
    learnBuild,
    learnPy,
    learnVue3
  ],
})
