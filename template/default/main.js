import Vue from 'vue'
import App from './App'
import http from '@/common/http'
import api from '@/common/http/api'
import { s_log } from '@/common/log'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$HTTP = http
Vue.prototype.$API = api
Vue.prototype.$LOG = s_log

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
