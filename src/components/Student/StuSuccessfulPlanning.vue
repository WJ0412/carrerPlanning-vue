<!--
    学生端第一学期规划填写
    交互式：表单及提交按钮是否可用，根据学生是否暂存和提交，在mounted()方法里设置。
    （1）表单默认可用。学生未暂存或未提交时，禁用表单的提交按钮。
    （2）填写了表单数据且验证成功后，提交按钮可用。
    （3）填写了表单数据且验证成功后，才会在表success里增加一条记录。此时，status='0'。
    （4）学生提交后，表单被禁用，只能查看信息。
-->
<template>
    <div style="width: 80%; float: right; padding-right: 15%">
        <el-row style="float: left;">
            <el-select @change="handleChange" v-model="value" placeholder="请选择学期">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-row>
        <div @click="handleClick" v-show="value!=''" style="margin-top: 10%"><!--当选择学期后才能出现表单-->
            <el-form :disabled="formSuccPlan1.status=='待审核'||formSuccPlan1.status=='已完成'"
                     :model="formSuccPlan1" :label-position="top"
                     ref="formSuccPlan1Ref"
                     label-width="auto" class="demo-ruleForm">
                <el-row>
                    <el-col style="width: 100%;">
                        <el-form-item label="学业目标" prop="target"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea"
                                      :autosize="{ minRows: 1, maxRows: 2}"
                                      v-model="formSuccPlan1.target"
                                      placeholder="请输入内容（对专业素质、通识素质和创新素质的概括）"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h5>目标分解</h5>
                <el-row>
                    <el-col style="width: 30%; float: left">
                        <el-form-item label="专业素质目标" prop="protarget"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" maxlength="500" show-word-limit
                                      :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formSuccPlan1.protarget"
                                      placeholder="成绩、学分、证书、获奖等"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 30%; margin-right: 5%; margin-left: 5%">
                        <el-form-item label="通识素质目标" prop="gentarget"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" maxlength="500" show-word-limit
                                      :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formSuccPlan1.gentarget"
                                      placeholder="军训、思品、特长、博学、内省、特长、实践等项目学分"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 30%; float: right">
                        <el-form-item label="创新素质目标" prop="inntarget"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" maxlength="500" show-word-limit
                                      :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formSuccPlan1.inntarget"
                                      placeholder="创新创业学分、专利、论文、创业项目、创新创业获奖等"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h5>措施——时间管理</h5>
                <el-row>
                    <el-col style="width: 30%; float: left">
                        <el-form-item label="专业素质时间管理" prop="proshijian"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" maxlength="500" show-word-limit
                                      :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formSuccPlan1.proshijian"
                                      placeholder="时间管理：制定周计划表等"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 30%; margin-right: 5%; margin-left: 5%">
                        <el-form-item label="通识素质时间管理" prop="genshijian"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" maxlength="500" show-word-limit
                                      :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formSuccPlan1.genshijian"
                                      placeholder="时间管理：制定周计划表等"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 30%; float: right">
                        <el-form-item label="创新素质时间管理" prop="innshijian"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" maxlength="500" show-word-limit
                                      :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formSuccPlan1.innshijian"
                                      placeholder="时间管理：制定周计划表等"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h5>措施——方法</h5>
                <el-row>
                    <el-col style="width: 30%; float: left">
                        <el-form-item label="专业素质方法" prop="profangfa"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" maxlength="500" show-word-limit
                                      :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formSuccPlan1.profangfa"
                                      placeholder="方法：课前、课中、课后"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 30%; margin-right: 5%; margin-left: 5%">
                        <el-form-item label="通识素质方法" prop="genfangfa"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" maxlength="500" show-word-limit
                                      :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formSuccPlan1.genfangfa"
                                      placeholder="方法：毅力、纪律、习惯等培养"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 30%; float: right">
                        <el-form-item label="创新素质方法" prop="innfangfa"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" maxlength="500" show-word-limit
                                      :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formSuccPlan1.innfangfa"
                                      placeholder="方法：科研方法、创业方法等"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h5>目标达成度</h5>
                <el-row>
                    <el-col style="width: 30%; float: left">
                        <el-form-item
                                label="专业素质达成度"
                                prop="prochengji"
                                :rules="[{required: true, message: '请完善信息', trigger: 'blur'}]">
                            <el-input type="number" v-model.number="formSuccPlan1.prochengji" max="100"
                                      placeholder="请输入0-100的数字" min="0" @input="down" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 30%; margin-right: 5%; margin-left: 5%">
                        <el-form-item
                                label="通识素质达成度"
                                prop="genchengji"
                                :rules="[{required: true, message: '请完善信息', trigger: 'blur'}]">
                            <el-input type="number" v-model.number="formSuccPlan1.genchengji" max="100"
                                      placeholder="请输入0-100的数字" min="0" @input="down" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 30%; float: right">
                        <el-form-item
                                label="创新素质达成度"
                                prop="innchengji"
                                :rules="[{required: true, message: '请完善信息', trigger: 'blur'}]">
                            <el-input type="number" v-model.number="formSuccPlan1.innchengji" placeholder="请输入0-100的数字"
                                      max="100" min="0" @input="down" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="width: 30%; float: left">
                        <el-form-item label="专业素质达成度分析" prop="profenxi"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" maxlength="500" show-word-limit
                                      :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formSuccPlan1.profenxi"
                                      placeholder="针对自己制定目标的完成情况来填写"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 30%; margin-right: 5%; margin-left: 5%">
                        <el-form-item label="通识素质达成度分析" prop="genfenxi"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" maxlength="500" show-word-limit
                                      :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formSuccPlan1.genfenxi"
                                      placeholder="针对自己制定目标的完成情况来填写"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 30%; float: right">
                        <el-form-item label="创新素质达成度分析" prop="innfenxi"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" maxlength="500" show-word-limit
                                      :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formSuccPlan1.innfenxi"
                                      placeholder="针对自己制定目标的完成情况来填写"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h5>改进措施</h5>
                <el-row>
                    <el-col style="width: 30%; float: left">
                        <el-form-item label="专业素质改进措施" prop="profenxi"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" maxlength="500" show-word-limit
                                      :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formSuccPlan1.procuoshi"
                                      placeholder="一是时间管理：制定周计划表；二是方法：课前、课中、课后"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 30%; margin-right: 5%; margin-left: 5%">
                        <el-form-item label="通识素质改进措施" prop="genfenxi"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" maxlength="500" show-word-limit
                                      :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formSuccPlan1.gencuoshi"
                                      placeholder="一是时间管理；二是毅力、纪律、习惯等培养"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 30%; float: right">
                        <el-form-item label="创新素质改进措施" prop="innfenxi"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input type="textarea" maxlength="500" show-word-limit
                                      :autosize="{ minRows: 10, maxRows: 20}"
                                      v-model="formSuccPlan1.inncuoshi"
                                      placeholder="一是时间管理；二是方法：科研方法、创业方法等"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item>
                            <el-button type="primary"
                                       @click="addStuSucForm('formSuccPlan1Ref')"
                                       icon="el-icon-search">暂存
                            </el-button>
                            <el-button type="success"
                                       @click="submitStuSuccess('formSuccPlan1Ref')"
                                       icon="el-icon-search">提交
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="formSuccPlan1.note!=''&&formSuccPlan1.note!=null">
                    <el-form-item label="教师评语">
                        <el-input
                                style="border: red 1px solid"
                                type="textarea"
                                :rows="5"
                                placeholder="请输入内容"
                                readonly
                                v-model="formSuccPlan1.note">
                        </el-input>
                    </el-form-item>

                </el-row>
            </el-form>
        </div>
    </div>

