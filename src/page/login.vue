<template>
      <div class="login_page fillcontain">
          <transition name="form-fade" mode="in-out">
              <section class="form_contianer" v-show="showLogin">
                  <div class="manage_tip">
                      <p>elm后台管理系统</p>
                  </div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
                      </el-form-item>
                </el-form>
                <p class="tip">温馨提示：</p>
                <p class="tip">未登录过的新用户，自动注册</p>
                <p class="tip">注册过的用户可凭账号密码登录</p>
              </section>
          </transition>
      </div>
</template>

<script>
    // 引入 请求函数
    import {login, getAdminInfo} from '@/api/getData'
    //使用 vuex 函数
    import {mapActions, mapState} from 'vuex'

    export default {
        data(){
            return {
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                },
                showLogin: false,
            }
        },
        mounted(){
            this.showLogin = true;
            //元素挂载后 如果adminInfo.id 不存在，就获取
            if (!this.adminInfo.id) {

                this.getAdminData()
            }
        },
        computed: {
            //使用mapState 辅助函数将  this.$store.state 映射为 this.data
            ...mapState(['adminInfo']),
        },
        methods: {
            //映射成实例方法
            ...mapActions(['getAdminData']),
            async submitForm(formName) {
                //element-ui 表单数据收集 ，refs 直接dom 标识
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        //点击登录后 发送 登录 ajax
                        const res = await login({user_name: this.loginForm.username, password: this.loginForm.password})
                        if (res.status == 1) {
                            // 如果，返回的状态码为 1 ，说明账号密码正确，登录成功
                            this.$message({
                                type: 'success',
                                message: '登录成功'
                            });
                            //成功后跳转到管理页面
                            this.$router.push('manage')
                        }else{
                            //否则，登录失败，展示错误信息
                            this.$message({
                                type: 'error',
                                message: res.message
                            });
                        }
                    } else {
                        //提示
                        this.$notify.error({
                            title: '错误',
                            message: '请输入正确的用户名密码',
                            offset: 100
                        });
                        return false;
                    }
                });
            },
        },
        watch: {
            //监听 vuex 中 adminInfo ,如果，用户 id 存在，说明登录了，就自动登录，跳到管理页面
            adminInfo: function (newValue){
                if (newValue.id) {
                    this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
                    this.$router.push('manage')
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';
    .login_page{
        background-color: #324057;
    }
    .manage_tip{
        position: absolute;
        width: 100%;
        top: -100px;
        left: 0;
        p{
            font-size: 34px;
            color: #fff;
        }
    }
    .form_contianer{
        .wh(320px, 210px);
        .ctp(320px, 210px);
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
        .submit_btn{
            width: 100%;
            font-size: 16px;
        }
    }
    .tip{
        font-size: 12px;
        color: red;
    }
    .form-fade-enter-active, .form-fade-leave-active {
          transition: all 1s;
    }
    .form-fade-enter, .form-fade-leave-active {
          transform: translate3d(0, -50px, 0);
          opacity: 0;
    }
</style>
