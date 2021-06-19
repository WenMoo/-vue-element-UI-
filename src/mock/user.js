import Mock from 'mockjs'

const List = []
const num = 10

for (let i = 0; i < num; i++) {

    List.push(Mock.mock(
        {
            'userName|1': '@cname()',  // 每次随机取其中一个
            'userPhone|1': ['13420508952','1342050763','13420508781','16978951446'],
            'className|1': ['计科1183','计科1174','金数1162','文体1192','大数据1191'],
            'schoolName|1':['广东一中','华南师范','南方科技大学','清华大学','北京农业大学',],

        }
    ))
}

export default {
// 下面是增删改查方法的返回，和后台约定好之后就会省很多事
    // look
    userList: () => {
        return {
            total: List.length,
            data: List
        }
    },

}

