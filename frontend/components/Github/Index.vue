<template>
    <div class="github">
        <Loader :isShow="isShow" />
        <div class="main" v-show="!isShow">
            <div class="welcome">
                <div class="bigTitle">Welcome to Dashboard</div>
                <div class="dsc">
                    Hello Jone Doe, welcome to your awesome dashboard!
                </div>
            </div>
            <div class="mid">
                <div class="ck">
                    <div class="item">
                        <div class="item_left">
                            <div class="icon">
                                <svg
                                    t="1627623710254"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="6051"
                                    width="200"
                                    height="200"
                                >
                                    <path
                                        d="M882.090667 384l-60.928-213.333333H202.837333L141.909333 384H426.666667v42.666667a85.333333 85.333333 0 1 0 170.666666 0V384h284.757334zM128 469.333333v384h768v-384h-218.709333a170.752 170.752 0 0 1-330.581334 0H128z m757.504-384L981.333333 420.693333V938.666667H42.666667V420.693333L138.496 85.333333h747.008z"
                                        p-id="6052"
                                        fill="#ffffff"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        <div class="item_right">
                            <div class="item_top">
                                <span>{{ data.reposCount || "Nan" }}</span
                                ><small>个</small>
                            </div>
                            <div class="item_bottom">这里统计仓库数量</div>
                        </div>
                    </div>
                </div>
                <div class="start">
                    <div class="item">
                        <div class="item_left">
                            <div class="icon" style="background: #dc3545">
                                <svg
                                    t="1627624011702"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="7008"
                                    width="200"
                                    height="200"
                                >
                                    <path
                                        d="M957.258525 404.23316c-3.78431-11.352931-13.589115-19.609609-25.458088-21.501764l-270.406182-41.799429L540.640349 82.394759c-5.332437-11.180917-16.513355-18.40551-28.898371-18.40551 0 0 0 0 0 0-12.385016 0-23.565933 7.052579-28.898371 18.40551l-121.78599 258.021166L90.135394 381.183269c-11.868974 1.720141-21.673778 9.976818-25.630102 21.32975s-1.032085 23.909961 7.396607 32.510667L268.342012 637.140265 221.38216 921.995632c-2.064169 12.040988 3.096254 24.25399 13.073072 31.306568 9.976818 7.052579 23.221905 7.740635 33.88678 1.892155L510.193852 822.227448l241.335797 133.826978c4.816395 2.580212 10.148833 3.956325 15.48127 3.956325 0.172014 0 0.516042 0 0.688056 0 17.717453 0 31.994625-14.277171 31.994625-31.994625 0-3.956325-0.688056-7.740635-2.064169-11.352931l-44.895683-278.662859 196.956157-201.256509C958.118596 428.143121 961.042836 415.586091 957.258525 404.23316z"
                                        p-id="7009"
                                        fill="#ffffff"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        <div class="item_right">
                            <div class="item_top">
                                <span>{{ data.startCount || "Nan" }}</span
                                ><small>个</small>
                            </div>
                            <div class="item_bottom">这里统计Start数量</div>
                        </div>
                    </div>
                </div>
                <div class="commit">
                    <div class="item">
                        <div class="item_left">
                            <div class="icon" style="background: #198754">
                                <svg
                                    t="1627624074415"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="8549"
                                    width="200"
                                    height="200"
                                >
                                    <path
                                        d="M689.3568 820.9408 333.6192 820.9408c-13.9264 0-25.1904-11.264-25.1904-25.1904L308.4288 465.152l-211.968 0c-10.1888 0-19.4048-6.144-23.296-15.5648C69.2224 440.2176 71.424 429.312 78.6432 422.144l415.0272-415.0784c9.472-9.472 26.1632-9.472 35.6352 0l411.392 411.3408c7.2704 4.4544 12.0832 12.4416 12.0832 21.5552 0 14.1312-11.52 24.576-25.7024 25.1904-0.1536 0-0.3072 0-0.512 0l-211.968 0 0 330.5472C714.5984 809.6256 703.2832 820.9408 689.3568 820.9408zM358.8096 770.5088l305.3568 0L664.1664 439.9616c0-13.9264 11.264-25.1904 25.1904-25.1904l176.3328 0L511.488 60.5184 157.2864 414.7712l176.3328 0c13.9264 0 25.1904 11.264 25.1904 25.1904L358.8096 770.5088z"
                                        p-id="8550"
                                        fill="#ffffff"
                                    ></path>
                                    <path
                                        d="M96.4096 923.1872l830.1056 0L926.5152 1024 96.4096 1024 96.4096 923.1872 96.4096 923.1872zM96.4096 923.1872"
                                        p-id="8551"
                                        fill="#ffffff"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        <div class="item_right">
                            <div class="item_top">
                                <span>{{ data.commitCount || "Nan" }}</span
                                ><small>次</small>
                            </div>
                            <div class="item_bottom">这里统计commit数量</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="charts">
                <!-- 图表 -->
                <div
                    ref="myChart"
                    :style="{ width: '100%', height: '300px' }"
                ></div>
            </div>
        </div>
        <router-link to="/">
            <div class="back" v-show="!isShow">
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
import * as echarts from "echarts";
import Loader from "@/components/Loader/Index";
export default {
    name: "Github",
    data() {
        return {
            data: {},
            isShow: false,
        };
    },
    mounted() {
        this.initChart();
        this.github();
    },
    methods: {
        initChart() {
            var myChart = echarts.init(this.$refs.myChart);
            myChart.setOption({
                xAxis: {
                    data: [
                        "周日",
                        "周一",
                        "周二",
                        "周三",
                        "周四",
                        "周五",
                        "周六",
                    ],
                },
                yAxis: {},
                series: [
                    {
                        data: [1, 3, 4, 7, 4, 6, 9],
                        type: "bar",
                    },
                ],
            });
        },
        github() {
            this.isShow = true;
            this.$api.pages.github().then((res) => {
                this.isShow = false;
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
.github {
    background: #f4f5f7;
    height: 100vh;
}

.main {
    width: 1200px;
    margin: 0 auto;
}

.main .welcome {
    padding: 15px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.1);
}

.main > div {
    transform: translateY(20px);
}

.main .bigTitle {
    font-size: 1.75rem;
    color: #d1d5db !important;
    font-weight: 700;
    margin-bottom: 10px;
}

.main .dsc {
    color: #9ca3af !important;
    font-weight: 500;
}

.main .mid {
    display: flex;
    justify-content: space-around;
}

.main .mid > div {
    display: flex;
    align-items: center;
    height: 85px;
    width: 33.33%;
    transform: translateY(20px);
}

.main .item {
    width: 100%;
    height: 100%;
    margin: 0 15px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.main .mid > div:first-child .item {
    margin-left: 0;
}

.main .mid > div:last-child .item {
    margin-right: 0;
}

.main .item .item_left {
    width: 25%;
    display: flex;
    justify-content: center;
}

.main .item .item_right {
    width: 75%;
}

.main .icon {
    width: 60px;
    height: 60px;
    background: #0d6efd;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main .icon > svg {
    width: 30px;
    height: 30px;
}

.main .item_top > span {
    font-weight: 700;
    font-size: 28px;
    margin-right: 10px;
}

.main .item_bottom {
    color: #9ca3af;
    font-size: 14px;
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