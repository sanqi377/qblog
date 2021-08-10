<template>
    <div class="blibli">
        <Loader v-model="isShow" />
        <div class="main">
            <div class="top_pic">
                <img src="~/static/img/blibli_bg.png" />
                <div class="userInfo">
                    <div class="user">
                        <div class="avatar">
                            <img
                                src="https://avatars.githubusercontent.com/u/75518418?v=4"
                                alt=""
                            />
                        </div>
                        <div class="info">
                            <div class="name">
                                {{ data.userInfo.name }}
                            </div>
                            <div class="dsc">
                                {{ data.userInfo.sign }}
                            </div>
                        </div>
                    </div>
                    <div class="follower">
                        <ul class="item_name">
                            <li>粉丝数</li>
                            <li>视频数</li>
                        </ul>
                        <ul class="item_count">
                            <li>{{ data.follower.follower }}</li>
                            <li>{{ data.video.page.count }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="card">
                <h2>投稿视频</h2>
                <div class="item">
                    <div
                        class="task"
                        v-for="item in data.video.list.vlist"
                        :key="item.aid"
                    >
                        <div>
                            <a
                                :href="
                                    'https://www.bilibili.com/video/' +
                                    item.bvid
                                "
                                target="_blank"
                            >
                                <div class="title">
                                    <span>{{ item.title }}</span>
                                </div>
                                <div class="dsc">
                                    <p>{{ item.description }}</p>
                                </div>
                                <div class="info">
                                    <span>
                                        <svg
                                            class="
                                                svg-inline--fa
                                                fa-flag fa-w-16
                                            "
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fas"
                                            data-icon="flag"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            data-fa-i2svg=""
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M349.565 98.783C295.978 98.783 251.721 64 184.348 64c-24.955 0-47.309 4.384-68.045 12.013a55.947 55.947 0 0 0 3.586-23.562C118.117 24.015 94.806 1.206 66.338.048 34.345-1.254 8 24.296 8 56c0 19.026 9.497 35.825 24 45.945V488c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-94.4c28.311-12.064 63.582-22.122 114.435-22.122 53.588 0 97.844 34.783 165.217 34.783 48.169 0 86.667-16.294 122.505-40.858C506.84 359.452 512 349.571 512 339.045v-243.1c0-23.393-24.269-38.87-45.485-29.016-34.338 15.948-76.454 31.854-116.95 31.854z"
                                            ></path>
                                        </svg>
                                        {{ (item.created * 1000) | dateFormat }}
                                    </span>
                                    <span>
                                        <svg
                                            class="
                                                svg-inline--fa
                                                fa-comment fa-w-16
                                            "
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fas"
                                            data-icon="comment"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            data-fa-i2svg=""
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"
                                            ></path>
                                        </svg>
                                        {{ item.comment }}
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <router-link to="/">
            <div class="back">
                <svg
                    t="1627731181250"
                    class="icon"
                    viewBox="0 0 1100 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2039"
                    width="200"
                    height="200"
                >
                    <path
                        d="M93.285864 487.33822H53.612565a53.612565 53.612565 0 0 1-34.312041-94.358115L446.056545 37.528796a160.837696 160.837696 0 0 1 205.872251 0l428.900523 355.451309a53.612565 53.612565 0 0 1-34.312042 94.894241h-39.673298a26.806283 26.806283 0 0 0-26.806283 26.806282v348.481676a160.837696 160.837696 0 0 1-160.837696 160.837696h-53.612565a107.225131 107.225131 0 0 1-107.225131-107.225131v-160.837696a107.225131 107.225131 0 0 0-107.225131-107.225131 107.225131 107.225131 0 0 0-107.225131 107.225131v160.837696a107.225131 107.225131 0 0 1-107.225131 107.225131h-53.612565a160.837696 160.837696 0 0 1-160.837697-160.837696V514.144503a26.806283 26.806283 0 0 0-28.950785-26.806283z"
                        fill="#ffffff"
                        p-id="2040"
                    ></path>
                </svg>
            </div>
        </router-link>
    </div>
</template>

<script>
import Loader from "@/components/Loader/Index";
export default {
    name: "Blibli",
    data() {
        return {
            data: {
                userInfo: {},
                follower: {},
                video: {
                    list: {},
                    page: {},
                },
            },
            isShow: false,
        };
    },
    mounted() {
        this.blibli();
    },
    methods: {
        blibli() {
            this.isShow = false;
            this.$api.external.blibli().then((res) => {
                setTimeout(() => {
                    this.isShow = true;
                }, 800);
                this.data = res.data;
            });
        },
    },
    components: {
        Loader,
    },
};
</script>

<style scoped>
.blibli {
    width: 100%;
    background: #f4f5f7;
    height: 100vh;
}

.blibli .main {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
}

.blibli .top_pic {
    position: relative;
}

.blibli .top_pic img {
    width: 100%;
    height: 100%;
}

.blibli .userInfo {
    position: absolute;
    bottom: 25px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
}

.blibli .userInfo .avatar {
    width: 68px;
    height: 68px;
    border: 2px solid hsla(0, 0%, 100%, 0.4);
    border-radius: 50%;
}

.blibli .userInfo .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.blibli .userInfo .user {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    margin-left: 20px;
}

.blibli .userInfo .user .info {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
}
.blibli .userInfo .name {
    font-weight: 700;
    font-size: 18px;
    color: #fff;
}

.blibli .userInfo .dsc {
    color: hsla(0, 0%, 100%, 0.8);
    font-size: 12px;
    margin-top: 8px;
}

.blibli .userInfo .follower {
    margin-right: 20px;
    display: flex;
    flex-wrap: wrap;
}

.blibli .userInfo .follower ul {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
}

.blibli .userInfo .follower ul li {
    text-align: center;
}

.blibli .userInfo .follower .item_name li {
    color: #fff;
    font-size: 14px;
    font-weight: 400;
}

.blibli .userInfo .follower .item_count li {
    color: #fff;
    font-size: 14px;
}

.card {
    margin-top: 20px;
}

.card h2 {
    color: #2e2e2f;
    margin-bottom: 20px;
}

.card .item {
    display: flex;
    flex-wrap: wrap;
}

.card .task {
    cursor: pointer;
    width: 33.33%;
    margin-bottom: 1rem;
}

.card .task > div {
    background-color: #fff;
    padding: 1rem;
    margin: 0 1rem;
    box-shadow: rgb(99 99 99 / 10%) 0px 2px 8px 0px;
    border: 3px dashed transparent;
    border-radius: 8px;
    height: 140px;
}

.card .task:nth-of-type(1n) > div {
    margin-left: 0;
}

.card .task:nth-of-type(3n) > div {
    margin-right: 0;
}

.card .task .title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.card .task .title span {
    border-radius: 100px;
    padding: 2px 13px;
    font-size: 12px;
}

.card .task .dsc p {
    font-size: 15px;
    color: #000;
    margin: 1.2rem 0;
    height: 64px;
}

.card .task .info {
    position: relative;
    width: 100%;
    font-size: 12px;
}

.card .task .info span {
    margin-right: 1rem;
    color: #c4cad3;
}

.card .task .info span:last-child {
    margin-right: 0;
}

.card .task .info svg {
    width: 1em;
    margin-right: 3px;
}

.task:hover > div {
    box-shadow: rgb(99 99 99 / 30%) 0px 2px 8px 0px;
    border-color: rgba(162, 179, 207, 0.2) !important;
}


.card .task .title span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.card .task:nth-child(even) .title span {
    color: #a734ba;
    background-color: #f2dcf5;
}

.card .task:nth-child(odd) .title span {
    color: #13854e;
    background-color: #d6ede2;
}

.back {
    position: absolute;
    top: 30px;
    left: 10%;
    background: blue;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 1px rgb(0 0 255 / 80%);
}

.back svg {
    width: 40px;
    height: 40px;
}
</style>