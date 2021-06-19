// 管理员相关请求模块


import request from "../util/request";


//查询管理员
export const  getadmin = params => {
    return request({
        method: 'GET',
        url: '/shixun/admin/selectCommon',
        params: params

    })
}
//添加管理员
export const addAdmin = data => {
    return request({
        method: 'POST',
        url: "/shixun/admin/insertCommon",
        data
    })
}
//获取学校列表
export const  getschool = params => {
    return request({
        method: 'GET',
        url: '/shixun/school/findByName',
        params
    })
}
//获取管理员状态（是否删除）
export const  deleteAdmin = adminId => {
    return request({
        method: 'POST',
        url: `/shixun/admin/deleteOrRestore/?adminId=${adminId}`,
    })
}
// 修改密码
export const changeAdminPwd = data => {
    return request({
        method: 'POST',
        url: "/shixun/admin/superUpdatePwd",
        data
    })
}