<template>
    <div>
        <Header
            :title="content.title ? content.title : ''"
            :pic="content.top_pic ? content.top_pic : ''"
            :info="info"
            :add_time="
                content.update_time ? content.update_time : content.add_time
            "
            :views="content.views"
            :comment="content.comment"
        />
        <div class="cardBox">
            <div class="cardContent">
                <Sidebar />
                <div class="right">
                    <div class="content">
                        <div class="warp" v-html="content.content"></div>
                        <hr />
                        <Copyright />
                        <hr />
                        <div
                            :class="likeInfo.status ? 'like active' : 'like'"
                            @click="like"
                        >
                            <svg
                                data-v-82768ea8=""
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                xml:space="preserve"
                                :fill="likeInfo.status ? '#F04151' : '#cccccc'"
                                viewBox="0 0 100 100"
                            >
                                <g :id="likeInfo.status ? 'Circle' : ''">
                                    <circle
                                        :style="
                                            likeInfo.status
                                                ? ''
                                                : 'display:none'
                                        "
                                        cx="50"
                                        cy="50"
                                        r="48"
                                    ></circle>
                                </g>
                                <path
                                    data-v-82768ea8=""
                                    d="M47.5,30.7c-6.8-6.3-17.4-6-23.7,0.8c-6.3,6.8-6,17.4,0.8,23.7l14.4,13.5l11.5,10.7l11.5-10.7   l14.4-13.5c6.8-6.3,7.1-16.9,0.8-23.7c-6.3-6.8-16.9-7.1-23.7-0.8l-2.9,2.7"
                                ></path>
                            </svg>
                            <span>{{ likeInfo.count }}</span>
                        </div>
                    </div>
                    <Comment :article="this.id" />
                </div>
            </div>
        </div>
        <Loader v-model="requestIs" />
        <Footer />
    </div>
</template>

<script>
import marked from "marked";
import Sidebar from "@/components/Sidebar/Index";
import Comment from "@/components/Comment/Index";
import Copyright from "@/components/Copyright/Index";
import Prism from "prismjs";
import "~/static/css/markdown.css";
var id;
export default {
    data() {
        return {
            id: null,
            content: {
                title: "",
            },
            poetry: {},
            requestIs: false,
            info: {},
            likeInfo: {
                status: false,
                count: 0,
            },
        };
    },
    head() {
        return {
            title: this.content.title + " - " + this.$store.state.webInfo.title,
            meta: [
                {
                    keyword: this.$store.state.webInfo.keyword,
                    describe: this.$store.state.webInfo.describe,
                },
            ],
        };
    },
    async asyncData(app) {
        id = app.route.params.id.substring(0, app.route.params.id.length - 5);
        const { data } = await app.$api.article.getArticleDetails({ id });
        const content = data;
        return { content };
    },
    mounted() {
        this.setArticleId();
        this.getArticleDetails();
        this.$api.article.addViews({ id: this.id }).then((res) => {
            this.info.views = res.data;
        });
        this.$api.article.getLike({ id: this.id }).then((res) => {
            this.likeInfo.status = res.data.status;
            this.likeInfo.count = res.data.count;
        });
    },
    methods: {
        replaceHtml(htmlContent) {
            let reg = new RegExp("<pre", "g"); //创建正则RegExp对象
            let reg1 = new RegExp('<code class="lang-"', "g");
            let stringObj = htmlContent;
            let newstr = stringObj.replace(
                reg,
                `<pre class="line-numbers language-java"`
            );
            let newstr2 = newstr.replace(reg1, `<code class="language-java"`);
            return newstr2;
        },
        like() {
            this.$api.article.addLike({ id: this.id }).then((res) => {
                this.likeInfo.status = !this.likeInfo.status;
                if (this.likeInfo.status) {
                    this.likeInfo.count += 1;
                } else {
                    this.likeInfo.count -= 1;
                }
            });
        },
        setArticleId() {
            this.id = this.$route.params.id.substring(
                0,
                this.$route.params.id.length - 5
            );
        },
        getArticleDetails() {
            this.requestIs = false;
            if (this.content.title) {
                setTimeout(() => {
                    this.requestIs = true;
                }, 800);
                this.content.content = this.replaceHtml(
                    marked(this.content.value)
                );
                setTimeout(() => {
                    Prism.highlightAll();
                }, 0);
            } else {
                this.$api.article
                    .getArticleDetails({ id: this.id })
                    .then((res) => {
                        setTimeout(() => {
                            this.requestIs = true;
                        }, 800);
                        this.content = res.data;
                        this.content.content = this.replaceHtml(
                            marked(res.data.value)
                        );
                        setTimeout(() => {
                            Prism.highlightAll();
                        }, 0);
                        this.content.comment = res.comment;
                    });
            }
            this.getPoetry();
        },
        getPoetry() {
            this.$api.external.getPoetry().then((res) => {
                this.poetry = res.data;
            });
        },
    },
    watch: {
        $route: "getArticleDetails",
    },
    components: {
        Comment,
        Sidebar,
        Copyright,
    },
};
</script>

<style scoped>
@-webkit-keyframes heart {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    17.5% {
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
    }
}

@keyframes heart {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    17.5% {
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
    }
}

@-webkit-keyframes bubble {
    0%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
        opacity: 0;
        stroke-width: 0;
        stroke: rgba(233, 172, 193, 0);
    }
    15% {
        fill: #e9acc1;
    }
    50% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
        stroke: #e9acc1;
        stroke-width: 6;
    }
    100% {
        fill: rgba(233, 172, 193, 0);
    }
}

@keyframes bubble {
    0%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
        opacity: 0;
        stroke-width: 0;
        stroke: rgba(233, 172, 193, 0);
    }
    15% {
        fill: #e9acc1;
    }
    50% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
        stroke: #e9acc1;
        stroke-width: 6;
    }
    100% {
        fill: rgba(233, 172, 193, 0);
    }
}

.cardBox {
    width: 1380px;
    margin: 0 auto;
    margin-top: 20px;
}

.cardContent {
    display: flex;
    width: 100%;
    align-items: flex-start;
}

.right {
    width: 75%;
}

.content {
    background-color: #fff;
    line-height: 2rem;
    padding: 2.5rem;
}

.like {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    flex-direction: column;
}

.like svg {
    width: 55px;
    height: 55px;
    margin-bottom: -15px;
}

.like span {
    color: #7c7c7c;
    font-weight: 700;
}

.like.active {
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-animation: heart 1.8s cubic-bezier(0.17, 0.89, 0.32, 1.49);
    animation: heart 1.8s cubic-bezier(0.17, 0.89, 0.32, 1.49);
}

#Circle {
    fill: #e9acc1;
    will-change: transform;
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-animation: bubble 1.8s cubic-bezier(0.21, 0.61, 0.35, 1);
    animation: bubble 1.8s cubic-bezier(0.21, 0.61, 0.35, 1);
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
}

hr {
    background-color: #f5f5f5;
    border: none;
    display: block;
    height: 2px;
    margin: 1.5rem 0;
}
</style>