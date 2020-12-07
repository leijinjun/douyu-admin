import axios from 'axios'
import { Message } from 'element-ui'
//import store from '@/store'
import { getToken } from '@/utils/auth'
var baseURL = "http://localhost:8882/admin";
if(process.env.NODE_ENV=="production"){
	baseURL = "https://admin.lei2j.com/admin";
}
// create an axios instance
const service = axios.create({
  baseURL: baseURL,
  timeout: 1000*60*5 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
//  if (store.getters.token) {
//    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
//    config.headers['X-Token'] = getToken()
//  }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
  	const res = response.data;
  	if(res.errCode!=0){
  		Message({
	      message: res.errMsg,
	      type: 'error',
	      duration: 3 * 1000
      })
      return Promise.reject(response)
  	}else{
      return res;
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
