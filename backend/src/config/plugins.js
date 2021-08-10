/**
 * 引用框架
 */
import Vue from "vue";
import setting from "./setting";
import util from "@/utils/util";
import api from "@/api";
// 第三方组件
import NProgress from "nprogress"; // 顶部进度条
import "nprogress/nprogress.css";
import * as echarts from "echarts";
// 扩展组件
import EleIconPicker from "@/components/EleIconPicker"; // 图标选择器
import MyEditor from "@/components/tinymce-editor"; // 富文本编辑器
// UI框架
import ElementUI from "element-ui"; // ElementUI
import "element-ui/lib/theme-chalk/display.css";
import "@/styles/eleadmin/icon.scss"; // EleAdmin图标
import "@/styles/common.less"; // 全局css

Vue.prototype.$util = util;
Vue.prototype.$setting = setting;
Vue.prototype.$api = api;
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI, { size: "medium" });
NProgress.configure({ showSpinner: false });

/* 全局注册常用组件 */
Vue.component(EleIconPicker.name, EleIconPicker);
Vue.component(MyEditor.name, MyEditor);

/** 添加全局过滤器 */
Vue.filter("toDateString", (value, format) => {
    return util.toDateString(value, format);
});