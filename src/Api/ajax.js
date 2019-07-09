import axios from 'axios'
import qs from 'qs'
import store from '../router/index';
import router from '../router/index';


axios.defaults.timeout = 20000

axios.interceptors.request.use(config => {
  const {
    method,
    data
  } = config
  if (method.toLowerCase() === 'post' && data && typeof data === 'object') {
    config.data = qs.stringify(data)
  }
  const token = localStorage.getItem('token_key')
  if(token){
    config.headers.Authorization = 'token ' + token
  }
  return config;
})


axios.interceptors.response.use(
  response =>{
    return response.data
  },
  error =>{
    const status = error.response.status
    const msg = error.message
    if(status===401){
      store.dispatch('logOut')
      router.replace('/login')
      alert(error.response.data.message)
    }else if(status ===404){
      alert('请求的数据不存在')
    }else{
      alert('请求异常'+msg)
    }
    alert('error' + error.message)
    return new Promise(()=>{})
  }
)

export default axios