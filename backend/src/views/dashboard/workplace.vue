<template>
    <div class="ele-body">
        <el-card shadow="never" body-style="padding: 20px;">
            <div class="ele-cell workplace-user-card">
                <div class="ele-cell-content ele-cell">
                    <el-avatar :size="68" :src="$store.state.userinfo.avatar" />
                    <div class="ele-cell-content" style="overflow: hidden">
                        <h4 class="ele-elip">
                            Hi~
                            {{ $store.state.userinfo.nickname }}，来记点什么吧！
                        </h4>
                        <div
                            class="ele-text-secondary ele-elip"
                            style="margin-top: 8px"
                        >
                            <i class="el-icon-_fire"></i><s /><s />{{
                                hitokoto.content
                            }}
                        </div>
                    </div>
                </div>
                <div class="workplace-count-group">
                    <div class="workplace-count-item">
                        <div class="workplace-count-header">
                            <el-tag size="small" class="ele-tag-round"
                                ><i class="el-icon-_feedback"></i
                            ></el-tag>
                            <span class="workplace-count-name">文章数</span>
                        </div>
                        <div class="workplace-count-num">
                            {{ info.articleCount }}
                        </div>
                    </div>
                    <div class="workplace-count-item">
                        <div class="workplace-count-header">
                            <el-tag
                                type="success"
                                size="small"
                                class="ele-tag-round"
                                ><i class="el-icon-chat-line-square"></i
                            ></el-tag>
                            <span class="workplace-count-name">评论数</span>
                        </div>
                        <div class="workplace-count-num">
                            {{ info.commentCount }}
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <el-row :gutter="15">
            <el-col :md="3" :sm="6" :xs="12">
                <el-card shadow="hover" body-style="padding:0;">
                    <div
                        class="app-link-block"
                        @click="$router.push('/system/user')"
                    >
                        <i class="app-link-icon el-icon-user"></i>
                        <div class="app-link-title">用户</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :md="3" :sm="6" :xs="12">
                <el-card shadow="hover" body-style="padding:0;">
                    <div class="app-link-block">
                        <i
                            class="app-link-icon el-icon-data-line"
                            style="color: #95de64"
                        ></i>
                        <div class="app-link-title">分析</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :md="3" :sm="6" :xs="12">
                <el-card shadow="hover" body-style="padding:0;">
                    <div class="app-link-block">
                        <i
                            class="app-link-icon el-icon-shopping-cart-2"
                            style="color: #ff9c6e"
                        ></i>
                        <div class="app-link-title">商品</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :md="3" :sm="6" :xs="12">
                <el-card shadow="hover" body-style="padding:0;">
                    <div class="app-link-block">
                        <i
                            class="app-link-icon el-icon-tickets"
                            style="color: #b37feb"
                        ></i>
                        <div class="app-link-title">订单</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :md="3" :sm="6" :xs="12">
                <el-card shadow="hover" body-style="padding:0;">
                    <div class="app-link-block">
                        <i
                            class="app-link-icon el-icon-bank-card"
                            style="color: #ffd666"
                        ></i>
                        <div class="app-link-title">票据</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :md="3" :sm="6" :xs="12">
                <el-card shadow="hover" body-style="padding:0;">
                    <div class="app-link-block">
                        <i
                            class="app-link-icon el-icon-message"
                            style="color: #5cdbd3"
                        ></i>
                        <div class="app-link-title">消息</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :md="3" :sm="6" :xs="12">
                <el-card shadow="hover" body-style="padding:0;">
                    <div class="app-link-block">
                        <i
                            class="app-link-icon el-icon-discount"
                            style="color: #ff85c0"
                        ></i>
                        <div class="app-link-title">标签</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :md="3" :sm="6" :xs="12">
                <el-card shadow="hover" body-style="padding:0;">
                    <div class="app-link-block">
                        <i
                            class="app-link-icon el-icon-s-operation"
                            style="color: #ffc069"
                        ></i>
                        <div class="app-link-title">配置</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="8">
                <div class="draft">
                    <i class="el-icon-_feedback"></i>
                    <span
                        style="font-size: 16px; position: relative; bottom: 2px"
                        >心之所想，快速撰写</span
                    >
                    <el-divider></el-divider>
                    <el-form
                        :model="ruleForm"
                        :rules="rules"
                        label-position="top"
                        ref="ruleForm"
                    >
                        <el-form-item label="标题" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="内容" prop="content">
                            <el-input
                                v-model="ruleForm.content"
                                type="textarea"
                                :rows="7"
                                placeholder="在想些什么？"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                @click="submitForm('ruleForm')"
                                style="display: flex; margin-left: auto"
                                type="primary"
                                plain
                                >保存草稿</el-button
                            >
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="grid-content bg-purple">待定</div>
            </el-col>
            <el-col :span="6">
                <div class="online">
                    <i class="el-icon-_lamp"></i>
                    <span style="font-size: 16px">在线用户</span>
                    <el-divider></el-divider>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            info: {},
            hitokoto: "",
            ruleForm: {
                name: "",
                content: "",
            },
            rules: {
                name: [
                    { required: true, message: "请填写标题", trigger: "blur" },
                ],
                content: [
                    { required: true, message: "请填写内容", trigger: "blur" },
                ],
            },
        };
    },
    mounted() {
        this.getHitokoto();
        this.getInfo();
    },
    methods: {
        getHitokoto() {
            this.$api.external
                .hitokoto()
                .then((res) => {
                    this.hitokoto = res;
                })
                .catch(() => {
                    this.hitokoto =
                        "就算风吹散了冰雪，想念也会留存下来。——滑头鬼之孙";
                });
        },
        getInfo() {
            this.$api.external.getInfo().then((res) => {
                this.info = res;
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                // if (valid) {
                // alert('submit!');
                // } else {
                // console.log('error submit!!');
                // return false;
                // }
            });
        },
    },
};
</script>
<style lang="less" scoped>
.draft {
    background: #fff;
    padding: 20px;

    .el-icon-_feedback {
        font-size: 28px;
        color: #409eff;
        margin-right: 5px;
    }
}

