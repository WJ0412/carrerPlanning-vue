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
        <el-link type="danger" @click="dialogVisible = true" style="color: #222;float: right;padding: 20px;">修改密码</el-link>
        <a style="color: #222;float: right;padding: 20px;">教师：{{username}} {{uname}} </a>
        <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i>
        <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">武昌工学院 - 大学生职业生涯规划网</span>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside style="width: 200px; margin-top: 20px">
        <el-menu :default-active="$route.path"
                 router
                 class="categories"
                 active-text-color="#FF6666">
          <el-menu-item key="0" index="/teacherWelcome">
            <i class="el-icon-menu"></i>
            <span>欢迎页面</span>
          </el-menu-item>
          <el-menu-item key="1" index="/manageInfo">
            <i class="el-icon-menu"></i>
            <span>基本信息</span>
          </el-menu-item>
          <el-menu-item key="2" index="/manageFamily">
            <i class="el-icon-menu"></i>
            <span>家庭成员</span>
          </el-menu-item>
          <el-menu-item key="3" index="/manageOther">
            <i class="el-icon-menu"></i>
            <span>其他亲属</span>
          </el-menu-item>
          <el-menu-item key="4" index="/manageRenZhi">
            <i class="el-icon-menu"></i>
            <span>自我认知</span>
          </el-menu-item>
          <el-menu-item key="5" index="/manageSuccess">
            <i class="el-icon-menu"></i>
            <span>学业规划</span>
          </el-menu-item>
          <el-menu-item key="6" index="/manageJob">
            <i class="el-icon-menu"></i>
            <span>就业规划</span>
          </el-menu-item>
          <el-menu-item key="7" index="/manageBusiness">
            <i class="el-icon-menu"></i>
            <span>创业规划</span>
          </el-menu-item>
          <el-menu-item key="8" index="/manageShiYe">
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
  name: "TeacherHome",
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
      username: window.sessionStorage.getItem('username'),//账号
      uname: window.sessionStorage.getItem('uname')//姓名
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
    logout() {
      this.$router.replace('/')
      window.sessionStorage.clear()
    }
  }
}
</script>

<style scoped>

</style>