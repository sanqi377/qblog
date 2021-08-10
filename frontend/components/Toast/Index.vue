<template>
    <div class="toast__container" v-if="isShow">
        <div class="toast__cell">
            <div :class="'toast toast--' + sourceData.type">
                <div class="toast__icon" v-if="sourceData.type === 'success'">
                    <svg
                        version="1.1"
                        class="toast__svg"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style="enable-background: new 0 0 512 512"
                        xml:space="preserve"
                    >
                        <g>
                            <g>
                                <path
                                    d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0    c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7    C514.5,101.703,514.499,85.494,504.502,75.496z"
                                ></path>
                            </g>
                        </g>
                    </svg>
                </div>
                <div class="toast__icon" v-else-if="sourceData.type === 'info'">
                    <svg
                        version="1.1"
                        class="toast__svg"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 32 32"
                        style="enable-background: new 0 0 32 32"
                        xml:space="preserve"
                    >
                        <g>
                            <g id="info">
                                <g>
                                    <path
                                        d="M10,16c1.105,0,2,0.895,2,2v8c0,1.105-0.895,2-2,2H8v4h16v-4h-1.992c-1.102,0-2-0.895-2-2L20,12H8     v4H10z"
                                    ></path>
                                    <circle cx="16" cy="4" r="4"></circle>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
                <div class="toast__icon" v-else>
                    <svg
                        version="1.1"
                        class="toast__svg"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 301.691 301.691"
                        style="enable-background: new 0 0 301.691 301.691"
                        xml:space="preserve"
                    >
                        <g>
                            <polygon
                                points="119.151,0 129.6,218.406 172.06,218.406 182.54,0  "
                            ></polygon>
                            <rect
                                x="130.563"
                                y="261.168"
                                width="40.525"
                                height="40.523"
                            ></rect>
                        </g>
                    </svg>
                </div>
                <div class="toast__content">
                    <p class="toast__type">{{ sourceData.message }}</p>
                </div>
                <div class="toast__close" @click="close()">
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 15.642 15.642"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        enable-background="new 0 0 15.642 15.642"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sourceData: {},
            isShow: false,
        };
    },
    methods: {
        add(options) {
            this.isShow = true;
            this.sourceData = options;
            // 定时删除
            options.timer = setTimeout(() => {
                this.remove(options);
            }, options.duration);
        },
        remove(options) {
            clearTimeout(options.timer);
            this.isShow = false;
        },
        close() {
            this.isShow = false;
        },
    },
};
</script>

<style scoped>
.toast__container {
    position: fixed;
    top: 5%;
    right: 2%;
    z-index: 99999;
}

.toast__cell {
    display: inline-block;
}

.toast__svg {
    display: flex;
    fill: #fff;
}

.toast {
    text-align: left;
    padding: 21px 0;
    background-color: #fff;
    border-radius: 4px;
    width: 300px;
    top: 0px;
    position: relative;
    box-shadow: 1px 7px 14px -5px rgba(0, 0, 0, 0.2);
}

.toast:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

.toast__icon {
    position: absolute;
    top: 50%;
    left: 22px;
    transform: translateY(-50%);
    width: 14px;
    padding: 7px;
    border-radius: 50%;
    display: inline-block;
}

.toast__type {
    color: #3e3e3e;
    font-weight: 700;
    margin-top: 0;
}

.toast__content {
    padding-left: 70px;
    padding-right: 60px;
}

.toast__close {
    position: absolute;
    right: 22px;
    top: 50%;
    width: 14px;
    cursor: pointer;
    height: 14px;
    fill: #878787;
    transform: translateY(-50%);
}

.toast__close svg {
    position: absolute;
}

.toast--success .toast__icon {
    background-color: #67C23A;
}

.toast--success:before {
    background-color: #67C23A;
}

.toast--info .toast__icon {
    background-color: #409EFF;
}

.toast--info:before {
    background-color: #409EFF;
}

.toast--error .toast__icon {
    background-color: #F56C6C;
}

.toast--error:before {
    background-color: #F56C6C;
}
</style>