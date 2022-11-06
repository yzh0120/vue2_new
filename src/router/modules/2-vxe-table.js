let layout = () => import("@/layout/index.vue")
let blank = () => import("@/views/blank.vue") //二级菜单专属

export default {
  path: '/vxeTable',
  name: 'vxeTable',
  redirect: {
    name: "vxeTable-base"
  },
  component: layout,
  meta: {
    title: 'vxeTable',
    icon: "biaodanzujian-biaoge",
  },
  children: [{
      path: 'base',
      name: 'vxeTable-base',
      component: () => import( /* webpackChunkName: "vxeTable-base" */ "@/views/2-vxe-table/1-base.vue"),
      meta: {
        title: '基础',
        icon: "biaodanzujian-biaoge",
      }
    },
    {
      path: 'checkbox',
      name: 'vxeTable-checkbox',
      component: () => import( /* webpackChunkName: "vxeTable-checkbox" */ "@/views/2-vxe-table/2-checkbox.vue"),
      meta: {
        title: '多选',
        icon: "biaodanzujian-biaoge",
      }
    },
    {
      path: 'radio',
      name: 'vxeTable-radio',
      component: () => import( /* webpackChunkName: "vxeTable-radio" */ "@/views/2-vxe-table/3-radio.vue"),
      meta: {
        title: '单选',
        icon: "biaodanzujian-biaoge",
      }
    },
    {
      path: 'isCurrent',
      name: 'vxeTable-isCurrent',
      component: () => import( /* webpackChunkName: "vxeTable-isCurrent" */ "@/views/2-vxe-table/4-isCurrent.vue"),
      meta: {
        title: '选中当前行',
        icon: "biaodanzujian-biaoge",
      }
    },
    {
      path: 'sum',
      name: 'vxeTable-sum',
      component: () => import( /* webpackChunkName: "vxeTable-sum" */ "@/views/2-vxe-table/5-sum.vue"),
      meta: {
        title: '合计',
        icon: "biaodanzujian-biaoge",
      }
    },
    {
      path: 'shu',
      name: 'vxeTable-shu',
      component: () => import( /* webpackChunkName: "vxeTable-sum" */ "@/views/2-vxe-table/6-shu.vue"),
      meta: {
        title: '竖向表格',
        icon: "biaodanzujian-biaoge",
      }
    }
  ]
}
