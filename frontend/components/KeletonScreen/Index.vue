<template>
    <div
        class="keletonScreen"
        v-show="requestIsMore ? requestIsMore : requestIs"
    >
        <article class="shimmer" v-for="item of count ? count : 3" :key="item">
            <div class="thumb"></div>
            <div class="contentShimmer">
                <p></p>
                <p></p>
                <p></p>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    name: "KeletonScreen",
    props: ["requestIs", "requestIsMore", "count"],
    mounted() {
        console.log(
            this.count,
            this.requestIs,
            this.requestIsMore,
            "骨架屏页面"
        );
    },
};
</script>

<style scoped>
@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}

.shimmer {
    position: relative;
    margin: 30px auto;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    flex-direction: row;
    overflow: hidden;
    height: 14.5rem;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.shimmer:nth-child(odd) {
    flex-direction: row-reverse;
}

.shimmer:nth-child(odd) .thumb {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 6% 100%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 6% 100%);
}

.shimmer:after {
    display: block;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
    );
    animation: shimmer 1.5s infinite;
    z-index: 1;
}

.thumb {
    min-width: 35%;
    height: 100%;
    background: #ccc;
    border-radius: 5px;
    -webkit-clip-path: polygon(0 0, 94% 0, 100% 100%, 0 100%);
    clip-path: polygon(0 0, 94% 0, 100% 100%, 0 100%);
}

.contentShimmer {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 160px;
    flex: 1;
    margin-top: 35px;
    padding: 0 20px;
}

.contentShimmer p {
    display: block;
    background: #ccc;
    width: 100%;
    height: 15px;
    border-radius: 3px;
}

.contentShimmer p:first-of-type {
    height: 16px;
}

.contentShimmer p:nth-of-type(2) {
    height: 35px;
}

.contentShimmer p:nth-of-type(3) {
    height: 65px;
}
</style>