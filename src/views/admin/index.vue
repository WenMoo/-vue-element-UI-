<template>
    <div class="article-container">


        <el-card class="box-card">
            <div slot="header" class="centre">
                <div>
                  学校管理员
                </div>
                <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
                <el-dialog
                    title="添加管理员"
                    :visible.sync="dialogFormVisible"
                    modal-append-to-body
                    append-to-body
                    :center="true"
                >
                  <el-form :model="form">
                    <el-form-item label="管理员账户" :label-width="formLabelWidth" >
                      <el-input v-model="form.adminId" autocomplete="off" placeholder="请输入ID"></el-input>
                    </el-form-item>
                    <el-form-item label="管理员名称" :label-width="formLabelWidth" >
                      <el-input v-model="form.adminName" autocomplete="off" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="学校" :label-width="formLabelWidth">
                      <el-select v-model="form.adminSchool" placeholder="请选择学校">
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
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false ; onPublish() ">确 定</el-button>
                  </div>
                </el-dialog>

              </div>

            <el-table
                    :data="admindata"
                    style="width: 100%"
                    class="list-table"
                    size="small"
                    border
                    fit
                    highlight-current-row
            >
                <el-table-column
                        prop="admin_id"
                        label="管理员账户"
                >
                </el-table-column>
                <el-table-column
                        prop="school_name"
                        label="所属学校"
                >
                </el-table-column>
                <el-table-column

                    label="禁用"
                    >
                  <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.is_deleted"
                        :active-value="true"
                        :inactive-value="false"
                        active-color="#ff4949"
                        inactive-color="#13ce66"
                        @change="changeSwitch(scope.row.admin_id)"
                    >
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="修改密码">
<!--                    如果需要自定义宿舍，则放到template中-->
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="dialogFormVisible2 = true ; getId(scope.row.admin_id) "
                                    circle
                                    type="primary"
                                    icon="el-icon-edit"
                            ></el-button>
                        </template>
                </el-table-column>
            </el-table>
<!--          //修改密码的表单-->
          <el-dialog
            title="修改密码"
            :visible.sync="dialogFormVisible2"
            modal-append-to-body
            append-to-body
            :center="true"
        >
          <el-form :model="password">
            <el-form-item label="新密码" :label-width="formLabelWidth" >
              <el-input v-model="password.newPwd" autocomplete="off" placeholder="请输入新密码"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible2 = false ; changePwd() ">确 定</el-button>
          </div>
        </el-dialog>

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
  import {getadmin , addAdmin , getschool , deleteAdmin , changeAdminPwd} from "../../api/admin";
    export default {
        name: "admin",
        data() {
            return {
              admindata : [] , //获取到的数据
              dialogFormVisible: false, //第一个添加表单
              dialogFormVisible2: false, //第二个修改表单
              form: {  //添加管理员的表单
                adminId : '',
                adminName: '',
                adminSchool: null,

              },
              total : 0,
              value: false,  //删除列的状态
              formLabelWidth: '120px',
              school: [], //添加按键的学校列表
              password: {  //修改密码的表单
                newPwd : '',
                adminId: ''
              },
              //分页
              curPage : 1,
              pageSize : 5,
            }
          },
        created() {
          this.loadArticles()

        },
        methods: {

          //获取表单数据
          loadArticles (curPage = 1) {
              //z展示加载中的 loading
              getadmin(
                  {
                    curPage:this.curPage,
                    pageSize:this.pageSize,
                  }
              ).then( res => {
                  console.log(res);
                  console.log(curPage);
                  this.admindata = res.data.data.admins;
                  this.total = res.data.data.total
                  console.log(this.total);
              })

            //获取学校信息列表
            getschool (
                {
                  curPage:1,
                  pageSize:100000
                }
            ).then( res => {
              console.log(res);
              this.school = res.data.data.schools;
            })

          },
          // 分页
          onCurrentChange (curPage) {
            this.curPage = curPage
            this.loadArticles()
          },
          handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.loadArticles()
          },
          //添加
          onPublish () {
            addAdmin ( this.form ).then(res => {
              console.log("上传成功");
              this.loadArticles()
            }).catch(res => {
              console.log("上传失败");
            })
          },
          //改变禁用状态
          changeSwitch (adminId) {
              console.log(adminId);
            deleteAdmin( adminId ).then(
                //删除成功
                res => {
                  this.loadArticles()
                  console.log("更改成功")
                }
            ).catch(
                res => {
                  console.log("更改失败");
                }
            )
          },
          //获取编辑列id
          getId (adminId) {
            this.password.adminId = adminId
            console.log(this.password);
          },
          
          //修改密码
          changePwd () {
            console.log(this.password);
            changeAdminPwd ( this.password ).then(res => {
              this.loadArticles()
              console.log("上传成功");
            }).catch(res => {
              console.log("上传失败");
            })
          }



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
</style>
