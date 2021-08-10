<template>
    <el-card class="ele-body" shadow="never">
        <el-form ref="form" label-width="85px">
            <el-row>
                <el-col :span="18">
                    <el-form-item label="页面标题：">
                        <el-input v-model="data.title"></el-input>
                    </el-form-item>
                    <el-form-item label="页面地址：">
                        <el-input v-model="data.path"></el-input>
                    </el-form-item>
                    <div class="tinymce">
                        <myEditor
                            ref="editor"
                            :value="data.content"
                            @change="getChange"
                        ></myEditor>
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-card
                        class="box-card"
                        shadow="never"
                        style="margin-left: 25px"
                    >
                        <el-button type="primary" @click="submit()"
                            >发布</el-button
                        >
                    </el-card>
                </el-col>
            </el-row>
        </el-form>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            data: {},
        };
    },
    methods: {
        getChange(val) {
            this.data.content = val;
        },
        submit() {
            this.$api.pages.addPage(this.data).then((res) => {
                if (res) {
                    this.$message({
                        type: "success",
                        message: res,
                    });
                    this.data = {};
                    this.$refs.editor.content = "";
                }
            });
        },
    },
};
</script>

<style>
</style>