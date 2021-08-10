import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
import axios from 'axios'
import setting from '@/config/setting'
import util from '@/utils/util'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        component: () =>
            import ('@/views/login'),
    },

];

const router = new VueRouter({
    routes,
    mode: 'history' // 把这个删掉就是hash模式
});
// const route404 = [
//   {
//     path: '/404',
//     component: () => import('@/views/common/404'),
//   },
//   {
//     path: '*',
//     redirect: '/404',
//   },
// ];
// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
    // to   要访问的路径
    // from 从哪个路径跳转而来
    // next 是一个函数，代表放行； next() 放行  next(/login) 强制跳转login
    NProgress.start();
    if (to.path != '/login') { // 判断不处于登陆页
        if (store.state.token) { // 判断是否登陆
            if (!store.state.menus) { // 判断是否有menu数据
                axios.post(setting.baseURL + '/admin/system/menu', { key: 'route' }).then(res => { // 后端请求menu数据, 带特定标记 route
                    store.dispatch('setMenu', res); // 添加menu数据到vuex
                    if (store.state.menus) { // 判断是否有menu数据
                        let data = store.state.menus;
                        // 父路由初始化
                        let route = {
                            path: '/',
                            name: 'main',
                            component: () =>
                                import ('@/admin/index'),
                            children: [],
                            redirect: null,
                            alias: '/index'
                        };
                        // 添加children路由
                        util.eachTreeData(data, (item) => {
                            item.meta = Object.assign({ title: item.title, icon: item.icon, hide: item.hide, uid: item.uid }, item.meta);
                            if (item.path && !item.path.startsWith('http://') && !item.path.startsWith('https://') &&
                                !item.path.startsWith('//')) {
                                if (!route.redirect) {
                                    route.redirect = item.path;
                                }
                                route.children.push({
                                    path: item.path,
                                    name: item.name || item.path,
                                    meta: item.meta,
                                    component: () =>
                                        import ('@/views' + (item.component || item.path))
                                });
                            }
                        });
                        // 增加刷新当前路由的子路由（写给自己看，你们可能看不懂）
                        route.children.push({
                                path: '/refresh',
                                component: () =>
                                    import ('@/views/common/refresh.vue'),
                            }, )
                            //增加404子路由
                            // route.children.push(
                            //   {
                            //     path: '/404', component: () => import('@/views/common/404')
                            //   },)
                            // route.children.push(
                            //   {
                            //     path: '*', redirect: '/404'
                            //   }
                            // )
                        router.addRoute(route);
                    };
                });
            }
            return next();
        } else {
            return next('/login');
        }
    } else {
        return next();
    }
})

router.afterEach(() => {
    setTimeout(() => {
        NProgress.done();
    }, 150);
});

export default router;