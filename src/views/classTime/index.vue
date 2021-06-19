<template>
  <div class="article-container">

    <el-card class="box-card">
      <div slot="header" class="centre">
        <div>
          课程上课时间管理
        </div>


        <!-- Form -->
        <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
        <!--              //添加表单-->
        <el-dialog
            title="添加课程上课时间"
            :visible.sync="dialogFormVisible"
            modal-append-to-body
            append-to-body
            :center=true
        >
          <el-form :model="addclassTimeDto">
            <el-form-item label="添加课程" :label-width="formLabelWidth">
              <el-select v-model="addclassTimeDto.courseId" placeholder="请选择课程">
                <el-option
                    :value="item.courseId"
                    :label="item.courseName"
                    v-for="(item, index) in coursedata"
                    :key="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上课星期" :label-width="formLabelWidth" >
              <el-select v-model="addclassTimeDto.classWeek" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上课时间" :label-width="formLabelWidth" >
              <el-time-picker
                  v-model="addclassTimeDto.classTime"
                  format='HH:mm:ss'
                  value-format='HH:mm:ss'
                  placeholder="任意时间点">
              </el-time-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false ; onPublish() ">确 定</el-button>
          </div>
        </el-dialog>

      </div>



      <el-table
          :data="classTimedata"
          style="width: 100%;margin-bottom: 20px;"
          class="list-table"
          size="small"
          row-key="id"
          border
          fit
          highlight-current-row
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
            prop="courseName"
            label="课程名称"
        >
        </el-table-column>

        <el-table-column
            label="星期"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.classWeek === '1'">
              星期一
            </div>
            <div v-if="scope.row.classWeek === '2'">
              星期二
            </div>
            <div v-if="scope.row.classWeek === '3'">
              星期三
            </div>
            <div v-if="scope.row.classWeek === '4'">
              星期四
            </div>
            <div v-if="scope.row.classWeek === '5'">
              星期五
            </div>
            <div v-if="scope.row.classWeek === '6'">
              星期六
            </div>
            <div v-if="scope.row.classWeek === '7'">
              星期日
            </div>

          </template>
        </el-table-column>

        <el-table-column
            prop="classTime"
            label="上课时间"
        >
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
                    scope.row.id,
                    scope.row.classWeek,
                    scope.row.classTime,

                ) "
                circle
                type="primary"
                icon="el-icon-edit"
            ></el-button>
            <el-button
                size="mini"
                @click="classTimedelete(scope.row.id)"
                circle
                type="danger"
                icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--          //修改密码的表单-->
      <el-dialog
          title="上课时间修改"
          :visible.sync="dialogFormVisible2"
          modal-append-to-body
          append-to-body
          :center=true
      >
        <el-form :model="classTimeDto">
          <el-form-item label="上课星期" :label-width="formLabelWidth" >
            <el-select v-model="classTimeDto.classWeek" placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上课时间" :label-width="formLabelWidth" >
            <el-time-picker
                v-model="classTimeDto.classTime"
                format='HH:mm:ss'
                value-format='HH:mm:ss'
                placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible2 = false ; changeclassTimehowDto() ">确 定</el-button>
        </div>
      </el-dialog>


<!--      <el-pagination-->
<!--          background-->
<!--          layout="prev, pager, next"-->
<!--          :total= total-->
<!--          @current-change = "onCurrentChange"-->
<!--      >-->
<!--      </el-pagination>-->

    </el-card>
  </div>
</template>

<script>
import {ClassTimeList,ClassTimeDeletes,ClassTimeChange,ClassTimeAdd,} from "../../api/classTime";
import {CourseList} from "../../api/course";
export default {
  name: "course",
  data() {
    return {
      classTimedata : [] , //获取到的数据
      coursedata : [],
      classTimeDto: {    ///课程表单
        classWeek: '',
        classTime : '',
        id: '',
      } ,
      addclassTimeDto: {    ///添加课程表单
        classWeek: '',
        classTime : '',
        courseId: '',
      } ,
      total: 0,

      dialogFormVisible: false, //第一个添加表单
      dialogFormVisible2: false, //第二个修改表单
      //本地获取到的管理员学校id
      schoolId : '',

      formLabelWidth: '120px',

      options: [{
        value: '1',
        label: '星期一'
      }, {
        value: '2',
        label: '星期二'
      }, {
        value: '3',
        label: '星期三'
      }, {
        value: '4',
        label: '星期四'
      }, {
        value: '5',
        label: '星期五'
      },{
          value: '6',
          label: '星期六'
      },{
          value: '7',
          label: '星期日'
        }],
    }
  },
  created() {
    this.adminSchoolLocal()
  },
  beforeMount() {
    this.loadClassTimeshow()
  },
  methods: {

    //获取表单数据
    loadClassTimeshow () {
      ClassTimeList(
          {
            curPage : 1,
            pageSize : 1000,
            schoolId : this.schoolId,

          }
      ).then( res => {
        console.log(res);
        this.classTimedata = res.data.data;
      })
      //获取课程列表
      CourseList(
          {
            schoolId : this.schoolId
          }
      ).then( res => {
        this.coursedata = res.data.data;
      })

    },
    // 分页
    onCurrentChange (curPage) {
      this.loadClassTimeshow()
    },
    //添加课程
    onPublish () {
      console.log(this.addclassTimeDto);
      ClassTimeAdd ( this.addclassTimeDto ).then(res => {
        console.log("上传成功");
        console.log(this.fileList);
        this.loadClassTimeshow()
      }).catch(res => {
        console.log("上传失败");
      })
    },

    //删除课程
    classTimedelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ClassTimeDeletes(
            id
        ).then(
            //删除成功
            res => {
              console.log("更改成功")
              this.loadClassTimeshow()
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
    changeclassTimehowDto() {
      //还没把该列的添加到表单里一起传给后台
      ClassTimeChange(this.classTimeDto).then(res=>{
        console.log(this.classTimeDto);
        this.loadClassTimeshow()
      }).catch(res =>{})
    },
    //获取编辑列id
    getId (a,b,d) {
      this.classTimeDto.id = a;
      this.classTimeDto.classWeek = b;
      this.classTimeDto.classTime = d;
    },

    //从本地获取到管理员的所属学校
    adminSchoolLocal() {
      const user = JSON.parse(window.localStorage.getItem('user'));
      const aa = user.admin.adminSchool
      this.classTimeDto.schoolId = aa;
      this.addclassTimeDto.schoolId = aa;
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
