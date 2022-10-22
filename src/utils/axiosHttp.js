import axios from 'axios';
import {
  Message,
  MessageBox
} from 'element-ui';
import Cookies from 'js-cookie'
//路由配置
import router from '@/router'
import {
  getCookie
} from '@/utils/auth.js';



const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 600000
})
//请求拦截器
service.interceptors.request.use(
  config => {
    config.headers = { //配置请求token
      "Authorization": getCookie("token") || ""
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)
//http response 拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 200) { // 如果状态码是200  会执行.then的第一个函数
      return Promise.resolve(response.data)
    } else { //除了200 在2xx的范围 会执行.then的第二个函数  Promise.reject(res)  1
      return Promise.reject(response)
    }
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break;
        case 401:
          MessageBox.alert("未授权，请重新登录", "提示", {
            confirmButtonText: '确定',
            callback: action => {
              Cookies.remove('userToken');
              router.push({
                name: 'Login'
              }).then(() => {
                window.location.reload();
              })

            }
          })
          break;
        case 403:
          err.message = '拒绝访问'
          break;
        case 404:
          err.message = '请求错误,未找到该资源'
          break;
        case 405:
          err.message = '请求方法未允许'
          break;
        case 408:
          err.message = '请求超时'
          break;
        case 500:
          err.message = '服务器端出错'
          break;
        case 501:
          err.message = '网络未实现'
          break;
        case 502:
          err.message = '网络错误'
          break;
        case 503:
          err.message = '服务不可用'
          break;
        case 504:
          err.message = '网络超时'
          break;
        case 505:
          err.message = 'http版本不支持该请求'
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = "连接到服务器失败"
    }
    Message({
      message: err.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(err.response);
  }
)

export default service;
