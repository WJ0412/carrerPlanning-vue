<template>
  <div>
    <div style="margin-top: 20px">
      <el-select v-model="collegeValue" clearable @change="findMajors" placeholder="选择指定学院查询" style="float: left">
        <el-option
            v-for="item in collegeData"
            :key="item.name"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="majorValue" clearable @change="findClassByMajorName" placeholder="选择指定专业查询"
                 style="float: left;margin-left: 20px">
        <el-option
            v-for="item in majorData"
            :key="item.name"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="classValue" clearable placeholder="选择指定班级查询" style="float: left;margin-left: 20px">
        <el-option
            v-for="item in classData"
            :key="item.name"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      <el-input prefix-icon="el-icon-search" v-model="studentName" placeholder="请输入姓名或学号进行查询"
                style="float: left;width: 250px;margin-left: 20px" clearable></el-input>
      <el-button type="primary" @click="searchStudent()" style="float: left;margin-left:20px">查询</el-button>
      <el-button type="success" @click="openAddDialog" style="float: left;margin-left:20px">新增</el-button>
    </div>

    <el-table ref="TeacherTableRef" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
      <el-table-column prop="id" label="学生学号" width=auto></el-table-column>
      <el-table-column prop="name" label="学生姓名"></el-table-column>
      <el-table-column prop="password" label="学生密码"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="telephone" label="手机号"></el-table-column>
      <el-table-column prop="className" label="所属班级"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              @click="openEditDialog(scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="deleteStudent(scope.row)">删除
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

    <!-- 新增学生 -->
    <el-dialog title="新增学生" :visible.sync="addDialog">
      <el-form :model="addForm">
        <el-form-item label="学生学号" :label-width="width" required>
          <el-input v-model="addForm.id"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" :label-width="width" required>
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学生密码" :label-width="width" required>
          <el-input v-model="addForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="所属班级" :label-width="width" required>
          <el-select v-model="addCollegeValue" clearable @change="addFindMajors" placeholder="选择指定学院查询"
                     style="float: left">
            <el-option
                v-for="item in collegeData"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
          <el-select v-model="addMajorValue" clearable @change="addFindClassByMajorName" placeholder="选择指定专业查询"
                     style="float: left;margin-left: 20px">
            <el-option
                v-for="item in addMajorData"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
          <el-select v-model="addClassValue" clearable placeholder="选择指定班级查询" style="float: left;margin-left: 20px">
            <el-option
                v-for="item in addClassData"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="addStudent">新 增</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改学生" :visible.sync="editDialog">
      <el-form :model="editForm">
        <el-form-item label="学生学号" :label-width="width" required>
          <el-input v-model="editForm.id"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" :label-width="width" required>
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学生密码" :label-width="width" required>
          <el-input v-model="editForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="所属班级" :label-width="width" required>
          <el-select v-model="editCollegeValue" clearable @change="editFindMajors" placeholder="选择指定学院查询"
                     style="float: left">
            <el-option
                v-for="item in collegeData"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
          <el-select v-model="editMajorValue" clearable @change="editFindClassByMajorName" placeholder="选择指定专业查询"
                     style="float: left;margin-left: 20px">
            <el-option
                v-for="item in editMajorData"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
          <el-select v-model="editClassValue" clearable placeholder="选择指定班级查询" style="float: left;margin-left: 20px">
            <el-option
                v-for="item in editClassData"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="updateStudent">更 新</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AdminStudent",
  data() {
    return {
      tableData: [],
      collegeData: [],
      majorData: [],
      classData: [],
      collegeValue: '',
      majorValue: '',
      classValue: '',
      studentName: '',
      addDialog: false,
      addForm: {
        id: '',
        name: '',
        pwd: '',
        className: ''
      },
      width: '80px',
      addCollegeValue: '',
      addMajorValue: '',
      addMajorData: [],
      addClassValue: '',
      addClassData: [],
      editForm: {
        id: '',
        name: '',
        pwd: '',
        className: ''
      },
      editDialog: false,
      editCollegeValue: '',
      editMajorValue: '',
      editMajorData: [],
      editClassValue: '',
      editClassData: [],
      oldId: '',
      currentPage: 1,
      total: 20,
      pageSize: 10,
    }
  },
  methods: {
    /**
     * 查询所有学院
     */
    findAllColleges() {
      axios.get('/admin/findAllColleges').then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.collegeData = res.data.data
      })
    },
    /**
     * 查询指定学院下的专业
     */
    findMajors() {
      this.majorValue = ''
      this.classValue = ''
      axios.post('/admin/findMajorsByNameLike', {
        collegeId: this.collegeValue
      }).then(res => {
        if (res.data.code != 0) {
          this.$message.error(res.data.msg)
          this.majorData = res.data.data
        } else {
          this.majorData = res.data.data
        }
      })
    },
    /**
     * 新增指定学院下的专业
     */
    addFindMajors() {
      this.addMajorValue = ''
      this.addClassValue = ''
      axios.post('/admin/findMajorsByCollegeName', {
        collegeName: this.addCollegeValue
      }).then(res => {
        if (res.data.code != 0) {
          this.$message.error(res.data.msg)
          this.addMajorData = res.data.data
        } else {
          this.addMajorData = res.data.data
        }
      })
    },
    editFindMajors() {
      this.editMajorValue = ''
      this.editClassValue = ''
      axios.post('/admin/findMajorsByCollegeName', {
        collegeName: this.editCollegeValue
      }).then(res => {
        if (res.data.code != 0) {
          this.$message.error(res.data.msg)
          this.editMajorData = res.data.data
        } else {
          this.editMajorData = res.data.data
        }
      })
    },
    /**
     * 查询指定专业下的班级
     */
    findClassByMajorName() {
      this.classValue = ''
      axios.post('/admin/findClassesLike', {
        majorId: this.majorValue
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.classData = res.data.data
      })
    },
    /**
     * 新增查询指定专业下的班级
     */
    addFindClassByMajorName() {
      this.addClassValue = ''
      axios.post('/admin/findClassByMajorName', {
        majorName: this.addMajorValue
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.addClassData = res.data.data
      })
    },
    /**
     * 编辑查询指定专业下的班级
     */
    editFindClassByMajorName() {
      this.editClassValue = ''
      axios.post('/admin/findClassByMajorName', {
        majorName: this.editMajorValue
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.editClassData = res.data.data
      })
    },
    /**
     * 查询所有学生数据
     */
    findAllStudents() {
      axios.get('/admin/findAllStudents').then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.tableData = res.data.data
      })
    },
    /**
     * 模糊查询
     */
    searchStudent() {
      axios.post('/admin/findStudentsLike', {
        collegeId: this.collegeValue,
        majorId: this.majorValue,
        classId: this.classValue,
        like: this.studentName,
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('查询完成')
        this.tableData = res.data.data
        this.currentPage = 1;
      })
    },
    openAddDialog() {
      this.addDialog = true
    },
    closeAddDialog() {
      this.addDialog = false
    },
    openEditDialog(row) {
      this.oldId = row.id
      this.editForm.id = row.id
      this.editForm.name = row.name
      this.editForm.pwd = row.pwd
      this.editClassValue = row.className
      this.editDialog = true
    },
    closeEditDialog() {
      this.editDialog = false
    },
    /**
     * 新增学生
     */
    addStudent() {
      axios.post('/admin/addStudent', {
        id: this.addForm.id,
        name: this.addForm.name,
        pwd: this.addForm.pwd,
        className: this.addClassValue
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('新增学生成功')
        this.closeAddDialog()
        this.findAllStudents()
      })
    },
    updateStudent() {  //响应编辑的保存按钮事件
      axios.post('/admin/updateStudent', {
        newId: this.editForm.id,
        name: this.editForm.name,
        pwd: this.editForm.pwd,
        className: this.editClassValue,
        oldId: this.oldId
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('修改成功')
        this.closeEditDialog()
        this.findAllStudents()
      })
    },
    deleteStudent(row) {
      this.$confirm('真的要删除【' + row.name + '】吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/admin/deleteStudent', {
          id: row.id
        }).then(res => {
          if (res.data.code != 0)
            return this.$message.error(res.data.msg)
          this.$message.success('删除成功')
          this.findAllStudents()
        })
      }).catch(() => {
        this.$message.info('取消删除')
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
    this.findAllColleges()
    this.findAllStudents()
  }
}
</script>
<style scoped>
/deep/ .el-table .cell {
  text-align: center;
}
</style>
