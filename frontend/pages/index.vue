<template>
    <div>
        <Header
            :title="webSetting.title"
            :dsc="webSetting.subtitle"
            :pic="webSetting.pic"
        />
        <div class="main">
            <section class="card">
                <!-- 列表项 -->
                <Card
                    :list="list"
                    :requestIs="requestIs"
                    :count="count"
                    :isBottom="isBottom"
                    @getArticle="getArticle"
                />
            </section>
        </div>
        <Loader v-model="requestIs" />
        <Footer />
    </div>
</template>

<script>
export default {
    data() {
        return {
            webSetting: {
                title: null,
                subtitle: null,
                pic: null,
                keyword: null,
                describe: null,
            },
            list: null, // 文章内容
            requestIs: false, // 是否请求完毕（用于显示列表项及消除骨架屏）
            count: null, // 文章数量
            webTitle: null,
            isBottom: null,
        };
    },
    head() {
        return {
            title: this.webSetting.title + " - " + this.webSetting.subtitle,
            meta: [
                {
                    keyword: this.webSetting.keyword,
                    describe: this.webSetting.describe,
                },
            ],
        };
    },
    asyncData(app) {
        return app.$api.index.getWebSetting().then((res) => {
            let webSetting = {};
            res.data.forEach((item) => {
                webSetting[item["key"]] = item["value"];
            });
            return { webSetting };
        });
    },
    methods: {
        getArticle(limit) {
            this.requestIs = false;
            this.$api.index.getArticle({ limit }).then((res) => {
                setTimeout(() => {
                    this.requestIs = true;
                }, 800);
                if (res.isBottom) {
                    this.isBottom = true;
                } else {
                    this.isBottom = false;
                }
                this.list = res.data;
                this.count = res.count;
            });
        },
    },
};
</script>

<style scoped>
.main {
    width: 900px;
    margin: 0 auto;
    margin-top: 16px;
}
</style>