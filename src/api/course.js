// 课程相关请求模块

import request from "../util/request";

//请求课程列表信息
export const  CourseList = data => {
    return  request({
        method: 'POST',
        url: '/shixun/course/multi',
        //_data用来设置POST请求体
        // mode: 'same-origin', // 告诉浏览器是同源，同源后浏览器不会进行预检请求
        data
    })
}
//删除课程
export const CourseDeletes = courseId => {
    return request({
        method: 'DELETE',
        //路劲中看到有：XXX 的需要传递路径参数
        url: `/shixun/course/${courseId}`,
    })
}

//修改课程信息
export const CourseChange = data => {
    return request({
        method: 'PUT',
        url: "/shixun/course",
        data
    })
}

//添加课程信息
export const CourseAdd = data => {
    return request({
        method: 'POST',
        url: "/shixun/course",
        data
    })
}


//批量·删除
export const CourseDeleteList = data => {
    return request({
        method: 'POST',
        url: "/shixun/course/deletedByList",
        data
    })
}

//获取课程列表
export const  getcategory = categoryId=> {
    return  request({
        method: 'GET',
        url: `/shixun/category?schoolId=${categoryId}`,

    })
}