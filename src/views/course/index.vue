<template>
    <div class="article-container">

      <el-card class="filter-card">
        <div slot="header" class="clearfix">
          <!--        面包屑-->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>课程查询</el-breadcrumb-item>
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


          <el-form-item>

            <el-button
                type="primary"
                @click="loadCourse(null)"
            >
              查询</el-button>
          </el-form-item>
        </el-form>
        <!--        数据筛选块-->
      </el-card>

        <el-card class="box-card">
            <div slot="header" class="centre">
                <div>
                  课程管理
                </div>


                <!-- Form -->
              <div>
                <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
                <el-button type="danger" @click="handleDelete()">多行删除</el-button>
              </div>

              <!--              //添加表单-->
                <el-dialog
                    title="添加课程"
                    :visible.sync="dialogFormVisible"
                    modal-append-to-body
                    append-to-body
                    :center=true
                >
                  <el-form :model="addcourseDto">
                    <el-form-item label="课程名称" :label-width="formLabelWidth" >
                      <el-input v-model="addcourseDto.courseName" autocomplete="off" placeholder="请输入课程名称"></el-input>
                    </el-form-item>
                    <el-form-item label="课程简介" :label-width="formLabelWidth" >
                      <el-input type="textarea" v-model="addcourseDto.courseIntroduction" autocomplete="off" placeholder="请输入课程简介"></el-input>
                    </el-form-item>
                    <el-form-item label="课程价格" :label-width="formLabelWidth" >
                      <el-input v-model="addcourseDto.coursePrice" autocomplete="off" placeholder="请输入课程价格"></el-input>
                    </el-form-item>
                    <el-form-item label="课程详情" :label-width="formLabelWidth" >
                      <el-input v-model="addcourseDto.courseExplainText" autocomplete="off" placeholder="请输入课程详情"></el-input>
                    </el-form-item>
                    <el-form-item label="课程链接" :label-width="formLabelWidth" >
                      <el-input v-model="addcourseDto.courseUrl" autocomplete="off" placeholder="请输入课程链接"></el-input>
                    </el-form-item>
                    <el-form-item label="课程地点" :label-width="formLabelWidth" >
                      <el-input v-model="addcourseDto.classPlace" autocomplete="off" placeholder="请输入课程地点"></el-input>
                    </el-form-item>
                    <el-form-item label="课程时间" :label-width="formLabelWidth" >
                      <el-input v-model="addcourseDto.classDuration" autocomplete="off" placeholder="请输入课程时间"></el-input>
                    </el-form-item>
                    <el-form-item label="课程起始周" :label-width="formLabelWidth" >
                      <el-input v-model="addcourseDto.beginWeek" autocomplete="off" placeholder="请输入课程起始周时间"></el-input>
                    </el-form-item>
                    <el-form-item label="课程结束周" :label-width="formLabelWidth" >
                      <el-input v-model="addcourseDto.endWeek" autocomplete="off" placeholder="请输入课程结束周时间"></el-input>
                    </el-form-item>
                    <el-form-item label="课程分类" :label-width="formLabelWidth">
                      <el-select v-model="addcourseDto.categoryName" placeholder="请选择课程类别">
                        <el-option
                            :value="item.categoryId"
                            :label="item.categoryName"
                            v-for="(item, index) in category"
                            :key="index"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="上传图片" :label-width="formLabelWidth">
                      <el-upload
                          class="upload-demo"
                          action="http://47.97.7.122:8081/shixun/upload/image"
                          :limit = 1
                          :file-list="fileList"
                          :on-success="addonSuccess"
                          list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10M</div>
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
                    :data="coursedata"
                    style="width: 100%"
                    class="list-table"
                    size="small"
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                    border
                    fit
                    highlight-current-row
                    :row-style="{height:'20px'}"
                    :cell-style="{padding:'0px'}"
            >
              <el-table-column
                  type="selection"
              >
              </el-table-column>

              <el-table-column type="expand" label="展开详细" width="80px">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="课程名称:">
                      <span>{{ props.row.courseName }}</span>
                    </el-form-item>
                    <el-form-item label="课程价格:">
                      <span>{{ props.row.coursePrice }}</span>
                    </el-form-item>
                    <el-form-item label="课程分类:">
                      <span>{{ props.row.categoryName }}</span>
                    </el-form-item>
                    <el-form-item label="课程地点:">
                      <span>{{ props.row.classPlace }}</span>
                    </el-form-item>
                    <el-form-item label="课程时间:">
                      <span>{{ props.row.classDuration}}</span>
                    </el-form-item>
                    <el-form-item label="课程周数:">
                      <span>{{ props.row.courseWeeks}}</span>
                    </el-form-item>
                    <el-form-item label="课程链接:">
                      <span>{{ props.row.courseUrl}}</span>
                    </el-form-item>
                    <el-form-item label="课程描述:">
                      <span>{{ props.row.courseIntroduction}}</span>
                    </el-form-item>
                    <el-form-item label="课程详情:">
                      <span>{{ props.row.courseExplainText}}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>

                <el-table-column
                        prop="courseName"
                        label="课程名称"
                >
                </el-table-column>
              <el-table-column
                  prop="courseImage"
                  label="封面"
              >
                <template slot-scope="scope">
                  <el-image
                      style="width: 100px; height: 100px"
                      :src="scope.row.courseImage"
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
                    show-overflow-tooltip="true"
                    prop="courseIntroduction"
                    label="课程描述"
                >
                </el-table-column>
              <el-table-column
                  show-overflow-tooltip="true"
                  prop="courseExplainText"
                  label="课程详情"
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
                                    @click="dialogFormVisible2 = true ;
                                    getId(
                                        scope.row.courseId,
                                        scope.row.courseName ,
                                        scope.row.courseIntroduction,
                                        scope.row.coursePrice ,
                                        scope.row.courseImage ,
                                        scope.row.courseExplainText,
                                        scope.row.courseUrl,
                                        scope.row.classPlace,
                                        scope.row.classDuration,
                                        scope.row.categoryName,
                                        scope.row.beginWeek,
                                        scope.row.endWeek,

                                    ) "
                                    circle
                                    type="primary"
                                    icon="el-icon-edit"
                            ></el-button>
                          <el-button
                              size="mini"
                              @click="coursedelete(scope.row.courseId)"
                              circle
                              type="danger"
                              icon="el-icon-delete"
                          ></el-button>
                        </template>
                </el-table-column>
            </el-table>
