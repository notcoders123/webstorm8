import Env from './env';
import axios from 'axios'


axios.defaults.withCredentials = false;
axios.defaults.headers.common['Content-Type']= 'application/json;charset=UTF-8';//配
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
axios.defaults.headers.put['Content-Type']='application/json;charset=UTF-8';



//基地址
let base = Env.baseURL;

//测试使用
export const ISDEV = Env.isDev;

//通用方法
export const POST = (url, params) => {
    //const getTimestamp = new Date().getTime();
    return axios.post(`${base}${url}`, params)
}

export const GET = (url, params) => {
    // const getTimestamp = new Date().getTime();
    //  console.log("测试"+params)
    return axios.get(`${base}${url}` + revert(params)).then(res => res.data)
}

export const PUT = (url, params) => {
    return axios.put(`${base}${url}`, params).then(res => res.data)
}
export const PUT2 = (url, params) => {
    return axios.put(`${base}${url}`+'/'+ params).then(res => res.data)
}

export const DELETE = (url, params) => {
    return axios.delete(`${base}${url}` + revert(params)).then(res => res.data)
}
export const DELETE2 = (url, params) => {
    return axios.delete(`${base}${url}` +'/'+ params).then(res => res.data)
}

export const PATCH = (url, params) => {
    return axios.patch(`${base}${url}`, params).then(res => res.data)
}

function revert(params) {
    var str = ""
    if (params===undefined){
        return str;
    }
    for (let i = 0; i < params.length; i++) {
        str = str + "/" + params[i]
    }
    return str;
}

export function clearToken() {
    sessionStorage.clear()
  // delete axios.defaults.headers.common['Authorization'];
}