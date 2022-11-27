import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './icons' // icon



Vue.config.productionTip = false


/** 原型链 *******************************************************************************************************/

//常用函数
import * as fn from "@/utils/fn.js"
Vue.prototype.$fn = fn;
//校验规则
import * as validator from "@/utils/validate"
Vue.prototype.$validator = validator;
//文件后缀名
Vue.prototype.$fileType = ["pdf", "doc", "docx", "xls", "xlsx", "jpg", "jpeg", "gif", "png"]



/** 插件 *******************************************************************************************************/

import {
  getCookie
} from './utils/auth'
//element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, {
  size: getCookie("elsize") || "small"
});
//v-charts
import 'echarts/lib/component/dataZoom'
import 'v-charts/lib/style.css'
import VCharts from 'v-charts'
Vue.use(VCharts)

//vxe
import XEUtils from 'xe-utils'
Vue.prototype.$utils = XEUtils
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)

/** mixin *******************************************************************************************************/
//自定义form方法
import baseFormMixin from "@/mixins/baseForm";
Vue.mixin(baseFormMixin)
//按钮权限
// import btn from "@/mixins/btn.js";
// Vue.mixin(btn)

/** 自定义组件 *******************************************************************************************************/
import baseForm from '@/components/base-form/index'
Vue.component("baseForm", baseForm)

import page from '@/components/page'
Vue.component("page", page)

import svgIcon from '@/components/svgIcon'
Vue.component("svgIcon", svgIcon)

import basePager from '@/components/base-pager'
Vue.component("pager", basePager)

import panel from '@/components/panel'
Vue.component("panel", panel)

//文件
import fileList from '@/components/file/fileList'
Vue.component("fileList", fileList)

import fileListShow from '@/components/file/fileListShow'
Vue.component("fileListShow", fileListShow)

import oneFile from '@/components/file/oneFile'
Vue.component("oneFile", oneFile)

import '@/styles/index.scss';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



// import {
//   formatMoney,
//   numberFormatter,
//   formatDate
// } from '@/utils/baseFn.js'

// Vue.filter("formatDate", (value, format) => {
//   if (value != "0001-01-01 00:00:00" && value != "0001-01-01T00:00:00" && value) {
//     return formatDate(value, format)
//   } else {
//     return "";
//   }
// })

// Vue.filter("fileSize", (value) => {
//   if (value) {
//     return numberFormatter(value);
//   } else {
//     return "";
//   }
// })
// Vue.filter("formatMoney", (value, num) => {
//   if (value != "undefined" && value != undefined && value != null) {
//     return formatMoney(value, num || 2)
//   }
// })

// Vue.filter("formatMoney_null", (value, num) => {
//   if (value) {
//     return formatMoney(value, num || 2)
//   } else {
//     return ""
//   }
// })

// Vue.directive("enterMoney", {
//   bind: function (el) {
//     el = el.nodeName == "INPUT" ? el : el.children[0];
//     el.addEventListener("change", function () {
//       el.value = el.value.replace(/,|，|\s/gi, "");
//       el.dispatchEvent(new Event("input"));
//     })
//   }
// })




// VXETable.setup({
//   size: getCookie("elsize") || "small",
//   table: {
//     border: true, //显示边框
//     stripe: true, //斑马线
//     resizable: true, //手动改变列宽度
//     showOverflow: true, //溢出悬浮
//     align: 'center', //居中
//     highlightCurrentRow: true, //高亮当前行
//     //height:"auto",//高度自适应父容器 没有这个选项
//     showFooter: true, //显示底部
//   }
// })



// VXETable.formats.mixin({
//   // 格式化日期，默认 yyyy-MM-dd
//   formatDate({
//     cellValue
//   }, format) {
//     if (cellValue) {
//       return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd')
//     }
//     return "";
//   },
//   // 四舍五入金额，每隔3位逗号分隔，默认2位数
//   formatMoney({
//     cellValue
//   }, digits = 2) {
//     if (cellValue !== "" && cellValue !== undefined && cellValue !== null) {
//       return XEUtils.commafy(XEUtils.toNumber(cellValue), {
//         digits
//       })
//     }
//     return ""
//   },
//   // 格式化银行卡，默认每4位空格隔开
//   formatBankcard({
//     cellValue
//   }) {
//     return cellValue
//       .replace(/\s/g, "")
//       .replace(/[^\d]/g, "")
//       .replace(/(\d{4})(?=\d)/g, "$1 ")
//   },
// })
