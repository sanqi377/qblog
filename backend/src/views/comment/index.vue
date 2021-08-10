<template>
    <el-card class="ele-body" shadow="never">
        <el-table
            :data="data"
            row-key="add_time"
            :tree-props="{ children: 'children' }"
            border
        >
            <el-table-column prop="title" label="评论文章" align="center" />
            <el-table-column prop="user_name" label="评论用户" align="center" />
            <el-table-column
                prop="user_email"
                label="评论邮箱"
                align="center"
            />
            <el-table-column prop="user_website" label="网站" align="center" />
            <el-table-column prop="content" label="评论内容" align="center" />
            <el-table-column label="评论时间" align="center">
                <template slot-scope="{ row }">{{
                    (row.add_time * 1000) | toDateString
                }}</template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center">
                <template slot-scope="{ row }">
                    <el-button
                        style="margin-right: 8px"
                        size="mini"
                        @click="editComment(row.id)"
                        >编辑</el-button
                    >
                    <el-popconfirm
                        title="这是一段内容确定删除吗？"
                        @confirm="deleteComment(row.id)"
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
            data: [],
        };
    },
    created() {
        this.getCommentList();
    },
    methods: {
        getCommentList() {
            this.$api.comment.getCommentList().then((res) => {
                this.data = res;
            });
        },
        deleteComment(id) {
            this.$api.comment.deleteComment({ id }).then((res) => {
                this.$message({
                    type: "success",
                    message: res,
                    onClose: () => {
                        this.$router.replace({
                            path: "/refresh",
                            query: {
                                t: Date.now(),
                            },
                        });
                    },
                });
            });
        },
        editComment(id) {
            this.$api.comment.editComment({ id }).then((res) => {
                console.log(res);
            });
            console.log(id);
        },
    },
};
</script>

<style>
</style>