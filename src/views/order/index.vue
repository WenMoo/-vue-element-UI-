<template>
  <div class="article-container">

    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--        数据筛选块-->
      <el-form
          label-width="80px"
          size="small"
      >
        <el-form-item label="课程名称" :label-width="formLabelWidth" >
          <el-input   v-model="courseName" autocomplete="off" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" :label-width="formLabelWidth" >
          <el-input   v-model="username" autocomplete="off" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" :label-width="formLabelWidth" >
          <el-input   v-model="phone" autocomplete="off" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item  label-width="120px" label="订单日期">
          <el-date-picker
              v-model="rangeDate"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              format= "yyyy-MM-dd"
              value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
              type="primary"
              @click="loadOrder(null)"
          >
            查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="centre">
        <div>
          订单管理
        </div>
        <el-button type="danger" @click="handleDelete()">多行删除</el-button>
      </div>
      <el-table
          :data="Orderdata"
          style="width: 100%"
          class="list-table"
          size="small"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          border
          fit
          highlight-current-row
        >
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="orderId"
            label="订单编号"
        >
        </el-table-column>
        <el-table-column
            prop="username"
            label="用户名称"
      >
        </el-table-column>
        <el-table-column
            prop="phone"
            label="手机号码"
        >
        </el-table-column>
        <el-table-column
            prop="courseName"
            label="课程名称"
        >
        </el-table-column>
        <el-table-column
            prop="coursePrice"
            label="课程价格"
        >
        </el-table-column>
        <el-table-column
            label="订单状态"
        >
          <template slot-scope="scope">
            <div
                v-if="scope.row.status === '0'"
            >
            未支付
            </div>
            <div
                v-if="scope.row.status === '1'"
            >
              已支付
            </div>
          </template>
        </el-table-column>

        <el-table-column
            label="问卷创建时间"
            width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.paymentTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="操作"
            width="150"
        >
          <!--                    如果需要自定义宿舍，则放到template中-->
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="orderdelete(scope.row.orderId)"
                circle
                type="danger"
                icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--        内容区-->
      <!--
      列表分页
      total 用来设定总数据的条数
      它默认为10条每页计算总页码
       page-siza 每页显示条目个数，
      -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="onCurrentChange"
          :page-sizes="[5 ,10, 20, 50]"
          :page-size="100"
          layout="sizes, prev, pager, next"
          :total=total>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {OrderAdd,OrderChange,OrderDeletes,OrderList ,OrderDeleteList} from "../../api/order";
import {InvestDeleteList} from "../../api/investigation";
export default {
  name: "order",
  data() {
    return {
      Orderdata : [] , //获取到的数据
      total : 0,
      OrderDto: {    ///修改表单
        userId: '',
        isPay: '',
        courseId: '',
        phoneNumber: '',
        orderId: ''
      } ,
      addOrderDto: {    ///添加表单
        userId: '',
        isPay: '',
        courseId: '',
        phoneNumber: '',
        schoolId: ''
      } ,
      //查询的
      username:'',
      courseName: '',
      phone: '',
      rangeDate: [],

      dialogFormVisible: false, //第一个添加表单
      dialogFormVisible2: false, //第二个修改表单

      formLabelWidth: '120px',

      //批量删除选中id
      selectionList:[],
      //分页
      curPage : 1,
      pageSize : 5,

      //本地获取到的管理员学校id
      schoolId : '',

    }
  },
  created() {
    this.adminSchoolLocal()
  },
  beforeMount() {
    this.loadOrder()
  },
  methods: {


    //获取表单数据
    loadOrder (curPage = 1) {
      //z展示加载中的 loading

      OrderList(
          {
            curPage:this.curPage,
            pageSize:this.pageSize,
            username: this.username,
            courseName: this.courseName,
            phone : this.phone,
            beginTime : this.rangeDate[0],
            endTime : this.rangeDate[1],
            schoolId : this.schoolId
          }
      ).then( res => {
        this.Orderdata = res.data.data;
        this.total = res.data.count;
      })
    },
    // 分页
    onCurrentChange (curPage) {
      this.curPage = curPage
      this.loadOrder()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.loadOrder()
    },
    //添加课程
    onPublish () {
      OrderAdd ( this.addOrderDto ).then(res => {
      }).catch(res => {
      })
    },

    //删除课程
    orderdelete (orderId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        OrderDeletes(orderId).then(res => {
              this.loadOrder()
            })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //课程改变
    changeOrderDto() {
      //还没把该列的添加到表单里一起传给后台
      OrderChange(this.OrderDto).then(res=>{

      }).catch(res =>{

      })
    },
    //获取编辑列id
    getId (curOrderId) {
      this.password.orderId = curOrderId
    },
    //批量选择时触发
    handleSelectionChange(selection){
      this.selectionList = []
      selection.forEach(element => {
        this.selectionList.push(element.orderId)
      });
    },
    //多行删除
    handleDelete() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        OrderDeleteList(this.selectionList).then(res=>{
          console.log(this.selectionList);
          console.log('修改成功');
          this.loadOrder()
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //从本地获取到登录人的所属学校
    adminSchoolLocal() {
      const user = JSON.parse(window.localStorage.getItem('user'));
      const aa = user.admin.adminSchool
      this.addOrderDto.schoolId = aa;
      this.schoolId = aa;
      console.log(this.schoolId);
    },

  }




}
</script>

<style scoped>

.list-table{
  margin-bottom: 20px;
}
.centre{
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.filter-card{
  margin-bottom: 30px;
}
.list-table{
  margin-bottom: 20px;
}
</style>
