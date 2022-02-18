<template>
    <div style="margin-top: 5%">
        <el-card style="width:90%;margin-left: auto;margin-right: auto">
            <h4>基本信息</h4>
            <el-form :disabled="form_stuData.status=='待审核'||form_stuData.status=='已完成'"
                     :model="form_stuData"
                     ref="form_stuDataRef"
                     label-width="auto"
                     class="demo-ruleForm"
            >
                <el-row>
                    <el-col style="width: 40%; padding-left: 10%">
                        <el-form-item label="姓名" prop="name"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input v-model="form_stuData.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 40%; padding-right: 10%; float: right">
                        <el-form-item label="性别" prop="sex"
                                      :rules="[{required: true, message: '请选择性别'}]">
                            <el-radio v-model="form_stuData.sex" label="男">男</el-radio>
                            <el-radio v-model="form_stuData.sex" label="女">女</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="width: 50%; padding-left: 10%">
                        <el-form-item label="出生日期" prop="birth"
                                      :rules="[{required: true, message: '请选择日期', trigger: 'change' }]">
                            <div class="block">
                                <!--生日存储到数据库的格式建议为 yyyy-MM-dd -->
                                <el-date-picker
                                        v-model="form_stuData.birth"
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd"
                                        style="width: 100%">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 43%; padding-right: 10%; float: right">
                        <el-form-item  prop="political" label="政治面貌"
                                       :rules="[{required: true, message: '请完善信息'}]">
                            <el-select v-model="form_stuData.political"  placeholder="请选择"
                                       style="width: 100%">
                                <el-option
                                        v-for="item in politics"
                                        :key="item.political"
                                        :label="item.political"
                                        :value="item.political">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="width: 40%; padding-left: 10%">
                        <el-form-item label="籍贯" prop="nativePlace"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input v-model="form_stuData.nativePlace"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 43%; padding-right: 10%; float: right">
                        <el-form-item label="联系电话" prop="telephone"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input v-model="form_stuData.telephone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="width: 55%; padding-left: 10%;">
                        <el-form-item label="家庭住址" prop="address"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-cascader
                                    :options="selectData"
                                    v-model="selectedOptions"
                                    :props="{ value: 'label', label: 'label'}"
                                    @change="handleChange"
                                    clearable
                                    style="width: 100%">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="form_stuData.address"
                                      placeholder="请输入详细地址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 43%; padding-right: 10%; float: right">
                        <el-form-item label="身份证号"
                                      prop="code"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input v-model="form_stuData.code"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="width: 55%; padding-left: 10%">
                        <el-form-item label="微信号"
                                      prop="wechat"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input v-model="form_stuData.wechat"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 43%; padding-right: 10%; float: right">
                        <el-form-item label="QQ" prop="qq" :rules="[{required: true, message: '请完善信息'}]">
                            <el-input v-model="form_stuData.qq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item>
                            <el-button type="primary"
                                       @click="addBaseInfo ('form_stuDataRef')"
                                       icon="el-icon-search">暂存
                            </el-button>
                            <el-button type="success"
                                       @click="saveBaseInfo ('form_stuDataRef')"
                                       icon="el-icon-search">提交
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="note!=null&&note!=''">
                    <el-form-item label="教师评语">
                        <el-input
                                style="border: red 1px solid"
                                type="textarea"
                                :rows="5"
                                placeholder="请输入内容"
                                readonly
                                v-model="note">
                        </el-input>
                    </el-form-item>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "StudentBaseInfo",
        data() {
            return {
                btnName: '提 交',   //按钮文本默认是提交（此时，status=0）。提交后，status=1
                able_tj: true,
                info_save: false,
                fam_save: false,
                form_stuData: {  //学生个人信息
                    id: '', //学号
                    name: '',
                    sex: '男',
                    birth: '',
                    political: '',  //政治面貌
                    nativePlace: '',   //籍贯
                    telephone: '',   //手机号
                    wechat: '',
                    qq: '',
                    code: '',  //身份证
                    address: '',
                    status: '', //状态码
                    teachernote: ''  //教师批注
                },
                note: '',
                addStr: '',
                politics: [{
                    political: '群众'
                }, {
                    political: '共青团员'
                }, {
                    political: '中共预备党员'
                }, {
                    political: '中共党员'
                }],
                selectData: [],
                selectedOptions: [],
            }
        },
        methods: {

            handleChange(value) {
                this.addStr = value.toString().replaceAll(",", "")
            },
            getPolitics() {
                axios.post('/student/addBaseInfo', this.form_stuData).then(res => {
                    if (res.data.code == 0)
                        this.form_stuData = res.data.data
                })
            },
            addBaseInfo(formName) {  //保存
                if (this.addStr != '') {
                    this.form_stuData.address = this.addStr + this.form_stuData.address
                }
                axios.post('/student/addBaseInfo', this.form_stuData).then(res => {
                    if (res.data.code == 0) {
                        this.$message.success('保存成功')
                        location.reload()
                    } else {
                        this.$message.error(res.data.msg)
                    }

                })
            },
            saveBaseInfo(formName) {  //提交
                this.$refs[formName].validate(valid => {
                    if (!valid) {
                        this.$message.error("请完善信息")
                        return  false;
                    }
                    if (this.addStr != '') {
                        this.form_stuData.address = this.addStr + this.form_stuData.address
                    }
                    axios.post('/student/saveBaseInfo', this.form_stuData).then(res => {
                        if (res.data.code == 0) {
                            this.$message.success('提交成功')
                            this.initData()
                        } else {
                            this.$message.error(res.data.msg)
                        }
                        location.reload()

                    })
                })

            },
            getCitys() {
                this.selectData = require('../../assets/map/city_code.json');
            },

            initData() {
                axios.get('/student/baseInfo').then(res => {
                    if (res.data.code == 0)
                        this.form_stuData = res.data.data
                    this.note = res.data.data.note
                })
            },


        },

        mounted() {
            this.getCitys()
            this.initData()
        }
    }
</script>

<style scoped>

</style>
