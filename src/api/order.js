// 订单相关请求模块


import request from "../util/request";

//请求列表信息
export const  OrderList = data => {
    return  request({
        method: 'POST',
        url: '/shixun/order/all',
        data

    })
}
//删除
export const OrderDeletes = orderId => {
    return request({
        method: 'DELETE',
        //路劲中看到有：XXX 的需要传递路径参数
        url: `/shixun/order/${orderId}`,
    })
}

//修改信息
export const OrderChange = data => {
    return request({
        method: 'PUT',
        url: "/shixun/order",
        data
    })
}

//添加信息
export const OrderAdd = data => {
    return request({
        method: 'POST',
        url: "/shixun/order",
        data
    })
}
//批量·删除
export const OrderDeleteList = data => {
    return request({
        method: 'POST',
        url: "/shixun/order/deletedByList",
        data
    })
}