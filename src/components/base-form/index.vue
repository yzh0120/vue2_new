
<!-- 
  data:{
	  必写
	  list:[修改list的值只允许通过 setList  ,可以动态 push(item) splice() 等数组方法
	  ],
	  data:{}   保存表单结果的对象  
								  !!!!!!!!!!data.xxx  不改变内存地址
								     可以直接在data里面写字段,在 mounted  触发函数都可以通过data.xxx修改
                      在created钩子函数中不要通过data..xxx修改值会导致问题
								  !!!!!!!!!!改变内存地址
								     data =  {}   不会报错(在任何钩子阶段都可以)  
		dom:null 
		可选:
		titleWidth:"200px"                        表单的labelWidth   
		isRow:flase                               是否响应式
		inline：flase                             行内表单
    span:true
  } 
 -->

<template>
  <el-form ref="form" :class="data.className" :model="formData" :label-width="labelWidth" style="margin-top: 20px"
    :inline="inline" :size="size" @submit.native.prevent :disabled="disabled">
    <div v-if="againShow">
      <!-- 是否响应式 -->
      <template v-if="isRow">
        <!-- <el-row v-if="isRow"> -->
        <el-row>
          <el-col :xs="item.xs" :sm="item.sm" :md="item.md" :lg="item.lg" :xl="item.xl"
            v-for="(item, index) in for_List" :key="index + `row`">
            <!-- item.show === false ? false : true -->
            <el-form-item v-if="item.show === false ? false : true" :prop="item.field" :label="item.title"
              :rules="item.rules" :label-width="item.labelWidth">
              <template v-if="item.labelTip" #label>
                <!-- 问号提示 -->
                <span>
                  {{ item.title }}
                  <el-tooltip class="item" effect="dark" :content="item.labelTip" placement="top-start">
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </span>
              </template>
              <!-- 是否悬浮提示 -->
              <el-tooltip class="item" effect="dark" placement="right" v-if="item.tip && formData[item.field]">
                <div slot="content">{{ formData[item.field] }}</div>
                <!-- 是否插槽 -->
                <template v-if="item.slot">
                  <slot :name="item.slot" />
                </template>
                <component :is="currentComponent(item.type)" :item="item" :bossData="data" @baseFormEvent="
                  (e) => {
                    event(e, item);
                  }
                " :data="formData" v-else :dis="disabled" />
              </el-tooltip>

              <div v-else>
                <template v-if="item.slot">
                  <slot :name="item.slot" />
                </template>
                <component :is="currentComponent(item.type)" :item="item" :bossData="data" @baseFormEvent="
                  (e) => {
                    event(e, item);
                  }
                " :data="formData" v-else :dis="disabled" />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 比如 搜索页面居中的按钮 -->
        <slot />
      </template>

      <!-- 是否span -->
      <template v-else-if="span">
        <!-- <el-row v-if="isRow"> -->
        <el-row>
          <el-col :span="item.span ? item.span : 8" v-for="(item, index) in for_List" :key="index + `span`">
            <!-- item.show === false ? false : true -->
            <el-form-item v-if="item.show === false ? false : true" :prop="item.field" :label="item.title"
              :rules="item.rules" :label-width="item.labelWidth">
              <!-- 问号提示 -->
              <template v-if="item.labelTip" #label>
                <span>
                  {{ item.title }}
                  <el-tooltip class="item" effect="dark" :content="item.labelTip" placement="top-start">
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </span>
              </template>
              <!-- 是否悬浮提示 -->
              <el-tooltip class="item" effect="dark" placement="right" v-if="item.tip && formData[item.field]">
                <div slot="content">{{ formData[item.field] }}</div>
                <!-- 是否插槽 -->
                <template v-if="item.slot">
                  <slot :name="item.slot" />
                </template>
                <component :is="currentComponent(item.type)" :item="item" :bossData="data" @baseFormEvent="
                  (e) => {
                    event(e, item);
                  }
                " :data="formData" v-else :dis="disabled" />
              </el-tooltip>

              <div v-else>
                <template v-if="item.slot">
                  <slot :name="item.slot" />
                </template>
                <component :is="currentComponent(item.type)" :item="item" :bossData="data" @baseFormEvent="
                  (e) => {
                    event(e, item);
                  }
                " :data="formData" v-else :dis="disabled" />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 比如 搜索页面居中的按钮 -->
        <slot />
      </template>

      <!-- 不是响应式 -->
      <template v-else>
        <!-- item.show === false ? false : true -->
        <el-form-item v-for="(item, index) in for_List" v-if="item.show === false ? false : true"
          :key="index + 'normal'" :prop="item.field" :label="item.title" :rules="item.rules"
          :label-width="item.labelWidth">
          <!-- 问号提示 -->
          <template v-if="item.labelTip" #label>
            <span>
              {{ item.title }}
              <el-tooltip class="item" effect="dark" :content="item.labelTip" placement="top-start">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </span>
          </template>
          <el-tooltip class="item" effect="dark" placement="right" v-if="item.tip && formData[item.field]">
            <div slot="content">{{ formData[item.field] }}</div>

            <template v-if="item.slot">
              <slot :name="item.slot" />
            </template>
            <component :is="currentComponent(item.type)" :item="item" @baseFormEvent="
              (e) => {
                event(e, item);
              }
            " :data="formData" v-else :dis="disabled" :bossData="data" />
          </el-tooltip>

          <div v-else>
            <template v-if="item.slot">
              <slot :name="item.slot" />
            </template>
            <component :is="currentComponent(item.type)" :item="item" @baseFormEvent="
              (e) => {
                event(e, item);
              }
            " :data="formData" v-else :dis="disabled" :bossData="data" />
          </div>
        </el-form-item>
        <!-- 比如 搜索页面居中的按钮 -->
        <slot />
      </template>
    </div>
  </el-form>
