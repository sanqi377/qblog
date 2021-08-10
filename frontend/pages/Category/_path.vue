<template>
    <div>
        <Header
            :title="info.name"
            :pic="this.$store.state.webInfo.pic"
            :dsc="info.Introduction"
        />
        <div class="main">
            <section class="card">
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
import Card from "@/components/Card/Index";
var limits = 0;
export default {
    data() {
        return {
            path: null,
            info: {},
            list: {},
            count: null,
            requestIs: false,
            isBottom: null,
        };
    },
    head() {
        return {
            title: this.info.name + " - " + this.$store.state.webInfo.title,
            meta: [
                {
                    keyword: this.$store.state.webInfo.keyword,
                    describe: this.$store.state.webInfo.describe,
                },
            ],
        };
    },
    async asyncData(app) {
        var path = app.route.params.path.substring(
            0,
            app.route.params.path.length - 5
        );
        const { data } = await app.$api.category.getInfo({ path });
        const info = data;
        return { info };
    },
    created() {
        this.setCatId();
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        setCatId() {
            this.path = this.$route.params.path.substring(
                0,
                this.$route.params.path.length - 5
            );
        },
        getInfo() {
            this.$api.category.getInfo({ path: this.path }).then((res) => {
                this.info = res.data;
            });
        },
        getArticle(limit) {
            limits = limit;
            this.requestIs = false;
            this.$api.index
                .getArticle({ path: this.path, limit: limits })
                .then((res) => {
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
    watch: {
        $route: "setCatId",
        path: function () {
            this.getInfo();
            this.getArticle(limits);
        },
    },
    components: {
        Card,
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