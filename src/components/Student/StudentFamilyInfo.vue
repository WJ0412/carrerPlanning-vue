<template>
    <div>
        <h4>家庭成员<font color="orange" size="2">（至少填写一位，限五位）</font></h4>
        <el-form  :disabled="form_fam.moreNotifyObject[0].status=='待审核'||form_fam.moreNotifyObject[0].status=='已完成'"  :model="form_fam" ref="form_famRef"
                 label-width="auto"
                 class="demo-ruleForm" >
            <el-card class="moreRulesIn" v-for="(item, index) in form_fam.moreNotifyObject"
                 :key="item.key" style="width:90%;margin:10px auto">
                <el-row>
                    <el-col style="width: 40%; padding-left: 10%">
                        <el-form-item label="称呼" :prop="'moreNotifyObject.' + index +'.hiscall'"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-select v-model="item.hiscall" placeholder="请选择"
                                       style="width: 100%">
                                <el-option
                                        v-for="item in form_fam.famRelation"
                                        :key="item.hiscall"
                                        :label="item.hiscall"
                                        :value="item.hiscall">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 40%; padding-right: 10%; float: right">
                        <el-form-item label="姓名" :prop="'moreNotifyObject.' + index +'.name'"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input v-model="item.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="width: 40%; padding-left: 10%">
                        <el-form-item label="电话"
                                      :prop="'moreNotifyObject.' + index +'.tel'"
                                      :rules="[{required: true, message: '请完善信息'}]">
                            <el-input v-model="item.tel"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 40%; padding-right: 10%; float: right">
                        <el-form-item label="职务">
                            <el-input v-model="item.work"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="width: 40%; padding-left: 10%;">
                        <el-form-item label="学历">
                            <el-input v-model="item.education"></el-input>
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
                        <el-button @click="deletefam(form_fam.moreNotifyObject.length)"
                                   icon="el-icon-delete-solid">
                            删除
                        </el-button>
                        <el-button @click="addfam(form_fam.moreNotifyObject.length)">
                            新增家庭成员
                        </el-button>
                        <el-button type="primary"
                                   @click="addFamilyInfo ('form_famRef')"
                                   icon="el-icon-search">
                            暂存
                        </el-button>
                        <el-button type="success"
                                   @click="submitFamilyInfo ('form_famRef')"
                                   icon="el-icon-search">
                            提交
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
        data(){
            return {
                form_fam:{ //家庭成员数据
                    famRelation: [{
                        hiscall: '父亲'
                    }, {
                        hiscall: '母亲'
                    }, {
                        hiscall: '爷爷'
                    }, {
                        hiscall: '奶奶'
                    }, {
                        hiscall: '姐姐'
                    }, {
                        hiscall: '哥哥'
                    }, {
                        hiscall: '弟弟'
                    }, {
                        hiscall: '妹妹'
                    }],
                    moreNotifyObject: [{
                        hiscall: '',
                        name: '',
                        tel: '',
                        education: '',
                        work: '',
                        wechat: '',
                    }],
                },
                note:'',

            }

        },
        methods:{

            addfam(itemsNumber) {  //新增家庭成员
                if (itemsNumber > 4) {
                    this.$message({
                        type: 'warning',
                        message: "最多可输入五位家庭成员"
                    });
                } else {
                    this.form_fam.moreNotifyObject.push({
                        hiscall: '',
                        name: '',
                        tel: '',
                        education: '',
                        work: '',
                        wechat: '',
                    })
                }
            },
           deletefam(itemsNumber) {   //删除家庭成员
                if (itemsNumber - 1 != 0) {  //可删除
                    this.form_fam.moreNotifyObject.splice(itemsNumber - 1, 1)
                } else {
                    this.$message({
                        type: 'warning',
                        message: '至少要填写一位家庭成员'
                    });
                }
            },

            addFamilyInfo(formName) {  //家庭成员提交按钮
                    axios.post('/student/addFamilyInfo', this.form_fam.moreNotifyObject,)
                        .then(res => {
                            if (res.data.code != 0) {
                                this.$message.error(res.data.msg)
                                this.initData()
                            } else {
                                this.$message.success("保存成功")
                                this.initData()
                            }
                        })
            },

            submitFamilyInfo(formName) {  //家庭成员提交按钮
                this.$refs[formName].validate(valid => {
                    if (!valid){
                        this.$message.error("有必填信息未填写，不能提交！")
                        return
                    }
                    axios.post('/student/saveFamilyInfo', this.form_fam.moreNotifyObject,)
                        .then(res => {
                            if (res.data.code != 0) {
                                this.$message.error(res.data.msg)
                               this.initData()
                            } else {
                                this.$message.success("提交成功")
                                this.initData()
                            }
                        })
                })
            },


            initData(){
                axios.get('/student/familyInfo').then(res => {
                    if (res.data.code == 0){
                        this.form_fam.moreNotifyObject = res.data.data
                        this.note = res.data.data[0].note

                    }

                })
            },

        },

        mounted(){
            this.initData()
        }
    }
</script>

<style scoped>

</style>