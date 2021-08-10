import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let loginUser = {};
try {
    loginUser = JSON.parse(localStorage.getItem('user_info') || '{}') || {};
} catch (e) {
    console.error(e);
}

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token'), // 当前token
        menus: null, // 当前menu
        tokenValidTime: localStorage.getItem('valid_time'), // token有效期
        userinfo: loginUser, // 登陆用户的信息
        systemInfo: {
            max: localStorage.getItem('fileMax')
        }
    },
    mutations: {
        setToken(state, $token) {
            localStorage.removeItem('access_token'); // 删除旧 token
            localStorage.removeItem('valid_time'); // 删除旧 token 过期时间
            state.tokenValidTime = new Date().getTime() + 5 * 60 * 60 * 1000; // 设置新的 token 过期时间
            localStorage.setItem('valid_time', state.tokenValidTime) // 设置新的 token 过期时间
            state.token = $token; // 设置新的 token
            if ($token) localStorage.setItem('access_token', state.token); // 设置新的 token
            axios.defaults.headers.common['Authorization'] = state.token;
        },
        setMenu(state, $menus) {
            state.menus = $menus; // 设置 menu
        },
        setUser(state, $userinfo) {
            localStorage.removeItem('user_info'); // 删除旧 token
            state.userinfo = $userinfo; // 设置 userinfo
            if ($userinfo) localStorage.setItem('user_info', JSON.stringify($userinfo)); // 设置新的 token
        },
        setSystem(state, $systemInfo) {
            $systemInfo.forEach(item => {
                console.log(item)
                if (item.key == "max") {
                    localStorage.setItem('fileMax', item.value)
                }
            })
        }
    },
    actions: {
        // 异步调用设置 token 方法
        setToken(context, $token) {
            context.commit('setToken', $token);
        },
        setMenu(context, $menus) {
            context.commit('setMenu', $menus);
        },
        setUser(context, $userinfo) {
            context.commit('setUser', $userinfo);
        },
        setSystem(context, $systemInfo) {
            context.commit('setSystem', $systemInfo);
        }
    }
})