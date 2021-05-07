import * as API from './'
import {clearToken} from './index'

export default {
    //验证手机号是否已注册
    isExistUser: params => {
        return API.GET('login/isExistUser', params);
    },
    //注册
    register: params => {
        return API.POST('login/userRegister', params)
    },
    //密码登录
    loginApi: params => {
        clearToken()
        return API.POST('auth/login', params)
    },
    loginByOpenId: params=>{
        console.log(params)
        return API.GET('admin/loginByOpenId', params);
    },
    addNewSchool: params=>{
        console.log(params)
        return API.POST('addNewSchool', params);
    },
    editShop:params =>{
        return API.PUT('editShop', params);
    }
}