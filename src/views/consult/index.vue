<template>
    <div class="article-container">

      <el-card class="filter-card">
        <div slot="header" class="clearfix">
          <!--        面包屑-->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资讯查询</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--        数据筛选块-->
        <el-form
            label-width="80px"
            size="small"
        >
          <el-form-item label="资讯标题" :label-width="formLabelWidth" >
            <el-input   v-model="consultTitle" autocomplete="off" placeholder="请输入资讯标题"></el-input>
          </el-form-item>
          <el-form-item  label-width="120px" label="资讯日期">
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
                @click="loadConsult()"
            >
              查询</el-button>
          </el-form-item>
        </el-form>
        <!--        数据筛选块-->
      </el-card>



      <el-card class="box-card">
            <div slot="header" class="centre">
                <div>
                  咨询管理
                </div>


                <!-- Form -->
              <div>
                <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
                <el-button type="danger" @click="handleDelete()">多行删除</el-button>
              </div>


              <!--              //添加表单-->
                <el-dialog
                    title="添加资讯"
                    :visible.sync="dialogFormVisible"
                    modal-append-to-body
                    append-to-body
                    :center="true"
                >
                  <el-form :model="addconsultDto">
                    <el-form-item label="资讯标题" :label-width="formLabelWidth" >
                      <el-input v-model="addconsultDto.consultTitle" autocomplete="off" placeholder="请输入资讯标题"></el-input>
                    </el-form-item>
                    <el-form-item label="资讯内容" :label-width="formLabelWidth" >
                      <el-input v-model="addconsultDto.consultText" autocomplete="off" placeholder="请输入资讯内容"></el-input>
                    </el-form-item>

                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false ; onPublish() ">确 定</el-button>
                  </div>
                </el-dialog>

              </div>

            <el-table
                    :data="Consultdata"
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
                  width="55"
              >
              </el-table-column>
                <el-table-column
                        prop="consultId"
                        label="资讯ID"
                >
                </el-table-column>
                <el-table-column
                    prop="consultTitle"
                    label="资讯标题"
                >
                </el-table-column>
                <el-table-column
                    prop="consultText"
                    label="资讯描述"
                >
                </el-table-column>
              <el-table-column
                  label="日期"
              >
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                </template>
              </el-table-column>
                <el-table-column
                        prop="name"
                        label="操作"
                >
<!--                    如果需要自定义宿舍，则放到template中-->
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="dialogFormVisible2 = true ; getId(scope.row.consultId , scope.row.consultTitle , scope.row.consultText) "
                                    circle
                                    type="primary"
                                    icon="el-icon-edit"
                            ></el-button>
                          <el-button
                              size="mini"
                              @click="consultdelete(scope.row.consultId)"
                              circle
                              type="danger"
                              icon="el-icon-delete"
                          ></el-button>
                        </template>
                </el-table-column>
            </el-table>
<!--          //修改密码的表单-->
          <el-dialog
            title="校园资讯修改"
            :visible.sync="dialogFormVisible2"
            modal-append-to-body
            append-to-body
        >
          <el-form :model="consultDto">
            <el-form-item label="资讯标题" :label-width="formLabelWidth" >
              <el-input v-model="consultDto.consultTitle" autocomplete="off" placeholder="请输入资讯标题"></el-input>
            </el-form-item>
            <el-form-item label="资讯描述" :label-width="formLabelWidth" >
              <el-input v-model="consultDto.consultText" autocomplete="off" placeholder="请输入资讯描述"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible2 = false ; changeconsultDto() ">确 定</el-button>
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
  import {ConsultList , Consultdeletes , ConsultChange ,ConsultAdd ,ConsultDeleteList} from "../../api/consult";
  import {OrderDeleteList} from "../../api/order";
    export default {
        name: "consult",
        data() {
            return {
              Consultdata : [] , //获取到的数据

              consultDto: {    ///课程表单
                consultTitle: '',
                consultText: '',
                consultId: '',
              } ,
              curConsultId: '',  //修改当前行的id

              addconsultDto: {    ///添加咨询表单
                consultTitle: '',
                consultText: '',
                schoolId: '',
              } ,


              total: 0,

              dialogFormVisible: false, //第一个添加表单
              dialogFormVisible2: false, //第二个修改表单

              formLabelWidth: '120px',
              //查询
              rangeDate: [],
              consultTitle: '',
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
        this.loadConsult()
      },

        methods: {

          //获取表单数据
          loadConsult (curPage = 1) {
              //z展示加载中的 loading

            ConsultList(
                {
                  curPage:this.curPage,
                  pageSize:this.pageSize,
                  beginTime : this.rangeDate[0],
                  endTime : this.rangeDate[1],
                  consultTitle : this.consultTitle,
                  schoolId : this.schoolId

                }
              ).then( res => {
                console.log(res);
                  this.Consultdata = res.data.data;
                  this.total = res.data.count;
            })

          },

          //添加课程
          onPublish () {
            ConsultAdd ( this.addconsultDto ).then(res => {
              console.log("添加资讯成功");
              this.loadConsult()
            }).catch(res => {
              console.log("添加资讯失败");
            })
          },

          //删除课程
          consultdelete (consultId) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              Consultdeletes(consultId).then(
                  //删除成功
                  res => {
                    console.log("更改成功")
                    this.loadConsult()
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
          changeconsultDto() {
            //还没把该列的添加到表单里一起传给后台
            ConsultChange(this.consultDto).then(res=>{
              this.loadConsult()
            }).catch(res =>{

            })
          },
          //获取编辑列id
          getId (a,b,c) {
            this.consultDto.consultId = a,
            this.consultDto.consultTitle = b,
            this.consultDto.consultText = c,
            console.log(this.password);
          },

          // 分页
          onCurrentChange (curPage) {
            this.curPage = curPage
            this.loadConsult()
          },
          handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.loadConsult()
          },
          //批量选择时触发
          handleSelectionChange(selection){
            this.selectionList = []
            selection.forEach(element => {
              this.selectionList.push(element.consultId)
            });
          },

          handleDelete() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              ConsultDeleteList(this.selectionList).then(res=>{
                console.log(this.selectionList);
                console.log('修改成功');
                this.loadConsult()
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
            this.addconsultDto.schoolId = aa;
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
    .list-table{
      margin-bottom: 20px;
    }
    .filter-card{
      margin-bottom: 20px;
    }
</style>
