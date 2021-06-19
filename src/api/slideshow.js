// 轮播图相关请求模块


import request from "../util/request";

//请求轮播图列表信息
export const  SlideshowList = data => {
    return  request({
        method: 'POST',
        url: `/shixun/slideshow/multi`,
        data
    })
}
//删除课程
export const SlideshowDeletes = slideshowId => {
    return request({
        method: 'DELETE',
        url: `/shixun/slideshow/${slideshowId}`,

    })
}

//修改轮播图信息
export const SlideshowChange = data => {
    return request({
        method: 'PUT',
        url: "/shixun/slideshow",
        data
    })
}

//添加课程信息
export const SlideshowAdd = data => {
    return request({
        method: 'POST',
        url: "/shixun/slideshow",
        data
    })
}


//是否启用
export const  IfSlideshow = data=> {
    return request({
        method: 'POST',
        url: `/shixun/slideshow/enableOrDisableSlideshow`,
        data
    })
}