<template>
    <div>
        <h4>其他亲属<font color="orange" size="2">（至少填写一位，限三位）</font></h4>
        <el-form :disabled="form_other.moreNotifyObject[0].status=='待审核'||form_other.moreNotifyObject[0].status=='已完成'" :model="form_other" ref="form_otherRef"
                 label-width="auto"
                 class="demo-ruleForm"
                 >
            <el-card class="moreRulesIn" v-for="(item, index) in form_other.moreNotifyObject"
                     :key="item.key" style="width:90%;margin:10px auto">
                <el-row>
                    <el-col style="width: 40%; padding-left: 10%">
                        <el-form-item  :prop="'moreNotifyObject.' + index +'.hiscall'"  :rules="[{required: true, message: '请完善信息'}]" label="称呼">
                            <el-input v-model="item.hiscall"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 40%; padding-right: 10%; float: right">
                        <el-form-item :prop="'moreNotifyObject.' + index +'.name'"  :rules="[{required: true, message: '请完善信息'}]" label="姓名">
                            <el-input v-model="item.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="width: 40%; padding-left: 10%">
                        <el-form-item :prop="'moreNotifyObject.' + index +'.tel'" :rules="[{required: true, message: '请完善信息'}]" label="电话">
                            <el-input v-model="item.tel"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 40%; padding-right: 10%; float: right">
                        <el-form-item label="学历">
                            <el-input v-model="item.education"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="width: 40%; padding-left: 10%">
                        <el-form-item label="职业">
                            <el-input v-model="item.work"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 40%; padding-right: 10%; float: right">
                        <el-form-item label="微信">
                            <el-input v-model="item.wechat"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <el-row>
                <el-col>
                    <el-form-item style="margin-top: 10px">
                        <el-button @click="deleteimm(form_other.moreNotifyObject.length)"
                                   icon="el-icon-delete-solid">删除
                        </el-button>
                        <el-button @click="addimm(form_other.moreNotifyObject.length)" >
                            新增其他亲属
                        </el-button>
                        <el-button type="primary"
                                   @click="addOtherInfo ('form_otherRef')"
                                   icon="el-icon-search">暂存
                        </el-button>
                        <el-button type="success"
                                   @click="submitOtherInfo ('form_otherRef')"
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
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "StudentBaseInfo",
        data() {
            return {
                form_other: {  //其他亲属数据
                    moreNotifyObject: [{
                        hiscall: '',
                        name: '',
                        tel: '',
                        education: '',
                        work: '',
                        wechat: '',
                    }]
                },
                note:'',
            }

        },
        methods: {

            addimm(itemsNumber) {  //新增其他成员
                if (itemsNumber > 2) {
                    this.$message({
                        type: 'warning',
                        message: "最多可输入三位其他亲属"
                    })
                } else {
                    this.form_other.moreNotifyObject.push({
                        hiscall: '',
                        name: '',
                        tel: '',
                        education: '',
                        work: '',
                        wechat: '',
                    })
                }
            },
            deleteimm(itemsNumber) {  //删除其他成员
                if (itemsNumber - 1 !== 0) {
                    this.form_other.moreNotifyObject.splice(itemsNumber - 1, 1)
                } else {
                    this.$message({
                        type: 'warning',
                        message: "至少输入一位其他亲属"
                    })
                }
            },
            addOtherInfo(formName) {
                    axios.post('/student/addOtherInfo', this.form_other.moreNotifyObject,)
                        .then(res => {
                            if (res.data.code != 0) {
                                this.$message.error(res.data.msg)

                            } else {
                                this.$message.success("保存成功")
                                this.form_other.moreNotifyObject = res.data.data
                                this.initData();
                            }
                        })
            },
            submitOtherInfo(formName) {
                this.$refs[formName].validate(valid => {
                    if (!valid) {
                        this.$message.error('有必填信息未填写，不能提交！')
                        return
                    }
                    axios.post('/student/saveOtherInfo', this.form_other.moreNotifyObject,)
                        .then(res => {
                            if (res.data.code != 0) {
                                this.$message.error(res.data.msg)
                            } else {
                                this.$message.success("提交成功")
                                this.form_other.moreNotifyObject = res.data.data
                                this.initData();
                            }
                        })
                })
            },
            initData() {
                axios.get('/student/otherInfo').then(res => {
                    if (res.data.code == 0)
                        this.form_other.moreNotifyObject = res.data.data
                    if (res.data.data[0].note==null)
                      return
                    this.note = res.data.data[0].note
                })
            },

        },

        mounted() {
            this.initData()
        }
    }
</script>

<style scoped>

</style>