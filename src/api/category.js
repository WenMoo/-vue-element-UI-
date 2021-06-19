// 投诉相关请求模块


import request from "../util/request";

//请求列表信息
export const  CategoryList = ()=> {
    return  request({
        method: 'GET',
        url: `/shixun/category`,

    })
}
//删除
export const CategoryDeletes = categoryId => {
    return request({
        method: 'DELETE',
        //路劲中看到有：XXX 的需要传递路径参数
        url: `/shixun/category/${categoryId}`,
    })
}

//修改信息
export const CategoryChange = data => {
    return request({
        method: 'PUT',
        url: "/shixun/category",
        data
    })
}

//添加信息
export const CategoryAdd = data => {
    return request({
        method: 'POST',
        url: "/shixun/category",
        data
    })
}