import {createI18n} from 'vue-i18n'
import zhCN from './zh-CN.js'
import zhTw from './zh-TW.js'
import enUS from './en-US.js'

const i18n = createI18n({
  locale: localStorage.getItem('language') || navigator.language,
  messages: {
    'zh-CN': zhCN,
    'zh-TW': zhTw,
    'en-US': enUS
  }
})

export default i18n