<template>
    <div class="article-container">

      <el-card class="filter-card">
        <div slot="header" class="clearfix">
          <!--        面包屑-->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>问卷查询</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--        数据筛选块-->
        <el-form
            label-width="80px"
            size="small"
        >
          <el-form-item label="用户名称" :label-width="formLabelWidth" >
            <el-input   v-model="userName" autocomplete="off" placeholder="请输入用户名称"></el-input>
          </el-form-item>
          <el-form-item label="用户班级" :label-width="formLabelWidth" >
            <el-input   v-model="className" autocomplete="off" placeholder="请输入用户班级"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button
                type="primary"
                @click="loadStudent(null)"
            >
              查询</el-button>
          </el-form-item>
        </el-form>
        <!--        数据筛选块-->
      </el-card>
        <el-card class="box-card">
            <div slot="header" class="centre">
                <div>
                  用户管理
                </div>
              </div>

            <el-table
                    :data="Studentdata"
                    style="width: 100%"
                    class="list-table"
                    size="small"
                    border
                    fit
                    highlight-current-row
            >
                <el-table-column
                        prop="userName"
                        label="用户名称"
                >
                </el-table-column>
                <el-table-column
                    prop="userPhone"
                    label="用户电话"
                >
                </el-table-column>
                  <el-table-column
                      prop="className"
                      label="用户班级"
                  >
                  </el-table-column>
                    <el-table-column
                        prop="schoolName"
                        label="用户学校"
                    >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="操作"
                >
<!--                    如果需要自定义宿舍，则放到template中-->
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="dialogFormVisible2 = true ; getId(scope.row.userId, scope.row.userName, scope.row.userPhone, scope.row.className, scope.row.schoolName) "
                                    circle
                                    type="primary"
                                    icon="el-icon-edit"
                            ></el-button>
                          <el-button
                              size="mini"
                              @click="studentdelete(scope.row.userId)"
                              circle
                              type="danger"
                              icon="el-icon-delete"
                          ></el-button>
                        </template>
                </el-table-column>
            </el-table>
<!--          //修改密码的表单-->
          <el-dialog
            title="用户修改"
            :visible.sync="dialogFormVisible2"
            modal-append-to-body
            append-to-body
            :center="true"
        >
            <el-form :model="studentlDto">
              <el-form-item label="用户姓名" :label-width="formLabelWidth" >
                <el-input v-model="studentlDto.userName" autocomplete="off" placeholder="请输入用户姓名"></el-input>
              </el-form-item>
              <el-form-item label="用户电话" :label-width="formLabelWidth" >
                <el-input v-model="studentlDto.userPhone" autocomplete="off" placeholder="请输入用户电话"></el-input>
              </el-form-item>
              <el-form-item label="用户班级" :label-width="formLabelWidth" >
                <el-input v-model="studentlDto.userClass" autocomplete="off" placeholder="请输入用户班级"></el-input>
              </el-form-item>
              <el-form-item label="学校" :label-width="formLabelWidth">
                <el-select v-model="studentlDto.schoolId" placeholder="请选择学校">
                  <el-option
                      :value="item.schoolId"
                      :label="item.schoolName"
                      v-for="(item, index) in school"
                      :key="index"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible2 = false ; changestudentDto() ">确 定</el-button>
          </div>
        </el-dialog>

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
  import {StudentChange,StudentDeletes,StudentList} from "../../api/students";
  import { getschool} from "../../api/admin";

  export default {
        name: "user",
        data() {
            return {
              Studentdata : [] , //获取到的数据


              //查询
              userName : '',
              className : '',

              studentlDto : {
                userName : '',
                userPhone : '',
                schoolId : '',
                userClass : '',
                userId : '',
              },
              total : 0,
              school: [], //添加按键的学校列表

              dialogFormVisible2: false, //第二个修改表单

              formLabelWidth: '120px',
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
      this.loadStudent();
    },
    methods: {

          //获取表单数据
          loadStudent (curPage = 1) {
            StudentList(
                  {
                    curPage:this.curPage,
                    pageSize:this.pageSize,
                    userName : this.userName,
                    className : this.className,
                    schoolName : this.schoolName,
                    schoolId : this.schoolId

                  }
              ).then( res => {
                  console.log(res);
                  console.log(curPage);
                  this.Studentdata = res.data.data;
                  this.total = res.data.count;
            }),
                //获取学校信息列表
                getschool (
                    {
                      curPage: 1,
                      pageSize: 10000
                    }
                ).then( res => {
                  console.log(res);
                  this.school = res.data.data.schools;

                })

          },
          // 分页
          onCurrentChange (curPage) {
            this.curPage = curPage
            this.loadStudent()
          },
          handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.loadStudent()
          },
          //删除课程
          studentdelete (userId) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              StudentDeletes(userId).then(
                  //删除成功
                  res => {
                    console.log("更改成功")
                    this.loadStudent()
                  }
              )
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
          changestudentDto() {
            //还没把该列的添加到表单里一起传给后台
            StudentChange(this.studentlDto).then(res=>{
              this.loadStudent()
            }).catch(res =>{

            })
          },
          //获取编辑列id

          getId (a,b,c,d,e) {
            this.studentlDto.userId = a;
            this.studentlDto.userName = b;
            this.studentlDto.userPhone= c;
            this.studentlDto.userClass = d;
            this.studentlDto.userSchool = e;

          },

          //从本地获取到登录人的所属学校
          adminSchoolLocal() {
            const user = JSON.parse(window.localStorage.getItem('user'));
            const aa = user.admin.adminSchool
            this.schoolId = aa;

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
