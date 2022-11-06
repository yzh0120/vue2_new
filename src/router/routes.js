/*
 * @Author: yz
 * @Date: 2022-02-09 16:51:50
 * @Description: 
 * @FilePath: \operateweb\src\router\routes.js
 * 
 */
let layout = () => import("@/layout/index.vue")

import baseForm from "./modules/1-base-form.js"
import vxeTable from "./modules/2-vxe-table.js"
import fastCopy from "./modules/3-fastCopy.js"
import fileUp from "./modules/4-fileUp.js"
import style from "./modules/6-style.js"
import svgIcon from "./modules/7-svgIcon.js"
import elementUi from "./modules/11-element-ui.js"
import {
  status
} from "./modules/status.js"

const routes = [{
    path: "/",
    redirect: "/home",
    component: layout,
    meta: {},
    children: [{
      path: 'home',
      name: 'home',
      component: () => import("@/views/home/index.vue"),
      meta: {
        title: '首页',
        icon: 'dashboard',
        isAffix: true,
        // hidden: true,
      }
    }]
  },
  {
    path: '/blank',
    name: 'blank',
    component: layout,
    meta: {
      hidden: true,
    },
  },

  {
    path: "/login",
    name: 'login',
    component: () => import("@/views/login/index.vue")
  },
  baseForm, //表单
  vxeTable,
  fastCopy,
  style,
  svgIcon, //
  fileUp, //
  elementUi, //
  ...status, //状态和登录页
]

export const otherRoutes = [{
  path: '*',
  redirect: '/404',
  meta: {
    hidden: true,
  },
}]

export default routes