</template>

<script>

    import axios from "axios";

    export default {
        name: "StuSuccessfulPlanning",
        data() {
            return {
                top: 'top',
                able_form: false,  //表单可用
                able_submit: true,  //禁用表单的提交按钮
                formSuccPlan1: {
                    target: '',
                    protarget: '',
                    gentarget: '',
                    inntarget: '',
                    proshijian: '',
                    genshijian: '',
                    innshijian: '',
                    profangfa: '',
                    genfangfa: '',
                    innfangfa: '',
                    profenxi: '',
                    genfenxi: '',
                    innfenxi: '',
                    note: '',
                    gencuoshi: '',
                    inncuoshi: '',
                    procuoshi: '',
                },
                value: '',
                options: [{
                    value: '',
                    label: ''
                }],
                xqStr: '请选择学期',
            }
        },
        methods: {
            down() {
                if (this.formSuccPlan1.prochengji < 0) {
                    this.formSuccPlan1.prochengji = 0
                }
                if (this.formSuccPlan1.prochengji > 100) {
                    this.formSuccPlan1.prochengji = 100
                }
                if (this.formSuccPlan1.genchengji < 0) {
                    this.formSuccPlan1.genchengji = 0
                }
                if (this.formSuccPlan1.genchengji > 100) {
                    this.formSuccPlan1.genchengji = 100
                }
                if (this.formSuccPlan1.innchengji < 0) {
                    this.formSuccPlan1.innchengji = 0
                }
                if (this.formSuccPlan1.innchengji > 100) {
                    this.formSuccPlan1.innchengji = 100
                }
            },
            handleClick() {
                if (this.value == '') {
                    this.$message.error('学期不能为空');
                    return;
                }
            },
            handleChange(value) {
                let obj = {};
                obj = this.options.find((item) => {
                    return item.value === value;
                });
                this.xqStr = obj.label;
                this.value = value;
                this.initData(value)
            },
            addStuSucForm(formName) {  //保存成功时，设置status='0'
                if (this.value == '') {
                    this.$message.error('学期不能为空');
                    return;
                }
                let that = this
                axios.post('/student/addXueye?xueqi=' + this.value, this.formSuccPlan1).then(res => {
                    if (res.data.code != 0) {
                        this.$message.error(res.data.msg)
                        this.initData(this.value)
                    } else {
                        this.$message.success('保存成功')
                        this.initData(this.value)
                    }
                })
            },
            submitStuSuccess(formName) {  //提交处理，设置status='1'
                this.$refs[formName].validate(valid => {
                    if (!valid) {
                        this.$message.error("请完善信息")
                        return false;
                    }
                    if (this.value == '') {
                        this.$message.error('学期不能为空');
                        return;
                    }
                    this.$confirm('提交后，在素质导师审核之前，无法再修改。请确认内容无误后提交！', '提交确认', {
                        confirmButtonText: '确定提交',
                        cancelButtonText: '不提交',
                        type: 'warning'
                    }).then(() => {  //确认提交时
                        axios.post('/student/saveXueye?xueqi=' + this.value, this.formSuccPlan1).then((res) => {
                            if (res.data.code != 0) {
                                this.$message.error(res.data.msg)
                                this.initData(this.value)
                            } else {
                                this.initData(this.value)
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
            initData(xueqi = 1) {
                axios.get('/student/xueye?xueqi=' + xueqi).then((res) => {
                    if (res.data.code == 0) {
                        this.formSuccPlan1 = res.data.data  //设置表单数据的默认值
                    } else {
                        this.formSuccPlan1 = {
                            target: '',
                            protarget: '',
                            gentarget: '',
                            inntarget: '',
                            proshijian: '',
                            genshijian: '',
                            innshijian: '',
                            profangfa: '',
                            genfangfa: '',
                            innfangfa: '',
                            profenxi: '',
                            genfenxi: '',
                            innfenxi: '',
                            note: '',
                            gencuoshi: '',
                            inncuoshi: '',
                            procuoshi: '',
                        }
                    }
                })
            },
            xuezhi() {
                axios.get('/student/xuezhi').then((res) => {
                    if (res.data.code == 0) {
                        this.options = res.data.data  //设置表单数据的默认值
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
            }
        },
        mounted() {
            this.initData();
            this.xuezhi()

        }
    }
</script>

<style scoped>

</style>