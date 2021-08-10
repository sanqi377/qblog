var ajax = null
export default ({ $axios }, inject) => {
    ajax = $axios
    inject('api', api)
}

const api = {
    index: {
        getNav: () => {
            return ajax.post("index/getNav");
        },
        getArticle: (param) => {
            return ajax.post("index/getArticle", param);
        },
        searchArticle: (param) => {
            return ajax.post("index/searchArticle", param);
        },
        getWebSetting: (param) => {
            return ajax.post("index/getWebSetting", param);
        }
    },
    article: {
        getArticleDetails: (param) => {
            return ajax.post("article/getArticleDetails", param);
        },
        addViews: (param) => {
            return ajax.post("article/addViews", param);
        },
        addLike: (param) => {
            return ajax.post("article/addLike", param);
        },
        getLike: (param) => {
            return ajax.post("article/getLike", param);
        }
    },
    comment: {
        addComment: (param) => {
            return ajax.post("comment/addComment", param);
        },
        getComment: (param) => {
            return ajax.post("comment/getComment", param);
        },
        addReply: (param) => {
            return ajax.post("comment/addReply", param);
        }
    },
    system: {
        getDark: (param) => {
            return ajax.post("system/getDark", param);
        }
    },
    category: {
        getInfo: (param) => {
            return ajax.post("category/getInfo", param);
        },
        getArticle: (param) => {
            return ajax.post("category/getArticle", param);
        },
        getNavId: (param) => {
            return ajax.post("category/getNavId", param);
        }
    },
    pages: {
        getPageInfo: (param) => {
            return ajax.post("pages/getPageInfo", param);
        },
        github: () => {
            return ajax.post("pages/github");
        },
        getLink: () => {
            return ajax.post("pages/getLink");
        }
    },
    external: {
        getPoetry: () => {
            return ajax.post("external/getPoetry");
        },
        getMusic: (param) => {
            return ajax.post("external/getMusic", param);
        },
        blibli: () => {
            return ajax.post("external/blibli");
        }
    }
}