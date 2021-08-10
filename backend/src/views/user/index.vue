<template>
    <el-card class="ele-body" shadow="never">
        <el-form
            label-width="77px"
            class="ele-form-search"
            @keyup.enter.native="query"
            @submit.native.prevent
        >
            <el-row :gutter="15">
                <el-col :md="6" :sm="12">
                    <el-form-item label="用户名:">
                        <el-input
                            v-model="where.username"
                            placeholder="请输入用户名"
                            clearable
                        />
                    </el-form-item>
                </el-col>
                <el-col :md="9" :sm="12">
                    <div class="ele-form-actions">
                        <el-button
                            @click="query()"
                            type="primary"
                            icon="el-icon-search"
                            class="ele-btn-icon is-plain"
                            >查询</el-button
                        >
                        <el-button
                            @click="add()"
                            type="primary"
                            icon="el-icon-plus"
                            class="ele-btn-icon is-plain"
                            >添加</el-button
                        >
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <el-table :data="data" border style="width: 100%">
            <el-table-column
                type="index"
                label="编号"
                width="50"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="nickname"
                label="昵称"
                width="120"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户名"
                width="200"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="avatar"
                label="头像"
                width="120"
                align="center"
            >
                <template slot-scope="{ row }">
                    <el-avatar
                        shape="square"
                        :size="50"
                        :src="row.avatar"
                    ></el-avatar>
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="100"
                align="center"
            >
                <template slot-scope="{ row }">
                    <el-switch
                        v-model="row.status"
                        active-color="#00A854"
                        :active-value="1"
                        inactive-color="#F04134"
                        :inactive-value="0"
                        @change="isNo(row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                prop="identity"
                label="身份"
                width="120"
                align="center"
            >
                <template slot-scope="{ row }">
                    {{ row.identity == 0 ? "用户" : "管理员" }}
                </template>
            </el-table-column>
            <el-table-column
                prop="addtime"
                label="注册时间"
                min-width="180"
                align="center"
            >
                <template slot-scope="{ row }">{{
                    (row.addtime * 1000) | toDateString
                }}</template>
            </el-table-column>
            <el-table-column
                prop="lasttime"
                label="登录时间"
                min-width="180"
                align="center"
            >
                <template slot-scope="{ row }">{{
                    (row.lasttime * 1000) | toDateString
                }}</template>
            </el-table-column>
            <el-table-column
                prop="addip"
                label="注册 IP"
                min-width="160"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="loginip"
                label="登录 IP"
                min-width="160"
                align="center"
            >
            </el-table-column>
            <el-table-column
                label="操作"
                min-width="180"
                align="center"
                :resizable="false"
                fixed="right"
            >
                <template slot-scope="{ row }">
                    <el-link
                        @click="edit(row)"
                        icon="el-icon-edit"
                        type="primary"
                        :underline="false"
                        >修改</el-link
                    >
                    <el-popconfirm
                        title="确定要删除此菜单吗？"
                        @confirm="remove(row)"
                        class="ele-action"
                    >
                        <el-link
                            slot="reference"
                            icon="el-icon-delete"
                            type="danger"
                            :underline="false"
                            >删除</el-link
                        >
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            :title="form.id ? '修改会员' : '添加会员'"
            :visible.sync="showEdit"
            width="600px"
            @closed="form = {}"
            :destroy-on-close="true"
            custom-class="ele-dialog-form"
            :lock-scroll="false"
        >
            <el-form
                :model="form"
                ref="editForm"
                :rules="rules"
                label-width="82px"
                @keyup.enter.native="save"
                @submit.native.prevent
            >
                <el-row :gutter="15">
                    <el-col :sm="12">
                        <el-form-item label="用户名:" prop="username">
                            <el-input
                                v-model="form.username"
                                placeholder="请输入用户名"
                                clearable
                            />
                        </el-form-item>
                        <el-form-item label="密码:" prop="password">
                            <el-input
                                v-model="form.password"
                                placeholder="请输入密码"
                                clearable
                                show-password
                            />
                        </el-form-item>
                        <el-form-item label="身份:">
                            <el-radio-group v-model="form.identity">
                                <el-radio :label="0">用户</el-radio>
                                <el-radio :label="1">管理员</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="12">
                        <el-form-item label="昵称:" prop="nickname">
                            <el-input
                                v-model="form.nickname"
                                placeholder="请输入昵称"
                                clearable
                            />
                        </el-form-item>
                        <el-form-item label="状态:">
                            <el-radio-group v-model="form.status">
                                <el-radio :label="1">正常</el-radio>
                                <el-radio :label="0">禁用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button @click="showEdit = false">取消</el-button>&nbsp;
                <el-button type="primary" @click="save">保存</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            data: [], // 列表数据
            showEdit: false, // 是否显示表单弹窗
            form: {}, // 表单数据
            where: {}, // 搜索条件
            rules: {
                // 表单验证规则
                username: [
                    {
                        required: true,
                        message: "请输入登录名",
                        trigger: "blur",
                    },
                ],
                nickname: [
                    {
                        required: true,
                        message: "请输入昵称",
                        trigger: "blur",
                    },
                ],
                // password: [
                //     {
                //         required: true,
                //         message: "请输入密码",
                //         trigger: "blur",
                //     },
                // ],
            },
        };
    },
    created() {
        this.query();
    },
    methods: {
        query() {
            this.loading = true;
            this.$api.user
                .list(this.where)
                .then((res) => {
                    this.loading = false;
                    this.data = res;
                })
                .catch((e) => {
                    this.loading = false;
                    this.$message.error(e.message);
                });
        },
        isNo(res) {
            this.$api.user
                .list({ status: res.status, id: res.id })
                .then((res) => {
                    this.$message({
                        type: "success",
                        message: res.msg,
                    });
                });
        },
        add(row) {
            this.form = { status: 1, identity: 0 };
            this.showEdit = true;
        },
        edit(row) {
            this.form = row;
            this.showEdit = true;
        },
        save() {
            this.$refs["editForm"].validate((valid) => {
                if (valid) {
                    const loading = this.$loading({ lock: true });
                    this.$api.user
                        .save(this.form)
                        .then((res) => {
                            loading.close();
                            this.showEdit = false;
                            this.$message({
                                type: "success",
                                message: res.msg,
                            });
                            if (this.form.id) {
                                // 更新数据
                                this.$util.eachTreeData(this.data, (item) => {
                                    if (item.id === this.form.id) {
                                        Object.assign(item, this.form);
                                        return false;
                                    }
                                });
                            } else {
                                this.query();
                            }
                        })
                        .catch((e) => {
                            loading.close();
                            this.$message.error(e.message);
                        });
                } else {
                    return false;
                }
            });
        },
    },
};
</script>