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
      <el-input prefix-icon="el-icon-search" v-model="majorName" placeholder="请输入专业名称进行查询"
                style="float: left;width: 250px;margin-left: 20px" clearable></el-input>
      <el-button type="primary" @click="searchMajor()" style="float: left;margin-left:20px">查询</el-button>
      <el-button type="success" @click="openAddDialog" style="float: left;margin-left:20px">新增</el-button>
    </div>
    <el-table
        ref="MajorTableRef"
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%">
      <el-table-column
          prop="id"
          label="专业序号"
          width=auto>
      </el-table-column>
      <el-table-column
          prop="name"
          label="专业名称"
          width="auto">
      </el-table-column>
      <el-table-column
          prop="collegeName"
          label="所属学院"
          width=auto>
      </el-table-column>
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
              @click="deleteMajor(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top:15px;">  <!-- 分页器 -->
      <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[1,5,10,20]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="tableData.length">
      </el-pagination>
    </div>

    <!-- 修改专业 -->
    <el-dialog title="修改专业" :visible.sync="editDialog">
      <el-form :model="editForm">
        <el-form-item label="专业序号" label-width="100px">
          <el-input v-model="editForm.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="专业名称" label-width="100px" required>
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所属学院" label-width="100px" required="required">
          <el-select v-model="editForm.collegeName" style="float: left" clearable placeholder="选择指定学院查询">
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
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="updateMajor">更 新</el-button>
      </div>
    </el-dialog>

    <!-- 新增专业 -->
    <el-dialog title="新增专业" :visible.sync="addDialog">
      <el-form :model="addForm">
        <el-form-item label="专业名称" label-width="100px" required="required">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="专业序号" label-width="100px" required="required">
          <el-input v-model="addForm.id"></el-input>
        </el-form-item> -->
        <el-form-item label="所属学院" label-width="100px" required="required">
          <el-select v-model="addForm.collegeName" style="float: left" clearable placeholder="选择指定学院查询">
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
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="addMajor">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AdminMajor",
  data() {
    return {
      tableData: [],  //表格的专业数据
      collegeValue: '', //学院的选中值
      collegeData: [],  //学院列表数据
      majorName: '',  //搜索框值
      editDialog: false,
      addDialog: false, //新增弹出窗（表单）
      editForm: {
        name: '',
        collegeName: '',
        id:''
      },
      addForm: {
        name: '',
        collegeName: ''
        // id:''
      },  //对应于新增专业表单
      oldName: '',
      currentPage: 1,
      total: 10,
      pageSize: 10,
    }
  },
  methods: {
    openAddDialog() {  //响应新增专业按钮的单击事件
      this.addDialog = true  //显示新增专业对话框
    },
    closeAddDialog() { //取消按钮的事件处理代码
      this.addForm.name = ''
      this.addForm.collegeName = ''
      this.addForm.id = ''
      this.addDialog = false
    },
    openEditDialog(row) {
      this.oldName = row.name
      this.editForm.name = row.name
      this.editForm.collegeName = row.collegeName
      this.editForm.id = row.id
      this.editDialog = true
    },
    closeEditDialog() {
      this.editDialog = false;
    },
    /**
     * 查询所有专业
     */
    findAllMajors() {
      axios.get('/admin/findAllMajors').then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.tableData = res.data.data
      })
    },
    /**
     * 查询所有学院
     */
    findAllCollege() {
      axios.get('/admin/findAllColleges').then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.collegeData = res.data.data
      })
    },
    /**
     * 搜索专业
     */
    searchMajor() {
      axios.post('/admin/findMajorsByNameLike', {
        name: this.majorName,
        collegeName: this.collegeValue
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.tableData = res.data.data
        this.$message.success('查询完成')
        this.currentPage = 1;
      })
    },

    /**
     * 新增专业
     */
    addMajor() {
      axios.post('/admin/addMajor', {
        name: this.addForm.name,
        collegeName: this.addForm.collegeName // 选择的学院
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('新增专业成功')
        this.findAllMajors()
      })
      this.closeAddDialog()
      this.findAllMajors()
    },
    /**
     * 修改专业
     */
    updateMajor() {
      axios.post('/admin/updateMajor', {
        id: this.editForm.id,
        name: this.editForm.name,
        collegeName: this.editForm.collegeName
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('修改成功')
        this.findAllMajors()
      })
      this.closeEditDialog()
    },

    deleteMajor(row) {
      this.$confirm('该操作将会删除该专业所有数据以及该专业下包含的教师、学生等数据，是否确认删除', '删除【' + row.name + '】', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/admin/deleteMajor', {
          id: row.id,
          name: row.name
        }).then(res => {
          if (res.data.code != 0)
            return this.$message.error(res.data.msg)
          this.$message.success('删除成功')
          this.findAllMajors()
        })
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },

  },
  mounted() {
    this.findAllMajors()
    this.findAllCollege()
  }
}
</script>
<style scoped>
/*表格单元格文本居中；使用deep防止浏览器解析错误*/
/deep/ .el-table .cell {
  text-align: center;
}
</style>
