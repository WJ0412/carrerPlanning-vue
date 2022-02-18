<template>
  <div style="font-size: 60px;margin-top: 100px">
    <span>尊敬的领导：{{userId}}<br>
      欢迎进入职业生涯规划系统
    </span>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data(){
    return {
      userId: window.sessionStorage.getItem('username')
    }
  }
}
</script>

<style scoped>

</style>