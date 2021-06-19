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
          <el-form-item label="问卷标题" :label-width="formLabelWidth" >
            <el-input   v-model="investigationTitle" autocomplete="off" placeholder="请输入问卷名称"></el-input>
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
                @click="loadInvest(null)"
            >
              查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>



      <el-card class="box-card">
            <div slot="header" class="centre">
                <div>
                  问卷管理
                </div>
                <!-- Form -->
               <div>
                 <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
                 <el-button type="danger" @click="handleDelete()">多行删除</el-button>
               </div>
              

<!--              //添加表单-->
                <el-dialog
                    title="添加问卷"
                    :visible.sync="dialogFormVisible"
                    modal-append-to-body
                    append-to-body
                    :center="true"
                >
                  <el-form :model="addinvestigationDto">
                    <el-form-item label="问卷标题" :label-width="formLabelWidth" >
                      <el-input v-model="addinvestigationDto.investigationTitle" autocomplete="off" placeholder="请输入问卷标题"></el-input>
                    </el-form-item>
                    <el-form-item label="问卷简介" :label-width="formLabelWidth" >
                      <el-input v-model="addinvestigationDto.investigationDescription" autocomplete="off" placeholder="请输入课程地址"></el-input>
                    </el-form-item>
                    <el-form-item label="问卷链接" :label-width="formLabelWidth" >
                      <el-input v-model="addinvestigationDto.investigationHyperlinks" autocomplete="off" placeholder="请输入问卷链接"></el-input>
                    </el-form-item>
                    <el-form-item label="上传二维码" :label-width="formLabelWidth">
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
                    :data="Investdata"
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
                        prop="investigationTitle"
                        label="问卷标题"
                >
                </el-table-column>
              <el-table-column
                  prop="investigationUrl"
                  label="问卷二维码"
              >
                <template slot-scope="scope">
                  <el-image
                      style="width: 100px; height: 100px"
                      :src="scope.row.investigationUrl"
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
                  prop="investigationDescription"
                  label="问卷描述"
              >
              </el-table-column>
              <el-table-column
                  prop="investigationHyperlinks"
                  label="问卷链接"
              >
              </el-table-column>
              <el-table-column
                  label="问卷创建时间"
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
                                    @click="dialogFormVisible2 = true ;
                                    getId(
                                        scope.row.investigationId,
                                        scope.row.investigationDescription ,
                                        scope.row.investigationUrl,
                                        scope.row.investigationTitle ,
                                        scope.row.investigationHyperlinks) "
                                    circle
                                    type="primary"
                                    icon="el-icon-edit"
                            ></el-button>
                          <el-button
                              size="mini"
                              @click="investigationdelete(scope.row.investigationId)"
                              circle
                              type="danger"
                              icon="el-icon-delete"
                          ></el-button>
                        </template>
                </el-table-column>
            </el-table>
<!--          //修改密码的表单-->
          <el-dialog
            title="问卷修改"
            :visible.sync="dialogFormVisible2"
            modal-append-to-body
            append-to-body
            :center="true"
        >
          <el-form :model="investigationDto">
            <el-form-item label="问卷标题" :label-width="formLabelWidth" >
              <el-input v-model="investigationDto.investigationTitle" autocomplete="off" placeholder="请输入问卷标题"></el-input>
            </el-form-item>
            <el-form-item label="问卷简介" :label-width="formLabelWidth" >
              <el-input v-model="investigationDto.investigationDescription" autocomplete="off" placeholder="请输入问卷的简介"></el-input>
            </el-form-item>
            <el-form-item label="问卷链接" :label-width="formLabelWidth" >
              <el-input v-model="investigationDto.investigationHyperlinks" autocomplete="off" placeholder="请输入问卷链接"></el-input>
            </el-form-item>
            <el-form-item label="上传二维码" :label-width="formLabelWidth">
              <el-upload
                  class="upload-demo"
                  action="http://47.97.7.122:8081/shixun/upload/image"
                  :limit = 1
                  :file-list="fileList"
                  :on-success="onSuccess"
                  list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10M</div>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible2 = false ; changeinvestigationDto() ">确 定</el-button>
          </div>
        </el-dialog>
            <!--
            列表分页
            total 用来设定总数据的条数
            它默认为10条每页计算总页码
             page-siza 每页显示条目个数，
            -->