<!--          //修改密码的表单-->
          <el-dialog
            title="课程修改"
            :visible.sync="dialogFormVisible2"
            modal-append-to-body
            append-to-body
            :center=true
        >
          <el-form :model="courseDto">
            <el-form-item label="课程名称" :label-width="formLabelWidth" >
              <el-input v-model="courseDto.courseName" autocomplete="off" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item label="课程简介" :label-width="formLabelWidth" >
              <el-input type="textarea" v-model="courseDto.courseIntroduction" autocomplete="off" placeholder="请输入课程简介"></el-input>
            </el-form-item>
            <el-form-item label="课程价格" :label-width="formLabelWidth" >
              <el-input v-model="courseDto.coursePrice" autocomplete="off" placeholder="请输入课程价格"></el-input>
            </el-form-item>
            <el-form-item label="课程详情" :label-width="formLabelWidth" >
              <el-input v-model="courseDto.courseExplainText" autocomplete="off" placeholder="请输入课程详情"></el-input>
            </el-form-item>
            <el-form-item label="课程链接" :label-width="formLabelWidth" >
              <el-input v-model="courseDto.courseUrl" autocomplete="off" placeholder="请输入课程链接"></el-input>
            </el-form-item>
            <el-form-item label="课程地点" :label-width="formLabelWidth" >
              <el-input v-model="courseDto.classPlace" autocomplete="off" placeholder="请输入课程地点"></el-input>
            </el-form-item>
            <el-form-item label="课程时间" :label-width="formLabelWidth" >
              <el-input v-model="courseDto.classDuration" autocomplete="off" placeholder="请输入课程时间"></el-input>
            </el-form-item>
            <el-form-item label="课程起始周" :label-width="formLabelWidth" >
              <el-input v-model="courseDto.beginWeek" autocomplete="off" placeholder="请输入课程起始周时间"></el-input>
            </el-form-item>
            <el-form-item label="课程结束周" :label-width="formLabelWidth" >
              <el-input v-model="courseDto.endWeek" autocomplete="off" placeholder="请输入课程结束周时间"></el-input>
            </el-form-item>
            <el-form-item label="课程分类" :label-width="formLabelWidth">
              <el-select v-model="courseDto.categoryId" placeholder="请选择课程类别">
                <el-option
                    :value="item.categoryId"
                    :label="item.categoryName"
                    v-for="(item, index) in category"
                    :key="index"
                >
                </el-option>
              </el-select>
            </el-form-item>

           <el-form-item label="上传图片" :label-width="formLabelWidth">
             <el-upload
                 class="upload-demo"
                 action="http://47.97.7.122:8081/shixun/upload/image"
                 :file-list="fileList"
                 :limit = 1
                 :on-success="onSuccess"
                 list-type="picture">
               <el-button size="small" type="primary">点击上传</el-button>
               <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10M</div>
             </el-upload>
           </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible2 = false ; changecourseDto() ">确 定</el-button>
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
  import {CourseList , CourseDeletes , CourseChange , CourseAdd ,CourseDeleteList ,getcategory} from "../../api/course";
  import {CategoryList} from "../../api/category";
    export default {
        name: "course",
        data() {
            return {
              coursedata : [] , //获取到的数据
              courseDto: {    ///课程表单
                courseName: '',
                courseImage: '',
                coursePrice: '',
                courseIntroduction: '',
                courseId: '',
                courseExplainText: '',
                courseUrl: '',
                classPlace: '',
                classDuration: '',
                categoryName: '',
                beginWeek: '',
                endWeek: '',
                categoryId: '',

              } ,
              addcourseDto: {    ///添加课程表单
                courseName: '',
                courseImage: '',
                coursePrice: '',
                courseIntroduction: '',
                courseExplainText: '',
                courseUrl: '',
                classPlace: '',
                schoolId: '',
                classDuration: '',
                categoryName: '',
                beginWeek: '',
                endWeek: '',
                //分类/学校id
              } ,
              //上传图片
                fileList: [],
                courseName : '' ,
                 total: 0,

              dialogFormVisible: false, //第一个添加表单
              dialogFormVisible2: false, //第二个修改表单


              formLabelWidth: '120px',
              //本地获取到的管理员学校id
              schoolId : '',

              //批量删除选中id
              selectionList:[],

              //分页
              curPage : 1,
              pageSize : 5,
              //课程列表
              category: [],
            }
          },
      created() {
        this.adminSchoolLocal()
      },
      beforeMount() {
        this.loadCourse()
      },
        methods: {

          //获取表单数据
          loadCourse (curPage = 1) {

              CourseList(
                  {
                    curPage:this.curPage,
                    pageSize:this.pageSize,
                    courseName : this.courseName,
                    schoolId : this.schoolId
                  }
              ).then( res => {
                  this.coursedata = res.data.data;
                  this.total = res.data.count;
              })


            getcategory(this.schoolId).then( res => {
              console.log(res);
              this.category = res.data.data;
              console.log(this.category);
            })

          },
          // 分页
          onCurrentChange (curPage) {
            this.curPage = curPage
            this.loadCourse()
          },
          handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.loadCourse()
          },
          //添加课程
          onPublish () {
            console.log(this.addcourseDto);
            CourseAdd ( this.addcourseDto ).then(res => {
              console.log("上传成功");
              console.log(this.fileList);
              this.loadCourse()
            }).catch(res => {
              console.log("上传失败");
            })
          },

          //删除课程
          coursedelete (courseId) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              CourseDeletes(courseId).then(
                  //删除成功
                  res => {
                    console.log("更改成功")
                    this.loadCourse()
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
          //课程修变
          changecourseDto() {
            //还没把该列的添加到表单里一起传给后台
            CourseChange(this.courseDto).then(res=>{
              this.loadCourse()
            }).catch(res =>{

            })
          },
          //获取编辑列id
          getId (a,b,c,d,e,f,g,h,i,j,k,l) {
            this.courseDto.courseId = a;
            this.courseDto.courseName = b;
            this.courseDto.courseIntroduction = c;
            this.courseDto.coursePrice = d;
            this.courseDto.courseImage = e;
            this.courseDto.courseExplainText = f;
            this.courseDto.courseUrl = g;
            this.courseDto.classPlace= h;
            this.courseDto.classDuration= i;
            this.courseDto.categoryName= j;
            this.courseDto.beginWeek= k;
            this.courseDto.endWeek= l;

          },
          //上传图片
          addonSuccess(response){  //添加获取上传图片的回调函数的内容
            this.addcourseDto.courseImage = response.data
          },
          onSuccess(response){  //修改获取上传图片的回调函数的内容
            this.courseDto.courseImage = response.data
          },


          //批量选择时触发
          handleSelectionChange(selection){
            this.selectionList = []
            selection.forEach(element => {
              this.selectionList.push(element.courseId)
            });
          },
          //多行删除
          handleDelete() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              CourseDeleteList(this.selectionList).then(res=>{
                console.log(this.selectionList);
                console.log('修改成功');
                this.loadCourse()
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
            this.addcourseDto.schoolId = aa;
            this.schoolId = aa;

          },

        }

    }
</script>

<style scoped>
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 100%;
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
<style lang="css">
.el-tooltip__popper{font-size: 14px; max-width:30% }
</style>
