import Mock from 'mockjs'

const List = []
const num = 10

for (let i = 0; i < num; i++) {

    List.push(Mock.mock(
        {
            'complaintName|1': ['小杰', '小文', '小英', '张飞', '李白', '习大大', '大狗子', '小狗子'],  // 每次随机取其中一个
            'className|1': ['计科1183','计科1174','金数1162','文体1192','大数据1191',],
            'complaintContent|1': '@cparagraph()',
            'createTime|1': '@datetime()',
        }
    ))
}

export default {
// 下面是增删改查方法的返回，和后台约定好之后就会省很多事
    // 这里分页功能不行，因为是根据后台页码数和每页大小，返回的数据的，这里没有做，所以分页功能不行
    ComplaintList: () => {
        return {
            total: List.length,
            data: List
        }
    },

}

