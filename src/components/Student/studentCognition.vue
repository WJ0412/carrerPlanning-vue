<template>
    <div style="width: 80%; float: right; padding-right: 15%">
        <el-row>
            <span style="font-size: 20px">自身状况</span>
        </el-row>

        <el-form :disabled="formAutognosis.status=='待审核'||formAutognosis.status=='已完成'" :model="formAutognosis"
                 ref="formAutognosisRef" label-width="auto"
                 class="demo-ruleForm"
                 style="margin-top:10px"
        >
            <el-row>
                <el-col style="width: 45%; padding-left: 10%">
                    <el-form-item label="身体状况" prop="body" :rules="[{required: true, message: '请完善信息'}]">
                        <el-input type="textarea" maxlength="500" show-word-limit
                                  :autosize="{ minRows: 5, maxRows: 10}" v-model="formAutognosis.body"
                                  placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="width: 45%; padding-right: 10%; float: right">
                    <el-form-item label="心理状况" prop="mental" :rules="[{required: true, message: '请完善信息'}]">
                        <el-input type="textarea" maxlength="500" show-word-limit
                                  :autosize="{ minRows: 5, maxRows: 10}" v-model="formAutognosis.mental"
                                  placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row>
                <el-col style="width: 45%; padding-left: 10%">
                    <el-form-item label="兴趣爱好" prop="interest" :rules="[{required: true, message: '请完善信息'}]">
                        <el-input type="textarea" maxlength="500" show-word-limit
                                  :autosize="{ minRows: 5, maxRows: 10}" v-model="formAutognosis.interest"
                                  placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="width: 45%; padding-right: 10%; float: right">
                    <el-form-item label="性格特点" prop="disposition" :rules="[{required: true, message: '请完善信息'}]">
                        <el-input type="textarea" maxlength="500" show-word-limit
                                  :autosize="{ minRows: 5, maxRows: 10}" v-model="formAutognosis.disposition"
                                  placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row>
                <el-col style="width: 45%; padding-left: 10%">
                    <el-form-item label="优势" prop="advantage" :rules="[{required: true, message: '请完善信息'}]">
                        <el-input type="textarea" maxlength="500" show-word-limit
                                  :autosize="{ minRows: 5, maxRows: 10}" v-model="formAutognosis.advantage"
                                  placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="width: 45%; padding-right: 10%; float: right">
                    <el-form-item label="不足" prop="insufficient" :rules="[{required: true, message: '请完善信息'}]">
                        <el-input type="textarea" maxlength="500" show-word-limit
                                  :autosize="{ minRows: 5, maxRows: 10}" v-model="formAutognosis.insufficient"
                                  placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row>
                <span style="font-size: 20px">人生发展愿景</span>
                <el-button type="warning"

                           style="margin-left: 20px"
                           v-show="isShow_note_btn">
                    {{ note_view_hidden }}
                </el-button>
            </el-row>
            <el-row>
                <el-col style="width: 100%; margin-top:10px;padding-left: 10%; padding-right: 10%;">
                    <el-form-item prop="vision" :rules="[{required: true, message: '请完善信息'}]">
                        <el-input type="textarea" maxlength="500" show-word-limit
                                  :autosize="{ minRows: 10, maxRows: 20}"
                                  v-model="formAutognosis.vision" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row>
                <el-col>
                    <el-form-item>
                        <el-button type="primary"
                                   @click="saveStuPerForm('formAutognosisRef')"
                                   icon="el-icon-search">保存
                        </el-button>
                        <el-button type="success"
                                   @click="submitInfo('formAutognosisRef')"
                                   icon="el-icon-check">提交
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
    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "StuAutognosis",
        data() {
            return {
                isShow_note_btn: false, //默认隐藏批注按钮
                note_view_hidden: '查看批注',  //按钮文本
                able_submit: true,  //禁用表单的提交按钮
                formAutognosis: {
                    body: '', //身体状况
                    mental: '',  //心理状况
                    interest: '', //兴趣爱好
                    disposition: '', //性格特点
                    advantage: '', //优势
                    insufficient: '',   //不足
                    vision: '',  //人生发展愿景
                    status: '',
                },
                note: '',
            }
        },
        methods: {

            saveStuPerForm(formName) { //暂存
                axios.post('/student/addAcknowledgeInfo', this.formAutognosis).then(res => {
                    if (res.data.code != 0)
                        return this.$message.error(res.data.msg)
                    this.$message.success('保存成功')
                    this.initData()
                })
            },
            submitInfo(formName) {
                this.$refs[formName].validate(valid => {
                    if (!valid){
                      this.$message.error('请完善信息')
                      return
                    }

                    this.$confirm('提交后，在素质导师审核之前，无法再修改。请确认内容无误后提交！', '提交确认', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {  //确认提交时
                        axios.post('/student/saveAcknowledgeInfo', this.formAutognosis).then(res => {
                            if (res.data.code != 0)
                                return this.$message.error(res.data.msg)
                            this.$message.success('提交成功')
                            this.initData()
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
                axios.get('/student/acknowledgeInfo').then(res => {
                    if (res.data.code == 0)
                        this.formAutognosis = res.data.data
                    if (res.data.data != null)
                        this.note = res.data.data.note
                })
            }
        },

        mounted() {
            this.initData();
        }

    }
</script>

<style scoped>

</style>
