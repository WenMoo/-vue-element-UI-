<template>
    <div class="article-container">

      <el-card class="filter-card">
        <div slot="header" class="clearfix">
          <!--        面包屑-->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>学校查询</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--        数据筛选块-->
        <el-form
            label-width="80px"
            size="small"
        >
          <el-form-item label="学校名称" :label-width="formLabelWidth" >
            <el-input   v-model="schoolName" autocomplete="off" placeholder="请输入学校名称"></el-input>
          </el-form-item>


          <el-form-item>

            <el-button
                type="primary"
                @click="loadSchool(null)"
            >
              查询</el-button>
          </el-form-item>
        </el-form>
        <!--        数据筛选块-->
      </el-card>

        <el-card class="box-card">
            <div slot="header" class="centre">
                <div>
                  学校管理
                </div>


                <!-- Form -->
                <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
<!--              //添加表单-->
                <el-dialog
                    title="添加学校"
                    :visible.sync="dialogFormVisible"
                    modal-append-to-body
                    append-to-body
                    :center="true"
                >
                  <el-form :model="addschoolDto">
                    <!--            <el-form-item label="原密码" :label-width="formLabelWidth" >-->
                    <!--              <el-input v-model="password.oldPwd" autocomplete="off" placeholder="请输入原来的密码（默认123456）"></el-input>-->
                    <!--            </el-form-item>-->
                    <el-form-item label="学校名称" :label-width="formLabelWidth" >
                      <el-input v-model="addschoolDto.schoolName" autocomplete="off" placeholder="请输入学校名称"></el-input>
                    </el-form-item>
                    <el-form-item label="学校描述" :label-width="formLabelWidth" >
                      <el-input v-model="addschoolDto.schoolIntroduction" autocomplete="off" placeholder="请输入学校描述"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" :label-width="formLabelWidth">
                      <el-upload
                          class="upload-demo"
                          action="http://47.97.7.122:8081/shixun/upload/image"
                          :file-list="fileList"
                          :on-success="addonSuccess"
                          list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false ; onPublish() ">确 定</el-button>
                  </div>
                </el-dialog>

              </div>

            <el-table
                    :data="Schooldata"
                    style="width: 100%"
                    class="list-table"
                    size="small"
                    fit
                    highlight-current-row
            >
                <el-table-column
                        prop="schoolName"
                        label="学校名称"
                >
                </el-table-column>
              <el-table-column
                  prop="schoolImage"
                  label="学校封面"
                  width="180">
                <template slot-scope="scope">
                  <el-image
                      style="width: 100px; height: 100px"
                      :src="scope.row.schoolImage"
                      fit="cover"
                      lazy
                  >
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image>
                </template>
              </el-table-column>
                <el-table-column
                    prop="schoolIntroduction"
                    label="学校描述"
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
                                    @click="dialogFormVisible2 = true ; getId(scope.row.schoolId ,scope.row.schoolName , scope.row.schoolIntroduction ,scope.row.schoolImage) "
                                    circle
                                    type="primary"
                                    icon="el-icon-edit"
                            ></el-button>
                          <el-button
                              size="mini"
                              @click="schooldelete(scope.row.schoolId)"
                              circle
                              type="danger"
                              icon="el-icon-delete"
                          ></el-button>
                        </template>
                </el-table-column>
            </el-table>
<!--          //修改密码的表单-->
          <el-dialog
            title="学校修改"
            :visible.sync="dialogFormVisible2"
            modal-append-to-body
            append-to-body
            :center="true"
        >
          <el-form :model="schoolDto">
            <el-form-item label="学校名称" :label-width="formLabelWidth" >
              <el-input v-model="schoolDto.schoolName" autocomplete="off" placeholder="请输入课程价格"></el-input>
            </el-form-item>
            <el-form-item label="学校描述" :label-width="formLabelWidth" >
              <el-input v-model="schoolDto.schoolIntroduction" autocomplete="off" placeholder="请输入课程地址"></el-input>
            </el-form-item>
            <el-form-item label="上传图片" :label-width="formLabelWidth">
              <el-upload
                  class="upload-demo"
                  action="http://47.97.7.122:8081/shixun/upload/image"
                  :file-list="fileList"
                  :on-success="onSuccess"
                  list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible2 = false ; changeschoolDto() ">确 定</el-button>
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
  import {SchoolAdd,SchoolChange,SchoolDeletes,SchoolList} from "../../api/school";
    export default {
        name: "school",
        data() {
            return {
              Schooldata : [] , //获取到的数据

              schoolDto: {    ///课程表单
                schoolIntroduction: '',
                schoolName: '',
                schoolId: '',
                schoolImage: ''
              } ,
              addschoolDto: {
                schoolIntroduction: '',
                schoolName: '',
                schoolImage: ''
              },
              schoolName: '',
              //上传图片
              fileList: [],
              total: 0,


              dialogFormVisible: false, //第一个添加表单
              dialogFormVisible2: false, //第二个修改表单


              formLabelWidth: '120px',

              //分页
              curPage : 1,
              pageSize : 5,

            }
          },
        created() {
          this.loadSchool()

        },
        methods: {

          //获取表单数据
          loadSchool (curPage = 1) {
              //z展示加载中的 loading

            SchoolList(
                  {
                    curPage:this.curPage,
                    pageSize:this.pageSize,
                    schoolName: this.schoolName,
                  }
              ).then( res => {
                  console.log(res);
                  console.log(curPage);
                  this.Schooldata = res.data.data.schools;
                  this.total = res.data.data.total;
              })

          },
          // 分页
          onCurrentChange (curPage) {
            this.curPage = curPage
            this.loadSchool()
          },
          handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.loadSchool()
          },
          //添加课程
          onPublish () {
            SchoolAdd ( this.addschoolDto ).then(res => {
              console.log("上传成功");
              this.loadSchool()
            }).catch(res => {
              console.log("上传失败");
            })
          },

          //删除课程
          schooldelete (schoolId) {
            this.$confirm('此操作将永久删除该学校, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              SchoolDeletes(schoolId).then(
                  //删除成功
                  res => {
                    console.log("更改成功")
                    this.loadSchool()
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
          changeschoolDto() {
            //还没把该列的添加到表单里一起传给后台
            SchoolChange(this.schoolDto).then(res=>{
              this.loadSchool()
            }).catch(res =>{
            })
          },

          getId (a,b,c,d) {
            this.schoolDto.schoolId = a;
            this.schoolDto.schoolName = b;
            this.schoolDto.schoolIntroduction = c;
            this.schoolDto.schoolImage = d;
          },


          //上传图片
          addonSuccess(response){  //添加获取上传图片的回调函数的内容
            this.addschoolDto.schoolImage = response.data
          },
          onSuccess(response){  //修改获取上传图片的回调函数的内容
            this.schoolDto.schoolImage = response.data
            console.log( this.schoolDto.schoolImage);
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
    .filter-card{
      margin-bottom: 30px;
    }
    .list-table{
      margin-bottom: 20px;
    }
</style>
