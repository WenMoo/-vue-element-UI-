// 学生相关请求模块


import request from "../util/request";

//请求列表信息
export const  StudentList = data => {
    return  request({
        method: 'POST',
        url: '/shixun/user/multi',
        //_data用来设置POST请求体
        // mode: 'same-origin', // 告诉浏览器是同源，同源后浏览器不会进行预检请求
        data
    })
}
//删除
export const StudentDeletes = schoolId => {
    return request({
        method: 'POST',
        //路劲中看到有：XXX 的需要传递路径参数
        url: `/shixun/user/delete/?schoolId=${schoolId}`,
    })
}

//修改信息
export const StudentChange = data => {
    return request({
        method: 'POST',
        url: "/shixun/user/update",
        data
    })
}

//添加信息
export const StudentAdd = data => {
    return request({
        method: 'POST',
        url: "/shixun/user/register",
        data
    })
}

