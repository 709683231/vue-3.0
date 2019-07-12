import axios from 'axios'
import router from '../router'
import store from '../vuex/store'
import qs from 'qs';


// axios.defaults.timeout = 12000
const instance = axios.create({
  timeout:12000
})

// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(
  (config) => {
    const {method, data} = config
    if(method.toLowerCase() === 'post' && data && typeof data ==='object'){
      config.data = qs.stringify(data)
    }
    const {needToken} = config.headers
    if(needToken){
      const token = store.state.user.token
      if(token){
        config.headers.Authorization = token
      }else {
        const error = new Error('没有token')
        error.status = 401
        throw error
      }
    }
    return config
  }
)

axios.interceptors.response.use(response => {
    return response.data
  },
  error => {
    if (!error.response) {
      if (error.status === 401) {
        if (router.currentRoute.path !== '/login') {
          router.replace('/login')
          alert(error.message)
        }
      }
    } else {
      const status = error.response.status
      const msg = error.message
      if(status === 401){
        if(router.currentRoute.path !== '/login'){
          store.dispatch('logOut')
          router.replace('/login')
          alert(error.response.data.message)
        }else{
          console.log('token已经过期')
        }
      }else if(status === 404){
        alert('资源不存在')
      }else{
        alert('请求异常' + msg)
      }
    }
    return new Promise(()=>{})
  }
)
export default axios 