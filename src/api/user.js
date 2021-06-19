// 用户相关请求模块

//用户登录
import request from "../util/request";


export const  login = data => {
    return  request({
        method: 'POST',
        url: '/shixun/admin/login',
       data
    })
}

