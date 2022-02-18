<template>
  <div style="font-size: 60px;margin-top: 100px">
    <span>尊敬的用户：{{uname}}<br>
      欢迎进入职业生涯规划系统
    </span>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data(){
    return {
      uname: window.sessionStorage.getItem('uname')
    }
  }
}
</script>

<style scoped>

</style>