import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 20000

axios.interceptors.request.use(config => {
  const {
    method,
    data
  } = config
  if (method.toLowerCase() === 'post' && data && typeof data === 'object') {
    config.data = qs.stringify(data)
  }
  return config;
})


axios.interceptors.response.use(
  response =>{
    return response.data
  },
  error =>{
    alert('error' + error.message)
    return new Promise(()=>{})
  }
)

export default axios