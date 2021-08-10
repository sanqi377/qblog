<!-- 图标选择器组件 License By http://eleadmin.com -->
<template>
  <el-popover v-model="show" :width="width" popper-class="ele-icon-picker-popper"
              placement="bottom-start" transition="el-zoom-in-top" :disabled="disabled"
              @show="afterEnter" @hide="afterLeave">
    <div :class="pickerClass" slot="reference">
      <slot v-bind:show="show" v-bind:value="value">
        <!-- 样式二 -->
        <el-input v-if="theme==='style2'" v-model="value" :placeholder="placeholder" :clearable="clearable"
                  :disabled="disabled" :size="size" @focus="setReadonly">
          <template slot="append"><i :class="value"></i></template>
        </el-input>
        <!-- 样式三 -->
        <el-input v-else-if="theme==='style3'" :prefix-icon="value" :disabled="disabled" :size="size"
                  readonly="readonly">
          <template slot="append"><i class="el-icon-arrow-down"></i></template>
        </el-input>
        <!-- 默认样式 -->
        <el-input v-else v-model="value" :prefix-icon="value" :placeholder="placeholder" :clearable="clearable"
                  :disabled="disabled" :size="size" suffix-icon="el-icon-arrow-down" @focus="setReadonly"/>
      </slot>
    </div>
    <el-tabs v-model="active">
      <el-tab-pane v-for="(item,index) in result" :key="index" :label="item.title" :name="item.title">
        <el-scrollbar v-if="listShow" style="height:225px;">
          <el-row>
            <el-col :span="4" v-for="(d,i) in item.icons" :key="i">
              <el-card shadow="hover" class="ele-card-border" :title="d">
                <div class="ele-icon-picker-item" @click="choose(d)"><i :class="d"/></div>
              </el-card>
            </el-col>
          </el-row>
        </el-scrollbar>
        <div v-else style="height:225px;line-height: 225px;text-align: center;">加载中..</div>
      </el-tab-pane>
    </el-tabs>
    <el-input v-if="search" v-model="keywords" placeholder="搜索..." size="mini" suffix-icon="el-icon-search"
              class="ele-icon-picker-search"/>
  </el-popover>
</template>

<script>
import icons from './icon-data'

export default {
  name: "EleIconPicker",
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String,        // 选中图标
    placeholder: String,  // 提示文本
    width: {              // 宽度
      type: Number,
      default: 380
    },
    data: {               // 图标数据
      type: Array,
      default() {
        return icons
      }
    },
    size: String,         // 尺寸
    readonly: {           // 是否只读
      type: Boolean,
      default: true
    },
    disabled: Boolean,    // 是否禁用
    clearable: {          // 是否显示清除
      type: Boolean,
      default: true
    },
    theme: String,        // 风格样式
    search: {             // 是否显示搜索
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,      // 是否显示pop
      keywords: '',      // 搜索关键字
      listShow: false,  // 是否显示列表
      timer: null
    }
  },
  computed: {
    /* class */
    pickerClass() {
      return [
        'ele-icon-picker',
        {'ele-icon-picker-open': this.show},
        {'ele-icon-picker-style2': this.theme === 'style2'},
        {'ele-icon-picker-style3': this.theme === 'style3'}
      ];
    },
    /* 搜索后的结果 */
    result() {
      if (!this.keywords) return this.data;
      let result = [];
      this.data.forEach(item => {
        result.push({title: item.title, icons: item.icons.filter(d => d.indexOf(this.keywords) !== -1)});
      });
      return result;
    },
    /* 标签页选中位置 */
    active: {
      get() {
        if (!this.result || this.result.length === 0) return null;
        for (let i = 0; i < this.result.length; i++)
          if (this.result[i].icons.length !== 0) return this.result[i].title;
        return null;
      },
      set() {
      }
    }
  },
  methods: {
    /* 选择图标 */
    choose(value) {
      this.show = false;
      this.$emit('change', value);
    },
    /* 设置input只读 */
    setReadonly(e) {
      if (this.readonly) e.target.readOnly = true;
    },
    /* 弹出面板打开 */
    afterEnter() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.listShow = true;
      }, 50);
    },
    /* 弹出面板关闭 */
    afterLeave() {
      if (this.timer) clearTimeout(this.timer);
      this.listShow = false;
    }
  }
}
</script>

