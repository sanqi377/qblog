<template>
    <div>
        <div v-if="top_pic">
            <div class="headpic-preview">
                <img :src="top_pic" />
                <div class="replace">
                    <el-upload
                        class="replace-uploader"
                        :action="
                            this.$setting.baseURL + this.$setting.baseUloads
                        "
                        :headers="token"
                        :show-file-list="false"
                        :on-success="uploadSuccess"
                        :before-upload="beforeUpload"
                    >
                        <div>重新上传</div>
                    </el-upload>
                </div>
            </div>
        </div>
        <div v-else>
            <el-upload
                class="headpic-uploader"
                :action="this.$setting.baseURL + this.$setting.baseUloads"
                :headers="token"
                :show-file-list="false"
                :limit="1"
                :on-success="uploadSuccess"
                :before-upload="beforeUpload"
            >
                <i class="el-icon-picture"></i>
            </el-upload>
        </div>
        <el-card class="ele-body" shadow="never" style="margin-top: 20px">
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-col :span="19">
                        <el-input
                            v-model="content.title"
                            maxlength="100"
                            show-word-limit
                            placeholder="请输入文章标题"
                            style="border-bottom: 0"
                        >
                            <template slot="prepend">标题</template></el-input
                        >
                        <div class="markdown">
                            <v-md-editor
                                v-model="content.value"
                                height="600px"
                                :disabled-menus="[]"
                                @change="getChange"
                                left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code emoji tip | customToolbar1 save"
                                :toolbar="toolbar"
                                @upload-image="handleUploadImage"
                            ></v-md-editor>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="side">
                            <div class="cat">
                                <div class="title">分类：</div>
                                <div class="item">
                                    <ul>
                                        <li
                                            v-for="item in cats"
                                            :key="item.id"
                                            @click="active(item.id)"
                                        >
                                            <span
                                                :class="
                                                    item.active ? 'active' : ''
                                                "
                                                >{{ item.name }}</span
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="btn">
                                <el-button size="small" plain>存草稿</el-button>
                                <el-button
                                    size="small"
                                    type="primary"
                                    @click="getContent()"
                                    >{{ isEdit ? "更新" : "发布" }}</el-button
                                >
                            </div>
                        </div>
                    </el-col>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import "@/components/MarkDown/index";

