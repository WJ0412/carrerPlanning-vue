<template>
  <div>
    <div style="margin-top: 20px">
      <el-input prefix-icon="el-icon-search" v-model="collegeName" placeholder="输入学院名称进行查询"
                style="float: left;width: 250px;" clearable></el-input>
      <el-button type="primary" @click="searchCollege()" style="float: left;margin-left:20px">查询</el-button>
    </div>
    <el-table :data="tableData" ref="CollegeTableRef">
      <el-table-column label="序号" prop="id" width="auto">
      </el-table-column>
      <el-table-column label="学院名称" prop="name" width=auto>
      </el-table-column>
    </el-table>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminCollege",
  data() {
    return {
      tableData: [],
      addDialog: false,
      editDialog: false,
      addForm: {
        name:'',
        id:''
      },
      editForm: {
        name: '',
        id: ''
      },
      collegeName: '',
      oldName: ''
    }
  },
  methods: {
    openAddDialog() {
      this.addDialog = true
    },
    openEditDialog(row) {
      this.oldName = row.name
      this.editForm.name = this.oldName
      this.editForm.id = row.id
      this.editDialog = true
    },
    closeAddDialog() {
      this.addForm.name = ''
      this.addDialog = false
    },
    closeEditDialog() {
      this.editDialog = false
    },
    /**
     * 获取所有学院数据
     */
    findAllColleges() {
      axios.get('/admin/findAllColleges').then(res => {
        console.log(res)
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.tableData = res.data.data
      })
    },
    /**
     * 根据学院名称搜索
     */
    searchCollege() {
      axios.post('/admin/findCollegesByNameLike', {
        name: this.collegeName
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('查询完成')
        this.tableData = res.data.data
        this.currentPage = 1;
      })
    },
    /**
     * 新增学院
     */
    addCollege() {
      axios.post('/admin/addCollege', {
        id: this.addForm.id,
        name: this.addForm.name
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('新增学院成功')
        this.findAllColleges()
      })
      this.closeAddDialog();
    },
  },
  mounted() {
    this.findAllColleges()
  }
}
</script>

<style scoped>
/deep/ .el-table .cell {
  text-align: center;
}
</style>
