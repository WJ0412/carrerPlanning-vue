<template>
    <el-container>
        <el-header>
            <el-menu
                    :default-active="$route.path"
                    router
                    mode="horizontal"
                    background-color="white"
                    text-color="#000000"
                    active-text-color="red">
                <el-link type="danger" @click="logout" style="color: #222;float: right;padding: 20px;">退出登录</el-link>
                <el-link type="danger" @click="dialogVisible = true" style="color: #222;float: right;padding: 20px;">
                    修改密码
                </el-link>
                <a style="color: #222;float: right;padding: 20px;">学生：{{ username }} {{uname}}</a>
                <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i>
                <el-button style="float: right;margin-top: 10px;margin-right: 10px" type="success"
                           class="el-icon-printer"
                           @click="openPrintDialog">打印
                </el-button>
                <span
                        style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">武昌工学院 - 大学生职业生涯规划</span>
            </el-menu>

            <el-dialog
                    :title="'学号:'+username+'  姓名:'+uname"
                    :visible.sync="printDialog"
                    width="50%"
            >
                <div>
                    <el-select v-model="value" placeholder="请选择您要打印的内容" clearable @change="chooseValue">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="term" placeholder="请选择学期" clearable style="margin-left: 20px" v-show="showTerm">
                        <el-option
                                v-for="item in termOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <span slot="footer" class="dialog-footer">
    <el-button @click="printDialog = false">取 消</el-button>
    <el-button type="primary" @click="print">确 定</el-button>
  </span>
            </el-dialog>

        </el-header>
        <el-container>
            <el-aside style="width: 200px; margin-top: 20px">
                <el-menu :default-active="$route.path"
                         router
                         class="categories"
                         active-text-color="#FF6666">
                    <el-menu-item key="0" index="/swelcome">
                        <i class="el-icon-menu"></i>
                        <span>欢迎页面</span>
                    </el-menu-item>
                    <el-menu-item key="1" index="/studentBaseInfo">
                        <i class="el-icon-menu"></i>
                        <span>基本信息</span>
                    </el-menu-item>
<!--                    <el-menu-item key="2" index="/studentFamilyInfo">-->
<!--                        <i class="el-icon-menu"></i>-->
<!--                        <span>家庭成员</span>-->
<!--                    </el-menu-item>-->

<!--                    <el-menu-item key="3" index="/studentOtherInfo">-->
<!--                        <i class="el-icon-menu"></i>-->
<!--                        <span>其他亲属</span>-->
<!--                    </el-menu-item>-->

                    <el-menu-item key="4" index="/studentCognition">
                        <i class="el-icon-menu"></i>
                        <span>自我认知</span>
                    </el-menu-item>
                    <el-menu-item key="5" index="/stuSuccessfulPlanning">
                        <i class="el-icon-menu"></i>
                        <span>学业规划</span>
                    </el-menu-item>
                    <el-menu-item key="6" index="/stuEmploymentPlanning">
                        <i class="el-icon-menu"></i>
                        <span>就业规划</span>
                    </el-menu-item>
                    <el-menu-item key="7" index="/stuBusinessPlanning">
                        <i class="el-icon-menu"></i>
                        <span>创业规划</span>
                    </el-menu-item>
                    <el-menu-item key="8" index="/stuCareerPlanning7">
                        <i class="el-icon-menu"></i>
                        <span>事业规划</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-dialog
                    title="修改密码"
                    :visible.sync="dialogVisible"
                    width="50%"
                    :close-on-click-modal="false"
                    :before-close="handleClose">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="原密码" prop="pwd">
                        <el-input type="password" autocomplete=“on” v-model.number="ruleForm.pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="on"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

        </el-container>
    </el-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Home",
        data() {
            var checkPwd = (rule, value, callback) => {
                        if (!value) {
                            return callback(new Error('原密码不能为空'));
                        }
                        callback();
                    };
                    var validatePass = (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请输入新密码'));
                        } if(value.length<6){
                            callback(new Error('密码长度不能小于6位'));
                        } else {
                            if (this.ruleForm.checkPass !== '') {
                                this.$refs.ruleForm.validateField('checkPass');
                            }
                            callback();
                        }
                    };
                    var validatePass2 = (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请再次输入新密码'));
                        } else if (value !== this.ruleForm.pass) {
                            callback(new Error('两次输入密码不一致!'));
                        } else {
                            callback();
                        }
            };
            return {
                ruleForm: {
                    pwd: '',//旧密码
                    pass: '',
                    checkPass: '',

                },
                rules: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    pwd: [
                        {validator: checkPwd, trigger: 'blur'}
                    ]
                },
                dialogVisible: false,
                username: window.sessionStorage.getItem('username'),
                uname: window.sessionStorage.getItem('uname'),
                printDialog: false,
                //以下的选项值不可更改！
                options: [{
                    value: '基本信息'
                }, {
                    value: '自我认知',
                }, {
                    value: '学业规划'
                }, {
                    value: '就业规划'
                }, {
                    value: '创业规划'
                }, {
                    value: '事业规划'
                }, {
                    value: '事业规划修订'
                }],
                termOptions: [{
                    value: '第一学期'
                }, {
                    value: '第二学期'
                }, {
                    value: '第三学期'
                }, {
                    value: '第四学期'
                }, {
                    value: '第五学期'
                }, {
                    value: '第六学期'
                }, {
                    value: '第七学期'
                }, {
                    value: '第八学期'
                }],
                term: '',
                value: '',
                showTerm: false,

            }
        },
        methods: {

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            logout() {
                this.$router.replace('/')
                window.sessionStorage.clear()
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('/user/editPwd','pwd='+this.ruleForm.pwd+'&pass='+this.ruleForm.pass+'&checkPass='+this.ruleForm.checkPass).then(res => {
                            if (res.data.code == 0){
                                this.$message.success("修改成功")
                                this.dialogVisible=false;
                               this.$router.replace("/login")
                            }else{
                                this.$message.error(res.data.msg)
                            }

                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            initData() {
                axios.get('/student/baseInfo').then(res => {
                    if (res.data.code == 0)
                        window.sessionStorage.setItem("uname", res.data.data.name)
                })

            },
            openPrintDialog() {
                this.printDialog = true
            },
            chooseValue() {
                if (this.value == '学业规划') {
                    this.showTerm = true
                } else {
                    this.showTerm = false
                    this.term = ''
                }
            },
            print() {
                axios.post('/student/print', {
                    value: this.value,
                    term: this.term,
                    id: this.username
                }).then(res => {
                    if (res.data.data != null) {
                        console.log(res.data.data)

                        window.open(res.data.data);
                    } else {
                        this.$message.error("信息未填写完毕")
                    }
                })
            }
        },
        mounted() {
            this.initData()
        }

    }
</script>

<style scoped>

</style>
