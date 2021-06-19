<template>
    <div class="login-container">
        <el-form

                class="login-form"
                ref="form"
                :model="admin"

        >
            <el-form-item class="login-head">
                <h2>棵唯后台管理系统</h2>
            </el-form-item>
            <el-form-item  label="账户" label-width="50px">
                <el-input
                        v-model="admin.adminId"
                        placeholder="请输入账号"
                ></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="50px">
                <el-input
                    type="password"
                        v-model="admin.adminPwd"
                        placeholder="请输入密码"
                ></el-input>
            </el-form-item>
            <el-form-item  label-width="80px">
                <el-button

                        type="primary"
                        @click="onSubmit"
                        style="width: 60%"
                        :loading="loginLoading"
                >登录</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>


<script>

    import {login} from "../../api/user";
    // import qs from 'qs'
    export default {
        name: "loginIndex",//组件的name便于调试，有更友好的警告信息，在vue中，没命名的会显示为<AnonymouseComponent>
        data() {
            return {
                admin: {
                    adminId: '13911111111',//手机号
                    adminPwd: '123456',//验证码
                },
                loginLoading: false,//登录的 loding 状态
            }
        },
        methods: {
            onSubmit() {
                const admin = this.admin
                this.login()
            },
            //对于代码中的请求操作
            //1.接口可能需要重用
            //2.实际工作中，接口非常容易变动，改起来麻烦
            //所以建议把所有的请求都封装为函数或同一组组到模块中进行管理,所以这里统一到api中进行管理
            login() {
                //验证通过，提交登录
                //开启登录中，防止当网络慢时，用户多次点击造成多次弹出提示框
                this.loginLoading = true

                login(this.admin).then(res => {
                  //关闭loading
                  console.log(res)
                  this.loginLoading = false

                  let code = res.data.status
                  let Super = res.data.data.admin.isSuper//判断是否为超级管理员
                  
                  console.log(code);

                  
                  if(code == 200) {
                    //  成功：XXX
                    this.$message({
                      showClose: true,
                      message: '登录成功',
                      type: 'success'
                    });
                    window.localStorage.setItem('user',JSON.stringify( res.data.data))//保存登录人的信息到本地
                    this.$router.push({
                      name: 'admin'
                    })
                    //如果是超级管理员就进入超级管理员页面
                    if(Super == 0) {
                      console.log("是超级管理员");
                      this.$router.push({
                        name: 'admin'
                      })
                    }else {
                      console.log("不是超级管理员");
                      this.$router.push({
                        name: 'order'
                      })
                    }

                  }else {
                    // console.log('登录失败')
                    // this.$message({
                    //   showClose: true,
                    //   message: '登录失败，账号或密码错误',
                    //   type: 'error',
                    // });

                    this.loginLoading = false//关闭loading
                  }
                }).catch(err => {//  失败：XXX
                console.log("登录失败" + err);

                  console.log('登录失败')
                  this.$message({
                    showClose: true,
                    message: '登录失败，账号或密码错误',
                    type: 'error',
                  });
                })
            }
        }


    }
</script>

<style scoped >
    .login-head{
        text-align: center;
    }
    .login-container {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("login_background.png") no-repeat ;
        background-size: cover;
    }
    .login-form{
        border-radius: 20px;
        background-color: white;
        padding: 10px 50px 30px 50px;
        min-width: 300px;
    }
</style>
