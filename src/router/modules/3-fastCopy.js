let layout = () => import("@/layout/index.vue")
let blank = () => import("@/views/blank.vue") //二级菜单专属

export default {
  path: '/fastCopy',
  name: 'fastCopy',
  redirect: {
    name: "base-fastCopy"
  },
  component: layout,
  meta: {
    title: '复制',
    icon: "lcd",
  },
  children: [{
    path: 'base',
    name: 'base-fastCopy',
    component: () => import( /* webpackChunkName: "fastCopy-base" */ "@/views/3-fastCopy/1-tableAlert.vue"),
    meta: {
      title: '表单弹窗页面',
      icon: "lcd",
    }
  }]
}
