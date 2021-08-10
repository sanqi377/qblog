<template>
    <div class="conmment">
        <div class="info">
            <div class="top">
                <p>—— 评论区 ——</p>
            </div>
            <Content :id="this.article" @getComment="getComment()" />
        </div>
        <div class="tk-comments-container">
            <div class="tk-comments-title">
                <span class="tk-comments-count">
                    <span>{{ this.count || 0 }}</span>
                    <span> 条评论</span>
                </span>
            </div>
            <div class="tk-comment" v-for="(item, index) in data" :key="index">
                <div class="tk-avatar">
                    <img :src="item.avatar" class="tk-avatar-img" />
                </div>
                <div class="tk-main">
                    <div class="tk-row">
                        <div class="tk-meta">
                            <strong>{{ item.user_name }}</strong>
                            <small class="tk-time">
                                <time>{{
                                    (item.add_time * 1000) | dateFormat
                                }}</time>
                            </small>
                        </div>
                        <div class="tk-action">
                            <div @click="reply(index, item.id)">
                                <svg
                                    t="1627036172703"
                                    class="icon"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="1205"
                                    width="200"
                                    height="200"
                                >
                                    <path
                                        d="M824.851 244.808c-6.212-85.084-77.458-152.415-164.149-152.415h-428.83c-90.606 0-164.32 73.814-164.32 164.544v243.046c0 81.294 59.309 148.982 136.914 162.071 2.793 39.422 19.415 76.023 47.518 104.1 30.903 30.875 72.115 47.879 116.044 47.879h122.618l69.258 104.65a27.026 27.026 0 0 0 45.578-0.784l63.714-103.866H796.86c43.928 0 85.136-17.005 116.033-47.881 30.905-30.886 47.925-72.087 47.925-116.015V407.091c0-81.228-58.848-148.901-135.967-162.283zM121.608 499.983V256.937c0-60.923 49.465-110.488 110.265-110.488h428.83c56.031 0 102.426 41.879 109.557 95.948H368.03c-90.423 0-163.987 73.881-163.987 164.694v199.641c-47.37-12.37-82.435-55.537-82.435-106.749z m785.155 150.154c0 60.566-49.302 109.84-109.903 109.84H654.068c-9.4 0-18.124 4.884-23.039 12.896l-49.45 80.614-53.869-81.398a27.028 27.028 0 0 0-22.539-12.112H368.029c-60.616 0-109.931-49.274-109.931-109.84v-6.38c0.505-2.065 0.802-4.211 0.802-6.432s-0.297-4.367-0.802-6.432V407.091c0-61.006 49.315-110.639 109.931-110.639H796.86c60.601 0 109.903 49.632 109.903 110.639v243.046z"
                                        fill="#409eff"
                                        p-id="1206"
                                    ></path>
                                    <path
                                        d="M446.924 525.415m-59.177 0a59.177 59.177 0 1 0 118.354 0 59.177 59.177 0 1 0-118.354 0Z"
                                        fill="#409eff"
                                        p-id="1207"
                                    ></path>
                                    <path
                                        d="M717.965 525.415m-59.177 0a59.177 59.177 0 1 0 118.354 0 59.177 59.177 0 1 0-118.354 0Z"
                                        fill="#409eff"
                                        p-id="1208"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="tk-content">
                        <p>{{ item.content }}</p>
                    </div>
                    <div class="tk-replies">
                        <div
                            class="tk-comment"
                            v-for="(item1, index1) in item.children"
                            :key="index1"
                        >
                            <div class="tk-avatar">
                                <img
                                    :src="item1.avatar"
                                    class="tk-avatar-img"
                                />
                            </div>
                            <div class="tk-main">
                                <div class="tk-row">
                                    <div class="tk-meta">
                                        <strong>{{ item1.user_name }}</strong>
                                        <small class="tk-time">
                                            <time>{{
                                                (item1.add_time * 1000)
                                                    | dateFormat
                                            }}</time>
                                        </small>
                                    </div>
                                    <div class="tk-action">
                                        <div
                                            @click="
                                                replyEr(index1, item1.remark_id)
                                            "
                                        >
                                            <svg
                                                t="1627036172703"
                                                class="icon"
                                                viewBox="0 0 1024 1024"
                                                version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                p-id="1205"
                                                width="200"
                                                height="200"
                                            >
                                                <path
                                                    d="M824.851 244.808c-6.212-85.084-77.458-152.415-164.149-152.415h-428.83c-90.606 0-164.32 73.814-164.32 164.544v243.046c0 81.294 59.309 148.982 136.914 162.071 2.793 39.422 19.415 76.023 47.518 104.1 30.903 30.875 72.115 47.879 116.044 47.879h122.618l69.258 104.65a27.026 27.026 0 0 0 45.578-0.784l63.714-103.866H796.86c43.928 0 85.136-17.005 116.033-47.881 30.905-30.886 47.925-72.087 47.925-116.015V407.091c0-81.228-58.848-148.901-135.967-162.283zM121.608 499.983V256.937c0-60.923 49.465-110.488 110.265-110.488h428.83c56.031 0 102.426 41.879 109.557 95.948H368.03c-90.423 0-163.987 73.881-163.987 164.694v199.641c-47.37-12.37-82.435-55.537-82.435-106.749z m785.155 150.154c0 60.566-49.302 109.84-109.903 109.84H654.068c-9.4 0-18.124 4.884-23.039 12.896l-49.45 80.614-53.869-81.398a27.028 27.028 0 0 0-22.539-12.112H368.029c-60.616 0-109.931-49.274-109.931-109.84v-6.38c0.505-2.065 0.802-4.211 0.802-6.432s-0.297-4.367-0.802-6.432V407.091c0-61.006 49.315-110.639 109.931-110.639H796.86c60.601 0 109.903 49.632 109.903 110.639v243.046z"
                                                    fill="#409eff"
                                                    p-id="1206"
                                                ></path>
                                                <path
                                                    d="M446.924 525.415m-59.177 0a59.177 59.177 0 1 0 118.354 0 59.177 59.177 0 1 0-118.354 0Z"
                                                    fill="#409eff"
                                                    p-id="1207"
                                                ></path>
                                                <path
                                                    d="M717.965 525.415m-59.177 0a59.177 59.177 0 1 0 118.354 0 59.177 59.177 0 1 0-118.354 0Z"
                                                    fill="#409eff"
                                                    p-id="1208"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="tk-content">
                                    <p>{{ item1.content }}</p>
                                </div>
                                <Content
                                    :id="item.id"
                                    :isReply="true"
                                    @close="close()"
                                    v-if="
                                        index1 == isErReply &&
                                        item1.remark_id == replyId
                                    "
                                    @getComment="getComment()"
                                />
                            </div>
                        </div>
                    </div>
                    <Content
                        :id="item.id"
                        :isReply="true"
                        @close="close()"
                        v-if="index == isReply && item.id == replyId"
                        @getComment="getComment()"
                    />
                </div>
            </div>
            <div class="tk-comments-no" v-if="this.count <= 0">
                <span>没有评论</span>
            </div>
        </div>
    </div>
