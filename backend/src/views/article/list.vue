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
                    <el-form-item label="文章标题:">
                        <el-input
                            v-model="where.title"
                            placeholder="请输入查询标题"
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
                            >查询
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <el-table :data="data" border style="width: 100%">
            <el-table-column
                prop="title"
                label="标题"
                width="800"
                align="center"
            />
            <!-- <el-table-column
                prop="author"
                label="作者"
                width="150"
                align="center"
            /> -->
            <el-table-column label="分类" width="200" align="center">
                <template slot-scope="{ row }">
                    <div v-html="'<span>' + row.cat + '</span>'"></div>
                </template>
            </el-table-column>
            <!-- <el-table-column label="标签" width="200" align="center" /> -->
            <el-table-column label="发布日期" width="400" align="center">
                <template slot-scope="{ row }">{{
                    (row.add_time * 1000) | toDateString
                }}</template>
            </el-table-column>
            <el-table-column label="更新日期" width="400" align="center">
                <template slot-scope="{ row }">{{
                    (row.update_time * 1000) | toDateString
                }}</template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center">
                <template slot-scope="scope">
                    <el-button
                        style="margin-right: 8px"
                        size="mini"
                        @click="handleEdit(scope.row)"
                        >编辑</el-button
                    >
                    <el-popconfirm
                        title="这是一段内容确定删除吗？"
                        @confirm="handleDelete(scope.$index, scope.row)"
                    >
                        <el-button
                            style="margin-left: 8px"
                            size="mini"
                            type="danger"
                            slot="reference"
                            >删除</el-button
                        >
                    </el-popconfirm>
                </template>
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
            this.$api.article.getArticle().then((res) => {
                this.data = res;
            });
        },
        query() {
            this.loading = true;
            this.$api.article
                .getArticle(this.where)
                .then((res) => {
                    this.loading = false;
                    this.data = res;
                })
                .catch((e) => {
                    this.loading = false;
                    this.$message.error(e.message);
                });
        },
        handleDelete(index, row) {
            this.$api.article.deleteArticle({ id: row.id }).then((res) => {
                this.data.splice(index, index + 1);
                this.$message({
                    type: "success",
                    message: res.msg,
                });
            });
        },
        handleEdit(row) {
            this.$router.push({
                name: "/article/new",
                params: { id: row.id },
            });
        },
    },
};
</script>