export default {
    data() {
        return {
            content: {},
            top_pic: null,
            token: null,
            isEdit: false,
            cats: {},
            toolbar: {
                customToolbar1: {
                    title: "插入B站视频",
                    icon: "v-md-icon-tip",
                    action(editor) {
                        editor.insert(function (selected) {
                            console.log(selected);
                            const prefix = "!";
                            const suffix = "[blibli]";
                            const placeholder = "请输入视频地址";
                            const content = selected || placeholder;
                            return {
                                text: `${prefix}${content}${suffix}`,
                                selected: content,
                            };
                        });
                    },
                },
            },
        };
    },
    created() {
        this.token = {
            Authorization: this.$store.state.token,
        };
        this.getCats();
    },
    mounted() {
        if (this.$route.params.id) {
            this.isEdit = true;
            this.getArticle(this.$route.params.id);
        }
    },
    methods: {
        active(id) {
            this.cats.forEach((item) => {
                if (item.id == id) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            });
        },
        getArticle(id) {
            this.$api.article.getArticleDetails({ id }).then((res) => {
                this.content = res;
                this.top_pic = res.top_pic;
                var that = this;
                setTimeout(() => {
                    that.active(res.cat);
                }, 100);
            });
        },
        // 上传文章封面
        uploadSuccess(res) {
            this.content["top_pic"] =
                this.$setting.baseURL + "/uploads/" + res.data.src;
            this.top_pic = this.content["top_pic"];
            this.$message({
                type: "success",
                message: res.data.msg,
            });
        },
        // 获取文章分类
        getCats() {
            this.$api.article.getCats().then((res) => {
                let arr = [];
                res.forEach((item) => {
                    item.active = false;
                    arr.push(item);
                });
                this.cats = arr;
            });
        },
        // 获取文章内容
        getContent() {
            if (this.isEdit) {
                this.content.isEdit = true;
            }
            var catId;
            this.cats.forEach((item) => {
                if (item.active) {
                    catId = item.id;
                }
            });
            console.log(catId);
            this.content.catId = catId;
            var content = this.content;

            // 

            // 

            console.log(content.content);
            if (!content.title) {
                this.$message({
                    message: "请输入文章标题",
                    type: "warning",
                });
                return;
            }
            if (!content.content) {
                this.$message({
                    message: "请输入文章内容",
                    type: "warning",
                });
                return;
            }
            if (content.catId.length == 0) {
                this.$message({
                    message: "请选择文章分类",
                    type: "warning",
                });
                return;
            }

            this.$api.article.new(this.content).then((res) => {
                this.$message({
                    message: res,
                    type: "success",
                });
                this.cats.forEach((item) => {
                    item.active = false;
                });
                this.content = {};
                this.top_pic = null;
                this.isEdit = false;
            });
        },
        getChange(md, html) {
            this.content.value = md;
            this.content.content = html;
        },
        handleUploadImage(event, insertImage, files) {
            // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
            var file = files[0];
            var formdata = new FormData(); //formdata格式
            formdata.append("file", file); //图片文件
            formdata.append("name", file.name); //其他参数

            console.log(formdata.get("file"));
            this.$api.common.upload(formdata).then((res) => {
                if (res.error) {
                    this.$message({
                        type: "warning",
                        message: res.msg,
                    });
                    return false;
                }
                insertImage({
                    url: this.$setting.baseURL + "/uploads/" + res.src,
                    desc: "",
                });
            });
        },
        beforeUpload(file) {
            var size = file.size / 1024 / 1024;
            var maxSize = localStorage.getItem("fileMax");
            if (size > maxSize) {
                this.$message({
                    type: "warning",
                    message:
                        "应上传小于" +
                        this.$store.state.systemInfo.max +
                        "MB 的图片",
                });
                return false;
            }
        },
    },
};
</script>

<style scoped>
.headpic-uploader {
    position: relative;
    text-align: center;
    height: 200px;
    background: #f6f6f6;
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.headpic-uploader >>> .el-upload {
    width: 100%;
    height: 100%;
    display: flex !important;
    justify-content: center;
    align-items: center;
}

.headpic-uploader >>> .el-upload:hover:after {
    bottom: 40px;
}

.el-icon-picture {
    color: #c9c9c9;
    font-size: 40px;
}

.replace {
    position: absolute;
    top: 15px;
    right: 15px;
    border: 1px solid #fff;
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff;
    background: fade(#000, 20%);
    cursor: pointer;
    transition: all 0.5s;
}

.replace:hover {
    background: fade(#000, 70%);
}

.release {
    border-top: 1px solid #ccd0d4;
    padding: 10px;
    background: #f5f5f5;
    font-size: 13px;
}

.headpic-preview {
    position: relative;
    text-align: center;
    height: 200px;
    background: #f6f6f6;
    margin: 15px;
    overflow: hidden;
}

.headpic-preview img {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    background-position-x: center;
    background-position-y: center;
    background-size: cover;
    filter: brightness(0.7);
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.ele-body >>> .el-input-group,
.ele-body >>> .el-input__inner {
    height: 55px;
}

.markdown {
    margin-top: 20px;
}

.v-md-editor {
    box-shadow: none;
    border: 1px solid #dcdfe6;
}

.side {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 15px;
}

.side .cat .item > ul {
    display: flex;
    margin-top: 15px;
    width: 100%;
    flex-wrap: wrap;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 2px dashed #ccc;
}

.side .cat .item > ul li {
    font-size: 14px;
    line-height: 28px;
    width: 33.33%;
    height: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    border-radius: 2px;
    cursor: pointer;
    display: flex;
}

.side .cat .item > ul li span {
    display: flex;
    justify-content: center;
    width: 90%;
    color: #86909c;
    background-color: #f4f5f5;
}

.side .cat .item > ul li:hover span {
    background-color: #e5e6eb;
}

.side .cat .item > ul li span.active {
    color: #1d7dfa;
    background-color: #e8f3ff;
}

.side .btn {
    display: flex;
    justify-content: flex-end;
}
</style>