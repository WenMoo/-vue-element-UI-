<template>

    <el-menu
            :default-active="$route.path"
            background-color="#002033"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            :collapse="isCollapse"
    >
      <el-submenu index="1" :disabled = 'superValue1'>
        <template slot="title" >
          <i class="el-icon-user"></i>
          <span>超级管理员</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin">
            <i class="iconfont iconneirongziduanguanli"></i>
            <span slot="title">管理员管理</span>
          </el-menu-item>
          <el-menu-item index="/school">
            <i class="iconfont iconneirongziduanguanli"></i>
            <span slot="title">学校管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/order">
        <i class="el-icon-shopping-cart-2"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="/course" >
        <i class="el-icon-notebook-2"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/investigation">
        <i class="el-icon-service"></i>
        <span slot="title">问卷管理</span>
      </el-menu-item>
      <el-menu-item index="/consult">
        <i class="el-icon-tickets"></i>
        <span slot="title">校园资讯</span>
      </el-menu-item>
      <el-menu-item index="/slideshow">
        <i class="el-icon-picture-outline" ></i>
        <span slot="title">轮播图管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user" ></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/complaint" >
        <i class="el-icon-phone-outline" ></i>
        <span slot="title">投诉管理</span>
      </el-menu-item>
      <el-menu-item index="/category" >
        <i class="el-icon-menu" ></i>
        <span slot="title">分类管理</span>
      </el-menu-item>
      <el-menu-item index="/classTime" >
        <i class="el-icon-time" ></i>
        <span slot="title">课程时间</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "AppAside",

        data() {
            return {
              superValue1 : '',
              superValue2 : '',
            }
        },
      created() {
          this.isSuper()
      },
      methods: {

          //从本地仓库获取登录信息，判断是不是超级管理员，用来设置是否能使用
          isSuper() {
            const user = JSON.parse(window.localStorage.getItem('user'));

            const superAdmin = user.admin.isSuper
            console.log("判断是否为超级管理员");
            console.log(superAdmin);
            if(superAdmin=== 1){
              let super1 = true
              this.superValue1 = super1;
              let super2 = false
              this.superValue2 = super2;
            }else{
              let super1 = false
              this.superValue1 = super1;
              let super2 = true
              this.superValue2 = super2;
            }

          }


        },
        //HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写
        // 字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需
        // 要使用其等价的 kebab-case (短横线分隔命名) 命名：
        props: ['is-collapse'],

    }

</script>

<style scoped>
    .iconfont{
        margin-right: 12px;
    }
</style>
