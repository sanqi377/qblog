<template>
    <div>
        <div class="bottom">
            <div class="tk-row">
                <div class="tk-avatar">
                    <div class="tk-avatar-img">
                        <div v-if="this.form.avatar">
                            <img :src="this.form.avatar" alt="" />
                        </div>
                        <div v-else>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 496 512"
                            >
                                <path
                                    d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="tk-col">
                    <div class="tk-meta-input">
                        <form ref="form">
                            <div class="tk-input">
                                <div class="tk-input-group">昵称</div>
                                <input
                                    type="text"
                                    class="tk-input-inner"
                                    placeholder="必填"
                                    id="user_name"
                                    v-model="form.user_name"
                                    autocomplete="off"
                                />
                            </div>
                            <div class="tk-input">
                                <div class="tk-input-group">邮箱</div>
                                <input
                                    type="email"
                                    class="tk-input-inner"
                                    placeholder="必填"
                                    id="user_email"
                                    v-model="form.user_email"
                                    autocomplete="off"
                                    @input="getAvatar()"
                                />
                            </div>
                            <div class="tk-input">
                                <div class="tk-input-group">网址</div>
                                <input
                                    type="text"
                                    class="tk-input-inner"
                                    placeholder="选填"
                                    id="user_website"
                                    v-model="form.user_website"
                                    autocomplete="off"
                                />
                            </div>
                        </form>
                    </div>
                    <div class="tk-input tk-textarea">
                        <textarea
                            autocomplete="off"
                            class="tk-textarea-inner"
                            style="min-height: 75px; height: 75px"
                            v-model="form.content"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="tk-row actions">
            <div class="tk-row-actions-start">
                <div class="tk-action-icon OwO">
                    <div class="OwO-logo">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 496 512"
                        >
                            <path
                                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm141.4 389.4c-37.8 37.8-88 58.6-141.4 58.6s-103.6-20.8-141.4-58.6S48 309.4 48 256s20.8-103.6 58.6-141.4S194.6 56 248 56s103.6 20.8 141.4 58.6S448 202.6 448 256s-20.8 103.6-58.6 141.4zM328 224c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm-160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm194.4 64H133.6c-8.2 0-14.5 7-13.5 15 7.5 59.2 58.9 105 121.1 105h13.6c62.2 0 113.6-45.8 121.1-105 1-8-5.3-15-13.5-15z"
                            ></path>
                        </svg>
                    </div>
                </div>
                <div class="tk-action-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"
                        ></path>
                    </svg>
                </div>
            </div>
            <button
                class="tk-button"
                type="button"
                v-show="isReply"
                @click="close()"
            >
                <span>取消</span>
            </button>
            <!-- <button class="tk-button" type="button">
                    <span>预览</span>
                </button> -->
            <button
                class="tk-button primary"
                type="button"
                @click="isReply ? replySubmit() : submit()"
            >
                <span>发送</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Content",
    data() {
        return {
            form: {},
        };
    },
    props: ["id", "isReply"],
    mounted() {
        if (!this.isReply) {
            this.form.article_id = this.id;
        } else {
            this.form.remark_id = this.id;
        }
    },
    methods: {
        getAvatar() {
            if (this.form.user_email) {
                this.form.avatar =
                    "https://sdn.geekzu.org/avatar/" +
                    this.$md5(this.form.user_email);
            }
        },
        submit() {
            this.$refs["form"].forEach((item) => {
                this.form[item.id] = item.value;
            });

            if (!this.form.user_name) {
                this.$toast.error({
                    message: "请填写评论昵称",
                    duration: 3000,
                });
            } else if (!this.form.user_email) {
                this.$toast.error({
                    message: "请填写评论邮箱",
                    duration: 3000,
                });
            } else if (!this.form.content) {
                this.$toast.error({
                    message: "请填写评论内容",
                    duration: 3000,
                });
            } else {
                this.$api.comment.addComment(this.form).then(() => {
                    this.$toast.success({
                        message: "评论成功",
                        duration: 2000,
                    });
                    this.form = {};
                    this.form.article_id = this.id;
                    this.$emit("getComment");
                });
            }
        },
        replySubmit() {
            this.$refs["form"].forEach((item) => {
                this.form[item.id] = item.value;
            });

            if (!this.form.user_name) {
                this.$toast.error({
                    message: "请填写回复昵称",
                    duration: 3000,
                });
            } else if (!this.form.user_email) {
                this.$toast.error({
                    message: "请填写回复邮箱",
                    duration: 3000,
                });
            } else if (!this.form.content) {
                this.$toast.error({
                    message: "请填写回复内容",
                    duration: 3000,
                });
            } else {
                this.$api.comment.addReply(this.form).then(() => {
                    this.$toast.success({
                        message: "回复成功",
                        duration: 2000,
                    });
                    this.form = {};
                    this.form.article_id = this.id;
                    this.$emit("getComment");
                    this.$emit("close");
                });
            }
        },
        close() {
            this.$emit("close");
        },
    },
};
</script>

<style scoped>
.tk-row {
    display: flex;
    flex-direction: row;
}

.tk-button.primary {
    /* color: #ffffffa0; */
    color: #fff;
    /* background-color: #409eff80; */
    background-color: #409eff;
    border-color: transparent;
    margin-left: 10px;
}

.tk-button:hover {
    color: #409eff;
    background-color: #409eff10;
    border-color: #409eff80;
}

.tk-row.actions {
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 3.5rem;
    align-items: center;
    justify-content: flex-end;
}

.tk-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: currentColor;
    background-color: #90939910;
    border-color: #90939950;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
}

.bottom {
    display: flex;
    flex-direction: column;
}

.bottom .tk-avatar {
    flex-shrink: 0;
    height: 2.5rem;
    width: 2.5rem;
    overflow: hidden;
    text-align: center;
    border-radius: 5px;
    margin-right: 1rem;
}

.bottom .tk-avatar-img {
    height: 2.5rem;
}

.bottom .tk-avatar-img svg,
img {
    width: 100%;
    height: 100%;
    fill: #c0c4cc;
}

.bottom .tk-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.bottom .tk-meta-input {
    margin-bottom: 0.5rem;
    display: flex;
}

.bottom .tk-meta-input > form {
    display: flex;
    justify-content: space-around;
    width: 100%;
}

.bottom .tk-input {
    display: flex;
    width: 100%;
    flex: 1;
    line-height: normal;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 13px;
    position: relative;
}

.bottom .tk-input-group {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    color: currentColor;
    background-clip: padding-box;
    background-color: #90939920;
    border-color: #90939950;
    vertical-align: middle;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    width: 20%;
    white-space: nowrap;
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.bottom .tk-input-inner {
    width: 80%;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    font-size: inherit;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    outline: 0;
    border: 1px solid #dcdfe6;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.bottom .tk-input + .tk-input {
    margin-left: 0.5rem;
}

.bottom .tk-textarea {
    position: relative;
    display: inline-block;
    width: 100%;
    vertical-align: bottom;
    font-size: 14px;
}

.bottom .tk-textarea-inner {
    background-position: right bottom;
    background-repeat: no-repeat;
    color: currentColor;
    background-color: transparent;
    border-color: #90939950;
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    outline-color: #409eff;
}

.tk-input-inner:focus,
.tk-textarea-inner:focus {
    border-color: #409eff;
}

.tk-replies {
    max-height: none;
    overflow: hidden;
    position: relative;
}
</style>