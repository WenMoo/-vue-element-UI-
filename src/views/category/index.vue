<template>
  <div class="article-container">

    <el-card class="box-card">
      <div slot="header" class="centre">
        <div>
          分类管理
        </div>


        <!-- Form -->
        <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
        <!--              //添加表单-->
        <el-dialog
            title="添加新类别"
            :visible.sync="dialogFormVisible"
            modal-append-to-body
            append-to-body
            :center=true
        >
          <el-form :model="addcategoryDto">
            <el-form-item label="类别名称" :label-width="formLabelWidth" >
              <el-input v-model="addcategoryDto.categoryName" autocomplete="off" placeholder="请输入类别名称"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false ; onPublish() ">确 定</el-button>
          </div>
        </el-dialog>

      </div>

      <el-table
          :data="categorydata"
          style="width: 100%"
          class="list-table"
          size="small"
          border
          fit
          highlight-current-row
      >
        <el-table-column
            prop="categoryName"
            label="类别名称"
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
                    scope.row.categoryId,
                    scope.row.categoryName ,
                ) "
                circle
                type="primary"
                icon="el-icon-edit"
            ></el-button>
            <el-button
                size="mini"
                @click="Categorydelete(scope.row.categoryId)"
                circle
                type="danger"
                icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--          //修改密码的表单-->
      <el-dialog
          title="类别修改"
          :visible.sync="dialogFormVisible2"
          modal-append-to-body
          append-to-body
          :center=true
      >
        <el-form :model="categoryDto">
          <el-form-item label="类别名称" :label-width="formLabelWidth" >
            <el-input v-model="categoryDto.categoryName" autocomplete="off" placeholder="请输入类别名称"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible2 = false ; changeCategoryhowDto() ">确 定</el-button>
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
import {CategoryList,CategoryDeletes,CategoryChange,CategoryAdd,} from "../../api/category";
export default {
  name: "course",
  data() {
    return {
      categorydata : [] , //获取到的数据

      categoryDto: {    ///课程表单
        categoryName: '',
        schoolId : '',
      } ,
      addcategoryDto: {    ///添加课程表单
        categoryName: '',
        schoolId : '',

      } ,
      total: 0,

      dialogFormVisible: false, //第一个添加表单
      dialogFormVisible2: false, //第二个修改表单
      //本地获取到的管理员学校id
      schoolId : '',

      formLabelWidth: '120px',
    }
  },
  created() {
    this.adminSchoolLocal()
  },
  beforeMount() {
    this.loadCategoryshow()
  },
  methods: {

    //获取表单数据
    loadCategoryshow () {
      CategoryList().then( res => {
        console.log(6666,res);
        this.categorydata = res.data.data;
      })

    },
    // 分页
    onCurrentChange (curPage) {
      this.loadCategoryshow()
    },
    //添加课程
    onPublish () {
      console.log(this.addcategoryDto);
      CategoryAdd ( this.addcategoryDto ).then(res => {
        console.log("上传成功");
        console.log(this.fileList);
        this.loadCategoryshow()
      }).catch(res => {
        console.log("上传失败");
      })
    },

    //删除课程
    Categorydelete (categoryId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        CategoryDeletes(
            categoryId
        ).then(
            //删除成功
            res => {
              console.log("更改成功")
              this.loadCategoryshow()
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
    changeCategoryhowDto() {
      //还没把该列的添加到表单里一起传给后台
      CategoryChange(this.categoryDto).then(res=>{
        console.log(this.categoryDto);
        this.loadCategoryshow()
      }).catch(res =>{})
    },
    //获取编辑列id
    getId (a,b) {
      this.categoryDto.categoryId = a;
      this.categoryDto.categoryName = b;
    },

    //从本地获取到管理员的所属学校
    adminSchoolLocal() {
      const user = JSON.parse(window.localStorage.getItem('user'));
      const aa = user.admin.adminSchool
      this.categoryDto.schoolId = aa;
      this.addcategoryDto.schoolId = aa;
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
