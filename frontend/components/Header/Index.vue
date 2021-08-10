<template>
    <div id="header">
        <div class="hade_pic">
            <img :src="this.pic" alt="background" />
        </div>
        <div class="nav" :style="navStyle">
            <Nav />
        </div>
        <div class="main">
            <div class="title">{{ this.title }}</div>
            <div class="dsc" v-show="this.isDsc">
                <span>{{ this.dsc }}</span>
                <span></span>
            </div>
            <div class="articleDsc" v-show="!this.isDsc">
                <ul>
                    <li>{{ (this.add_time * 1000) | dateFormat }}</li>
                    <li>{{ this.views }} 次</li>
                    <li>456 字</li>
                    <li>{{ this.comment }} 条评论</li>
                </ul>
            </div>
        </div>
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
import Nav from "@/components/Header/Nav";
let canvas,
    canvasHeight = 600,
    ctx,
    num,
    color,
    radius,
    speed,
    ballX,
    ballY,
    reX,
    reY,
    ballK = [],
    realTimeClData;
export default {
    name: "Header",
    data() {
        return {
            isDsc: false,
            navStyle: null,
        };
    },
    props: ["title", "dsc", "pic", "add_time", "views", "comment"],
    created() {
        setInterval(() => {
            if (this.dsc) {
                this.isDsc = true;
            } else {
                this.isDsc = false;
            }
        }, 100);
    },
    mounted() {
        this.initCanvas();
        realTimeClData = setInterval(this.move, 20);
        if (process.client) {
            window.addEventListener("scroll", this.infiniteScroll);
        }
    },
    beforeDestroy: function () {
        clearInterval(realTimeClData);
    },
    methods: {
        infiniteScroll() {
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            this.scrollTop = scrollTop;
            if (scrollTop > 100) {
                this.navStyle =
                    "position: fixed;background:rgb(18 18 18 / 90%);height:auto;padding:10px 0;top:0;margin-top: -10px;";
            } else {
                this.navStyle = null;
            }
        },
        initCanvas() {
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");
            if (process.client) {
canvas.width = window.innerWidth - 20;
            }
            
            canvas.height = canvasHeight;

            num = 500; // 定义气泡数量
            color = "rgba(255, 255, 255, 0.45)"; // 定义气泡颜色
            radius = []; // 定义气泡半径
            speed = []; // 小球向上移动速度
            ballX = []; // 球心的横坐标
            ballY = []; // 球心的纵坐标

            // 在 dom 底部产生随机半径小球
            for (let i = 0; i < num; i++) {
                let r = Math.random(50, 100) * 5;
                let x = Math.floor(Math.random() * 2 * canvas.offsetWidth);
                let y = -10;
                let sp = Math.floor(Math.random() * 15);
                ballX.push(x);
                ballY.push(y);
                radius.push(r);
                speed.push(sp);
            }
        },
        move() {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
            for (let i = 0; i < num; i++) {
                (function (i) {
                    if (ballK[i] == null) {
                        ballK[i] = 0;
                    }
                    reX = ballK[i] * speed[i] + ballY[i];
                    reY = Math.sin(ballK[i]) + ballX[i];
                    if (reX + radius[i] <= 0) {
                        ballY[i] = canvasHeight + 10;
                        ballK[i] = 0;
                        reX = ballK[i] * speed[i] + ballY[i];
                    }
                    ctx.beginPath();
                    ctx.fillStyle = color;
                    ctx.arc(reY, reX, radius[i], 0, Math.PI * 2);
                    ctx.fill();
                    ballK.splice(i, 1, ballK[i]);
                    ballK[i] -= 0.1;
                })(i);
            }
        },
    },
    components: {
        Nav,
    },
};
</script>

<style scoped>
@keyframes blink {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

#header {
    width: 100%;
    height: 600px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 7%;
    z-index: 9999;
}

.hade_pic {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 600px;
    z-index: 1;
}

.hade_pic > img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    background-position-x: center;
    background-position-y: center;
    background-size: cover;
    -webkit-filter: brightness(0.7);
    filter: brightness(0.7);
}

.hade_pic::after {
    content: "";
    width: 100%;
    height: 10%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(to top, #f6f6f6, transparent);
}

#canvas {
    top: 0px;
    z-index: 2;
    position: absolute;
    overflow: hidden;
}

.main {
    display: flex;
    height: 93%;
    color: #fff;
    width: 100%;
    align-content: center;
    flex-wrap: wrap;
    text-align: center;
    transform: translateY(-42px);
    z-index: 999;
}

.main .title {
    width: 100%;
    font-weight: 700;
    font-size: 2.7rem;
    letter-spacing: 2px;
    line-height: 1.67;
    text-shadow: 0 0.1875rem 0.3125rem #1c1f21;
}

.main .dsc {
    width: 100%;
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.67;
    text-shadow: 0 0.1875rem 0.3125rem #1c1f21;
}

.main .articleDsc {
    width: 100%;
    margin-top: 20px;
    font-size: 12px;
    line-height: 1.67;
    text-shadow: 0 0.1875rem 0.3125rem #1c1f21;
}

.main .articleDsc ul {
    display: flex;
    justify-content: center;
}

.main .articleDsc ul li {
    margin: 0 10px;
}

.main .dsc span:last-child {
    display: inline-block;
    width: 2px;
    height: 90%;
    background: #fe5186;
    margin-left: 5px;
    line-height: 1.67;
    box-shadow: 0 0.1875rem 0.3125rem #1c1f21;
    -webkit-animation: blink 0.7s infinite;
    animation: blink 1s infinite;
    transform: translateY(6px);
}
</style>