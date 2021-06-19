<template>
    <div >
        <el-container class="layout-container">
            <el-aside class="aside" width="auto">
<!--            <AppAside /> 这种写法或下面的写法-->
                <app-aside
                        class="aside-menu"
                        :is-collapse ='isCollapse'
                />
            </el-aside>
            <el-container>
                <el-header class="header">
                   <div>
                       <i
                           style="margin-right: 10px"
                           :class="{
                            'el-icon-s-fold': isCollapse,
                            'el-icon-s-unfold': !isCollapse,
                           }"
                           @click="isCollapse = !isCollapse"
                       ></i>
                       <span>棵唯后台管理系统</span>

                   </div>
<!--                  普通管理员时显示学校名-->
                    <div class="school"  >{{schoolName}}</div>
<!--                  超级管理员时，选择不同的学校来展示数据-->
<!--                  <el-button type="text" @click="table = true">选择学校</el-button>-->
                  <el-drawer
                      title="选择你要管理的学校!"
                      :visible.sync="table"
                      direction="rtl"
                      size="250"
                      modal-append-to-body
                      append-to-body
                      show-close
                      close-on-press-escape
                  >
                    <el-select
                        v-model="form.adminSchool"
                        placeholder="请选择学校"
                        size="200"
                        style="margin:0px 20px 0px 20px"
                        @change="handleCommand($event)"
                    >
                      <el-option
                          size="200"
                          :value="item.schoolId"
                          :label="item.schoolName"
                          v-for="(item, index) in school"
                          :key="index"
                      >
                      </el-option>
                    </el-select>
                  </el-drawer>


                      <el-dropdown>
                        <div class="avatar-warp">
<!--                            <img src="user.photo" alt="">-->
                            <span>{{user.name}}</span>
                            <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                        </div>
<!--                      <span class="el-dropdown-link">-->
<!--                        下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--                      </span>-->
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                                icon="el-icon-plus"
                                @click.native="table = true"
                                :class="[ `${schoolName}` === '' ? 'selsetSchool2' : 'selsetSchool1' ]"
                            >选择学校</el-dropdown-item>
                            <el-dropdown-item
                                    icon="el-icon-circle-plus"
                                    @click.native="onLogout"
                            >退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <el-main class="main">

                    <!--子路由出口-->
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

    import AppAside from '@/views/layout/components/aside'

    import {getschool} from "../../api/admin";
    export default {
        name: "LayoutIndex",
        data () {
            return {
                user: {},//当前用户登录信息
                isCollapse: false,//侧边展开栏的控制按键
                schoolName: '',
                school: [], //从接口获取到的学校列表

                form: {   //获取到的超级管理员选择到的学校
                  adminSchool: null,
                },
              userMassage : {},
              table: false,
              dialog: false,
              loading: false,
            }
        },
        //导入组件
        components: {
            AppAside
        },
      beforeMount() {
        this.adminSchoolLocal()
      },

      methods: {

          //处理登录退出的功能
            onLogout () {
                this.$confirm('确认退出登录吗, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //把用户的登录状态清除
                    window.localStorage.removeItem('user')
                    // 跳转到登录页面
                    // console.log('让爷走！！')
                    this.$router.push('/login')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出登录'
                    })
                })

            },
            //获取学校名称
          //从本地获取到管理员的所属学校
          adminSchoolLocal() {
            const user = JSON.parse(window.localStorage.getItem('user'));
            const superAdmin = user.admin.isSuper
            console.log("判断是否为超级管理员");
            console.log(superAdmin);
            if(superAdmin === 1){
              const aa = user.admin.schoolName
              this.schoolName = aa;
              console.log("adminSchoolasdgasdgas");
              console.log(this.schoolName);
            }else{
              // document.getElementById("selsetSchoolId").classList.remove(".selsetSchool");
            }
            //获取学校信息列表
            getschool (
                {
                  curPage:1,
                  pageSize:100000
                }
            ).then( res => {
              console.log("获取学校",res);
              this.school = res.data.data.schools;
            })


          },
            //获取到选择学校的ID
          handleCommand(response) {
            console.log(response);
            //获取到之前的user并且还原为json，暂存到userMassage（userMassage创建在data里面）
            this.userMassage = JSON.parse(window.localStorage.getItem('user'));
            console.log(this.userMassage);
            //修改我要修改的adminSchool
            this.userMassage.admin.adminSchool = response;
            //把更新好的user，变为字符串形式
            let user = JSON.stringify(this.userMassage)
            //把user保存到localhost，因为与之前的同名，会覆盖之前的
            window.localStorage.setItem("user" , user)
            //刷新当前页面
            this.$router.go(0)
          }

        }
    }

</script>

<style scoped>
    .layout-container{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: aliceblue;
    }
    .aside{
        background-color: bisque;
    }
    .aside-menu {
        height: 100%;
    }
    .header{
        /*background-color: aquamarine;*/
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
    }
    .main{
        /*background-color: aqua;*/
    }
    .avatar-warp{
        display: flex;
        align-items: center;
    }
    .avatar-warp img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-right: 12px;
        /*box-shadow: 1px 1px 0.5px #888888;*/
    }
    .header{
        background-color: white;
    }
    .selsetSchool1{
      display: none;
    }
    .selsetSchool2{
      display: inline;
    }
</style>
