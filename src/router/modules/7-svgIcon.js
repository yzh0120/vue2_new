let layout = () => import("@/layout/index.vue")
let blank = () => import("@/views/blank.vue")//二级菜单专属

export default { 
    path: '/svgIcon',
    name: 'svgIcon',
    redirect: {name:"base-svgIcon"},
    component:  layout,
    meta: {
        title: 'svg图标',
        icon: "bulb-fill",
    },
    children: [
        {
            path: 'base',
            name: 'base-svgIcon',
            component: () => import(/* webpackChunkName: "svgIcon-base" */ "@/views/7-svgIcon/1-base-svgIcon.vue"),
            meta: {
                title: 'svg图标',
                icon: "bulb-fill",
            }
        },
        // {
        //     path: 'msgsvgIcon',
        //     name: 'msg-svgIcon',
        //     component: () => import(/* webpackChunkName: "svgIcon-msg" */ "@/views/6-svgIcon/2-msg-list.vue"),
        //     meta: {
        //         title: '消息弹窗',
        //         icon: "program-code",
        //     }
        // },
    ]
}