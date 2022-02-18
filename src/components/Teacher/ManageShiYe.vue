<template>
  <div>
    <el-card style="height: 100px;">
      <el-select v-model="xueqi" clearable @change="closeStudent"
                 placeholder="选择指定学期查询" style="float: left;margin-top: 10px;">
        <el-option v-for="item in xueqiData"
                   :key="item.name"
                   :label="item.name"
                   :value="item.name">
        </el-option>
      </el-select>
      <el-select v-model="classValue" clearable @change="closeStudent"
                 placeholder="选择指定班级查询" style="float: left;margin-left: 20px;margin-top: 10px">
        <el-option v-for="item in classData"
                   :key="item.name"
                   :label="item.name"
                   :value="item.name">
        </el-option>
      </el-select>
      <el-select v-model="status" clearable @change="closeStudent"
                 placeholder="选择指定状态查询" style="float: left;margin-left: 20px;margin-top: 10px">
        <el-option v-for="item in statusData"
                   :key="item.value"
                   :label="item.value"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-button style="float:left;margin-top: 10px;margin-left: 20px" type="primary" @click="chooseStudent">选择学生
      </el-button>
      <el-select v-model="studentName" clearable v-show="ableStudent" @change="find"
                 placeholder="选择指定学生查询" style="float: left;margin-left: 20px;margin-top: 10px">
        <el-option v-for="item in studentData"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
    </el-card>
    <el-card style="margin-top: 2%" v-show="ablelist">
      <el-form :model="successPlan"
               ref="successPlanRef" label-width="auto"
               class="demo-ruleForm">
        <h2 v-if="xueqi!=''">{{ xueqi }}</h2>
        <h2 v-else>请选择学期</h2>
        <el-row>
          <el-col style="width: 70%; margin-left: 15%">
            <el-form-item label="人生目标">
              <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}"
                        v-model="successPlan.mubiao" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="width: 30%; float: left">
            <el-form-item label="实现人生目标要具备的素质">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.jubeisuzhi" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col style="width: 30%; margin-right: 5%; margin-left: 5%">
            <el-form-item label="存在的不足">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.buzu" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col style="width: 30%; float: right">
            <el-form-item label="采取的措施">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.cuoshi" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h4 style="color:red" v-show="ableUpdate">素质导师点评</h4>
        <el-row v-show="ableUpdate">
          <el-col style="align-items: center">
            <el-form-item>
              <div v-show="isNote">
                <el-input type="textarea" autosize placeholder="请输入批注内容" v-model="note">
                </el-input>
              </div>
              <div style="margin-top: 20px">
                <el-button type="success" @click="complete" style="margin-left: 20px">审核通过</el-button>
                <el-button type="primary" size="" @click="isNote=true">添加批注</el-button>
                <el-button type="warning" @click="fail">打回修改</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ManageShiYe",
  data() {
    return {
      successPlan: {
        mubiao: '',
        jubeisuzhi: '',
        buzu: '',
        cuoshi: ''
      },
      teacherNo: window.sessionStorage.getItem('teacherNo'),
      statusData: [{value: '待审核'}, {value: '未通过'}, {value: '未提交'}, {value: '已完成'}],
      xueqiData: [{name: '事业规划'}, {name: '事业规划修订'}],
      classData: [],
      studentData: [],
      classValue: '',
      studentName: '',
      studentId: '',
      xueqi: '',
      status: '',
      ableStudent: false,
      showForm: false,
      isNote: false,
      note: '',
      ableUpdate: false,
      ablelist: false
    }
  },
  methods: {
    findClassByTeacher() {
      axios.post('/teacher/findClassByTeacher', {
        teacherNo: this.teacherNo
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.classData = res.data.data
      })
    },
    chooseStudent() {
      if (this.xueqi == '')
        return this.$message.error('请选择学期')
      if (this.classValue == '')
        return this.$message.error('请选择班级')
      if (this.status == '')
        return this.$message.error('请选择状态')
      this.ableStudent = true
      axios.post('/teacher/findNameAndIdByClassNameAndStatus2', {
        className: this.classValue,
        status: this.status,
        xueqi: this.xueqi
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.studentData = res.data.data
      })
    },
    closeStudent() {
      this.ableUpdate = false
      this.ablelist = false
      this.ableStudent = false
      this.studentName = ''
      this.studentData = []
      this.successPlan = {}
    },
    find() {
      if (this.status == '未提交'){
        this.ableUpdate = false
      } else if (this.status == '已完成'){
        this.ablelist = true
      }else{
        this.ablelist = true
        this.ableUpdate =true
      }
      axios.post('/teacher/findShiyeById', {
        studentId: this.studentName,
        xueqi: this.xueqi
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.successPlan = res.data.data
      })
    },
    fail() {
      axios.post('/teacher/failShiyeById', {
        studentId: this.studentName,
        xueqi: this.xueqi,
        note: this.note
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('打回成功')
      })
    },
    complete() {
      axios.post('/teacher/completeShiye', {
        studentId: this.studentName,
        xueqi: this.xueqi
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('审核完成')
      })
    }
  },
  mounted() {
    this.findClassByTeacher();
  }
}
</script>

<style scoped>

</style>