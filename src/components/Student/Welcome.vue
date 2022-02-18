<template>
  <div style="font-size: 60px;margin-top: 100px">
    <span>欢迎{{name}}同学进入职业生涯规划系统
      <p style="color:red">{{msg}}</p>
    </span>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Welcome",
  data(){
    return {
      userId: window.sessionStorage.getItem('username'),
      name: window.sessionStorage.getItem('uname'),
      msg:'',
    }
  },
  mounted() {
    axios.get('/user/getUser').then(res => {
      if (res.data.code == 0){
        var data=res.data.data;
        if(data!=null&&data.id!=null&&data.pwd!=null&&data.id==data.pwd){
          this.msg="当前为初始密码，请尽快修改"
        }

      }

    })
  }
}
</script>

<style scoped>

</style>