<template>
    <div style="padding-top: 60px">
        <el-container>
            <!-- 头部 header -->
            <el-header>
                <div
                    class="ele-admin-logo"
                    :style="isCollapse ? 'width:64px' : 'width:256px'"
                >
                    <span :style="isCollapse ? 'display:none' : 'display:block'"
                        >XQBLOG</span
                    >
                </div>
                <el-menu mode="horizontal" class="ele-header-left">
                    <el-menu-item index="fold" @click="toggleCollapse"
                        ><i
                            :class="
                                isCollapse ? 'el-icon-_unfold' : 'el-icon-_fold'
                            "
                        ></i
                    ></el-menu-item>
                    <el-menu-item index="refresh" @click="refresh"
                        ><i class="el-icon-refresh-right"></i
                    ></el-menu-item>
                </el-menu>
                <el-breadcrumb
                    separator="/"
                    class="ele-header-breadcrumb ele-scrollbar-hide"
                >
                    <el-breadcrumb-item
                        v-for="(item, index) in levels"
                        :key="index"
                        :to="
                            index === 0 && levels.length > 1 && item.path
                                ? { path: item.path }
                                : null
                        "
                        >{{ item.meta.title }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <el-row style="margin-right: 30px">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="退出登陆"
                        placement="bottom"
                    >
                        <el-button
                            type="danger"
                            icon="el-icon-switch-button"
                            circle
                            @click="logout"
                        ></el-button>
                    </el-tooltip>
                </el-row>
            </el-header>
            <!-- 左侧边栏 -->
            <el-container>
                <el-aside :width="isCollapse ? '64px' : '256px'">
                    <div :class="isCollapse ? 'enshrink' : 'deshrink'">
                        <el-menu
                            background-color="#191a23"
                            text-color="#FFF"
                            :default-active="this.$route.path"
                            :style="isCollapse ? 'width:64px' : 'width:256px'"
                            :unique-opened="true"
                            :collapse="isCollapse"
                            :collapse-transition="false"
                            router
                        >
                            <div
                                v-for="(item, key) in this.$store.state.menus"
                                :key="item.id"
                            >
                                <el-menu-item
                                    v-if="
                                        !item.children || !item.children.length
                                    "
                                    :index="!item.path ? key + '' : item.path"
                                >
                                    <i :class="item.icon"></i>
                                    <span slot="title"
                                        ><span
                                            :style="
                                                isCollapse
                                                    ? 'opacity:0'
                                                    : 'opacity:1'
                                            "
                                            >{{ item.title }}</span
                                        ></span
                                    >
                                </el-menu-item>
                                <el-submenu
                                    v-else
                                    :index="!item.path ? key + '' : item.path"
                                >
                                    <template slot="title">
                                        <i :class="item.icon"></i>
                                        <span slot="title"
                                            ><span
                                                :style="
                                                    isCollapse
                                                        ? 'opacity:0'
                                                        : 'opacity:1'
                                                "
                                                >{{ item.title }}</span
                                            ></span
                                        >
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item
                                            v-for="child in item.children"
                                            :key="child.id"
                                            :index="child.path"
                                        >
                                            <i :class="child.icon"></i
                                            ><span>{{ child.title }}</span>
                                        </el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </div>
                        </el-menu>
                    </div>
                </el-aside>
                <!-- 主体区域 -->
                <el-main
                    :style="
                        isCollapse
                            ? 'padding-left: 64px'
                            : 'padding-left: 256px'
                    "
                >
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: false,
            levels: [], // 面包屑数据
        };
    },
    created() {
        this.routeChange();
    },
    methods: {
        // 页面刷新
        refresh() {
            this.$router.replace({
                path: "/refresh",
                query: {
                    t: Date.now(),
                },
            });
        },
        // 用户注销
        logout() {
            this.$confirm("确定要退出登录吗?", "提示", { type: "warning" })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "注销成功",
                        center: true,
                        onClose: () => {
                            localStorage.removeItem("access_token");
                            this.$router.push("/login");
                        },
                    });
                })
                .catch(() => 0);
        },
        // 左侧边栏折叠
        toggleCollapse() {
            this.isCollapse = !this.isCollapse;
        },
        /* 处理路由切换 */
        routeChange() {
            let current = this.$route,
                path = current.path,
                matched;
            if (this.$store.state.menus && this.$store.state.menus.length)
                matched = this.getBreadcrumb(path);
            if (!matched || !matched.length) matched = current.matched; // 从路由中获取面包屑
            matched = matched.filter(
                (item) =>
                    item.meta &&
                    item.meta.title &&
                    item.meta.breadcrumb !== false
            );
            if (path !== "/" && !this.isHome())
                matched.unshift({ path: "/", meta: { title: "首页" } });
            this.levels = matched;
        },
        /* 从菜单中获取面包屑导航 */
        getBreadcrumb(path, data) {
            if (!data) data = this.$store.state.menus;
            for (let i = 0; i < data.length; i++) {
                if (data[i].path === path) {
                    return [{ path: path, meta: data[i].meta }];
                } else if (data[i].children && data[i].children.length) {
                    let temp = this.getBreadcrumb(path, data[i].children);
                    if (temp && temp.length)
                        return [
                            { path: data[i].path, meta: data[i].meta },
                        ].concat(temp);
                }
            }
            return [];
        },
        /* 判断是否是主页 */
        isHome() {
            let current = this.$route,
                matched = current.matched;
            return (
                matched &&
                matched.length &&
                !matched[0].path &&
                matched[0].redirect === current.path
            );
        },
    },
    watch: {
        /* 监听路由切换 */
        $route() {
            if (this.$store.state.tokenValidTime <= new Date().getTime()) {
                this.$message({
                    type: "warning",
                    message: "登陆过期，请重新登录!",
                    center: true,
                    onClose: () => {
                        localStorage.removeItem("valid_time");
                        this.$router.push("/login");
                    },
                });
            }
            this.routeChange();
        },
    },
};
</script>

