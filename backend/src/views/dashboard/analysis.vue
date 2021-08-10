<template>
    <el-card class="ele-body" shadow="nerve">
        <div class="card">
            <div class="title">基础数据</div>
            <ul>
                <li>
                    <span>
                        <div class="item">
                            <div class="top">文章数</div>
                            <div class="mid">{{ info.article }}</div>
                            <div class="bottom">昨日</div>
                        </div>
                    </span>
                </li>
                <li>
                    <span>
                        <div class="item">
                            <div class="top">浏览量</div>
                            <div class="mid">{{ info.views }}</div>
                            <div class="bottom">昨日</div>
                        </div>
                    </span>
                </li>
                <li>
                    <span>
                        <div class="item">
                            <div class="top">点赞数</div>
                            <div class="mid">{{ info.like }}</div>
                            <div class="bottom">昨日</div>
                        </div>
                    </span>
                </li>
                <li>
                    <span>
                        <div class="item">
                            <div class="top">评论数</div>
                            <div class="mid">{{ info.comment }}</div>
                            <div class="bottom">昨日</div>
                        </div>
                    </span>
                </li>
            </ul>
        </div>
        <div class="add">
            <div class="title">文章发布趋势</div>
            <div ref="echartsAdd" class="echartsAdd"></div>
        </div>
        <div class="article">
            <div class="title">爆火文章</div>
            <div class="item">
                <el-row :gutter="25">
                    <el-col :span="5">
                        <div ref="echartsArticle" class="echartsArticle"></div>
                    </el-col>
                    <el-col :span="19">
                        <div class="item">
                            <ul>
                                <li v-for="(item, idx) in data" :key="item.id">
                                    <div class="num">{{ idx + 1 }}</div>
                                    <div class="box">
                                        <div class="title">
                                            {{ item.title }}
                                        </div>
                                        <div class="dsc">
                                            发布时间：{{
                                                (item.add_time * 1000)
                                                    | toDateString
                                            }}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            data: {},
            info: {},
        };
    },
    mounted() {
        this.getInfo();
        this.initEcharts();
    },
    methods: {
        getInfo() {
            this.$api.dashboard.getInfo().then((res) => {
                this.info = res;
            });
        },
        initEcharts() {
            var chartAdd = this.$refs.echartsAdd;
            var myChartAdd = this.$echarts.init(chartAdd);
            var optionAdd;
            var optionDatas;

            this.$api.dashboard.articleRank().then((res) => {
                optionDatas = res;
                optionAdd = {
                    grid: {
                        x: 30,
                        x2: 0,
                        y: 30,
                        y2: 40,
                    },
                    xAxis: {
                        type: "category",
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
                    yAxis: {
                        type: "value",
                    },
                    series: [
                        {
                            data: optionDatas,
                            type: "line",
                        },
                    ],
                };

                optionAdd && myChartAdd.setOption(optionAdd);
            });

            var chartArticle = this.$refs.echartsArticle;
            var myChartArticle = this.$echarts.init(chartArticle);
            var optionArticle;
            var articleData = [];
            var optionData = [];
            this.$api.dashboard.trafficRank().then((res) => {
                this.data = res;
                articleData = res;
                articleData.forEach((item) => {
                    optionData.push({ value: item.views, name: item.title });
                });

                optionArticle = {
                    color: [
                        "#73c0de",
                        "#5470c6",
                        "#91cc75",
                        "#fac858",
                        "#ee6666",
                    ],
                    tooltip: {
                        trigger: "item",
                        position: function (point, params, dom, rect, size) {
                            //其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
                            var x = point[0]; //
                            var y = point[1];
                            var boxWidth = size.contentSize[0];
                            var boxHeight = size.contentSize[1];
                            var posX = 0; //x坐标位置
                            var posY = 0; //y坐标位置

                            if (x < boxWidth) {
                                //左边放不开
                                posX = 5;
                            } else {
                                //左边放的下
                                posX = x - boxWidth;
                            }

                            if (y < boxHeight) {
                                //上边放不开
                                posY = 5;
                            } else {
                                //上边放得下
                                posY = y - boxHeight;
                            }

                            return [posX, posY];
                        },
                    },
                    series: [
                        {
                            name: "浏览量",
                            type: "pie",
                            radius: ["45%", "90%"],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: "center",
                            },
                            center: ["48%", "52%"],
                            data: optionData,
                        },
                    ],
                };
                optionArticle && myChartArticle.setOption(optionArticle);
            });
        },
    },
};
</script>

<style lang="less" scoped>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.ele-body {
    padding: 0 20px;
}

.title {
    display: inline-block;
    font-weight: bolder;
    font-size: 16px;
    color: #212121;
    margin: 30px 0 25px 0;
    position: relative;
}

.title::after {
    content: "";
    width: 35px;
    height: 3px;
    background: #00a1d6;
    position: absolute;
    bottom: -10px;
    left: 0;
}

.card {
    ul {
        display: flex;
        li {
            width: 25%;
            margin: 0 10px;
            span {
                display: inline-block;
                width: 100%;
                background: rgba(0, 161, 214, 0.08);
                border: 1.5px solid rgba(0, 161, 214, 0.4);
                border-radius: 2px;
                .item {
                    padding: 10px 35px;
                    .top {
                        font-size: 12px;
                        color: #757575;
                        line-height: 16px;
                    }
                    .mid {
                        margin: 8px 0;
                        font-weight: 600;
                        font-size: 22px;
                        color: #00a1d6;
                        letter-spacing: 0.5px;
                    }
                    .bottom {
                        color: #757575;
                        font-size: 12px;
                    }
                }
            }
        }

        li:first-child {
            margin-left: 0;
        }

        li:last-child {
            margin-right: 0;
        }
    }

    .title:first-child {
        margin-top: 0;
    }
}

.add {
    .echartsAdd {
        width: 100%;
        height: 500px;
    }
}

.article {
    .echartsArticle {
        width: 100%;
        height: 400px;
    }

    .item {
        ul {
            li {
                border: 1px solid #ccc;
                margin-bottom: 10px;
                display: flex;
                position: relative;
                border-left: 0;

                .num {
                    display: flex;
                    width: 64px;
                    font-weight: 700;
                    font-size: 20px;
                    align-items: center;
                    justify-content: center;
                }

                .box {
                    padding: 15px 0;
                }

                .title {
                    color: #2b2c2e;
                    font-weight: 700;
                    cursor: pointer;
                    margin: 0;
                    margin-bottom: 5px;
                }

                .title:hover {
                    color: #00a1d6;
                }

                .title::after {
                    display: none;
                }

                .dsc {
                    font-size: 12px;
                    color: #7a7c7f;
                }
            }

            li:nth-child(1) .num {
                color: #73c0de;
                border-left: 5px solid #73c0de;
            }

            li:nth-child(2) .num {
                color: #5470c6;
                border-left: 5px solid #5470c6;
            }

            li:nth-child(3) .num {
                color: #91cc75;
                border-left: 5px solid #91cc75;
            }

            li:nth-child(4) .num {
                color: #fac858;
                border-left: 5px solid #fac858;
            }

            li:nth-child(5) .num {
                color: #ee6666;
                border-left: 5px solid #ee6666;
            }

            li:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>