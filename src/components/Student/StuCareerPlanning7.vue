<template>
    <div style="width: 80%; float: right; padding-right: 15%">
        <el-row style="float: left;">
            <el-select @change="handleChange" v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-row>
        <h4>{{value}}</h4>
        <el-form :disabled="formStuCause.status=='待审核'||formStuCause.status=='已完成'">
            <el-form :disabled="formStuCause.status=='待审核'||formStuCause.status=='已完成'" :model="formStuCause"
                     ref="formStuCauseRef1" label-width="auto" class="demo-ruleForm" >
                <el-row style="width: 80%;">
                    <el-col>
                        <el-form-item label="人生目标：">
                            <div style="width: auto; float: left">在</div>
                            <el-checkbox-group v-model="CauseGoal" style="float: left; margin-left: 20px">
                                <el-checkbox
                                        label="政界"></el-checkbox>
                                <el-checkbox label="商界"></el-checkbox>
                                <el-checkbox label="学界"></el-checkbox>
                                <el-checkbox label="教育界"></el-checkbox>
                            </el-checkbox-group>
                            <el-input v-model="CauseGoal1" placeholder="其他领域"
                                      style="width: 30%;float: left; margin-left: 20px"></el-input>
                            <div style="width: auto; float: left; margin-left: 20px">取得较大成就,成为该领域杰出人才</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="width: 30%; float: left">
                        <el-form-item label="实现人生目标要具备的素质" prop="jubeisuzhi"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formStuCause.jubeisuzhi" placeholder="实现人生目标要具备的素质"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 30%; margin-right: 5%; margin-left: 5%">
                        <el-form-item label="存在的不足" prop="buzu" :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formStuCause.buzu" placeholder="存在的不足"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 30%; float: right">
                        <el-form-item label="采取的措施" prop="cuoshi" :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formStuCause.cuoshi" placeholder="采取的措施"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row>
                <el-col>
                    <el-form-item>
                        <el-button type="primary" @click="addStuCause('formStuCauseRef1')" icon="el-icon-search">保存
                        </el-button>
                        <el-button type="success" @click="saveStuCause('formStuCauseRef1')" icon="el-icon-search">提交
                        </el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row v-if="note!=null&&note!=''">
            <el-input
                    style="border: red 1px solid"
                    type="textarea"
                    :rows="2"
                    readonly
                    placeholder=""
                    v-model="note">
            </el-input>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "StuCareerPlanning7",
        data() {
            return {
                options: [{
                    value: '第一次事业规划',
                    label: '第一次事业规划'
                }, {
                    value: '第二次事业规划',
                    label: '第二次事业规划'
                }],
                value: '第一次事业规划',
                show: false,
                top: 'top',
                CauseGoal: [],
                CauseGoal1: '',
                note: '',
                formStuCause: {
                    mubiao: '',
                    jubeisuzhi: '',
                    buzu: '',
                    cuoshi: '',
                    note: ''
                },

            }
        },
        methods: {
            handleChange(data) {
                this.loadData();
            },
            //自身状况提交按钮
            addStuCause(formName) {
                    this.formStuCause.mubiao = this.CauseGoal + this.CauseGoal1;
                    if (this.value == "第一次事业规划") {
                        this.add(1)
                    } else {
                        this.add(2)
                    }
            },
            saveStuCause(formName) {
                this.$refs[formName].validate(valid => {
                    if (!valid) return
                    this.formStuCause.mubiao = this.CauseGoal + this.CauseGoal1;
                    if (this.value == "第一次事业规划") {
                        this.save(1)
                    } else {
                        this.save(2)
                    }
                })
            },

            add(value = 1) {
                axios.post('/student/addShiyeInfo' + value, this.formStuCause).then(res => {
                    if (res.data.code != 0) {
                        this.$message.error(res.data.msg)
                    } else {
                        this.$message.success('保存成功')
                        this.loadData();
                    }
                })
            },
            save(value = 1) {
                axios.post('/student/saveShiyeInfo' + value, this.formStuCause).then(res => {
                    if (res.data.code != 0) {
                        this.$message.error(res.data.msg)
                    } else {
                        this.$message.success('提交成功')
                        this.loadData();
                    }
                })
            },
            initData1() {

                axios.get('/student/shiyeInfo1').then(res => {
                    if (res.data.code == 0) {
                        this.formStuCause = res.data.data,
                            this.note = res.data.data.note
                        this.CauseGoal1 = res.data.data.mubiao
                    } else {
                        this.formStuCause = {
                            mubiao: '',
                            jubeisuzhi: '',
                            buzu: '',
                            cuoshi: '',
                            note: ''
                        },
                            this.CauseGoal = [],
                            this.CauseGoal1 = ''
                    }
                })


            },
            initData2() {
                axios.get('/student/shiyeInfo2').then(res => {
                    if (res.data.code == 0) {
                        this.formStuCause = res.data.data,
                            this.note = res.data.data.note
                        this.CauseGoal1 = res.data.data.mubiao
                    } else {
                        this.formStuCause = {
                            mubiao: '',
                            jubeisuzhi: '',
                            buzu: '',
                            cuoshi: '',
                            note: ''
                        },
                            this.CauseGoal = [],
                            this.CauseGoal1 = ''
                    }

                })
            },
            loadData() {
                if (this.value == "第一次事业规划") {
                    this.initData1()
                } else {
                    this.initData2()
                }
            }
        },
        mounted() {

            this.loadData();
        }

    }
</script>

<style scoped>

</style>