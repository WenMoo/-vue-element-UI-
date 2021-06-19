import Mock from 'mockjs'
import categoryAPI from './category'
import complaintAPI from './complaint'
import userAPI from './user'


        // 拦截ajax请求，配置mock的数据

//        接口里的地址   请求方式    mock中对应的返回

//分类管理
//分类管理-获取全部

        Mock.mock(/\/shixun\/category/, 'get', categoryAPI.CategoryList)
//分类管理-删除
        Mock.mock(/\/shixun\/category\/delete/, 'get', categoryAPI.CategoryDelete)

//投诉管理
        Mock.mock(/\/shixun\/complaint\/multi/, 'post', complaintAPI.ComplaintList)

//用户管理
        Mock.mock(/\/shixun\/user\/multi/, 'post', userAPI.userList)






 export default Mock
