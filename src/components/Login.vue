<template>
    <div id="poster">
        <el-tabs class="login_container" v-model="activeName" stretch>
            <el-tab-pane name="student" label="学生登录"/>
            <el-tab-pane name="teacher" label="教师登录"/>
            <el-tab-pane name="admin" label="学工登录"/>
            <el-form :model="loginForm" :rules="loginFormRules" label-width=auto>
                <el-form-item prop="username">
                    <el-input type="text" v-model="loginForm.username" placeholder="账号"/>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" placeholder="密码"/>
                </el-form-item>
            </el-form>
            <el-button type="primary" class="btn_login" @click="login">登录
            </el-button>
        </el-tabs>
    </div>
</template>
<script>
    import axios from "axios";

    export default {
        name: "Login",
        data() {
            return {
                activeName: 'admin',
                loginForm: {  //登录
                    username: '',
                    password: ''
                },


                loginFormRules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            login() {  //登录
                axios.post('/user/login', {
                    name: this.loginForm.username,
                    password: this.loginForm.password,
                    type: this.activeName
                }).then(res => {
                    if (res.data.code != 0) {
                        return this.$message.error(res.data.msg)
                    }
                    this.$message.success("登录成功")
                    window.sessionStorage.setItem("token", res.data.data.token);
                    window.sessionStorage.setItem("role", res.data.data.role);
                    window.sessionStorage.setItem("username", res.data.data.username);
                    window.sessionStorage.setItem("uname", res.data.data.uname);

                    const role = res.data.data.role
                    if (role == "admin") {
                        axios.post('/user/getRoleForAdmin', {
                            id: this.loginForm.username
                        }).then(res => {
                            if (res.data.data == '超级管理员') {
                                this.$router.push("/adminHome")
                            }
                            if (res.data.data == '普通管理员') {
                                this.$router.push("/collegeHome")
                            }
                        })
                    } else if (role == "student") {
                        axios.get('/user/findSystemStatus').then(res => {
                            if (res.data.data == 'true')
                                this.$router.push("/studentHome")
                            if (res.data.data == 'false')
                                this.$alert('管理员尚未开放系统', '系统未开放', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$message({
                                            type: 'info',
                                            message: `action: ${action}`
                                        });
                                    }
                                });

                        })

                    } else if (role == "teacher") {
                        window.sessionStorage.setItem("teacherNo", this.loginForm.username);
                        this.$router.push("/teacherHome")
                    }
                })
            },

        }
    }
</script>

<style>
    #poster {
        background: url("../assets/index.jpg") no-repeat center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }

    body {
        margin: 0px;
    }

    .login_container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .btn_login {
        width: 100%;
    }


</style>
