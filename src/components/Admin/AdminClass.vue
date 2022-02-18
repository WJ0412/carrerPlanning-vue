<template>
  <div>
    <div style="margin-top: 20px">
      <el-select v-model="collegeValue" clearable @change="findMajors" placeholder="选择指定学院查询" style="float: left">
        <el-option
            v-for="item in collegeData"
            :key="item.name"
            :label="item.name"
            :value="item.name">
        </el-option>
      </el-select>
      <el-select v-model="majorValue" clearable placeholder="选择指定专业查询" style="float: left;margin-left: 20px">
        <el-option
            v-for="item in majorData"
            :key="item.name"
            :label="item.name"
            :value="item.name">
        </el-option>
      </el-select>
      <el-input prefix-icon="el-icon-search" v-model="className" placeholder="请输入班级名称进行查询"
                style="float: left;width: 250px;margin-left: 20px" clearable></el-input>
      <el-button type="primary" @click="searchClass()" style="float: left;margin-left:20px">查询</el-button>
      <el-button type="success" @click="openAddDialog" style="float: left;margin-left:20px">新增</el-button>
    </div>
    <el-table ref="ClassTableRef" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
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
          prop="yearName"
          label="入学年份"
          width=auto>
      </el-table-column>
      <el-table-column
          prop="teacherName"
          label="管理教师"
          width=auto>
      </el-table-column>
      <el-table-column
          prop="teacherNo"
          label="教师工号"
          width=auto>
      </el-table-column>
      <el-table-column
          prop="majorName"
          label="所属专业"
          width=auto>
      </el-table-column>
      <el-table-column label="操作" width=auto>
        <template slot-scope="scope">
          <!--单击下面的两个按钮时均传递了参数-->
          <el-button
              size="mini"
              type="success"
              @click="openEditDialog(scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="deleteClass(scope.row)">删除
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

    <!-- 新增班级 -->
    <el-dialog title="新增班级" :visible.sync="addDialog">
      <el-form :model="addForm">
        <el-form-item label="班级名称" :label-width="width" required>
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="教师工号" :label-width="width" required>
          <el-input v-model="addForm.teacherNo"></el-input>
        </el-form-item>
        <el-form-item label="所属专业" :label-width="width" required>
          <el-select v-model="addCollegeValue" clearable @change="addFindMajors" placeholder="选择指定学院查询"
                     style="float: left">
            <el-option
                v-for="item in collegeData"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
          <el-select v-model="addMajorValue" clearable placeholder="选择指定专业查询" style="float: left;margin-left: 20px">
            <el-option
                v-for="item in addMajorData"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入学年份" :label-width="width" required>
          <el-select v-model="addForm.yearName" clearable placeholder="请选择" style="float: left">
            <el-option
                v-for="item in yearData"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="addClass">保 存</el-button>
      </div>
    </el-dialog>

    <!-- 修改班级 -->
    <el-dialog title="修改班级" :visible.sync="editDialog">
      <el-form :model="editForm">
        <el-form-item label="班级名称" :label-width="width" required>
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>

        <el-form-item label="教师工号" :label-width="width" required>
          <el-input v-model="editForm.teacherNo"></el-input>
        </el-form-item>
        <el-form-item label="所属专业" :label-width="width" required>
          <el-select v-model="editCollegeValue" clearable @change="editFindMajors" placeholder="选择指定学院查询"
                     style="float: left">
            <el-option
                v-for="item in collegeData"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
          <el-select v-model="editMajorValue" clearable placeholder="选择指定专业查询" style="float: left;margin-left: 20px">
            <el-option
                v-for="item in editMajorData"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入学年份" :label-width="width" required>
          <el-select v-model="editForm.yearName" clearable placeholder="请选择" style="float: left">
            <el-option
                v-for="item in yearData"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="updateClass">更 新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "AdminClass",
  data() {
    return {
      tableData: [],
      collegeValue: '',
      collegeData: [],
      majorValue: '',
      majorData: [],
      className: '',
      addDialog: false,
      width: '80px',
      addForm: {
        name: '',
        teacherNo: '',
        yearName: ''
      },
      addCollegeValue: '',
      addMajorValue: '',
      addMajorData: [],
      yearData: [],
      editForm: {
        name: '',
        teacherNo: '',
        yearName: ''
      },
      editCollegeValue: '',
      editMajorValue: '',
      editMajorData: [],
      editDialog: false,
      oldName:'',
      currentPage: 1,
      total: 20,
      pageSize: 10,
    }
  },
  methods: {
    openAddDialog() {
      this.addDialog = true
      this.findAllYears()
    },
    closeAddDialog() {
      this.addDialog = false
    },
    openEditDialog(row) {
      this.findAllYears()
      this.editDialog = true
      this.oldName = row.name
      this.editForm.name = row.name
      this.editForm.teacherNo = row.teacherNo
      this.editForm.yearName = row.yearName
      this.editMajorValue = row.majorName
    },
    closeEditDialog() {
      this.editDialog = false
    },
    /**
     * 查询指定学院下的专业
     */
    findMajors() {
      this.majorValue = ''
      axios.post('/admin/findMajorsByCollegeName', {
        collegeName: this.collegeValue
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
     * 查询所有班级
     */
    findAllClasses() {
      axios.get('/admin/findAllClasses').then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.tableData = res.data.data
      })
    },
    /**
     * 模糊查询
     */
    searchClass() {
      axios.post('/admin/findClassesLike', {
        collegeName: this.collegeValue,
        majorName: this.majorValue,
        name: this.className
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('查询完成')
        this.tableData = res.data.data
        this.currentPage = 1;
      })
    },
    /**
     * 新增班级 学院、专业数据填充
     */
    addFindMajors() {
      this.addMajorValue = ''
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
    /**
     * 新增班级 学院、专业数据填充
     */
    editFindMajors() {
      this.editMajorValue = ''
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
     * 查询所有入学年份
     */
    findAllYears() {
      axios.get('/admin/findAllYears').then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.yearData = res.data.data
      })
    },
    /**
     * 新增班级
     */
    addClass() {
      axios.post('/admin/addClass', {
        name: this.addForm.name,
        teacherNo: this.addForm.teacherNo,
        majorName: this.addMajorValue,
        yearName: this.addForm.yearName
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('新增班级成功')
        this.closeAddDialog()
        this.findAllClasses()
      })
    },
    /**
     * 修改班级
     */
    updateClass() {
      axios.post('/admin/updateClass',{
        newName: this.editForm.name,
        teacherNo: this.editForm.teacherNo,
        majorName: this.editMajorValue,
        yearName: this.editForm.yearName,
        oldName: this.oldName
      }).then(res=>{
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('修改班级成功')
        this.closeEditDialog()
        this.findAllClasses()
      })
    },
    deleteClass(row){
      this.$confirm('真的要删除【' + row.name + '】吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/admin/deleteClass',{
          name: row.name
        }).then(res=>{
          if (res.data.code != 0)
            return this.$message.error(res.data.msg)
          this.$message.success('删除成功')
          this.findAllClasses()
        })
      }).catch(()=>{
        this.$message.info('取消删除')
      })
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  mounted() {
    this.findAllColleges()
    this.findAllClasses()
  }
}
</script>

<style scoped>
/deep/ .el-table .cell {
  text-align: center;
}
</style>