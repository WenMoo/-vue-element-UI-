// 学校相关请求模块


import request from "../util/request";

//请求列表信息
export const  SchoolList = params => {
    return  request({
        method: 'GET',
        url: '/shixun/school/findByName',
        //_data用来设置POST请求体
        // mode: 'same-origin', // 告诉浏览器是同源，同源后浏览器不会进行预检请求
        params
    })
}
//删除
export const SchoolDeletes = schoolId => {
    return request({
        method: 'POST',
        //路劲中看到有：XXX 的需要传递路径参数
        url: `/shixun/school/delete/?schoolId=${schoolId}`,
    })
}

//修改信息
export const SchoolChange = data => {
    return request({
        method: 'POST',
        url: "/shixun/school/update",
        data
    })
}

//添加信息
export const SchoolAdd = data => {
    return request({
        method: 'POST',
        url: "/shixun/school/add",
        data
    })
}