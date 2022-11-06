let layout = () => import("@/layout/index.vue")
let blank = () => import("@/views/blank.vue") //二级菜单专属

export default {
    path: '/svgIcon',
    name: 'svgIcon',
    redirect: {
        name: "svgIcon-base"
    },
    component: layout,
    meta: {
        title: 'svg图标',
        icon: "bulb-fill",
    },
    children: [{
        path: 'base',
        name: 'svgIcon-base',
        component: () => import( /* webpackChunkName: "svgIcon-base" */ "@/views/7-svgIcon/1-base-svgIcon.vue"),
        meta: {
            title: 'svg图标',
            icon: "bulb-fill",
        }
    }, ]
}
