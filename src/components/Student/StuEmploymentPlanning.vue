<template>
    <div style="width: 60%; float: right; padding-right: 25%">
        <h4>就业规划</h4>
        <el-form v-bind:model="formStuJob" ref="formStuJobRef" label-width="auto" class="demo-ruleForm"
                 :disabled="formStuJob.status=='待审核'||formStuJob.status=='已完成'" >
            <el-row>
                <el-col style="width: 50%; float: left">
                    <el-form-item label="专业素质目标" style="text-align: left">
                        <el-radio v-model="formStuJob.direction" label="就业">就业</el-radio>
                        <el-radio v-model="formStuJob.direction" label="升学">升学</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col style="width: 100%">
                    <el-form-item label="具体目标" prop="target" :rules="[{required: true, message: '请完善信息'}]">
                        <el-select v-model="formStuJob.target"  placeholder="请选择" clearable
                                   style="float: left">
                            <el-option
                                    v-for="item in JobObjective"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <!-- <el-input v-model="formStuJob.target" placeholder="其他目标"
                                  style="width: 40%; margin-left: 5%; float: left"></el-input> -->
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col style="width: 50%; float: left">
                    <el-form-item label="实现就业目标要具备得条件" prop="requirement"
                                  :rules="[{required: true, message: '请完善信息'}]">
                        <el-select v-model="value1"  multiple placeholder="请选择"
                                   style="width: 100%">
                            <el-option
                                    v-for="item in JobRequired"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}"
                                  v-model="formStuJob.requirement" placeholder="其他需要具备的条件"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="width: 50%; float: right">
                    <el-form-item label="已经具备得条件" prop="qualified" :rules="[{required: true, message: '请完善信息'}]">
                        <el-select v-model="value2"  multiple placeholder="请选择"
                                   style="width: 100%">
                            <el-option
                                    v-for="item in JobAlready"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="formStuJob.qualified"
                                  placeholder="其他已经具备的条件"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col style="width: 50%; float: left">
                    <el-form-item label="存在的不足" prop="insufficient" :rules="[{required: true, message: '请完善信息'}]">
                        <el-input type="textarea" maxlength="500" show-word-limit
                                  :autosize="{ minRows: 10, maxRows: 20}" v-model="formStuJob.insufficient"
                                  placeholder="存在的不足"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="width: 50%; float: right">
                    <el-form-item label="采取的措施" prop="measure" :rules="[{required: true, message: '请完善信息'}]">
                        <el-input type="textarea" maxlength="500" show-word-limit
                                  :autosize="{ minRows: 10, maxRows: 20}" v-model="formStuJob.measure"
                                  placeholder="采取的措施"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item>
                        <el-button type="primary" @click="addStuJob('formStuJobRef')" icon="el-icon-search">保存
                        </el-button>
                        <el-button type="success" @click="saveStuJob('formStuJobRef')" icon="el-icon-search">提交
                        </el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="note!=null&&note!=''">
                <el-input
                        style="border: red 1px solid"
                        type="textarea"
                        :rows="2"
                        readonly
                        placeholder="请输入内容"
                        v-model="note">
                </el-input>
            </el-row>
        </el-form>
    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "StuEmploymentPlanning",
        data() {
            return {
                show: false,
                JobObjective: [],
                JobRequired: [],
                JobAlready: [],
                value: '',
                value1: [],
                value2: [],
                formStuJob: {
                    direction: '就业',
                    target: '',
                    requirement: '',
                    qualified: '',
                    insufficient: '',
                    measure: '',
                    JobResults: '',
                    note:''
                },
                note:''
            }
        },
        methods: {
            //自身状况提交按钮
            addStuJob(formName) {
                    if(this.value1!=''){
                        this.formStuJob.requirement =this.value1
                    }
                    if(this.value!=''){
                        this.formStuJob.target =this.value
                    }
                    if(this.value2!=''){
                        this.formStuJob.qualified = this.value2
                    }
                    axios.post('/student/addJobInfo', this.formStuJob).then(res => {
                        if (res.data.code == 0) {
                            this.formStuJob = res.data.data
                            this.$message.success("保存成功")
                            location.reload()
                        } else {
                            this.$message.error(res.data.msg)
                        }

                    })
            },
            //自身状况提交按钮
            saveStuJob(formName) {
                this.$refs[formName].validate((valid) => {
                    if (!valid) return
                    if(this.value1!=''){
                        this.formStuJob.requirement =this.value1+",其他："+this.formStuJob.requirement
                    }
                    if(this.value!=''){
                        this.formStuJob.target =this.value+ ",其他："+this.formStuJob.target
                    }
                    if(this.value2!=''){
                        this.formStuJob.qualified = this.value2+",其他："+this.formStuJob.qualified
                    }
                    axios.post('/student/saveJobInfo', this.formStuJob).then(res => {
                        if (res.data.code == 0) {
                            this.formStuJob = res.data.data
                            this.$message.success("提交成功")
                            location.reload()
                        } else {
                            this.$message.error(res.data.msg)
                        }

                    })

                });
            },
            getJobObjective() {
                axios.get('/student/options?bh=05').then(res => {
                    if (res.data.code == 0) {
                        this.JobObjective = res.data.data
                    } else {
                        this.$message.error(res.data.msg)
                    }

                })
            },
            getJobRequired() {
                axios.get('/student/options?bh=06').then(res => {
                    if (res.data.code == 0) {
                        this.JobRequired = res.data.data
                    } else {
                        this.$message.error(res.data.msg)
                    }

                })
            },
            getJobAlready() {
                axios.get('/student/options?bh=07').then(res => {
                    if (res.data.code == 0) {
                        this.JobAlready = res.data.data
                    } else {
                        this.$message.error(res.data.msg)
                    }

                })
            },

            initData() {
                axios.get('/student/jobInfo').then(res => {
                    if (res.data.code == 0)
                        this.formStuJob = res.data.data,
                            this.note = res.data.data.note
                })
            }
        },
        mounted() {
            this.initData()
            this.getJobObjective()
            this.getJobRequired()
            this.getJobAlready()
        }

    }
</script>

<style scoped>

</style>
