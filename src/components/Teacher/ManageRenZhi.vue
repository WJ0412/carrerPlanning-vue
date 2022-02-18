<template>
  <div>
    <div style="margin-top: 20px">
      <el-select v-model="classValue" clearable placeholder="选择指定班级查询" style="float: left;margin-left: 20px">
        <el-option
            v-for="item in classData"
            :key="item.name"
            :label="item.name"
            :value="item.name">
        </el-option>
      </el-select>
      <el-select v-model="statusValue" clearable placeholder="选择指定状态查询"
                 style="float: left;margin-left: 20px">
        <el-option
            v-for="item in statusData"
            :key="item.value"
            :label="item.value"
            :value="item.value">
        </el-option>
      </el-select>
      <el-input prefix-icon="el-icon-search" v-model="studentName" placeholder="请输入姓名或学号进行查询"
                style="float: left;width:250px;margin-left: 20px" clearable></el-input>
      <el-button type="primary" @click="searchStudent()" style="float: left;margin-left:20px">查询</el-button>
    </div>
    <el-table ref="TeacherTableRef" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="id" label="学生学号"></el-table-column>
      <el-table-column prop="name" label="学生姓名"></el-table-column>
      <el-table-column prop="status" label="当前状态"></el-table-column>
      <el-table-column prop="className" label="所属班级"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              style="width: 100px"
              size="medium"
              type="primary"
              @click="openInfo(scope.row)">审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top:15px;">
      <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[1,5,10,20]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="tableData.length">
      </el-pagination>
    </div>

    <!-- 查看信息 -->
    <el-dialog :title="infoTitle" :visible.sync="infoDialog">
      <div>
        <el-form :model="infoData"  label-width="auto" class="demo-ruleForm" size="mini">
          <el-row>
            <el-col style="width: 40%;margin-left: 5%">
              <el-form-item label="身体状况">
                <el-input v-model="infoData.shenti" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col style="width: 40%;margin-left: 5%">
              <el-form-item label="心理状况">
                <el-input v-model="infoData.xinli" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="width: 40%;margin-left: 5%">
              <el-form-item label="兴趣爱好">
                <el-input v-model="infoData.xingqu" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col style="width: 40%;margin-left: 5%">
              <el-form-item label="性格特点">
                <el-input v-model="infoData.xingge" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="width: 40%;margin-left: 5%">
              <el-form-item label="优势">
                <el-input v-model="infoData.youshi" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col style="width: 40%;margin-left: 5%">
              <el-form-item label="不足">
                <el-input v-model="infoData.buzu" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="width: 85%;margin-left: 5%">
              <el-form-item label="人生发展愿景">
                <el-input v-model="infoData.fazhan" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-show="isNote">
        <el-input type="textarea" autosize placeholder="请输入批注内容" v-model="note">
        </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isNote=true">添加批注</el-button>
        <el-button type="danger" @click="fail">打回修改</el-button>
        <el-button type="success" @click="complete">审核通过</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ManageInfo",
  data() {
    return {
      id: '',
      teacherNo: window.sessionStorage.getItem('teacherNo'),
      statusData: [{value: '待审核'},{value: '未通过'}, {value: '未提交'}, {value: '已完成'}],
      tableData: [],
      classData: [],
      classValue: '',
      statusValue: '',
      studentName: '',
      infoDialog: false,
      infoTitle: '',
      infoData:{
        shenti:'',
        xinli: '',
        xingqu:'',
        xingge:'',
        youshi:'',
        buzu: '',
        fazhan: ''
      },
      isNote: false,
      note:'',
      currentPage: 1,
      total: 20,
      pageSize: 10,
    }
  },
  methods: {
    findAllStudentsByTeacher() {
      axios.post('/teacher/findRenZhiByTeacherNo', {
        teacherNo: this.teacherNo
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.tableData = res.data.data
      })
    },
    findClassByTeacher() {
      axios.post('/teacher/findClassByTeacher',{
        teacherNo: this.teacherNo
      }).then(res=>{
        if (res.data.code!=0)
          return this.$message.error(res.data.msg)
        this.classData = res.data.data
      })
    },
    searchStudent() {
      axios.post('/teacher/findStudentsByRenZhi', {
        className: this.classValue,
        status: this.statusValue,
        name: this.studentName,
        teacherNo: this.teacherNo
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('查询完成')
        this.tableData = res.data.data
        this.currentPage = 1;
      })
    },
    openInfo(row) {
      this.id = row.id;
      this.infoTitle = row.name
      axios.post('/teacher/findRenZhiById',{
        id: row.id
      }).then(res=>{
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.infoData = res.data.data[0]
      })
      this.infoDialog = true
    },
    complete(){
      axios.post('/teacher/completeRenZhi',{
        id: this.id
      }).then(res=>{
        if (res.data.code!=0)
          return this.$message.error(res.data.msg)
        this.$message.success('审核完成')
        this.closeInfoDialog()
        this.findAllStudentsByTeacher()
      })
    },
    closeInfoDialog(){
      this.infoDialog = false
      this.isNote = false
      this.note = ''
    },
    fail(){
      axios.post('/teacher/failRenZhi',{
        id: this.id,
        note: this.note
      }).then(res=>{
        if (res.data.code!=0)
          return this.$message.error(res.data.msg)
        this.$message.success('打回完成')
        this.closeInfoDialog()
        this.findAllStudentsByTeacher()
      })
    },

    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  },
  mounted() {
    this.findClassByTeacher()
  }
}
</script>

<style scoped>
/deep/ .el-table .cell {
  text-align: center;
}
</style>