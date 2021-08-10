export default function({ $axios, redirect }) {
    // $axios.defaults.baseURL = "https://api.qblog.cc/index"
    $axios.defaults.baseURL = "http://api.xqphp.com/index"
    $axios.onRequest(config => {
        if (config.method == 'post') {
            if (!config.data) {
                config.data = {}
            }
        }
        return config
    }, function(error) {
        return Promise.reject(error)
    })

    $axios.onResponse(res => {
        switch (res.data.ret) {
            case 200:
                return res.data
                    // case 401:
                    //     Message({
                    //         type: 'warning',
                    //         message: res.data.msg,
                    //         center: true,
                    //         onClose: () => {
                    //             localStorage.removeItem("access_token");
                    //             location.reload();
                    //         },
                    //     })
                    //     return false
                    // default:
                    //     Message({
                    //         type: 'error',
                    //         message: res.data.msg,
                    //         center: true
                    //     })
                    //     return false
        }
    }, function(error) {
        return Promise.reject(error)
    })
}