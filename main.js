import Vue from 'vue'
import App from './App'
import { myRequest } from './util/api.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$myRequest = myRequest
Vue.filter('formatDate', (date)=>{
	const nDate = new Date(date)
	const year = nDate.getFullYear().toString().padStart(2, 0)
	const month = nDate.getMonth().toString().padStart(2, 0)
	const day = nDate.getDay().toString().padStart(2, 0)
	return year + '年' + month + '月' + day + '日'
})

const app = new Vue({
    ...App
})
app.$mount()
