<template>
    <div class="article-container">

      <el-card class="filter-card">
        <div slot="header" class="clearfix">
          <!--        面包屑-->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>投诉查询</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--        数据筛选块-->
        <el-form
            label-width="80px"
            size="small"
        >
          <el-form-item label="投诉人" :label-width="formLabelWidth" >
            <el-input   v-model="complaintName" autocomplete="off" placeholder="请输入投诉人名称"></el-input>
          </el-form-item>
          <el-form-item label="投诉人班级" :label-width="formLabelWidth" >
            <el-input   v-model="className" autocomplete="off" placeholder="请输入投诉人班级"></el-input>
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
                @click="loadComplaint()"
            >
              查询</el-button>
          </el-form-item>
        </el-form>
        <!--        数据筛选块-->
      </el-card>
        <el-card class="box-card">
            <div slot="header" class="centre">
                <div>
                  投诉管理
                </div>
              <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
              <!--              //添加表单-->
              <el-dialog
                  title="添加资讯"
                  :visible.sync="dialogFormVisible"
                  modal-append-to-body
                  append-to-body
                  :center="true"
              >
                <el-form :model="addcomplaintDto">
                  <el-form-item label="投诉人" :label-width="formLabelWidth" >
                    <el-input v-model="addcomplaintDto.complaintName" autocomplete="off" placeholder="请输入投诉人姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="投诉人班级" :label-width="formLabelWidth" >
                    <el-input v-model="addcomplaintDto.className" autocomplete="off" placeholder="请输入投诉人班级"></el-input>
                  </el-form-item>
                  <el-form-item label="投诉内容" :label-width="formLabelWidth" >
                    <el-input v-model="addcomplaintDto.complaintContent" autocomplete="off" placeholder="请输入投诉内容"></el-input>
                  </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false ; onPublish() ">确 定</el-button>
                </div>
              </el-dialog>
              </div>

            <el-table
                    :data="complaintdata"
                    style="width: 100%"
                    class="list-table"
                    size="small"
                    border
                    fit
                    highlight-current-row
            >
                <el-table-column
                        prop="complaintName"
                        label="投诉人"
                >
                </el-table-column>
                <el-table-column
                    prop="className"
                    label="投诉人班级"
                >
                </el-table-column>
                  <el-table-column
                      prop="complaintContent"
                      label="投诉内容"
                  >
                  </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="投诉时间"
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
                                    @click="dialogFormVisible2 = true ; getId(scope.row.complaintId, scope.row.complaintName, scope.row.className, scope.row.complaintContent) "
                                    circle
                                    type="primary"
                                    icon="el-icon-edit"
                            ></el-button>
                          <el-button
                              size="mini"
                              @click="complaintdelete(scope.row.complaintId)"
                              circle
                              type="danger"
                              icon="el-icon-delete"
                          ></el-button>
                        </template>
                </el-table-column>
            </el-table>
<!--          //修改密码的表单-->
          <el-dialog
            title="投诉修改"
            :visible.sync="dialogFormVisible2"
            modal-append-to-body
            append-to-body
            :center="true"
        >
            <el-form :model="complaintDto">
              <el-form-item label="投诉人" :label-width="formLabelWidth" >
                <el-input v-model="complaintDto.complaintName" autocomplete="off" placeholder="请输入投诉人姓名"></el-input>
              </el-form-item>
              <el-form-item label="投诉人班级" :label-width="formLabelWidth" >
                <el-input v-model="complaintDto.className" autocomplete="off" placeholder="请输入投诉人班级"></el-input>
              </el-form-item>
              <el-form-item label="投诉内容" :label-width="formLabelWidth" >
                <el-input v-model="complaintDto.complaintContent" autocomplete="off" placeholder="请输入投诉内容"></el-input>
              </el-form-item>
            </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible2 = false ; changeComplaintDto() ">确 定</el-button>
          </div>
        </el-dialog>

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
  import {ComplaintAdd,ComplaintChange,ComplaintDeletes,ComplaintList} from "../../api/complaint";
  import { getschool} from "../../api/admin";

  export default {
        name: "user",
        data() {
            return {
              complaintdata : [] , //获取到的数据


              //查询
              complaintName : '',
              className : '',
              rangeDate : [],

              complaintDto : {
                complaintName : '',
                className : '',
                complaintContent: '',
                complaintId: '',
              },
              addcomplaintDto : {
                complaintName : '',
                className : '',
                complaintContent: '',
                schoolId: '',

              },
              total : 0,
              school: [], //添加按键的学校列表

              dialogFormVisible2: false, //第二个修改表单
              dialogFormVisible: false, //第一个修改表单

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
      this.loadComplaint();
    },
        methods: {

          //获取表单数据
          loadComplaint(curPage = 1) {
            ComplaintList(
                  {
                    curPage:this.curPage,
                    pageSize:this.pageSize,
                    complaintName : this.complaintName,
                    className : this.className,
                    schoolName : this.schoolName,
                    beginTime : this.rangeDate[0],
                    endTime : this.rangeDate[1],
                    schoolId : this.schoolId

                  }
              ).then( res => {
                  this.complaintdata = res.data.data;
                  this.total = res.data.count;
              console.log(this.total);

            })


          },
          // 分页
          onCurrentChange (curPage) {
            this.curPage = curPage
            this.loadComplaint()
          },
          handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.loadComplaint()
          },
          //删除课程
          complaintdelete (ComplaintDeletesId) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              ComplaintDeletes(ComplaintDeletesId).then(
                  //删除成功
                  res => {
                    console.log("更改成功")
                    this.loadComplaint()
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
          changeComplaintDto() {
            //还没把该列的添加到表单里一起传给后台
            ComplaintChange(this.complaintDto).then(res=>{
              this.loadComplaint()
            }).catch(res =>{

            })
          },
          //获取编辑列id

          getId (a,b,c,d,e) {
            this.complaintDto.complaintId = a;
            this.complaintDto.complaintName = b;
            this.complaintDto.className = c;
            this.complaintDto.complaintContent = d;



          },
          //添加课程
          onPublish () {
            console.log(this.addcomplaintDto);
            ComplaintAdd ( this.addcomplaintDto ).then(res => {
              console.log("上传成功");
              this.loadCourse()
            }).catch(res => {
              console.log("上传失败");
            })
          },
          //从本地获取到登录人的所属学校
          adminSchoolLocal() {
            const user = JSON.parse(window.localStorage.getItem('user'));
            const aa = user.admin.adminSchool
            this.addcomplaintDto.schoolId = aa;
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