<style lang="less" scoped>
.el-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    box-shadow: 0 1px 0 #f4f4f4;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    z-index: 1001;
    padding: 0;
    .ele-admin-logo {
        color: rgba(255, 255, 255, 0.9);
        box-shadow: 0 0px 4px rgb(0 21 41 / 35%);
        background-color: #191a23;
        font-size: 20px;
        font-weight: 500;
        letter-spacing: 1.5px;
        height: 61px;
        transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Avenir, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
            Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
        span {
            display: inline-block;
            line-height: 1;
        }
    }
    .ele-header-breadcrumb {
        padding: 0 10px;
        height: 60px;
        line-height: 63px;
        white-space: nowrap;
        overflow-y: hidden;
        flex: 1;
    }
    .el-avatar {
        width: 30px;
        height: 30px;
        margin-right: 5px;
    }
    .ele-header-left {
        background-color: transparent;
        border: none;
        padding: 0 8px;
        white-space: nowrap;
        .el-menu-item {
            padding: 0 12px;
        }
        .el-menu-item [class^="el-icon-"] {
            margin-right: 0;
        }
    }
    .el-submenu__name {
        color: #595959;
        background-color: transparent;
    }
    .el-menu--horizontal > .el-menu-item.is-active {
        border-bottom: 0;
    }
    .el-menu--horizontal > .el-menu-item {
        border-bottom: 0;
    }
}
.ele-menu-pop .el-menu--popup.el-menu {
    min-width: 100px;
}
.el-aside {
    box-shadow: 0 4px 4px rgb(0 21 41 / 35%);
    background-color: #191a23;
    position: fixed;
    top: 60px;
    bottom: 0;
    left: 0;
    min-height: calc(100vh - 60px);
    transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
    overflow-x: hidden !important;
    z-index: 1002;
    .el-menu {
        border-right: inherit;
    }
    .el-submenu__title i {
        color: #fff !important;
    }
    .el-menu-item i {
        color: #fff !important;
    }
    .el-menu-item.is-active {
        color: #fff !important;
        background-color: #409eff !important;
        border-right: none !important;
    }
    .el-menu .el-menu-item:hover,
    .el-menu .el-submenu__title:hover {
        color: #fff !important;
    }
}

.el-main {
    padding: 0;
    min-height: calc(100vh - 60px);
    transition: padding-left 0.3s ease-in-out;
}

body > .el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>