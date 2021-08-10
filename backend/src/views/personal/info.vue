<template>
    <div>
        <div class="top">
            <div class="content">
                <div class="left">
                    <div class="avatar">
                        <img :src="data.avatar" />
                    </div>
                </div>
                <div class="right">
                    <div class="t">{{ data.username }}</div>
                    <div class="b">
                        <div class="tabs">
                            <ul>
                                <li class="active">个人信息</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mid"></div>
        </div>
        <div class="main">
            <el-row>
                <el-col :span="10" :model="data">
                    <el-form ref="form">
                        <el-form-item label="昵称" label-width="100px">
                            <el-input v-model="data.username"></el-input>
                        </el-form-item>
                        <el-form-item label="Github_token" label-width="100px">
                            <el-input v-model="data.token"></el-input>
                        </el-form-item>
                        <el-form-item label="Github_主页" label-width="100px">
                            <el-input v-model="data.github"></el-input>
                        </el-form-item>
                        <el-form-item label="Blibli_mid" label-width="100px">
                            <el-input v-model="data.mid"></el-input>
                        </el-form-item>
                        <el-form-item label="Blibli_主页" label-width="100px">
                            <el-input v-model="data.blibli"></el-input>
                        </el-form-item>
                        <el-form-item label="个人邮箱" label-width="100px">
                            <el-input v-model="data.email"></el-input>
                        </el-form-item>
                        <el-button type="primary" @click="saveInfo()"
                            >保存</el-button
                        >
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: {},
        };
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        handle(index) {
            this.tabs.forEach((item, idx) => {
                item.active = false;
                if (index == idx) {
                    item.active = true;
                }
            });
        },
        getInfo() {
            this.$api.personal.getInfo().then((res) => {
                this.data = res;
            });
        },
        saveInfo() {
            this.$api.personal.saveInfo(this.data).then((res) => {
                this.$message({
                    type: "success",
                    message: res,
                });
            });
        },
    },
};
</script>

<style scoped>
li {
    list-style-type: none;
}

ul {
    margin: 0;
    padding: 0;
}

.top {
    margin: 15px;
    background: url(https://api.qblog.cc/uploads/top_pic/20210722/5c9d96b4250384a2a741be5779d2b27c.jpg)
        no-repeat;
    height: 335px;
    border-radius: 4px;
    object-fit: cover;
    object-position: center;
    position: relative;
    z-index: 1;
}

.top .content {
    padding: 0 40px;
    height: 100%;
    display: flex;
    align-items: flex-end;
    position: relative;
}

.top .left {
    margin-bottom: 30px;
}

.top .right {
    height: 120px;
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    margin-left: 35px;
}

.top .right > div {
    width: 100%;
    height: 60px;
}

.content .avatar {
    width: 150px;
    height: 150px;
}

.content .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid #000;
}

.top .mid {
    width: 100%;
    height: 60px;
    background: #191a23;
    position: absolute;
    top: 275px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: -1;
}

.content .right .t {
    color: #fff;
    font-size: 22px;
    font-weight: 600;
}

.tabs {
    height: 100%;
}

.tabs > ul {
    display: flex;
    height: 100%;
}

.tabs > ul > li {
    text-align: center;
    padding: 0 25px;
    display: flex;
    align-items: center;
    color: #5c5e6e;
    cursor: pointer;
    letter-spacing: 1px;
    font-weight: 600;
}

.tabs > ul > li.active,
.tabs > ul > li:hover {
    color: #fff;
    background-color: #1b1d2e;
    border-bottom: 3px solid #1488fa;
}

.main {
    margin: 15px;
    background: #fff;
    border-radius: 4px;
    padding: 15px;
}
</style>