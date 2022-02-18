<template>
    <div style="width: 60%; float: right; padding-right: 25%">
        <h4>创业规划</h4>
        <el-form v-bind:model="formStuCreate" ref="formStuCreateRef" label-width="auto" class="demo-ruleForm"
                 :disabled="formStuCreate.status=='待审核'||formStuCreate.status=='已完成'">
            <el-row>
                <el-col style="width: 100%">
                    <el-form-item label="具体目标" prop="target" :rules="[{required: true, message: '请完善信息'}]">
                        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" v-model="formStuCreate.target"
                                  placeholder="具体目标"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col style="width: 50%; float: left">
                    <el-form-item label="实现创业目标要具备得条件" prop="requirement"
                                  :rules="[{required: true, message: '沒有其他选项请填”无“'}]">
                        <el-select v-model="value" placeholder="请选择"
                                   style="width: 100%">
                            <el-option
                                    v-for="item in CreRequired"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 8}"
                                  v-model="formStuCreate.requirement" placeholder="其他需要具备的条件"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="width: 50%; float: right">
                    <el-form-item label="已经具备得条件" prop="qualified" :rules="[{required: true, message: '请完善信息'}]">
                        <el-input type="textarea" maxlength="500" show-word-limit
                                  :autosize="{ minRows: 10, maxRows: 20}" v-model="formStuCreate.qualified"
                                  placeholder="已经具备得条件"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col style="width: 50%; float: left">
                    <el-form-item label="存在的不足" prop="insufficient" :rules="[{required: true, message: '请完善信息'}]">
                        <el-input type="textarea" maxlength="500" show-word-limit
                                  :autosize="{ minRows: 10, maxRows: 20}" v-model="formStuCreate.insufficient"
                                  placeholder="存在的不足"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="width: 50%; float: right">
                    <el-form-item label="采取的措施" prop="measure" :rules="[{required: true, message: '请完善信息'}]">
                        <el-input type="textarea" maxlength="500" show-word-limit
                                  :autosize="{ minRows: 10, maxRows: 20}" v-model="formStuCreate.measure"
                                  placeholder="采取的措施"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item>
                        <el-button type="primary" @click="add('formStuCreateRef')" icon="el-icon-search">保存</el-button>
                        <el-button type="success" @click="save('formStuCreateRef')" icon="el-icon-check">提交</el-button>
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
        name: "StuBusinessPlanning",
        data() {
            return {
                show: false,
                CreRequired: [],
                value: '',
                formStuCreate: {
                    target: '',
                    requirement: '',
                    qualified: '',
                    insufficient: '',
                    measure: '',
                    CreResults: '',
                },
                note: ''
            }
        },
        methods: {
            getOption() {
                axios.get('/student/options?bh=08').then(res => {
                    if (res.data.code == 0)
                        this.CreRequired = res.data.data
                })
            },
            add(formName) { //暂存
                if (this.value != '') {
                    this.formStuCreate.requirement = this.value + ',其他:' + this.formStuCreate.requirement
                }
                axios.post('/student/addBusinessInfo', this.formStuCreate).then(res => {
                    if (res.data.code != 0) {
                        this.$message.error(res.data.msg)
                    } else {
                        this.$message.success('保存成功')
                        this.initData()
                    }
                })
            },
            save(formName) {
                this.$refs[formName].validate(valid => {
                    if (!valid) return
                    this.$confirm('提交后，在素质导师审核之前，无法再修改。请确认内容无误后提交！', '提交确认', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {  //确认提交时
                        if (this.value != '') {
                            this.formStuCreate.requirement = this.value + ',其他:' + this.formStuCreate.requirement
                        }
                        axios.post('/student/saveBusinessInfo', this.formStuCreate).then(res => {
                            if (res.data.code != 0) {
                                this.$message.error(res.data.msg)
                            } else {
                                this.$message.success('提交成功')
                                this.initData()
                            }

                        })
                    }).catch(() => {  //不提交时
                        this.$message({
                            type: 'info',
                            message: '取消提交！'
                        })
                    })
                })
            },
            initData() {

                axios.get('/student/businessInfo').then(res => {
                    if (res.data.code == 0)
                        this.formStuCreate = res.data.data,
                            this.note = res.data.data.note

                })
                this.getOption();
            }

        },
        mounted() {
            this.initData();
        }

    }
</script>

<style scoped>

</style>
