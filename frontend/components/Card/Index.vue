<template>
    <div class="card">
        <div
            class="content"
            v-show="requestIs"
            v-for="item in list"
            :key="item.id"
        >
            <div class="cardImg">
                <img :src="item.top_pic" :alt="item.title" />
            </div>
            <div class="leftImg">
                <div>
                    <img :src="item.top_pic" :alt="item.title" />
                </div>
            </div>
            <div class="cardBox">
                <ul class="info">
                    <li class="info-data">
                        <svg id="icon-LaunchTime" viewBox="0 0 1024 1024">
                            <path
                                d="M511.650239 0c-282.806675 0-511.650239 228.843564-511.650239 511.650239s228.843564 511.650239 511.650239 511.650239 511.650239-228.843564 511.650239-511.650239c-2.598224-282.806675-231.441788-511.650239-511.650239-511.650239z"
                                fill="#6CA4E6"
                            ></path>
                            <path
                                d="M511.650239 204.560164c-169.9838 0-307.789597 137.805797-307.789597 307.789597s137.805797 307.789597 307.789597 307.789597 307.789597-137.805797 307.789597-307.789597-137.805797-307.789597-307.789597-307.789597z m0 571.609251c-145.7004 0-263.819655-118.119254-263.819654-263.819654s118.119254-263.819655 263.819654-263.819655 263.819655 118.119254 263.819655 263.819655-118.119254 263.819655-263.819655 263.819654z"
                                fill="#FFFFFF"
                            ></path>
                            <path
                                d="M687.530009 534.334732c0-12.191666-9.893237-21.984971-21.984971-21.984971H511.650239V358.454962c0-12.191666-9.893237-21.984971-21.984971-21.984971-12.191666 0-21.984971 9.893237-21.984971 21.984971v175.87977c0 12.191666 9.893237 21.984971 21.984971 21.984971h175.87977c12.191666 0 21.984971-9.793305 21.984971-21.984971z"
                                fill="#FFFFFF"
                            ></path>
                        </svg>
                        <span>
                            {{
                                (item.update_time
                                    ? item.update_time * 1000
                                    : item.add_time * 1000) | dateFormat
                            }}</span
                        >
                    </li>
                    <li class="info-tags">
                        <svg id="icon-biaoqian" viewBox="0 0 1024 1024">
                            <path
                                d="M512 512m-509.26933333 0a509.26933333 509.26933333 0 1 0 1018.53866666 0 509.26933333 509.26933333 0 1 0-1018.53866666 0Z"
                                fill="#1e9969"
                            ></path>
                            <path
                                d="M307.2 220.04622222c-35.04355555 0-64.62577778 29.696-64.62577778 64.62577778v148.36622222c0 35.04355555 21.61777778 83.62666667 45.85244445 107.86133333l253.38311111 253.38311112c24.23466667 24.23466667 64.62577778 24.23466667 88.97422222 0l186.02666667-186.02666667c24.23466667-24.23466667 24.23466667-64.62577778 0-88.97422222L563.31377778 265.89866667c-24.23466667-24.23466667-72.81777778-45.85244445-107.86133333-45.85244445H307.2z m83.51288889 212.992c-35.04355555 0-64.62577778-29.696-64.62577778-64.62577777 0-35.04355555 29.696-64.62577778 64.62577778-64.62577778 35.04355555 0 64.62577778 29.696 64.62577778 64.62577778 0.11377778 34.92977778-29.58222222 64.62577778-64.62577778 64.62577777z"
                                fill="#FFFFFF"
                            ></path>
                        </svg>
                        <span>
                            <nuxt-link
                                class="article-category-link"
                                :to="'/category/' + item.cat + '.html'"
                            >
                                {{ item.cat_name }}</nuxt-link
                            >
                        </span>
                    </li>
                </ul>
                <a>
                    <nuxt-link :to="'/article/' + item.id + '.html'">
                        <div class="card-title">{{ item.title }}</div>
                        <div class="card-dsc">
                            <div v-html="item.content"></div>
                        </div>
                    </nuxt-link>
                </a>
            </div>
        </div>
        <div class="changePage">
            <div v-if="limit > 5" class="prev" @click="getArticle(0)">
                上一页
            </div>
            <div v-if="!isBottom" class="next" @click="getArticle(1)">
                下一页
            </div>
        </div>
        <!-- <Empty v-if="count <= 0" /> -->
    </div>
</template>

