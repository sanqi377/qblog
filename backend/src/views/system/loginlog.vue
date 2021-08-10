<template>
    <el-card class="ele-body" shadow="never">
        <el-form
            :model="where"
            label-width="77px"
            class="ele-form-search"
            @keyup.enter.native="query"
            @submit.native.prevent
        >
            <el-row :gutter="15">
                <el-col :md="6" :sm="12">
                    <el-form-item label="用户账号:">
                        <el-input
                            v-model="where.user_name"
                            placeholder="请输入用户账号"
                            clearable
                        />
                    </el-form-item>
                </el-col>
                <el-col :md="9" :sm="12">
                    <div class="ele-form-actions">
                        <el-button
                            @click="query"
                            type="primary"
                            icon="el-icon-search"
                            class="ele-btn-icon is-plain"
                            >查询</el-button
                        >
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <el-table :data="data" border style="width: 100%">
            <el-table-column
                type="index"
                label="编号"
                width="180"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="user_name"
                label="用户名"
                width="180"
                align="center"
            >
            </el-table-column>
            <el-table-column label="登录时间" align="center">
                <template slot-scope="{ row }">{{
                    (row.create_time * 1000) | toDateString
                }}</template>
            </el-table-column>
            <el-table-column prop="login_ip" label="登录 IP" align="center">
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            where: {},
            data: [],
            form: {}, // 表单数据
        };
    },
    created() {
        this.getdata();
    },
    methods: {
        getdata() {
            this.$api.system.loginlog().then((res) => {
                this.data = res;
            });
        },
        query() {
            this.loading = true;
            this.$api.system
                .loginlog(this.where)
                .then((res) => {
                    this.loading = false;
                    this.data = res;
                })
                .catch((e) => {
                    this.loading = false;
                    this.$message.error(e.message);
                });
        },
    },
};
</script>