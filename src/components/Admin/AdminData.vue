<template>
    <div>
        <el-container   v-loading="loading"
               element-loading-text="数据有效性校验和写入中..."
               element-loading-spinner="el-icon-loading">

            <div class="box">
                <span style="font-size: 24px">导入教师信息</span>
                <el-upload style="margin-top: 20px"
                           class="upload-demo"
                           drag
                           action
                           :http-request="importTeacherInfo"
                           :limit="1"
                           :multiple="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip" style="font-size: 18px">
                        教师模板
                        <el-button type="text"
                                   style="margin-left: 10px;font-size: 18px"
                                   @click="dialogVisible_teacher=true">查看
                        </el-button>&nbsp;
                        <!--上线时，修改localhost为服务器地址 61.183.139.106-->
                        <a href="http://61.183.139.106:8082/user/fileDownload?fileName=teacherTemplate.xls"
                           style="color:#409EFF;">下载</a>
                    </div>
                </el-upload>
            </div>
            <el-dialog title="查看教师模板"
                       :visible.sync="dialogVisible_teacher" width="60%">
                <el-image style="width: 800px; height: auto"
                          :src="require('../../assets/teacherTemplate.jpg')"
                          fit="cover"></el-image>
            </el-dialog>

            <div class="box">
                <span style="font-size: 24px">导入班级信息</span>
                <el-upload style="margin-top: 20px"
                           class="upload-demo"
                           drag
                           :http-request="importClassInfo"
                           :limit="1"
                           :multiple="false"
                           action
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip" style="font-size: 18px">
                        班级模板
                        <el-button type="text"
                                   style="margin-left: 10px;font-size: 18px"
                                   @click="dialogVisible_class=true">查看
                        </el-button>&nbsp;
                        <!--上线时，修改localhost为服务器地址 61.183.139.106-->
                        <a href="http://61.183.139.106:8082/user/fileDownload?fileName=classTemplate.xls"
                           style="color:#409EFF;">下载</a>
                    </div>
                </el-upload>
            </div>
            <el-dialog title="查看班级模板" width="60%"
                       :visible.sync="dialogVisible_class">
                <el-image style="width: 800px; height: auto"
                          :src="require('../../assets/classTemplate.jpg')"
                          fit="cover"></el-image>
            </el-dialog>

            <div class="box">
                <span style="font-size: 24px">导入学生信息</span>
                <el-upload style="margin-top: 20px"
                           class="upload-demo"
                           drag
                           action
                           :http-request="importStudentInfo"
                           :limit="1"
                           :multiple="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip" style="font-size: 18px">
                        班级模板
                        <el-button type="text"
                                   style="margin-left: 10px;font-size: 18px"
                                   @click="dialogVisible_student=true">查看
                        </el-button>&nbsp;
                        <!--上线时，修改localhost为服务器地址 61.183.139.106-->
                        <a href="http://61.183.139.106:8082/user/fileDownload?fileName=studentTemplate.xls"
                           style="color:#409EFF;">下载</a>
                    </div>
                </el-upload>
            </div>
            <el-dialog title="查看学生模板" width="60%"
                       :visible.sync="dialogVisible_student">
                <el-image style="width: 800px; height: auto"
                          :src="require('../../assets/studentTemplate.jpg')"
                          fit="cover"></el-image>
            </el-dialog>
        </el-container>
    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "AdminData",
        data() {
            return {
                updateTable: true,
                currentPage: 1,
                total: 20,
                pageSize: 10,
                fileList: [],   // excel文件列表
                loading: false,   //隐藏加载信息
                dialogVisible_teacher: false,  //显示教师模板对话框
                dialogVisible_class: false,  //显示班级模板对话框
                dialogVisible_student: false,  //显示学生模板对话框
            }
        },
        methods: {
            importClassInfo(item) {  //导入班级信息
                this.loading=true;
                const fileObj = item.file
                const formData = new FormData()
                formData.append('file', fileObj)
                axios.post('/admin/importClassFromExcel', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    this.loading=false;
                    if (res.data.code != 0)
                        this.$message.error(res.data.msg)

                    this.$message.success(res.data.data)
                })
            },
            importTeacherInfo(item) {
                this.loading=true
                const fileObj = item.file
                const formData = new FormData()
                formData.append('file', fileObj)
                axios.post('/admin/importTeacherFromExcel', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    this.loading=false;
                    if (res.data.code != 0)
                        this.$message.error(res.data.msg)
                    this.$message.success(res.data.data)
                })
            },
            importStudentInfo(item) {
                this.loading=true;
                const fileObj = item.file
                const formData = new FormData()
                formData.append('file', fileObj)
                axios.post('/admin/importStudentFromExcel', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    this.loading=false;
                    if (res.data.code != 0)
                        this.$message.error(res.data.msg)
                    this.$message.success(res.data.data)
                })
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    /deep/ .el-table .cell {
        text-align: center;
    }

    a {
        text-decoration: none;
    }

    .box {
        float: left;
        margin-left: 20px;
    }
</style>