<template>
  <div>
    <div style="margin-top: 20px">
      <el-input prefix-icon="el-icon-search" v-model="collegeName" placeholder="输入学院名称进行查询"
                style="float: left;width: 250px;" clearable></el-input>
      <el-button type="primary" @click="searchCollege()" style="float: left;margin-left:20px">查询</el-button>
      <el-button type="success" @click="openAddDialog()" style="float: left;margin-left:20px">新增</el-button>
    </div>
    <el-table :data="tableData" ref="CollegeTableRef">
      <el-table-column label="序号" prop="id" width="auto">
      </el-table-column>
      <el-table-column label="学院名称" prop="name" width=auto>
      </el-table-column>
      <el-table-column label="操作" width=auto>
        <template slot-scope="scope">
          <el-button @click="openEditDialog(scope.row)" size="mini" type="success">编辑
          </el-button>
          <el-button @click="deleteCollege(scope.row.name)" size="mini" type="danger">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增学院 -->
    <el-dialog :visible.sync="addDialog" title="新增学院">
      <el-form :model="addForm">
        <el-form-item label-width="100px" label="学院序号" required="required">
          <el-input v-model="addForm.id"  placeholder="请输入学院序号" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="学院名称" required="required">
          <el-input v-model="addForm.name"  placeholder="请输入学院名称"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button @click="addCollege" type="primary">新 增</el-button>
      </div>
    </el-dialog>

    <!-- 修改学院 -->
    <el-dialog :visible.sync="editDialog" title="编辑学院信息">
      <el-form :model="editForm">
        <el-form-item label-width="100px" label="学院序号" required="required">
          <el-input v-model="editForm.id" placeholder="请输入学院序号" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="学院名称" required="required">
          <el-input v-model="editForm.name" placeholder="请输入学院名称"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button @click="updateCollege" type="primary">更 新</el-button>
      </div>
    </el-dialog>

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
      this.addForm.id = this.tableData.length + 1 + '',
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
    /**
     * 修改学院
     */
    updateCollege() {
      axios.post('/admin/updateCollege', {
        id: this.editForm.id,
        name: this.editForm.name
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('修改学院成功')
        this.findAllColleges()
      })
      this.closeEditDialog();
    },
    /**
     * 删除学院
     */
    deleteCollege(name) {
      this.$confirm('该操作将会删除学院所有数据以及该学院包含的专业、教师、学生等数据，是否确认删除', '删除【' + name + '】', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        axios.post('/admin/deleteCollege', {
          name: name
        }).then(res => {
          if (res.data.code != 0)
            return this.$message.error(res.data.msg)
          this.$message.success('删除学院成功')
          this.findAllColleges()
        })
      }).catch(() => {
        this.$message.info('取消删除')
      })
    }
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