.online {
    background: #fff;
    padding: 20px;

    .el-icon-_lamp {
        font-size: 28px;
        color: #409eff;
        margin-right: 5px;
    }
}

.el-divider--horizontal {
    margin: 15px 0;
}

.workplace-count-group {
    white-space: nowrap;
}

.workplace-count-item {
    padding: 0 5px 0 25px;
    box-sizing: border-box;
    display: inline-block;
    text-align: right;
}

.workplace-count-name {
    padding-left: 5px;
}

.workplace-count-num {
    font-size: 23px;
    margin-top: 6px;
}

.el-card {
    margin-bottom: 15px;
}

.app-link-block {
    cursor: pointer;
    text-align: center;
    padding: 15px 0;
}

.app-link-block .app-link-icon {
    color: #69c0ff;
    font-size: 30px;
    margin-top: 5px;
}

.app-link-block .app-link-title {
    margin-top: 8px;
}

.ele-cell:not(.ele-cell-align-top) {
    align-items: center;
}

.ele-cell {
    display: flex;
}

.ele-cell > .ele-cell-content {
    flex: 1;
    box-sizing: border-box;
}

.el-avatar {
    overflow: hidden;
}

.ele-cell > * + .ele-cell-content {
    padding-left: 10px;
}

.ele-elip {
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
}

h4 {
    font-size: 20px;
    color: #262626;
    font-weight: 500;
    margin: 0;
}

.ele-text-secondary {
    color: #8c8c8c;
}

.el-tag--small {
    line-height: 24px;
    padding: 0 5px;
}

s {
    padding: 0 0.125em;
}
</style>