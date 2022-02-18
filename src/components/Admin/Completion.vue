<template>
    <div>
        <div style="margin-top: 20px">
            <el-select v-model="yearValue" clearable  placeholder="选择指定年级" style="float: left">
                <el-option
                        v-for="item in yearData"
                        :key="item.name"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>

            <el-select v-model="xueqiValue" clearable placeholder="选择指定学期" style="float: left">
                <el-option
                        v-for="item in xueqiData"
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
            <table  style="font-size: 1rem" width="80%" class="el-table el-table--fit el-table--scrollable-x el-table--enable-row-hover el-table--enable-row-transition">
                <caption align="top" style="font-size: 20px;font-weight: bold">目标完成度统计表</caption>
                <tr>
                    <td>年级</td>
                    <td>学期</td>
                    <td>学院</td>
                    <td>专业</td>
                    <td>班级名称</td>
                    <td colspan="2">人数</td>
                    <td>完成人数</td>
                    <td>100%</td>
                    <td>90-99%</td>
                    <td>90-99%%</td>
                    <td>70—79%</td>
                    <td>70—79%</td>
                    <td>50—59%</td>
                    <td>40—49%</td>
                    <td>30—39%</td>
                    <td>20—29%</td>
                    <td>10—19%</td>
                    <td>0—9%</td>
                </tr>
                <tr>
                    <td  rowspan="3">{{tableData.year}}</td>
                    <td  rowspan="3">{{tableData.xueqi}}</td>
                    <td  rowspan="3">{{tableData.college}}</td>
                    <td  rowspan="3">{{tableData.major}}</td>
                    <td  rowspan="3">{{tableData.cls}}</td>
                    <td>总人数</td>
                    <td>{{tableData.all.total}}</td>
                    <td>{{tableData.all.finish}}</td>
                    <td>{{tableData.all._100}}</td>
                    <td>{{tableData.all._9099}}</td>
                    <td>{{tableData.all._8089}}</td>
                    <td>{{tableData.all._7079}}</td>
                    <td>{{tableData.all._6069}}</td>
                    <td>{{tableData.all._5059}}</td>
                    <td>{{tableData.all._4049}}</td>
                    <td>{{tableData.all._3039}}</td>
                    <td>{{tableData.all._2029}}</td>
                    <td>{{tableData.all._1019}}</td>
                    <td>{{tableData.all._09}}</td>
                </tr>
                <tr>

                    <td>男</td>
                    <td>{{tableData.male.total}}</td>
                    <td>{{tableData.male.finish}}</td>
                    <td>{{tableData.male._100}}</td>
                    <td>{{tableData.male._9099}}</td>
                    <td>{{tableData.male._8089}}</td>
                    <td>{{tableData.male._7079}}</td>
                    <td>{{tableData.male._6069}}</td>
                    <td>{{tableData.male._5059}}</td>
                    <td>{{tableData.male._4049}}</td>
                    <td>{{tableData.male._3039}}</td>
                    <td>{{tableData.male._2029}}</td>
                    <td>{{tableData.male._1019}}</td>
                    <td>{{tableData.male._09}}</td>
                </tr>
                <tr>

                    <td>女</td>
                    <td>{{tableData.female.total}}</td>
                    <td>{{tableData.female.finish}}</td>
                    <td>{{tableData.female._100}}</td>
                    <td>{{tableData.female._9099}}</td>
                    <td>{{tableData.female._8089}}</td>
                    <td>{{tableData.female._7079}}</td>
                    <td>{{tableData.female._6069}}</td>
                    <td>{{tableData.female._5059}}</td>
                    <td>{{tableData.female._4049}}</td>
                    <td>{{tableData.female._3039}}</td>
                    <td>{{tableData.female._2029}}</td>
                    <td>{{tableData.female._1019}}</td>
                    <td>{{tableData.female._09}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Completion",
        data() {
            return {
                yearData:[{
                    label: '2016',
                    value: '2016'
                },{
                    label: '2017',
                    value: '2017'
                },{
                    label: '2018',
                    value: '2018'
                },{
                    label: '2019',
                    value: '2019'
                },{
                    label: '2020',
                    value: '2020'
                },{
                    label: '2021',
                    value: '2021'
                },{
                    label: '2022',
                    value: '2022'
                },{
                    label: '2023',
                    value: '2023'
                },{
                    label: '2024',
                    value: '2024'
                },{
                    label: '2025',
                    value: '2025'
                },{
                    label: '2026',
                    value: '2026'
                },
                ],
                xueqiData:[
                    {
                        label: '第一学期',
                        value: '1'
                    },{
                        label: '第二学期',
                        value: '2'
                    },{
                        label: '第三学期',
                        value: '3'
                    },{
                        label: '第四学期',
                        value: '4'
                    },{
                        label: '第五学期',
                        value: '5'
                    },{
                        label: '第六学期',
                        value: '6'
                    },{
                        label: '第七学期',
                        value: '7'
                    },{
                        label: '第八学期',
                        value: '8'
                    }
                ],
                tableData: {
                    "all": {
                        "category": "总数",
                        "total": "0",
                        "finish": null,
                        "_100": null,
                        "_9099": null,
                        "_8089": null,
                        "_7079": null,
                        "_6069": null,
                        "_5059": null,
                        "_4049": null,
                        "_3039": null,
                        "_2029": null,
                        "_1019": null,
                        "_09": null
                    },
                    "male": {
                        "category": "男",
                        "total": "0",
                        "finish": null,
                        "_100": null,
                        "_9099": null,
                        "_8089": null,
                        "_7079": null,
                        "_6069": null,
                        "_5059": null,
                        "_4049": null,
                        "_3039": null,
                        "_2029": null,
                        "_1019": null,
                        "_09": null
                    },
                    "female": {
                        "category": "女",
                        "total": "0",
                        "finish": null,
                        "_100": null,
                        "_9099": null,
                        "_8089": null,
                        "_7079": null,
                        "_6069": null,
                        "_5059": null,
                        "_4049": null,
                        "_3039": null,
                        "_2029": null,
                        "_1019": null,
                        "_09": null
                    },
                    "college": "",
                    "major": null,
                    "cls": "",
                    "teacher": null,
                    "year": "",
                    "xueqi": ""
                },
                collegeData: [],
                majorData: [],
                classData: [],
                yearValue: '',
                xueqiValue: '',
                collegeValue: '',
                majorValue: '',
                classValue: '',
                studentName: '',
                width: '80px',
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
                if(this.xueqiValue==''||this.yearValue==''){
                    this.$message.error("请先选择年级和学期")
                    this.collegeValue=''
                    return;
                }
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
                if(this.xueqiValue==''||this.yearValue==''){
                    this.$message.error("请先选择年级和学期")

                    return;
                }
                this.tableData={
                    "all": {
                        "category": "总数",
                        "total": "0",
                        "finish": null,
                        "_100": null,
                        "_9099": null,
                        "_8089": null,
                        "_7079": null,
                        "_6069": null,
                        "_5059": null,
                        "_4049": null,
                        "_3039": null,
                        "_2029": null,
                        "_1019": null,
                        "_09": null
                    },
                    "male": {
                        "category": "男",
                        "total": "0",
                        "finish": null,
                        "_100": null,
                        "_9099": null,
                        "_8089": null,
                        "_7079": null,
                        "_6069": null,
                        "_5059": null,
                        "_4049": null,
                        "_3039": null,
                        "_2029": null,
                        "_1019": null,
                        "_09": null
                    },
                    "female": {
                        "category": "女",
                        "total": "0",
                        "finish": null,
                        "_100": null,
                        "_9099": null,
                        "_8089": null,
                        "_7079": null,
                        "_6069": null,
                        "_5059": null,
                        "_4049": null,
                        "_3039": null,
                        "_2029": null,
                        "_1019": null,
                        "_09": null
                    },
                    "college": "",
                    "major": null,
                    "cls": "",
                    "teacher": null,
                    "year": "",
                    "xueqi": ""
                },
                    axios.post('/admin/completion', {
                        college: this.collegeValue,
                        major: this.majorValue,
                        cls: this.classValue,
                        year: this.yearValue,
                        xueqi: this.xueqiValue,
                        teacher: this.studentName,
                    }).then(res => {
                        if (res.data.code != 0)
                            return this.$message.error(res.data.msg)
                        this.$message.success('查询完成')
                        res=res.data.data
                        if(res.all!=null){
                            this.tableData.all=res.all
                        }
                        if(res.male!=null){
                            this.tableData.male=res.male
                        }
                        if(res.female!=null){
                            this.tableData.female=res.female
                        }
                        this.tableData.cls =res.cls
                        this.tableData.college =res.college
                        this.tableData.major =res.major
                        this.tableData.teacher =res.teacher
                        this.tableData.xueqi =res.xueqi
                        this.tableData.year =res.year
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
            deleteStudent(row){
                this.$confirm('真的要删除【' + row.name + '】吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('/admin/deleteStudent',{
                        id: row.id
                    }).then(res=>{
                        if (res.data.code!=0)
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