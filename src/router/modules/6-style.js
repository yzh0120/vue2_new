let layout = () => import("@/layout/index.vue")
let blank = () => import("@/views/blank.vue") //二级菜单专属

export default {
  path: '/style',
  name: 'style',
  redirect: {
    name: "style-base"
  },
  component: layout,
  meta: {
    title: 'style',
    icon: "html5",
  },
  children: [{
    path: 'base',
    name: 'style-base',
    component: () => import( /* webpackChunkName: "style-base" */ "@/views/6-style/1-transition.vue"),
    meta: {
      title: 'transition',
      icon: "html5",
    }
  }, ]
}
