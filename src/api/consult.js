// 校园相关请求模块


import request from "../util/request";

//请求资讯列表信息
export const  ConsultList = data => {
    return  request({
        method: 'POST',
        url: '/shixun/consult/multi',
        //_data用来设置POST请求体
        // mode: 'same-origin', // 告诉浏览器是同源，同源后浏览器不会进行预检请求
        data
    })
}

//删除
export const Consultdeletes = consultId => {
    return request({
        method: 'DELETE',
        //路劲中看到有：XXX 的需要传递路径参数
        url: `/shixun/consult/${consultId}`,
    })
}

//修改课程信息
export const ConsultChange = data => {
    return request({
        method: 'PUT',
        url: "/shixun/consult",
        data
    })
}

//添加课程信息
export const ConsultAdd = data => {
    return request({
        method: 'POST',
        url: "/shixun/consult",
        data
    })
}

//批量·删除
export const ConsultDeleteList = data => {
    return request({
        method: 'POST',
        url: "/shixun/consult/deletedList",
        data
    })
}