<!--          <el-pagination-->
<!--              background-->
<!--              layout="prev, pager, next"-->
<!--              :total=total-->
<!--              @current-change = "onCurrentChange"-->
<!--          >-->
<!--          </el-pagination>-->


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
  import {InvestList , InvestAdd , InvestChange ,InvestDeletes ,InvestDeleteList} from "../../api/investigation";
    export default {
        name: "investigation",
        data() {
            return {
              Investdata : [] , //获取到的数据
              investigationDto: {
                investigationTitle : '',//修改问卷
                investigationDescription: '',
                investigationId: '',
                investigationUrl: '',
                investigationHyperlinks: ''

          },
              addinvestigationDto: {              //添加问卷
                investigationDescription: '',
                investigationUrl: '',
                investigationHyperlinks: '',
                investigationTitle : '',
                schoolId: '',
          },
              //上传图片
              fileList: [],

              total: 0,
              dialogFormVisible: false, //第一个添加表单
              dialogFormVisible2: false, //第二个修改表单

              formLabelWidth: '120px',

              //批量删除选中id
              selectionList:[],
              //查询
              investigationTitle : '',
              rangeDate : [],

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
        this.loadInvest();

      },
        methods: {

          //获取表单数据
          loadInvest () {
            InvestList({
              curPage:this.curPage,
              pageSize:this.pageSize,
              beginTime : this.rangeDate[0],
              endTime : this.rangeDate[1],
              investigationTitle : this.investigationTitle,
              schoolId : this.schoolId
                }
              ).then( res => {
                  console.log(res);
                  this.Investdata = res.data.data;
                  this.total = res.data.count;

            })

          },
          // 分页
          onCurrentChange (curPage) {
            this.curPage = curPage
            this.loadInvest()
          },
          handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.loadInvest()
          },
          //添加课程
          onPublish () {
            InvestAdd ( this.addinvestigationDto ).then(res => {
              console.log(this.addinvestigationDto);
              console.log("上传成功");
              this.loadInvest()
            }).catch(res => {
              console.log("上传失败");
            })
          },

          //删除课程
          investigationdelete (investigationId) {
            console.log(investigationId);
            this.$confirm('此操作将永久删除该问卷, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              InvestDeletes(investigationId).then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                });
                this.loadInvest()
              })
            }).catch(()=>{
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            })
            },
          //课程改变
          changeinvestigationDto() {
            //还没把该列的添加到表单里一起传给后台
            InvestChange(this.investigationDto).then(res=>{
              console.log('修改成功');
              this.loadInvest()
            }).catch(res =>{
              console.log('修改失败');
            })
          },
          //获取编辑列id
          getId (a,b,c,e,f) {
            this.investigationDto.investigationId = a
            this.investigationDto.investigationDescription = b;
            this.investigationDto.investigationUrl = c;
            this.investigationDto.investigationTitle = e;
            this.investigationDto.investigationHyperlinks= f;
          },

          //上传图片
          addonSuccess(response){  //添加获取上传图片的回调函数的内容
            console.log(response);
            this.addinvestigationDto.investigationUrl = response.data
          },
          onSuccess(response){  //修改获取上传图片的回调函数的内容
            console.log(response);
            this.investigationDto.investigationUrl = response.data
          },


          //批量选择时触发
          handleSelectionChange(selection){
            this.selectionList = []
            selection.forEach(element => {
              this.selectionList.push(element.investigationId)
            });
          },
          //批量删除
          handleDelete() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              InvestDeleteList(this.selectionList).then(res=>{
                console.log(this.selectionList);
                console.log('修改成功');
                this.loadInvest()
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
            this.addinvestigationDto.schoolId = aa;
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