</template>

<script>
import formatInput from "./base-moneyInput.vue";
import baseInput from "./base-input.vue";
import baseInputrange from "./base-inputrange.vue";
import baseTreeselect from "./base-treeselect.vue";
import basePassword from "./base-password.vue";
import baseTextarea from "./base-textarea.vue";
import baseSelect from "./base-select.vue";
import baseTimeSelect from "./base-time-select.vue"; //时间选择器
import baseDatePicker from "./base-date-picker.vue"; //日期选择器
import baseSwitch from "./base-switch.vue"; //开关
import baseRadio from "./base-radio.vue"; //单选
import baseCheckbox from "./base-checkbox.vue"; //多选
import baseAuto from "./base-auto.vue"; //搜素过滤
export default {
  components: {
    basePassword,
    baseTextarea,
    baseInput,
    baseSelect,
    baseTimeSelect,
    // baseDateTimePicker,
    baseDatePicker,
    baseSwitch,
    baseRadio,
    baseCheckbox,
    baseAuto,
    baseTreeselect,
    baseInputrange,
    formatInput,
  },
  props: {
    data: {
      type: Object,
      default: () => { },
    },
    dis: {
      default: false,
    },
  },
  data() {
    return {
      againShow: true,
    };
  },
  watch: {
    "data.list.length": {
      //data.list.splice(index,1,{})  也能触发此watch
      handler: function (newVal) {
        this._addDis(this.data); //增加disabled  可以直接写在data:{}
        //this._addShow(this.data) //增加show 因为只会写在watch(写在data:{}也有效果)  所以不watch 暂时不用
        this._updatedata(this.data);
      },
      // immediate: true,
      // deep: true, // 深度监听
    },
  },
  created() {
    this._updatedata(this.data);
    this.autoTrigger();
  },
  mounted() {
    //this._addShow(this.data) //增加show 因为只会写在watch(写在data:{}也有效果)  所以不watch 暂时不用
    this._addDis(this.data); //增加disabled    可以直接写在data:{}
    this.back(); // 将form实例返回到父级
  },
  computed: {
    disabled() {
      return this.dis;
    },
    for_List() {
      return this.data.list;
    },
    formData() {
      return this.data.data;
    },
    labelWidth() {
      if (this.data.inline && !this.data.titleWidth) {
        return "";
      }
      return this.data.titleWidth ? this.data.titleWidth : "160px";
    },
    span() {
      return this.data.span;
    },
    isRow() {
      if (this.data.isRow) {
        this.data.list.forEach((item) => {
          if (item.xs || item.sm || item.md || item.lg || item.xl) {
            let obj = {
              xs: undefined, //<768px
              sm: undefined, //≥768px
              md: undefined, //≥992px
              lg: undefined, //≥1200px
              xl: undefined, //≥1920px
            };
            this.data.list.forEach((item) => {
              item = Object.assign(item, obj, this.$fn.deepClone(item));
            });
          } else {//一个都没值
            let obj = {
              xs: 24, //<768px
              sm: 12, //≥768px
              md: 12, //≥992px
              lg: 8, //≥1200px
              xl: 8, //≥1920px
            };
            item = Object.assign(item, obj);
          }
        });
      }
      return this.data.isRow;

      // if (this.data.isRow) {
      //   let obj = {};
      //   if (item.xs || item.sm || item.md || item.lg || item.xl) {
      //     obj = {
      //       xs: null, //<768px
      //       sm: null, //≥768px
      //       md: null, //≥992px
      //       lg: null, //≥1200px
      //       xl: null, //≥1920px
      //     };
      //     this.data.list.forEach((item) => {
      //       item = Object.assign(item, obj, this.$fn.deepClone(item));
      //     });
      //   } else {
      //     this.data.list.forEach((item) => {
      //       obj = {
      //         xs: 24, //<768px
      //         sm: 12, //≥768px
      //         md: 12, //≥992px
      //         lg: 8, //≥1200px
      //         xl: 8, //≥1920px
      //       };
      //       item = Object.assign(item, obj, this.$fn.deepClone(item));
      //     });
      //   }
      // }
      // return this.data.isRow;

      // if (this.data.isRow) {
      //   let obj = {
      //     xs: 24, //<768px
      //     sm: 12, //≥768px
      //     md: 12, //≥992px
      //     lg: 8, //≥1200px
      //     xl: 8, //≥1920px
      //   };
      //   this.data.list.forEach((item) => {
      //     item = Object.assign(item, obj, this.$fn.deepClone(item));
      //   });
      // }
      // return this.data.isRow;
    },
    inline() {
      if (this.data.isRow || this.data.span) {
        return false;
      } else {
        return this.data.inline;
      }
    },
    size() {
      if (this.data.size) {
        return this.data.size;
      } else {
        return "small";
      }
    },
  },
  methods: {
    autoTrigger() {
      this.data.list.forEach((item) => {
        if (item.rules && item.rules.length) {
          if (item.type == "select") {
            item.rules.forEach((rule) => {
              rule["trigger"] = "change";
            });
          } else if (item.type == "treeselect") {
            item.rules.forEach((rule) => {
              rule["trigger"] = ["blur", "change"];
            });
          } else {
            item.rules.forEach((rule) => {
              rule["trigger"] = "blur";
            });
          }
        }
      });
    },
    sync() {
      this.againShow = false;
      this.$nextTick(() => {
        this.againShow = true;
      });
    },
    reset() {
      this.$refs.form.resetFields();
      for (let key of Object.keys(this.data.data)) {
        // this.data.data[key] = null;
        this.$set(this.data.data, key, null)
      }
    },
    check() {
      let res = undefined;
      this.$refs.form.validate((valid) => {
        if (valid) {
          res = true;
        } else {
          res = false;
        }
      });
      return res;
    },
    // show(show) {
    //   return show === false ? false : true;
    // },
    back() {
      this.data.dom = this.$refs.form; // 将form实例返回到父级
    },
    currentComponent(componentType) {
      if (componentType == "auto") {
        return "baseAuto";
      } else if (componentType == "formatInput") {
        return "formatInput";
      } else if (componentType == "treeselect") {
        return "baseTreeselect";
      } else if (componentType == "checkbox") {
        return "baseCheckbox";
      } else if (componentType == "radio") {
        return "baseRadio";
      } else if (componentType == "switch") {
        return "baseSwitch";
      } else if (componentType == "input") {
        return "baseInput";
      } else if (componentType == "password") {
        return "basePassword";
      } else if (componentType == "textarea") {
        return "baseTextarea";
      } else if (componentType == "select") {
        return "baseSelect";
      } else if (componentType == "time") {
        return "baseTimeSelect";
      } else if (
        // componentType == "date" ||
        // componentType == "datetime" ||
        // componentType == "daterange"

        componentType == "year" ||
        componentType == "month" ||
        componentType == "date" ||
        componentType == "dates" ||
        componentType == "week" ||
        componentType == "datetime" ||
        componentType == "datetimerange" ||
        componentType == "daterange" ||
        componentType == "monthrange"
      ) {
        return "baseDatePicker";
      } else if (componentType == "inputrange") {
        return "baseInputrange";
      }
    },
    event(e, item) {
      Object.assign(e, {
        item: item,
      });
      this.$emit("event", e);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
<!-- 

    data:{
		*修改list的值只允许通过 setList  
		list:[                                    循环表单的数组
			{slot: 'sss',label: '插槽',  }           slot
			{ type: 'password',field: '__password',label: '密码',  tip：false,sm:24,md:12,lg:8}
			type类型：
			1 auto input                           自动补全
			2 checkbox                             复选框
			3 date      /daterange                 日期选择器
			4 datetime                             日期时间选择器
			5 input/password                       input/password
			6 radio                                单选框
			7 select                               下拉框
			8 switch                               开关
			9 time                                 时间选择器
		],
		data:{}                                  保存表单数据的对象  不要再created写,从第二个无法触发视图更新,在mounted写
		
		                                                           1可以直接在data里面写字段的值(赋值的时候,做了非空判断) 
																   2可以在js里面 通过this.forminfo.data.xxx
																   3通过setdATA  (这个没啥用,基本抛弃)
		dom:null                             表单的dom
		！*						 
	    labelWidth:"200px"                        表单的labelWidth   
		className:""                              form的class
		isRow:flase                               是否响应式
		inline：flase                              行内表单
	}
 
 -->
