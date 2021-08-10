<template>
    <el-card class="ele-body" shadow="nerve">
        <el-row>
            <el-col :span="24" style="margin-bottom: 10px">
                <el-button type="primary" @click="dialogFormVisible = true"
                    >添加友链</el-button
                >
            </el-col>
            <el-col :span="24">
                <el-table :data="data" border>
                    <el-table-column prop="title" label="标题" align="center" />
                    <el-table-column prop="dsc" label="描述" align="center" />
                    <el-table-column prop="link" label="链接" align="center" />
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.status"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                :active-value="1"
                                :inactive-value="0"
                                @change="changeStatus(scope.row)"
                            >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="添加时间" align="center">
                        <template slot-scope="scope">
                            {{ (scope.row.add_time * 1000) | toDateString }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="small"
                                style="margin-right: 5px"
                                @click="editLink(scope.row.id)"
                                >编辑</el-button
                            >
                            <el-popconfirm
                                title="确定删除吗？"
                                @confirm="
                                    deleteLink(scope.$index, scope.row.id)
                                "
                            >
                                <el-button
                                    type="danger"
                                    size="small"
                                    style="margin-left: 5px"
                                    slot="reference"
                                    >删除</el-button
                                >
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <!-- 弹出框 -->
        <el-dialog
            :title="form.id ? '修改友链' : '添加友链'"
            :visible.sync="dialogFormVisible"
            @close="close"
        >
            <el-row>
                <el-form :model="form" :rules="rules">
                    <el-col :span="12">
                        <el-form-item
                            prop="title"
                            label="网站标题"
                            label-width="80px"
                        >
                            <el-input
                                v-model="form.title"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            prop="link"
                            label="网站链接"
                            label-width="80px"
                        >
                            <el-input
                                v-model="form.link"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            prop="dsc"
                            label="网站描述"
                            label-width="80px"
                        >
                            <el-input
                                v-model="form.dsc"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="状态" label-width="80px">
                            <el-switch
                                v-model="form.status"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                :active-value="1"
                                :inactive-value="0"
                            >
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addLink(form)"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            data: [],
            dialogFormVisible: false,
            form: {},
            rules: {
                title: [
                    {
                        required: true,
                        message: "请输入网站标题",
                        trigger: "change",
                    },
                ],
                dsc: [
                    {
                        required: true,
                        message: "请输入网站描述",
                        trigger: "change",
                    },
                ],
                link: [
                    {
                        required: true,
                        message: "请输入网站链接",
                        trigger: "change",
                    },
                ],
            },
        };
    },
    mounted() {
        this.getLink();
    },
    methods: {
        getLink() {
            this.$api.link.getLink().then((res) => {
                this.data = res;
            });
        },
        deleteLink(idx, id) {
            this.$api.link.deleteLink({ id }).then((res) => {
                this.$message({
                    type: "success",
                    message: res,
                });
                this.data.splice(idx, 1);
            });
        },
        editLink(id) {
            this.form = { id };
            this.$api.link.getLink({ id }).then((res) => {
                this.form = res;
            });
            this.dialogFormVisible = true;
        },
        addLink(form) {
            this.$api.link.addLink(form).then((res) => {
                this.$message({
                    type: "success",
                    message: res,
                });
                this.dialogFormVisible = false;
                if (!form.id) {
                    this.data.push(form);
                }
                this.form = {};
                this.getLink();
            });
        },
        changeStatus(val) {
            this.$api.link
                .changeStatus({ id: val.id, status: val.status })
                .then((res) => {
                    this.$message({
                        type: "success",
                        message: res,
                    });
                });
        },
        close() {
            this.form = {};
        },
    },
};
</script>

<style>
</style>