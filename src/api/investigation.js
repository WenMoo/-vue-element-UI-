// 问卷相关请求模块


import request from "../util/request";

//请求课程列表信息
export const  InvestList = data => {
    return  request({
        method: 'POST',
        url: '/shixun/investigation/multi',
        //_data用来设置POST请求体
        // mode: 'same-origin', // 告诉浏览器是同源，同源后浏览器不会进行预检请求
        data
    })
}
//删除
export const InvestDeletes = investigationId => {
    return request({
        method: 'DELETE',
        //路劲中看到有：XXX 的需要传递路径参数
        url: `/shixun/investigation/${investigationId}`,
    })
}

//修改
export const InvestChange = data => {
    return request({
        method: 'PUT',
        url: "/shixun/investigation",
        data
    })
}

//添加
export const InvestAdd = data => {
    return request({
        method: 'POST',
        url: "/shixun/investigation",
        data
    })
}
//批量·删除
export const InvestDeleteList = data => {
    return request({
        method: 'POST',
        url: "/shixun/investigation/deleteList",
        data
    })
}