import Mock from 'mockjs'

const List = []
const num = 10

for (let i = 0; i < num; i++) {

    List.push(Mock.mock(
        {
            'categoryName|1': ['语文', '数学', '英语', '计算机编程', '前端学习', '可视化教程', 'C++编程', 'java教程'],  // 每次随机取其中一个
            'createTime|1': '@datetime()',
        }
    ))
}

export default {
// 下面是增删改查方法的返回，和后台约定好之后就会省很多事
    // look
    CategoryList: () => {
        return {
            total: List.length,
            data: List
        }
    },
    CategoryDelete: () => {
        return {
            total: List.length,
            data: List
        }
    },
}

