<template>
    <div v-if="!value">
        <div
            class="bg"
            :style="!this.$store.state.isDark ? '' : 'background: #121212;'"
        ></div>
        <div id="loader">
            <div id="shadow"></div>
            <div id="box"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Loader",
    props: ["value"],
    mounted() {
        window.document.body.style = "overflow:hidden";
    },
    watch: {
        value: (oldValue, newValue) => {
            if (!newValue) {
                window.document.body.style = "overflow:auto";
            }
            if (!oldValue) {
                window.document.body.style = "overflow:hidden";
            }
        },
    },
};
</script>

<style scoped>
.bg {
    position: absolute;
    top: 0;
    z-index: 99999;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 1);
}
#loader {
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
    z-index: 999999;
}
@keyframes loader {
    0% {
        left: -100px;
    }
    100% {
        left: 110%;
    }
}
#box {
    width: 50px;
    height: 50px;
    background: #6997db;
    animation: animate 0.5s linear infinite;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
}
@keyframes animate {
    17% {
        border-bottom-right-radius: 3px;
    }
    25% {
        transform: translateY(9px) rotate(22.5deg);
    }
    50% {
        transform: translateY(18px) scale(1, 0.9) rotate(45deg);
        border-bottom-right-radius: 40px;
    }
    75% {
        transform: translateY(9px) rotate(67.5deg);
    }
    100% {
        transform: translateY(0) rotate(90deg);
    }
}
#shadow {
    width: 50px;
    height: 5px;
    background: #000;
    opacity: 0.1;
    position: absolute;
    top: 59px;
    left: 0;
    border-radius: 50%;
    animation: shadow 0.5s linear infinite;
}
@keyframes shadow {
    50% {
        transform: scale(1.2, 1);
    }
}

body {
    background: #6997db;
    overflow: hidden;
}
h4 {
    position: absolute;
    bottom: 20px;
    left: 20px;
    margin: 0;
    font-weight: 200;
    opacity: 0.5;
    font-family: sans-serif;
    color: #fff;
}
</style>