</template>

<script>
import Content from "@/components/Comment/Content";
export default {
    naem: "Comment",
    data() {
        return {
            data: {},
            count: null,
            isReply: null,
            isErReply: null,
            replyId: null,
        };
    },
    props: ['article'],
    mounted() {
        this.getComment();
    },
    methods: {
        getComment() {
            var id = this.article;
            this.$api.comment.getComment({ id }).then((res) => {
                this.data = res.data;
                this.count = res.count;
            });
        },
        reply(index, id) {
            this.replyId = id;
            this.isReply = index;
            this.isErReply = null;
        },
        replyEr(index, id) {
            this.replyId = id;
            this.isReply = null;
            this.isErReply = index;
        },
        close() {
            this.isReply = null;
            this.isErReply = null;
        },
    },
    components: {
        Content,
    },
};
</script>

<style scoped>
.conmment {
    margin-top: 20px;
    padding: 1rem 2.5rem 1rem 2.5rem;
    background-color: #fff;
}

.info .top {
    padding: 2rem 0;
    text-align: center;
}

.info .top p {
    font-weight: 700;
}

.info .tk-row {
    display: flex;
    flex-direction: row;
}

.info .tk-row.actions {
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 3.5rem;
    align-items: center;
    justify-content: flex-end;
}

.tk-avatar-img {
    height: 2.5rem;
}

.tk-avatar-img svg,
img {
    width: 100%;
    height: 100%;
    fill: #c0c4cc;
}

.info .tk-row-actions-start {
    flex: 1;
    display: flex;
    align-items: center;
}

.info .tk-action-icon {
    align-self: center;
    display: inline-block;
    width: 1.25em;
    line-height: 0;
    margin-right: 10px;
    cursor: pointer;
    flex-shrink: 0;
}

.info .OwO {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.info .OwO-logo {
    width: 1.125em;
    display: flex;
}

.info svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
}

.tk-comments-container {
    min-height: 10rem;
    display: flex;
    flex-direction: column;
}

.info .tk-button.primary:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
}

.tk-comments-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}

.tk-comments-no {
    flex: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tk-comment {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    word-break: break-all;
}

.tk-comment .tk-avatar {
    height: 2.5rem;
    width: 2.5rem;
    margin-right: 1rem;
}

.tk-main {
    flex: 1;
    width: 0;
}

.tk-time {
    font-size: 0.875em;
    color: #4a4a4a;
    margin-left: 5px;
}

.tk-action {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.tk-row {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.tk-content {
    margin-top: 0.5rem;
    overflow: auto;
    max-height: 500px;
}

.tk-content {
    margin: 1rem 0;
}

.tk-action svg {
    display: inline-block;
    height: 1.2rem;
    width: 1.2rem;
    line-height: 0;
}
</style>