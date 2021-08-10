<template>
    <div class="login-wrapper">
        <el-form
            ref="loginForm"
            :model="form"
            :rules="rules"
            class="login-form ele-bg-white"
            size="large"
            @keyup.enter.native="doSubmit"
        >
            <h4>XQBlog - 后台登陆</h4>
            <el-form-item prop="username">
                <el-input
                    placeholder="请输入登录账号"
                    v-model="form.username"
                    prefix-icon="el-icon-user"
                    clearable
                />
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    placeholder="请输入登录密码"
                    v-model="form.password"
                    prefix-icon="el-icon-lock"
                    show-password
                />
            </el-form-item>
            <div class="el-form-item">
                <el-button
                    type="primary"
                    class="login-btn"
                    size="large"
                    @click="doSubmit"
                    :loading="loading"
                >
                    {{ loading ? "登录中" : "登录" }}
                </el-button>
            </div>
        </el-form>
        <div class="login-copyright">
            Copyright © 2021 www.xqblog.com. All rights reserved.
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false, // 加载状态
            form: {
                username: "admin",
                password: "123456",
            }, // 表单数据
            rules: {
                // 表单验证规则
                username: [
                    { required: true, message: "请输入账号", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                ],
            },
        };
    },
    methods: {
        doSubmit() {
            this.$refs["loginForm"].validate((valid) => {
                if (!valid) return false;
                this.loading = true;
                this.$api.user.login(this.form).then((res) => {
                    this.loading = false;
                    if (res.type == "success") {
                        this.$store.dispatch("setToken", res.token).then(() => {
                            this.$store
                                .dispatch("setUser", res.data)
                                .then(() => {
                                    this.$api.system
                                        .getSystem()
                                        .then((resp) => {
                                            console.log(resp);
                                            this.$store
                                                .dispatch("setSystem", resp)
                                                .then(() => {
                                                    this.$router.push("/");
                                                });
                                        });
                                });
                        });
                        this.$message({
                            type: res.type,
                            message: res.info,
                            center: true,
                        });
                    } else if (res.type == "error") {
                        this.$message({
                            type: res.type,
                            message: res.info,
                            center: true,
                        });
                    }
                });
            });
        },
    },
};
</script>

<style scoped>
.login-wrapper {
    padding: 50px 20px;
    position: relative;
    box-sizing: border-box;
    background-image: url("~@/assets/img/bg-login.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
}

.login-wrapper:before {
    content: "";
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.login-form {
    margin: 0 auto;
    width: 360px;
    max-width: 100%;
    padding: 25px 30px;
    position: relative;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    border-radius: 4px;
    z-index: 2;
    background: #fff;
}

.login-form h4 {
    text-align: center;
    margin: 0 0 25px 0;
}

.login-form > .el-form-item {
    margin-bottom: 25px;
}

.login-input-group {
    display: flex;
    align-items: center;
}

.login-input-group >>> .el-input {
    flex: 1;
}

.login-captcha {
    height: 38px;
    width: 102px;
    margin-left: 10px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    text-align: center;
    cursor: pointer;
}

.login-captcha:hover {
    opacity: 0.75;
}

.login-btn {
    display: block;
    width: 100%;
}

.login-oauth-icon {
    color: #fff;
    padding: 5px;
    margin: 0 10px;
    font-size: 18px;
    border-radius: 50%;
    cursor: pointer;
}

.login-copyright {
    color: #eee;
    padding-top: 20px;
    text-align: center;
    position: relative;
    z-index: 1;
}

@media screen and (min-height: 550px) {
    .login-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: -250px;
    }

    .login-copyright {
        position: absolute;
        bottom: 20px;
        right: 0;
        left: 0;
    }
}
</style>