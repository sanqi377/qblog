<template>
    <div>
        <el-card class="ele-body" shadow="never">
            <div class="input">
                <el-row>
                    <el-col :span="12">
                        <el-form ref="form" :model="form" label-position="left">
                            <el-form-item>
                                <el-input v-model="form.title">
                                    <template slot="prepend">网站标题</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="form.subtitle">
                                    <template slot="prepend"
                                        >网站副标题</template
                                    >
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="form.keyword">
                                    <template slot="prepend"
                                        >网站关键字</template
                                    >
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="form.describe">
                                    <template slot="prepend">网站描述</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="编辑器风格：">
                                <el-radio-group v-model="form.editor">
                                    <el-radio label="markdown"
                                        >MarkDown编辑器</el-radio
                                    >
                                    <el-radio label="html"
                                        >富文本编辑器</el-radio
                                    >
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="form.pic" clearable>
                                    <template slot="prepend"
                                        >默认背景图</template
                                    >
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="form.max">
                                    <template slot="prepend"
                                        >图片大小限制</template
                                    >
                                    <template slot="append">MB</template>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <div class="btn">
                <el-button @click="save()" type="primary">保存</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                title: null,
                subtitle: null,
                keyword: null,
                editor: "markdown",
                describe: null,
                pic: null,
                max: null,
            },
        };
    },
    mounted() {
        this.$api.system.getSystem().then((res) => {
            res.forEach((val) => {
                this.form[val.key] = val.value;
            });
        });
    },
    methods: {
        save() {
            this.$refs["form"].validate((val) => {
                var form = this.form;
                if (val) {
                    this.$api.system.site(form).then((res) => {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: "success",
                        });
                    });
                }
            });
        },
    },
};
</script>