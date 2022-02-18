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
            <el-form-item label="学业目标">
              <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}"
                        v-model="successPlan.target" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h5>目标分解</h5>
        <el-row>
          <el-col style="width: 30%; float: left">
            <el-form-item label="专业素质目标">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.protarget" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col style="width: 30%; margin-right: 5%; margin-left: 5%">
            <el-form-item label="通识素质目标">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.gentarget" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col style="width: 30%; float: right">
            <el-form-item label="创新素质目标">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.inntarget" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h5>措施——时间管理</h5>
        <el-row>
          <el-col style="width: 30%; float: left">
            <el-form-item label="专业素质时间管理">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.proshijian" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col style="width: 30%; margin-right: 5%; margin-left: 5%">
            <el-form-item label="通识素质时间管理">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.genshijian" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col style="width: 30%; float: right">
            <el-form-item label="创新素质时间管理">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.innshijian" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h5>措施——方法</h5>
        <el-row>
          <el-col style="width: 30%; float: left">
            <el-form-item label="专业素质方法">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.profangfa" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col style="width: 30%; margin-right: 5%; margin-left: 5%">
            <el-form-item label="通识素质方法">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.genfangfa" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col style="width: 30%; float: right">
            <el-form-item label="创新素质方法">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.innfangfa" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h5>目标达成度</h5>
        <el-row>
          <el-col style="width: 30%; float: left">
            <el-form-item label="专业素质达成度">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.proscore" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col style="width: 30%; margin-right: 5%; margin-left: 5%">
            <el-form-item label="通识素质达成度">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.genscore" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col style="width: 30%; float: right">
            <el-form-item label="创新素质达成度">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.innscore" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h5>改进措施</h5>
        <el-row>
          <el-col style="width: 30%; float: left">
            <el-form-item label="专业素质改进措施">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.profenxi" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col style="width: 30%; margin-right: 5%; margin-left: 5%">
            <el-form-item label="通识素质改进措施">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.genfenxi" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col style="width: 30%; float: right">
            <el-form-item label="创新素质改进措施">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                        v-model="successPlan.innfenxi" readonly></el-input>
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
                <el-input style="width: 120px" placeholder="请输入分数" v-model="score"></el-input>
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
  name: "ManageSuccess",
  data() {
    return {
      successPlan: {
        target: '',
        protarget: '',
        gentarget: '',
        inntarget: '',
        proshijian: '',
        genshijian: '',
        innshijian: '',
        profangfa: '',
        genfangfa: '',
        innfangfa: '',
        proscore: '',
        genscore: '',
        innscore: '',
        profenxi: '',
        genfenxi: '',
        innfenxi: ''
      },
      teacherNo: window.sessionStorage.getItem('teacherNo'),
      statusData: [{value: '待审核'}, {value: '未通过'}, {value: '未提交'}, {value: '已完成'}],
      xueqiData: [{name: '第一学期'}, {name: '第二学期'}, {name: '第三学期'}, {name: '第四学期'}, {name: '第五学期'}, {name: '第六学期'}, {name: '第七学期'}, {name: '第八学期'}],
      classData: [],
      studentData: [],
      classValue: '',
      studentName: '',
      studentId: '',
      score: '',
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
      axios.post('/teacher/findNameAndIdByClassNameAndStatus', {
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
      this.ableStudent = false
      this.ablelist = false
      this.studentName = ''
      this.studentData = []
      this.successPlan = {}
      this.score = ''
    },
    find() {
      if (this.status == '未提交'){
        this.ablelist = false
        this.ableUpdate = false
      }else if (this.status == '已完成'){
        this.ablelist = true
        this.ableUpdate = false
      }else{
        this.ableUpdate = true
        this.ablelist = true
      }
      axios.post('/teacher/findSuccessById', {
        studentId: this.studentName,
        xueqi: this.xueqi
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.successPlan = res.data.data
      })
    },
    fail() {
      axios.post('/teacher/failSuccessById', {
        studentId: this.studentName,
        xueqi: this.xueqi,
        note: this.note
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('打回成功')
      })
    },
    complete(){
      if (this.score == '')
        return this.$message.error('请输入分数')
      axios.post('/teacher/completeSuccess',{
        studentId: this.studentName,
        xueqi: this.xueqi,
        score: this.score
      }).then(res=>{
        if (res.data.code!=0)
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