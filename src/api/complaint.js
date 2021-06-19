// 投诉相关请求模块


import request from "../util/request";

//请求列表信息
export const  ComplaintList = data => {
    return  request({
        method: 'POST',
        url: '/shixun/complaint/multi',
        data

    })
}
//删除
export const ComplaintDeletes = complaintId => {
    return request({
        method: 'DELETE',
        //路劲中看到有：XXX 的需要传递路径参数
        url: `/shixun/complaint/${complaintId}`,
    })
}

//修改信息
export const ComplaintChange = data => {
    return request({
        method: 'PUT',
        url: "/shixun/complaint",
        data
    })
}

//添加信息
export const ComplaintAdd = data => {
    return request({
        method: 'POST',
        url: "/shixun/complaint",
        data
    })
}