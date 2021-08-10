<template>
    <div class="music">
        <div class="top">
            <div class="content" id="music">
                <div class="left">
                    <img :src="data.picurl" />
                </div>
                <div class="right">
                    <div class="title">{{ this.data.name }}</div>
                    <div class="author">{{ this.data.artistsname }}</div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div>
                <div class="prve">
                    <svg viewBox="0 0 36 20">
                        <path
                            d="M1.69813738,11.0254725 C0.75331072,10.4595484 0.761328762,9.53720142 1.69813738,8.97607983 L16.2885768,0.236823587 C17.2334034,-0.329100579 17.9993368,0.11180583 17.9993368,1.20339155 L17.9993368,18.7981608 C17.9993368,19.8979057 17.2253854,20.3258504 16.2885768,19.7647288 L1.69813738,11.0254725 Z"
                        ></path>
                        <path
                            d="M19.6988006,8.97607983 C18.7539739,9.542004 18.761992,10.4643509 19.6988006,11.0254725 L34.28924,19.7647288 C35.2340667,20.3306529 36,19.8897465 36,18.7981608 L36,1.20339155 C36,0.103646637 35.2260486,-0.324298001 34.28924,0.236823587 L19.6988006,8.97607983 Z"
                        ></path>
                    </svg>
                </div>
                <div class="player" @click="player()">
                    <svg viewBox="0 0 64 64" v-show="!isPlayer">
                        <path
                            d="M51.109 30.335l-36-24A2 2 0 0 0 12 8v48a2.003 2.003 0 0 0 2 2c.388 0 .775-.113 1.109-.336l36-24a2 2 0 0 0 0-3.329z"
                        ></path>
                    </svg>
                    <svg viewBox="0 0 100 100" v-show="isPlayer">
                        <path
                            d="M22.537 8.046h17.791c1.104 0 2.003.898 2.003 1.993v79.912a2.005 2.005 0 0 1-2.003 2.003h-17.79a2.005 2.005 0 0 1-2.003-2.003V10.04c0-1.095.898-1.993 2.002-1.993zM59.672 8.046h17.8c1.095 0 1.993.898 1.993 1.993v79.912a2.003 2.003 0 0 1-1.993 2.003h-17.8a1.997 1.997 0 0 1-1.993-2.003V10.04c0-1.095.889-1.993 1.993-1.993z"
                        ></path>
                    </svg>
                </div>
                <div class="next">
                    <svg viewBox="0 0 36 20">
                        <path
                            d="M34.3018626,8.97607983 C35.2466893,9.542004 35.2386712,10.4643509 34.3018626,11.0254725 L19.7114232,19.7647288 C18.7665966,20.3306529 18.0006632,19.8897465 18.0006632,18.7981608 L18.0006632,1.20339155 C18.0006632,0.103646637 18.7746146,-0.324298001 19.7114232,0.236823587 L34.3018626,8.97607983 Z"
                        ></path>
                        <path
                            d="M16.3011994,8.97607983 C17.2460261,9.542004 17.238008,10.4643509 16.3011994,11.0254725 L1.71075999,19.7647288 C0.765933339,20.3306529 0,19.8897465 0,18.7981608 L0,1.20339155 C0,0.103646637 0.773951381,-0.324298001 1.71075999,0.236823587 L16.3011994,8.97607983 Z"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
        <audio :src="data.url" ref="audio"></audio>
    </div>
</template>

<script>
export default {
    name: "Music",
    data() {
        return {
            data: {},
            playIng: false,
            isPlayer: false,
            isPause: false,
        };
    },
    mounted() {
        this.getMusic();
    },
    methods: {
        getMusic() {
            this.$api.external.getMusic({ id: 3123196424 }).then((res) => {
                this.data = res.data.data;
                let s = document.createElement("style");
                s.innerText =
                    ".content::after{background: url(" +
                    this.data.picurl +
                    ");}";
                document.body.appendChild(s);
            });
        },
        player() {
            this.isPlayer = !this.isPlayer;
            if (this.isPlayer) {
                this.$refs.audio.play();
            } else {
                this.$refs.audio.pause();
            }
        },
    },
};
</script>

<style scoped>
.music {
    border-radius: 12px;
    background-color: #fff;
    position: relative;
}

.top {
    overflow: hidden;
    border-radius: 12px;
}

.buttom {
    height: 300px;
}

.content {
    width: 100%;
    height: 135px;
    display: flex;
    position: relative;
    justify-content: space-evenly;
}

.content::after {
    content: "";
    position: absolute;
    z-index: 1;
    filter: blur(0.6rem) brightness(0.7);
    background-position-x: center;
    background-position-y: center;
    background-size: cover;
    object-fit: cover;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.content .left {
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 45%;
}

.content .left img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.content .right {
    z-index: 2;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    width: 55%;
}

.content .right > div {
    width: 100%;
    margin-bottom: 10px;
}

.content .title {
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.content .author {
    color: #cfcfcf;
}

.bottom {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    z-index: 5;
    display: none;
    border-radius: 12px;
}

.music:hover .bottom {
    display: block;
}

.bottom > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
}

.bottom .player {
    cursor: pointer;
}

.bottom svg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
}

.player svg {
    opacity: .8;
    width: 45px;
    height: 45px;
}
</style>