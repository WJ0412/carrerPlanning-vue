<template>
  <div>
    <div style="margin-top: 20px">
      <el-select v-model="collegeValue" clearable placeholder="选择指定学院查询" style="float: left">
        <el-option
            v-for="item in collegeData"
            :key="item.name"
            :label="item.name"
            :value="item.name">
        </el-option>
      </el-select>
      <el-input prefix-icon="el-icon-search" v-model="teacherName" placeholder="请输入姓名或工号进行查询"
                style="float: left;width: 250px;margin-left: 20px" clearable></el-input>
      <el-button type="primary" @click="searchTeacher()" style="float: left;margin-left:20px">查询</el-button>
    </div>
    <el-table ref="TeacherTableRef" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">      <el-table-column
          prop="no"
          label="教师工号"
          width=auto>
      </el-table-column>
      <el-table-column
          prop="name"
          label="教师姓名"
          width=auto>
      </el-table-column>
      <el-table-column
          prop="pwd"
          label="教师密码"
          width=auto>
      </el-table-column>
      <el-table-column
          prop="tel"
          label="电话号码"
          width=auto>
      </el-table-column>
      >
      <el-table-column
          prop="collegeName"
          label="所属学院"
          width=auto>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click="viewClass(scope.row)">查看
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

    <!-- 新增教师 -->
    <el-dialog title="新增教师" :visible.sync="addFormDialog">
      <el-form :model="addForm">
        <el-form-item label="教师工号" :label-width="width" required>
          <el-input v-model="addForm.no" placeholder="请仔细填写9位教师工号"></el-input>
        </el-form-item>
        <el-form-item label="教师姓名" :label-width="width" required>
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="教师密码" :label-width="width" required>
          <el-input v-model="addForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="width" required>
          <el-input v-model="addForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="所属学院" :label-width="width" required>
          <el-select v-model="addForm.collegeName" :label-width="width" clearable placeholder="选择指定学院"
                     style="float: left;">
            <el-option
                v-for="item1 in collegeData"
                :key="item1.name"
                :label="item1.name"
                :value="item1.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddFormDialog">取 消</el-button>
        <el-button type="primary" @click="addTeacher">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="编辑教师信息" :visible.sync="editFormDialog">
      <el-form :model="editForm">
        <el-form-item label="教师工号" :label-width="width">
          <el-input v-model="editForm.no" readonly></el-input>
        </el-form-item>
        <el-form-item label="教师姓名" :label-width="width" required>
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="教师密码" :label-width="width" required>
          <el-input v-model="editForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="width" required>
          <el-input v-model="editForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="所属学院" :label-width="width" required>
          <el-select v-model="editForm.collegeName" :label-width="width" clearable placeholder="选择指定学院"
                     style="float: left;">
            <el-option
                v-for="item in collegeData"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="updateTeacher">更 新</el-button>
      </div>
    </el-dialog>
<!--    查看关联班级-->
    <el-dialog title="查看关联班级" :visible.sync="classDialog">
      <span style="font-size: 24px">{{ teacher }}</span>
      <el-table ref="classTableRef" :data="classTableData">
        <el-table-column
            type="index"
            label="序号"
            width=auto>
        </el-table-column>
        <el-table-column
            prop="name"
            label="班级名称"
            width=auto>
        </el-table-column>
        <el-table-column
            prop="majorName"
            label="所属专业"
            width=auto>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminTeacher",
  data() {
    return {
      tableData: [],
      collegeData: [],
      collegeValue: '',  //学院下拉列表的选择值
      teacherName: '',
      width: '80px',
      addFormDialog: false, //新增教师对话窗体默认不可见
      addForm: {
        no: '',
        name: '',
        pwd: '123456',
        tel: '',
        collegeName: ''
      },
      editForm: {
        no: '',
        name: '',
        pwd: '',
        tel: '',
        collegeName: ''
      },
      editFormDialog: false,  //编辑教师
      classTableData: [],
      classDialog: false,
      teacher:'',
      currentPage: 1,
      total: 20,
      pageSize: 10
    }
  },

  methods: {
    openAddDialog() {
      this.addFormDialog = true
    },
    closeAddFormDialog() {
      this.addFormDialog = false
    },
    openEditFormDialog(row) {
      this.editFormDialog = true
      this.editForm.no = row.no
      this.editForm.name = row.name
      this.editForm.pwd = row.pwd
      this.editForm.tel = row.tel
      this.editForm.collegeName = row.collegeName
    },
    closeEditDialog() {
      this.editFormDialog = false
    },
    /**
     * 模糊查询
     */
    searchTeacher() {
      axios.post('/admin/findTeachersLike', {
        name: this.teacherName,
        collegeName: this.collegeValue
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('查询完成')
        this.tableData = res.data.data
        this.currentPage = 1;
      })
    },
    /**
     * 修改教师
     */
    updateTeacher() {
      axios.post('/admin/updateTeacher', {
        no: this.editForm.no,
        name: this.editForm.name,
        pwd: this.editForm.pwd,
        tel: this.editForm.tel,
        collegeName: this.editForm.collegeName
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('修改教师成功')
        this.findAllTeachers()
        this.closeEditDialog()
      })
    },
    /**
     * 新增教师
     */
    addTeacher() {
      axios.post('/admin/addTeacher', {
        no: this.addForm.no,
        name: this.addForm.name,
        pwd: this.addForm.pwd,
        tel: this.addForm.tel,
        collegeName: this.addForm.collegeName
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('新增教师成功')
        this.findAllTeachers()
        this.closeAddFormDialog()
      })
    },
    /**
     * 删除教师
     */
    deleteTeacher(row) {
      this.$confirm('真的要删除教师：【' + row.name + '】吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/admin/deleteTeacher', {
          no: row.no
        }).then(res => {
          if (res.data.code != 0)
            return this.$message.error(res.data.msg)
          this.$message.success('删除成功')
          this.findAllTeachers()
        })
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },
    viewClass(row) {
      this.teacher = row.no + '---' + row.name
      this.classDialog = true
      axios.post('/admin/findClassByTeacherNo',{
        teacherNo: row.no
      }).then(res=>{
        if (res.data.code != 0){
          this.$message.error(res.data.msg)
          this.classTableData = res.data.data
        }
        this.classTableData = res.data.data
      })
    },

    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    /**
     * 获取所有教师信息
     */
    findAllTeachers() {
      axios.get('/admin/findAllTeachers').then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.tableData = res.data.data
      })
    },
    /**
     * 获取所有学院信息
     */
    findAllColleges() {
      axios.get('/admin/findAllColleges').then(res => {
        if (res.data.code != 0)
          this.$message.error(res.data.msg)
        this.collegeData = res.data.data
      })
    }
  },
  mounted() {
    this.findAllTeachers()
    this.findAllColleges()
  }
}
</script>

<style scoped>
/deep/ .el-table .cell {
  text-align: center;
}
</style>