<template>
  <div>
    <el-row>
      <el-col>
        <el-button type="danger" @click="openRestDialog">系统初始化</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 40px">
      <el-col>
        <span>系统开关</span><br>
        <el-switch
            v-model="systemStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="closeOrOpenSystem">
        </el-switch>
      </el-col>
    </el-row>
    <el-row style="margin-left: 450px">
      <el-button type="primary" @click="openAddDialog">新增</el-button>
      <el-table
          :data="tableData"
          style="width: 700px">
        <el-table-column
            prop="name"
            label="账号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="pwd"
            label="密码"
            width="180">
        </el-table-column>
        <el-table-column
            prop="role"
            label="角色">
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
                @click="deleteAdmin(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>


    <el-dialog title="修改管理员" :visible.sync="editDialog">
      <el-form :model="editForm">
        <el-form-item label="管理员账号" :label-width="width" required>
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" :label-width="width" required>
          <el-input v-model="editForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="width" required>
          <el-select v-model="editForm.role" clearable placeholder="请选择" style="float: left;margin-left: 20px">
            <el-option
                v-for="item in roleData"
                :key="item.name"
                :label="item.name"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="updateAdmin">更 新</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增管理员" :visible.sync="addDialog">
      <el-form :model="addForm">
        <el-form-item label="管理员账号" :label-width="width" required>
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" :label-width="width" required>
          <el-input v-model="addForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="width" required>
          <el-select v-model="addForm.role" clearable placeholder="请选择" style="float: left;margin-left: 20px">
            <el-option
                v-for="item in roleData"
                :key="item.name"
                :label="item.name"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="addAdmin">更 新</el-button>
      </div>
    </el-dialog>


    <!-- 重置系统弹出提示 -->
    <el-dialog
        title="系统初始化警告"
        :visible.sync="resetDialog"
        width="50%">
      <span>该操作将会删除系统所有数据（学院、专业数据不可删除）</span><br>
      <span>请输入立即删除执行初始化操作</span><br>
      <el-input style="width: 100px" v-model="resetConfirm"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="resetDialog = false">取 消</el-button>
    <el-button type="primary" @click="reset">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminSystem",
  data() {
    return {
      resetDialog: false,
      resetConfirm: '',
      systemStatus: true,
      tableData: [],
      editForm: {
        name: '',
        pwd: '',
        role: ''
      },
      addForm: {
        name: '',
        pwd: '',
        role: ''
      },
      roleData: [{name: '普通管理员', value: 'common'}, {name: '超级管理员', value: 'root'}],
      editDialog: false,
      addDialog: false,
      width: "100px",
      oldId: ''
    }
  },
  methods: {
    openAddDialog() {
      this.addDialog = true
    },
    closeAddDialog() {
      this.addDialog = false
    },
    addAdmin() {
      axios.post('/admin/addAdmin', {
        name: this.addForm.name,
        pwd: this.addForm.pwd,
        role: this.addForm.role
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('新增管理员成功')
        this.closeAddDialog()
        this.findAllAdmins()
      })
    },
    /**
     * 系统初始化
     */
    reset() {
      if (this.resetConfirm != '立即删除')
        return this.$message.error('请输入立即删除以确认您要初始化系统数据')
      axios.get('admin/deleteAllData').then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('删除完成')
      })
    },
    openRestDialog() {
      this.resetDialog = true
    },
    closeEditDialog() {
      this.editDialog = false
      this.findAllAdmins()
    },
    openEditDialog(row) {
      this.editForm = row
      this.editDialog = true
      this.oldId = row.name
    },

    closeOrOpenSystem() {
      axios.post('/admin/closeOrOpenSystem', {
        status: this.systemStatus
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        if (this.systemStatus == true)
          return this.$message.success('系统开启成功')
        else
          return this.$message.success('系统关闭成功')
      })
    },
    findSystemStatus() {
      axios.get('/user/findSystemStatus').then(res => {
        if (res.data.data == 'true')
          this.systemStatus = true
        else
          this.systemStatus = false
      })
    },
    findAllAdmins() {
      axios.get('/admin/findAllAdmins').then(res => {
        this.tableData = res.data.data
      })
    },
    deleteAdmin(row) {
      this.$confirm('真的要删除【' + row.name + '】吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/admin/deleteAdmin', {
          id: row.name
        }).then(res => {
          if (res.data.code != 0)
            return this.$message.error(res.data.msg)
          this.$message.success('删除成功')
          this.findAllAdmins()
        })
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },
    updateAdmin() {  //响应编辑的保存按钮事件
      axios.post('/admin/updateAdmin', {
        newId: this.editForm.name,
        pwd: this.editForm.pwd,
        role: this.editForm.role,
        oldId: this.oldId
      }).then(res => {
        if (res.data.code != 0)
          return this.$message.error(res.data.msg)
        this.$message.success('修改成功')
        this.closeEditDialog()
        this.findAllAdmins()
      })
    },
  },
  mounted() {
    this.findSystemStatus()
    this.findAllAdmins()
  }
}
</script>

<style scoped>
/*表格单元格文本居中；使用deep防止浏览器解析错误*/
/deep/ .el-table .cell {
  text-align: center;
}
</style>