const state = () => ({
    isDark: null, // 是否为黑夜
    isSetting: false, // 是否手动设置
    webInfo: {}
})

const mutations = {
    setDark(state, $isDark) {
        state.isDark = $isDark;
    },
    setSetting(state, $isSetting) {
        state.isSetting = $isSetting;
        localStorage.setItem("isSetting", JSON.stringify(state.isSetting))
    },
    setInfo(state, $info) {
        state.webInfo.title = $info.webInfo.title;
        state.webInfo.subtitle = $info.webInfo.subtitle;
        state.webInfo.pic = $info.webInfo.pic;
        state.webInfo.keyword = $info.webInfo.keyword;
        state.webInfo.describe = $info.webInfo.describe;
    }
}

const actions = {
    setDark(context, $isDark) {
        context.commit('setDark', $isDark);
    },
    setSetting(context, $isSetting) {
        context.commit('setSetting', $isSetting);
    },
    setInfo(context, $info) {
        context.commit('setInfo', $info);
    }
}

export default { namespaced: true, state, mutations, actions };