<script>
import Empty from "@/components/Empty/Index";
export default {
    name: "Card",
    props: ["list", "requestIs", "count", "isBottom"],
    data() {
        return {
            limit: 0, // 触底列表项累加数目
            requestIsMore: false,
        };
    },
    mounted() {
        this.getArticle();
    },
    methods: {
        getArticle(val) {
            if (val == 0) {
                this.$emit("getArticle", (this.limit -= 5));
            } else {
                this.$emit("getArticle", (this.limit += 5));
            }
        },
    },
    components: {
        Empty,
    },
};
</script>

<style scoped>
a {
    color: #fff;
}

.card {
    margin: 8px;
    color: #fff;
}

.changePage {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.changePage > div {
    cursor: pointer;
    display: inline-block;
    background: #fff;
    border-radius: 100px;
    padding: 10px 35px;
    font-size: 15px;
    font-weight: 700;
    box-shadow: 0 10px 13px rgb(31 45 61 / 10%),
        0 0 0 -1px rgb(32 160 255 / 20%), 0 0 0 -25px rgb(32 160 255 / 30%);
    transition: all 0.25s, box-shadow 0s;
    letter-spacing: 1px;
    color: #000;
}

.changePage > div:first-child {
    margin-right: 10px;
}

.changePage > div:last-child {
    margin-left: 10px;
}

.changePage > div:hover {
    color: #20a0ff;
    box-shadow: 0 10px 13px rgb(32 160 255 / 30%),
        0 0 0 25px rgb(32 160 255 / 0%), 0 0 0 25px rgb(32 160 255 / 0%);
    transition: all 1s, box-shadow 1s ease-out 0.1s;
}

.content {
    position: relative;
    height: 14.5rem;
    line-height: 1.4;
    border-radius: 5px;
    display: flex;
    overflow: hidden;
    margin-bottom: 1rem;
    transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    background-color: #4a4a4a;
}

.content:hover {
    transform: translateY(-5px);
}

.content:nth-child(even) {
    flex-direction: row-reverse;
}

.cardImg {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
}

.cardImg > img {
    -o-object-fit: cover;
    object-fit: cover;
    background-position-x: center;
    background-position-y: center;
    background-size: cover;
    -webkit-filter: blur(1.875rem) brightness(0.8);
    -moz-filter: blur(1.875rem) brightness(0.8);
    -ms-filter: blur(1.875rem) brightness(0.8);
    filter: blur(1.875rem) brightness(0.8);
    width: 100%;
    max-height: 14.5rem;
}

.leftImg {
    -webkit-clip-path: polygon(0 0, 94% 0, 100% 100%, 0 100%);
    clip-path: polygon(0 0, 94% 0, 100% 100%, 0 100%);
    flex-basis: 35%;
    height: auto;
    min-width: 35%;
    position: relative;
    overflow: hidden;
}

.content:nth-child(even) .leftImg {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 6% 100%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 6% 100%);
}

.leftImg > div {
    transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
}

.leftImg > div > img {
    -o-object-fit: cover;
    object-fit: cover;
    background-position-x: center;
    background-position-y: center;
    background-size: cover;
    width: 100%;
    height: 100%;
}

.content:hover .leftImg div {
    transform: scale(1.05) rotate(1deg);
}

.cardBox {
    padding-right: 1rem;
    max-width: 60%;
    min-width: 60%;
    flex-basis: 65%;
    text-shadow: 0 0.1875rem 0.3125rem rgb(0 0 0 / 30%);
    position: relative;
    align-self: center;
    margin: 0 1rem;
}

.content:nth-child(even) .cardBox {
    margin: 0;
}

.info {
    zoom: 1;
    display: flex;
    margin-bottom: 0.5rem;
    overflow: hidden;
    font-size: 0.75rem;
    width: 100%;
    justify-content: space-between;
}

.info svg {
    width: 1rem;
    height: 1rem;
    vertical-align: bottom;
    margin-right: 1.5px;
}

.info-data {
    flex: 1;
}

.card-title {
    letter-spacing: 0.0625rem;
    word-break: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin-bottom: 0.5rem;
    font-weight: 700;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    font-size: 1.5rem;
    overflow: hidden;
}

.card-dsc {
    -webkit-line-clamp: 2;
    line-height: 1.8em;
    letter-spacing: 0.0625rem;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    overflow: hidden;
}

.card-dsc >>> * {
    font-size: 1rem;
}

.loading {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.loader {
    display: inline-block;
    width: 30px;
    height: 30px;
    position: relative;
    border: 4px solid #20a0ff;
    top: 50%;
    animation: loader 2s infinite ease;
}

.loader-inner {
    vertical-align: top;
    display: inline-block;
    width: 100%;
    background-color: #20a0ff;
    animation: loader-inner 2s infinite ease-in;
}

.buttonLoading {
    text-align: center;
    color: #4a4a4a;
}

.card-dsc >>> img {
    display: none;
}
</style>