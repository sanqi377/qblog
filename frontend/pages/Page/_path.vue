<template>
    <div>
        <div v-if="path == 'link' && id">
            <Link :id="id" />
        </div>
        <div v-if="path == 'blibli'">
            <Blibli />
        </div>
        <div v-if="path == 'github'">
            <Github />
        </div>
    </div>
</template>

<script>
import Blibli from "@/components/Blibli/Index";
import Github from "@/components/Github/Index";
import Link from "@/components/Link/Index";
export default {
    data() {
        return {
            path: null,
            data: {},
            id: null,
        };
    },
    created() {
        this.getPageInfo();
    },
    methods: {
        getPageInfo() {
            this.path = this.$route.params.path.substring(
                0,
                this.$route.params.path.length - 5
            );
            this.$api.pages.getPageInfo({ path: this.path }).then((res) => {
                this.id = res.data.id;
            });
        },
    },
    components: {
        Blibli,
        Github,
        Link,
    },
    watch: {
        $route: "getPageInfo",
    },
};
</script>