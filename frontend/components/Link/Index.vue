<template>
    <div class="link">
        <Loader v-model="isShow" />
        <Header
            title="友人帐"
            :pic="this.$store.state.webInfo.pic"
            dsc="这里住着朋友们"
        />
        <div class="main">
            <ul>
                <li v-for="item in data" :key="item.id">
                    <a :href="item.link" target="_blank">
                        <div class="left">
                            <img
                                src="https://avatars.githubusercontent.com/u/75518418?v=4"
                                alt=""
                            />
                        </div>
                        <div class="right">
                            <div class="title">{{ item.title }}</div>
                            <div class="dsc">{{ item.dsc }}</div>
                        </div>
                    </a>
                </li>
            </ul>
            <Comment :article="id" />
        </div>
    </div>
</template>

<script>
import Comment from "@/components/Comment/Index";
import Loader from "@/components/Loader/Index";
export default {
    name: "Link",
    props: ["id"],
    data() {
        return {
            data: {},
            isShow: false,
        };
    },
    mounted() {
        this.getLink();
    },
    methods: {
        getLink() {
            this.$api.pages.getLink().then((res) => {
                setTimeout(() => {
                    this.isShow = true;
                }, 800);
                this.data = res.data;
            });
        },
    },
    components: {
        Comment,
        Loader,
    },
};
</script>

<style scoped>
.main {
    width: 1680px;
    margin: 0 auto;
    padding: 20px 0;
}

.main ul {
    display: flex;
}

.main li {
    width: 25%;
    margin: 0 10px;
}

.main a {
    display: flex;
    background: #fff;
    border-radius: 8px;
    padding: 10px 15px;
    align-items: center;
}

.main .left {
    margin-right: 15px;
}

.main .left img {
    width: 65px;
    height: 65px;
    border: 2px solid #000;
}

.main .right {
    display: flex;
    flex-direction: column;
}

.main .right .title {
    margin-bottom: 8px;
}
</style>