<template>
    <div>
        <div style="margin-top: 20px">
            <el-select v-model="yearValue" clearable placeholder="选择指定年级" style="float: left">
                <el-option
                        v-for="item in yearData"
                        :key="item.name"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="collegeValue" clearable @change="findMajors" placeholder="选择指定学院查询" style="float: left">
                <el-option
                        v-for="item in collegeData"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <el-select v-model="majorValue" clearable @change="findClassByMajorNameAndYear" placeholder="选择指定专业查询"
                       style="float: left;margin-left: 20px">
                <el-option
                        v-for="item in majorData"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <el-select v-model="classValue" clearable placeholder="选择指定班级查询" style="float: left;margin-left: 20px">
                <el-option
                        v-for="item in classData"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <el-input prefix-icon="el-icon-search" v-model="studentName" placeholder="请输入教师姓名进行查询"
                      style="float: left;width: 250px;margin-left: 20px" clearable></el-input>
            <el-button type="primary" @click="searchStudent()" style="float: left;margin-left:20px">查询</el-button>
            <el-button type="success" @click="openAddDialog" style="float: left;margin-left:20px">重置</el-button>
        </div>
        <div style="padding-top:5%">
            <span align="top" style="font-size: 20px;font-weight: bold">升学查询统计</span>
            <el-table
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    style="width: 100%">
                <el-table-column
                        prop="clgname"
                        label="学院"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="mname"
                        label="专业"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="cname"
                        label="班级名称">
                </el-table-column>
                <el-table-column
                        prop="sid"
                        label="学号">
                </el-table-column>
                <el-table-column
                        prop="sname"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="fangxiang"
                        label="就业目标">
                </el-table-column>
                <el-table-column
                        prop="mubiao"
                        label="考取院校">
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10,20]"
                        :page-size="10"
                        background
                        layout="total, prev, pager, next"
                        :total="tableData.length">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Education",
        data() {
            return {
                yearData: [{
                    label: '2016',
                    value: '2016'
                }, {
                    label: '2017',
                    value: '2017'
                }, {
                    label: '2018',
                    value: '2018'
                }, {
                    label: '2019',
                    value: '2019'
                }, {
                    label: '2020',
                    value: '2020'
                }, {
                    label: '2021',
                    value: '2021'
                }, {
                    label: '2022',
                    value: '2022'
                }, {
                    label: '2023',
                    value: '2023'
                }, {
                    label: '2024',
                    value: '2024'
                }, {
                    label: '2025',
                    value: '2025'
                }, {
                    label: '2026',
                    value: '2026'
                },
                ],
                tableData: [],
                collegeData: [],
                majorData: [],
                classData: [],
                yearValue: '',
                collegeValue: '',
                majorValue: '',
                classValue: '',
                studentName: '',
                width: '80px',
                pagesize:10,
                total:0,
                currentPage:1,
            }
        },
        methods: {
            handleSizeChange(val) {
                this.pagesize =val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
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
             * 查询指定学院下的专业
             */
            findMajors() {
                this.majorValue = ''
                this.classValue = ''
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
            findClassByMajorNameAndYear() {
                this.classValue = ''
                axios.post('/admin/findClassByMajorNameAndYear', {
                    major: this.majorValue,
                    year: this.yearValue,
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
                this.tableData =  [],
                    axios.post('/admin/education', {
                        college: this.collegeValue,
                        major: this.majorValue,
                        cls: this.classValue,
                        year: this.yearValue,
                        teacher: this.studentName,
                    }).then(res => {
                        if (res.data.code != 0)
                            return this.$message.error(res.data.msg)
                        this.$message.success('查询完成')
                        this.tableData=res.data.data
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
        }

    }
</script>

<style scoped>

</style>