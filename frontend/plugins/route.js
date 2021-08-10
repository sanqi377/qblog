export default ({ app }) => {
    app.router.beforeEach((to, from, next) => {
        if (!app.store.state.webInfo.title) {
            app.$api.index.getWebSetting().then((res) => {
                let webInfo = {};
                res.data.forEach((item) => {
                    webInfo[item["key"]] = item["value"];
                });
                app.store.commit("setInfo", {
                    webInfo
                });
            });
        }
        return next();
    })

    app.router.afterEach(() => {
        if (process.client) {
            setTimeout(() => {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }, 500);
        }
    });
}