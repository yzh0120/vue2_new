/*
 * @Author: yz
 * @Date: 2022-11-09 10:15:12
 * @Description: 
 * 
 */
let layout = () => import("@/layout/index.vue")
let blank = () => import("@/views/blank.vue") //二级菜单专属

export default {
  path: '/style',
  name: 'style',
  redirect: {
    name: "style-transition"
  },
  component: layout,
  meta: {
    title: 'style',
    icon: "html5",
  },
  children: [{
      path: 'transition',
      name: 'style-transition',
      component: () => import( /* webpackChunkName: "style-transition" */ "@/views/6-style/1-transition.vue"),
      meta: {
        title: 'transition',
        icon: "html5",
      }
    }, {
      path: 'transform2D',
      name: 'style-transform2D',
      component: () => import( /* webpackChunkName: "style-transform2D" */ "@/views/6-style/2-transform2D.vue"),
      meta: {
        title: 'transform2D',
        icon: "html5",
      }
    },
    {
      path: 'transform3D',
      name: 'style-transform3D',
      component: () => import( /* webpackChunkName: "style-transform3D" */ "@/views/6-style/3-transform3D.vue"),
      meta: {
        title: 'transform3D',
        icon: "html5",
      }
    }, {
      path: 'animation',
      name: 'style-animation',
      component: () => import( /* webpackChunkName: "style-animation" */ "@/views/6-style/4-animation.vue"),
      meta: {
        title: 'animation',
        icon: "html5",
      }
    }, {
      path: 'vueTransition',
      name: 'style-vueTransition',
      component: () => import( /* webpackChunkName: "style-vueTransition" */ "@/views/6-style/5-vueTransition.vue"),
      meta: {
        title: 'vueTransition',
        icon: "html5",
      }
    }, {
      path: 'vueTransitionGroup',
      name: 'style-vueTransitionGroup',
      component: () => import( /* webpackChunkName: "style-vueTransitionGroup" */ "@/views/6-style/6-vueTransitionGroup.vue"),
      meta: {
        title: 'vueTransitionGroup',
        icon: "html5",
      }
    }
  ]
}
