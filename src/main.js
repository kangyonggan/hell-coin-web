import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './assets/element-variables.scss'
import axios from './util/axios'
import VueAxios from 'vue-axios'
import common from '@/util/common'
import NumberUtil from '@/util/number-util'
import DateTimeUtil from '@/util/date-time-util'
import VueI18n from './language'

let app = createApp(App).use(store).use(router).use(ElementPlus).use(VueAxios, axios).use(VueI18n)
app.mount('#app')

app.config.globalProperties.$success = common.success
app.config.globalProperties.$error = common.error
app.config.globalProperties.$warning = common.warning
app.config.globalProperties.NumberUtil = NumberUtil
app.config.globalProperties.DateTimeUtil = DateTimeUtil
