<template>
  <el-card class="ele-body" shadow="never">
    <!-- 搜索表单 -->
    <el-form
      :model="where"
      label-width="77px"
      class="ele-form-search"
      @keyup.enter.native="query"
      @submit.native.prevent
    >
      <el-row :gutter="15">
        <el-col :md="6" :sm="12">
          <el-form-item label="菜单名称:">
            <el-input
              v-model="where.title"
              placeholder="请输入菜单名称"
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
            <el-button
              @click="expendAll()"
              type="success"
              icon="el-icon-_fold"
              class="ele-btn-icon is-plain"
              >展开全部</el-button
            >
            <el-button
              @click="foldAll()"
              type="warning"
              icon="el-icon-_unfold"
              class="ele-btn-icon is-plain"
              >折叠全部</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-form>

    <!-- 数据表格 -->
    <el-table
      ref="table"
      :data="data"
      v-loading="loading"
      row-key="id"
      default-expand-all
      border
      height="calc(100vh - 205px)"
      highlight-current-row
    >
      <el-table-column
        label="编号"
        type="index"
        width="60"
        align="center"
        fixed="left"
        prop="id"
      />
      <el-table-column
        label="菜单名称"
        show-overflow-tooltip
        min-width="200"
        align="center"
      >
        <template slot-scope="{ row }"
          ><i :class="row.icon" /> {{ row.title }}</template
        >
      </el-table-column>
      <el-table-column
        label="路由地址"
        show-overflow-tooltip
        min-width="150"
        align="center"
      >
        <template slot-scope="{ row }">{{
          row.path ? row.path : "无"
        }}</template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        min-width="100"
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

      <el-table-column prop="sort" label="排序" width="60px" align="center" />
      <el-table-column
        label="创建时间"
        show-overflow-tooltip
        min-width="160"
        align="center"
      >
        <template slot-scope="{ row }">{{
          (row.create_time * 1000) | toDateString
        }}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="190px"
        align="center"
        :resizable="false"
        fixed="right"
      >
        <template slot-scope="{ row }">
          <el-link
            @click="add(row)"
            icon="el-icon-plus"
            type="primary"
            :underline="false"
            >添加</el-link
          >
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
    <!-- 编辑弹窗 -->
    <el-dialog
      :title="form.id ? '修改菜单' : '添加菜单'"
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
            <el-form-item label="上级菜单:">
              <treeselect
                v-model="form.pid"
                :options="data"
                placeholder="请选择上级菜单"
                :defaultExpandLevel="3"
                :normalizer="
                  (d) => {
                    return {
                      id: d.id,
                      label: d.title,
                      children: d.children || undefined,
                    };
                  }
                "
              />
            </el-form-item>
            <el-form-item label="菜单名称:" prop="title">
              <el-input
                v-model="form.title"
                placeholder="请输入菜单名称"
                clearable
              />
            </el-form-item>
            <el-form-item label="菜单图标:">
              <ele-icon-picker
                v-model="form.icon"
                placeholder="请选择菜单图标"
              />
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="路由地址:">
              <el-input
                v-model="form.path"
                placeholder="请输入路由地址"
                clearable
              />
            </el-form-item>
            <el-form-item label="排序号:" prop="sort">
              <el-input-number
                v-model="form.sort"
                :min="0"
                placeholder="请输入排序号"
                class="ele-fluid ele-text-left"
              />
            </el-form-item>
            <el-form-item label="菜单状态:">
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
        <el-button type="primary" @click="save()">保存</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect"; // 下拉树
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "SysMenu",
  components: { Treeselect },
  data() {
    return {
      loading: true, // 加载状态
      where: {}, // 搜索条件
      data: [], // 列表数据
      showEdit: false, // 是否显示表单弹窗
      form: {}, // 表单数据
      rules: {
        // 表单验证规则
        title: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur",
          },
        ],
        sort: [
          {
            required: true,
            message: "请输入排序号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    isNo(res) {
      this.$api.system.menu({ status: res.status, id: res.id }).then((res) => {
        this.$message({
          type: "success",
          message: res,
        });
      });
    },
    /* 查询 */
    query() {
      this.loading = true;
      this.$api.system
        .menu(this.where)
        .then((res) => {
          this.loading = false;
          this.data = this.$util.toTreeData(res, "id", "pid");
        })
        .catch((e) => {
          this.loading = false;
          this.$message.error(e.message);
        });
    },
    /* 显示添加 */
    add(row) {
      this.form = { status: 1, pid: row ? row.id : null };
      this.showEdit = true;
    },
    /* 显示编辑 */
    edit(row) {
      this.form = Object.assign({}, row, { pid: row.pid || null });
      this.showEdit = true;
    },
    /* 保存编辑 */
    save() {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          const loading = this.$loading({ lock: true });
          this.$api.menu
            .menuSave(
              Object.assign({}, this.form, {
                pid: this.form.pid || 0,
              })
            )
            .then((res) => {
              console.log(this.form);
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
    /**
     * 展开全部
     */
    expendAll() {
      this.data.forEach((d) => {
        this.$refs.table.toggleRowExpansion(d, true);
      });
    },
    /**
     * 折叠全部
     */
    foldAll() {
      this.data.forEach((d) => {
        this.$refs.table.toggleRowExpansion(d, false);
      });
    },
    // 删除
    remove(row) {
      if (row.children && row.children.length > 0)
        return this.$message.error("请先删除子节点");
      const loading = this.$loading({ lock: true });
      this.$api.menu
        .delect({ id: row.id })
        .then((res) => {
          loading.close();
          this.$message({
            type: "success",
            message: res.msg,
            onClose: () => {
              location.reload();
            },
          });
        })
        .catch((e) => {
          loading.close();
          this.$message.error(e.message);
        });
    },
  },
};
</script>