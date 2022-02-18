import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import '@/assets/css/gobal.css'

const ajax = require('axios')
/*上线时，应将localhost修改为61.183.139.106*/
//ajax.defaults.baseURL = 'http://61.183.139.106:8082/'
ajax.defaults.baseURL = 'http://localhost:8082/'
Vue.prototype.$ajax = axios
Vue.config.productionTip = false  //阻止启动时产生消息
Vue.use(ElementUI)

// 通过axios请求拦截器添加token 保证拥有获取数据的权限
axios.interceptors.request.use(config =>{
  config.headers.token = window.sessionStorage.getItem('token')
  return config
})

axios.interceptors.response.use(function (response) {
  // 在接收响应做些什么，例如跳转到登录页
  if(response.data.code==403){
    router.replace("/")
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
