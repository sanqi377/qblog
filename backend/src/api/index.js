import ajax from "./axios";

const api = {
    user: {
        login: (param) => {
            return ajax.post("users/login", param);
        },
        list: (param) => {
            return ajax.post("users/list", param);
        },
        save: (param) => {
            return ajax.post("users/save", param);
        },
    },
    system: {
        menu: (param) => {
            return ajax.post("system/menu", param);
        },
        loginlog: (param) => {
            return ajax.post("system/loginlog", param);
        },
        site: (param) => {
            return ajax.post("system/siteSave", param);
        },
        getSystem: () => {
            return ajax.post("system/getSystem");
        },
        getDefaultEditor: () => {
            return ajax.post("system/getDefaultEditor");
        },
    },
    menu: {
        delect: (param) => {
            return ajax.post("menu/delect", param);
        },
        menuSave: (param) => {
            return ajax.post("menu/menuSave", param);
        },
    },
    article: {
        cats: (param) => {
            return ajax.post("article/cats", param);
        },
        save: (param) => {
            return ajax.post("article/save", param);
        },
        getCats: () => {
            return ajax.post("article/getCats");
        },
        new: (param) => {
            return ajax.post("article/addArticle", param);
        },
        getArticle: (param) => {
            return ajax.post("article/getArticle", param);
        },
        deleteArticle: (param) => {
            return ajax.post("article/deleteArticle", param);
        },
        getArticleDetails: (param) => {
            return ajax.post("article/getArticleDetails", param);
        },
        deleteCat: (param) => {
            return ajax.post("article/deleteCat", param);
        }
    },
    common: {
        upload: (param) => {
            return ajax.post("common/upload", param, {
                headers: { "Content-Type": "multipart/form-data;" }
            });
        }
    },
    comment: {
        getCommentList: (param) => {
            return ajax.post("comment/getCommentList", param);
        },
        deleteComment: (param) => {
            return ajax.post("comment/deleteComment", param);
        },
        editComment: (param) => {
            return ajax.post("comment/editComment", param);
        }
    },
    pages: {
        addPage: (param) => {
            return ajax.post("pages/addPage", param);
        },
        getPages: () => {
            return ajax.post("pages/getPages");
        },
        deletePages: (param) => {
            return ajax.post("pages/deletePages", param);
        },
    },
    personal: {
        getInfo: () => {
            return ajax.post("personal/getInfo");
        },
        saveInfo: (param) => {
            return ajax.post("personal/saveInfo", param);
        }
    },
    link: {
        getLink: (param) => {
            return ajax.post("link/getLink", param);
        },
        addLink: (param) => {
            return ajax.post("link/addLink", param);
        },
        deleteLink: (param) => {
            return ajax.post("link/deleteLink", param);
        },
        changeStatus: (param) => {
            return ajax.post("link/changeStatus", param);
        }
    },
    dashboard: {
        trafficRank: () => {
            return ajax.post("dashboard/trafficRank");
        },
        articleRank: () => {
            return ajax.post("dashboard/articleRank");
        },
        getInfo: () => {
            return ajax.post("dashboard/getInfo");
        }
    },
    // 外部api
    external: {
        hitokoto: () => {
            return ajax.post("external/hitokoto");
        },
        getInfo: () => {
            return ajax.post("external/getInfo");
        }
    },
};

export default api;