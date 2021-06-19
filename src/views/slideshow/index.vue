<template>
  <div class="article-container">

    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>轮播图查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--        数据筛选块-->
      <el-form
          label-width="80px"
          size="small"
      >
        <el-form-item label="轮播图名称" :label-width="formLabelWidth" >
          <el-input   v-model="slideshowName" autocomplete="off" placeholder="请输入轮播图名称"></el-input>
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
              @click="loadSlideshow()"
          >
            查询</el-button>
        </el-form-item>
      </el-form>
      <!--        数据筛选块-->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="centre">
        <div>
          轮播图管理
        </div>


        <!-- Form -->
        <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
        <!--              //添加表单-->
        <el-dialog
            title="添加轮播图"
            :visible.sync="dialogFormVisible"
            modal-append-to-body
            append-to-body
            :center=true
        >
          <el-form :model="addslideshowDto">
            <el-form-item label="轮播图名称" :label-width="formLabelWidth" >
              <el-input v-model="addslideshowDto.slideshowName" autocomplete="off" placeholder="请输入轮播图名称"></el-input>
            </el-form-item>
            <el-form-item label="轮播图简介" :label-width="formLabelWidth" >
              <el-input type="textarea" v-model="addslideshowDto.slideshowDescription" autocomplete="off" placeholder="请输入轮播图简介"></el-input>
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
          :data="slideshowdata"
          style="width: 100%"
          class="list-table"
          size="small"
          fit
          highlight-current-row
      >
        <el-table-column
            prop="slideshowName"
            label="轮播图名称"
        >
        </el-table-column>
        <el-table-column
            prop="schoolImage"
            label="轮播图"
        >
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
            prop="slideshowDescription"
            label="轮播图描述"
        >
        </el-table-column>
        <el-table-column
            label="是否启用"
        >
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.isDeleted"
                :active-value="0"
                :inactive-value="1"
                active-color="#ff4949"
                inactive-color="#13ce66"
                @change="changeSwitch(scope.row.slideshowId)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="创建时间"
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
                                        scope.row.slideshowId,
                                        scope.row.slideshowName ,
                                        scope.row.slideshowDescription,
                                        scope.row.schoolImage ,
                                    ) "
                circle
                type="primary"
                icon="el-icon-edit"
            ></el-button>
            <el-button
                size="mini"
                @click="slideshowdelete(scope.row.slideshowId)"
                circle
                type="danger"
                icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--          //修改密码的表单-->
      <el-dialog
          title="轮播图修改"
          :visible.sync="dialogFormVisible2"
          modal-append-to-body
          append-to-body
          :center=true
      >
        <el-form :model="slideshowDto">
          <el-form-item label="轮播图名称" :label-width="formLabelWidth" >
            <el-input v-model="slideshowDto.slideshowName" autocomplete="off" placeholder="请输入轮播图名称"></el-input>
          </el-form-item>
          <el-form-item label="轮播图简介" :label-width="formLabelWidth" >
            <el-input type="textarea" v-model="slideshowDto.slideshowDescription" autocomplete="off" placeholder="请输入轮播图简介"></el-input>
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
          <el-button type="primary" @click="dialogFormVisible2 = false ; changeSlideshowDto() ">确 定</el-button>
        </div>
      </el-dialog>
      <el-pagination
          background
          layout="prev, pager, next"
          :total= total
          @current-change = "onCurrentChange"
      >
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
import {SlideshowList , SlideshowAdd  ,SlideshowChange ,SlideshowDeletes , IfSlideshow} from "../../api/slideshow";
import {deleteAdmin} from "../../api/admin";
export default {
  name: "course",
  data() {
    return {
      slideshowdata : [] , //获取到的数据

      slideshowDto: {    ///课程表单
        slideshowName : '',
        schoolImage : '',
        slideshowDescription : '',
        slideshowId : '',
        schoolId : '',
      } ,
      addslideshowDto: {    ///添加课程表单
        slideshowName : '',
        schoolImage : '',
        slideshowDescription : '',
        schoolId : '',

      } ,
      //上传图片
      fileList: [],
      courseName : '' ,
      total: 0,

      dialogFormVisible: false, //第一个添加表单
      dialogFormVisible2: false, //第二个修改表单
      //本地获取到的管理员学校id
      schoolId : '',

      //查询的
      rangeDate: [],
      slideshowName : '',
      formLabelWidth: '120px',
    }
  },
  created() {
    this.adminSchoolLocal()
  },
  beforeMount() {
    this.loadSlideshow()
  },
  methods: {

    //获取表单数据
    loadSlideshow () {
      SlideshowList(
          {
            schoolId : this.schoolId,
            slideshowName : this.slideshowName,
            beginTime : this.rangeDate[0],
            endTime : this.rangeDate[1]
          }
      ).then( res => {
        console.log(res);
        this.slideshowdata = res.data.data;
      })

    },
    // 分页
    onCurrentChange (curPage) {
      this.loadCourse(curPage)
    },
    //添加课程
    onPublish () {
      console.log(this.addslideshowDto);
      SlideshowAdd ( this.addslideshowDto ).then(res => {
        console.log("上传成功");
        console.log(this.fileList);
        this.loadSlideshow()
      }).catch(res => {
        console.log("上传失败");
      })
    },

    //删除课程
    slideshowdelete (slideshowId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        SlideshowDeletes(
            slideshowId
        ).then(
            //删除成功
            res => {
              console.log("更改成功")
              this.loadSlideshow()
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
    changeSlideshowDto() {
      //还没把该列的添加到表单里一起传给后台
      SlideshowChange(this.slideshowDto).then(res=>{
        console.log(this.slideshowDto);
        this.loadSlideshow()
      }).catch(res =>{

      })
    },
    //获取编辑列id
    getId (a,b,c,d) {
      this.slideshowDto.slideshowId = a;
      this.slideshowDto.slideshowName = b;
      this.slideshowDto.slideshowDescription = c;
      this.slideshowDto.schoolImage = d;

    },
    //上传图片
    addonSuccess(response){  //添加获取上传图片的回调函数的内容
      this.addslideshowDto.schoolImage = response.data
    },
    onSuccess(response){  //修改获取上传图片的回调函数的内容
      this.slideshowDto.schoolImage = response.data
    },

    //从本地获取到管理员的所属学校
    adminSchoolLocal() {
      const user = JSON.parse(window.localStorage.getItem('user'));
      const aa = user.admin.adminSchool
      this.addslideshowDto.schoolId = aa;
      this.slideshowDto.schoolId = aa;
      this.schoolId = aa;
    },

    //改变禁用状态
    changeSwitch (slideshowId) {
      console.log( slideshowId);
      IfSlideshow(
          {
            slideshowId : slideshowId
          }
           ).then(
          //删除成功
          res => {
            console.log("更改成功")
          }
      ).catch(
          res => {
            console.log("更改失败");
          }
      )
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
