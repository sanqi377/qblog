<template>
    <el-card class="ele-body" shadow="never">
        <el-table border :data="data">
            <el-table-column
                prop="title"
                label="页面名称"
                min-width="280"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="title"
                label="类型"
                min-width="80"
                align="center"
            >
                <template slot-scope="{ row }">
                    <el-tag
                        :type="row.type == 1 ? 'danger' : 'success'"
                        size="medium"
                        >{{ row.type == 1 ? "内置" : "自增" }}</el-tag
                    >
                </template>
            </el-table-column>
            <el-table-column label="状态" min-width="80" align="center">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="1"
                        :inactive-value="0"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="发布时间" min-width="100" align="center">
                <template slot-scope="{ row }">{{
                    (row.add_time * 1000) | toDateString
                }}</template>
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right"
                align="center"
                min-width="100"
            >
                <template slot-scope="scope">
                    <el-button
                        style="margin-right: 8px"
                        size="mini"
                        @click="handleEdit(scope.row)"
                        >{{ scope.row.type ? "说明" : "编辑" }}</el-button
                    >
                    <el-popconfirm
                        title="这是一段内容确定删除吗？"
                        @confirm="deletePages(scope.$index, scope.row.id)"
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
        this.getPages();
    },
    methods: {
        getPages() {
            this.$api.pages.getPages().then((res) => {
                this.data = res;
                console.log(res);
            });
        },
        deletePages(index, id) {
            this.$api.pages.deletePages({ id }).then((res) => {
                this.$message({
                    type: "success",
                    message: res,
                });
                this.data.splice(index, index + 1);
            });
        },
    },
};
</script>

<style>
</style>