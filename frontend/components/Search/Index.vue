<template>
    <div class="maskLayer" @click="close()">
        <div class="search" @click.stop="fnClose()">
            <div class="header">
                <form class="form">
                    <span>
                        <svg
                            width="20"
                            height="20"
                            class="DocSearch-Search-Icon"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                                stroke="currentColor"
                                fill="none"
                                fill-rule="evenodd"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </svg>
                    </span>
                    <input
                        type="text"
                        v-model="val"
                        placeholder="Search docs"
                        @input="inputChange()"
                        autofocus
                        ref="inputs"
                    />
                    <div class="reset" @click="rminput()" v-show="closeBtn">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path
                                d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
                                stroke="currentColor"
                                fill="none"
                                fill-rule="evenodd"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </svg>
                    </div>
                </form>
            </div>
            <div class="main">
                <div class="noneSearch" v-show="!val">
                    <p>No recent searches</p>
                </div>
                <div class="kSearch" v-show="!isData && val">
                    <div class="noResults">
                        <div class="searchIcon">
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 20 20"
                                fill="none"
                                fill-rule="evenodd"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M15.5 4.8c2 3 1.7 7-1 9.7h0l4.3 4.3-4.3-4.3a7.8 7.8 0 01-9.8 1m-2.2-2.2A7.8 7.8 0 0113.2 2.4M2 18L18 2"
                                ></path>
                            </svg>
                        </div>
                        <div class="title">
                            No results for <strong>"{{ this.val }}"</strong>
                        </div>
                    </div>
                </div>
                <div class="areSearch" v-show="isData && val">
                    <ul>
                        <li v-for="item in data" :key="item.id">
                            <router-link :to="'/article/' + item.id + '.html'">
                                <div>
                                    <div class="icon">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4"
                                                stroke="currentColor"
                                                fill="none"
                                                fill-rule="evenodd"
                                                stroke-linejoin="round"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div class="val">
                                        <span>{{ item.title }}</span>
                                    </div>
                                    <div class="action">
                                        <svg
                                            class="DocSearch-Hit-Select-Icon"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                        >
                                            <g
                                                stroke="currentColor"
                                                fill="none"
                                                fill-rule="evenodd"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path
                                                    d="M18 3v4c0 2-2 4-4 4H2"
                                                ></path>
                                                <path d="M8 17l-6-6 6-6"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Search",
    data() {
        return {
            closeBtn: false,
            val: null,
            data: {},
            isData: null,
        };
    },
    mounted() {
        this.$refs.inputs.focus();
    },
    methods: {
        close() {
            this.$emit("close");
        },
        fnClose() {
            console.log("stop click");
        },
        inputChange() {
            if (this.val) {
                this.closeBtn = true;
                this.$api.index
                    .searchArticle({ search: this.val })
                    .then((res) => {
                        if (res.data.length == 0) {
                            this.isData = false;
                        } else {
                            this.isData = true;
                            this.data = res.data;
                        }
                    });
            } else {
                this.closeBtn = false;
            }
        },
        rminput() {
            this.val = null;
            this.closeBtn = false;
        },
    },
    watch: {
        $route: "close",
    },
};
</script>

<style scoped>
.maskLayer {
    z-index: 999;
    background-color: #656c85cc;
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    overflow-y: hidden;
}
.search {
    width: 560px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f5f6f7;
    border-radius: 6px;
    box-shadow: inset 1px 1px 0 0 hsla(0, 0%, 100%, 0.5), 0 3px 8px 0 #555a64;
}

.header {
    display: flex;
    padding: 12px;
    padding-bottom: 0;
}

.form {
    align-items: center;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: inset 0 0 0 2px #338bff;
    display: flex;
    height: 56px;
    position: relative;
    width: 100%;
    padding: 0 12px;
}

.form > span {
    -webkit-align-items: center;
    align-items: center;
    color: #5468ff;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
}

.form > input {
    appearance: none;
    background: 0 0;
    border: 0;
    color: #1c1e21;
    -webkit-flex: 1;
    flex: 1;
    font-size: 1.2em;
    height: 100%;
    outline: 0;
    padding: 0 0 0 8px;
    width: 80%;
}

.form > span > svg {
    width: 24px;
    height: 24px;
    stroke-width: 1.6;
    color: #338bff;
}

.reset {
    -webkit-animation: 0.1s ease-in forwards b;
    animation: 0.1s ease-in forwards b;
    appearance: none;
    background: none;
    border-radius: 50%;
    color: rgb(40, 61, 87) !important;
    padding: 2px;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    cursor: pointer;
}

.main {
    max-height: 488px;
    min-height: 12px;
    overflow-y: auto;
    overflow-y: overlay;
    padding: 0 12px;
}

.noneSearch {
    font-size: 0.9em;
    margin: 0 auto;
    padding: 36px 0;
    text-align: center;
    width: 80%;
}

.noneSearch > p {
    font-size: 0.9em;
    margin: 0;
    user-select: none;
    color: #969faf;
}

.areSearch {
    margin: 10px 0;
}

.areSearch > ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.areSearch > ul > li {
    border-radius: 4px;
    display: -webkit-flex;
    display: flex;
    padding-bottom: 4px;
    position: relative;
}

.areSearch > ul > li > a {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 #d4d9e1;
    display: block;
    padding-left: 12px;
    width: 100%;
}

.areSearch > ul > li > a > div {
    -webkit-align-items: center;
    align-items: center;
    color: #444950;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    height: 56px;
    padding: 0 12px 0 0;
}

.areSearch > ul > li > a > div .icon {
    height: 20px;
    width: 20px;
    color: #969faf !important;
}

.areSearch > ul > li > a > div .val {
    display: -webkit-flex;
    display: flex;
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
    -webkit-flex-direction: column;
    flex-direction: column;
    font-weight: 500;
    -webkit-justify-content: center;
    justify-content: center;
    line-height: 1.2em;
    margin: 0 8px;
    /* overflow-x: hidden; */
    position: relative;
    width: 80%;
    color: #444950 !important;
}

.areSearch > ul > li > a > div .val > span {
    font-size: 0.9em;
}

.areSearch > ul > li > a > div .action {
    -webkit-align-items: center;
    align-items: center;
    display: -webkit-flex;
    display: flex;
    height: 22px;
    width: 22px;
}

.areSearch > ul > li > a > div .action svg {
    display: none;
    height: 18px;
    width: 18px;
}
/* 
.areSearch > ul > li:hover .areSearch div svg,
.areSearch div span {
    display: block !important;
    color: #fff !important;
} */

.areSearch li:hover a {
    background-color: #338bff;
}

.areSearch li:hover svg {
    display: block !important;
    color: #fff !important;
}

.areSearch li:hover span {
    color: #fff !important;
}

.kSearch {
    max-height: 600px;
    min-height: 12px;
    overflow-y: auto;
    overflow-y: overlay;
    padding: 0 12px;
}

.noResults {
    font-size: 0.9em;
    margin: 0 auto;
    padding: 36px 0;
    text-align: center;
    width: 80%;
}

.searchIcon {
    color: #969faf !important;
    padding-bottom: 12px;
}

.title {
    font-size: 1.2em;
    color: rgb(40, 61, 87) !important;
}
</style>