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
        <a style="color: #222;float: right;padding: 20px;">超级管理员：{{userId}} </a>
        <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i>
        <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">大学生职业生涯规划平台</span>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside style="width: 200px; margin-top: 20px">
        <el-menu :default-active="$route.path"
                 router
                 class="categories"
                 active-text-color="#FF6666">
          <el-menu-item key="0" index="/welcome">
            <i class="el-icon-menu"></i>
            <span>欢迎页面</span>
          </el-menu-item>
          <el-menu-item key="1" index="/adminCollege">
            <i class="el-icon-menu"></i>
            <span>学院管理</span>
          </el-menu-item>
          <el-menu-item key="2" index="/adminMajor">
            <i class="el-icon-menu"></i>
            <span>专业管理</span>
          </el-menu-item>
          <el-menu-item key="4" index="/adminClass">
            <i class="el-icon-menu"></i>
            <span>班级管理</span>
          </el-menu-item>
          <el-menu-item key="3" index="/adminTeacher">
            <i class="el-icon-menu"></i>
            <span>教师管理</span>
          </el-menu-item>
          <el-menu-item key="5" index="/adminStudent">
            <i class="el-icon-menu"></i>
            <span>学生管理</span>
          </el-menu-item>
          <el-menu-item key="6" index="/adminData">
            <i class="el-icon-menu"></i>
            <span>信息导入</span>
          </el-menu-item>
          <el-menu-item key="7" index="/adminSystem">
            <i class="el-icon-menu"></i>
            <span>系统设置</span>
          </el-menu-item>
          <el-menu-item key="8" index="/summary">
            <i class="el-icon-menu"></i>
            <span>查询统计</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      userId: window.sessionStorage.getItem('username')
    }
  },
  methods: {
    logout() {
      this.$router.replace('/')
      window.sessionStorage.clear()
    }
  }
}
</script>

<style scoped>

</style>
