// 投诉相关请求模块


import request from "../util/request";

//请求列表信息
export const  ClassTimeList = data => {
    return  request({
        method: 'POST',
        url: '/shixun/class/multi',
        //_data用来设置POST请求体
        // mode: 'same-origin', // 告诉浏览器是同源，同源后浏览器不会进行预检请求
        data
    })
}
//删除
export const ClassTimeDeletes = classTimeId => {
    return request({
        method: 'DELETE',
        //路劲中看到有：XXX 的需要传递路径参数
        url: `/shixun/class/${classTimeId}`,
    })
}

//修改信息
export const ClassTimeChange = data => {
    return request({
        method: 'PUT',
        url: "/shixun/class",
        data
    })
}

//添加信息
export const ClassTimeAdd = data => {
    return request({
        method: 'POST',
        url: "/shixun/class",
        data
    })
}