<style>
/* 弹出面板 */
.ele-icon-picker-popper.el-popover {
  max-width: 100%;
  padding: 4px 3px 15px 15px;
}

.ele-icon-picker-popper.el-popover .popper__arrow {
  left: 35px !important;
}

/* 选项卡 */
.ele-icon-picker-popper .el-tabs .el-tabs__item {
  padding: 0 12px !important;
}

.ele-icon-picker-popper .el-tabs .el-tabs__header {
  margin: 0 12px 5px 0;
}

.ele-icon-picker-popper .el-tabs .el-tabs__header .el-tabs__nav-wrap:after {
  right: 12px;
  width: auto;
}

/* 图标 */
.ele-icon-picker-popper .el-card {
  margin: 10px 12px 0 0;
}

.ele-icon-picker-popper .el-card__body {
  padding: 0;
}

.ele-icon-picker-popper .ele-icon-picker-item {
  display: block;
  padding: 8px 0;
  font-size: 20px;
  text-align: center;
  transition: transform .1s;
  cursor: pointer;
}

.ele-icon-picker-popper .ele-icon-picker-item:hover {
  transform: scale(1.5);
}

/* 滚动条 */
.ele-icon-picker-popper .el-scrollbar__wrap {
  overflow-x: hidden;
  margin-right: 0 !important;
}

.ele-icon-picker-popper .el-scrollbar__wrap::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* 搜索框 */
.ele-icon-picker-popper .ele-icon-picker-search {
  width: 110px;
  position: absolute;
  right: 15px;
  top: 8px;
}

/* 默认样式 */
.ele-icon-picker .el-input:not(.is-disabled),
.ele-icon-picker .el-input:not(.is-disabled) .el-input__inner,
.ele-icon-picker .el-input-group__append {
  cursor: pointer;
}

.ele-icon-picker .is-disabled > .el-input-group__append {
  cursor: not-allowed;
}

.ele-icon-picker .el-input:not(.is-disabled) .el-input__prefix,
.ele-icon-picker:not(.ele-icon-picker-style3) .el-input:not(.is-disabled) .el-input-group__append {
  color: unset;
}

.ele-icon-picker .el-input__suffix .el-icon-arrow-down,
.ele-icon-picker-style3 .el-input-group__append .el-icon-arrow-down {
  transition: transform .3s;
}

.ele-icon-picker-open .el-input .el-input__suffix .el-icon-arrow-down,
.ele-icon-picker-style3.ele-icon-picker-open .el-input-group__append .el-icon-arrow-down {
  transform: rotate(-180deg);
}

.ele-icon-picker .el-input__suffix .el-input__clear {
  position: absolute;
  top: 0;
  right: 0;
}

.ele-icon-picker .el-input__suffix .el-input__clear:before {
  background-color: #fff;
  border-radius: 50%;
}

/* 样式二 */
.ele-icon-picker-style2 .el-input-group__append {
  min-width: 39px;
  padding-left: 12px;
  padding-right: 12px;
  box-sizing: border-box;
}

.ele-icon-picker-style2 .el-input__suffix {
  transition: transform 0s;
}

/* 样式三 */
.ele-icon-picker-style3 {
  display: inline-block;
}

.ele-icon-picker-style3 .el-input {
  width: auto;
}

.ele-icon-picker-style3 .el-input__inner {
  width: 47px;
  pointer-events: none;
}

.ele-icon-picker-style3 .el-input__prefix {
  left: 12px;
}

.ele-icon-picker-style3 .el-input-group__append {
  padding-left: 5px;
  padding-right: 5px;
}

.ele-icon-picker-style3 .el-input:not(.is-disabled) .el-input-group__append {
  background-color: transparent;
}

.ele-icon-picker-style3 .el-input:not(.is-disabled) .el-input-group__append:hover {
  background-color: rgba(0, 0, 0, .02);
}

</style>