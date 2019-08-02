import axios from 'axios'
var baseUrl = 'http://192.168.15.54'
//创建axios实例
let token = localStorage.getItem("cocoachina_token");

if (token) {
  var service = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
} else {
  var service = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
      'content-type': 'application/json',
    }
  })
}


export default {
  // get
  get(url) {
    return new Promise((cback, reject) => {
      service({
        method: 'get',
        url
      }).then(res => {
        //axios返回的是一个promise对象 
        var res_code = res.status.toString();
        if (res_code.charAt(0) == 2) {
          cback(res); //cback在promise执行器内部
        } else {
          console.log(res, '异常1')
        }
      }).catch(err => {
        if (!err.response) {
          console.log('请求错误', err)
          //Message是element库的组件，可以去掉

        } else {
          reject(err.response);
          console.log(err.response, '异常2')
        }
      })

    })
  },
  //post请求
  post(url, param) {
    return new Promise((cback, reject) => {
      service({
        method: 'post',
        url,
        data: param,
      }).then(res => {
        //axios返回的是一个promise对象 
        var res_code = res.status.toString();
        if (res_code.charAt(0) == 2) {
          cback(res); //cback在promise执行器内部
        } else {
          console.log(res, '异常1')
        }
      }).catch(err => {
        if (!err.response) {
          console.log('请求错误', err)
          //Message是element库的组件，可以去掉

        } else {
          reject(err.response);
          console.log(err.response, '异常2')
        }
      })

    })
  }
}