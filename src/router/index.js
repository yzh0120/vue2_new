import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import store from '@/store/index' //vuex
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getCookie,
  setCookie
} from "@/utils/auth";
import {
  Message,
  MessageBox
} from 'element-ui';


import * as menuApi from "@/api/menu";
import * as userApi from "@/api/user";

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const whiteListName = ["login", "404", "401"] //白名单

const data = {
  grant_type: "client_credentials",
  client_id: "riskmonitor",
  client_secret: "gxbl2018",
}

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  // if (to.query.wordCode) {
  //   let data = {
  //     wordCode: to.query.wordCode,
  //     name: to.query.name,
  //     enName: to.query.enName,
  //     idCard: to.query.idCard,
  //   }
  //   await userApi.singerlogin(data).then((res) => {
  //     if (res.code == 200) {
  //       setCookie(
  //         "token",
  //         res.data.token,
  //         new Date(res.data.expireTime)
  //       );
  //       next("/")
  //     }
  //   })
  // }

  if (getCookie("token")) { //如果浏览器有token

    // if (store.state.user.database === null) {
    //   await spiderdataSkyEyeApi.queryMyUser().then(res => {
    //     store.commit("user/setDatabase", res.data);
    //   }).catch(() => {
    //     store.commit("user/setDatabase", {
    //       user: {
    //         datasource: 1
    //       }
    //     });
    //   })
    // }
    if (!store.getters.userInfo.userName) { //如果vuex没有用户信息
      await userApi.getAppSession().then(res => { //通过接口获取用户信息
        store.dispatch("user/setUserInfo", res.data); //保存用户信息
      })
    }


    if (to.path === '/login') { //如果去登录页 直接跳转首页
      next("/")
      NProgress.done()
    } else { //有token 去非登录页 
      if (!store.state.router.routes.length) { //如果vuex中的routers（通过接口获取的数组）长度为0

        await menuApi.getmodulelist({}).then((res) => { //通过接口获取用户权限的路由
          if (res.code == 200) {
            store.dispatch('router/asyncRoutes', res.data).then((accessRoutes) => {
              router.addRoutes(accessRoutes)
              next({
                ...to,
                replace: true
              }) //如果参数to不能找到对应的路由的话，就再执行一次beforeEach((to, from, next)直到其中的next({ ...to})能找到对应的路由为止。
              NProgress.done()
            })
          } else {
            Message({
              message: res.info,
              type: 'error',
              duration: 3 * 1000
            })
          }
        });

      } else {
        next() //放行
      }
    }
  } else { //如果没有token
    if (whiteListName.indexOf(to.name) !== -1) { //白名单
      next() //放行
      NProgress.done()
    } else { //非白名单，跳转登录页
      store.dispatch("tagsView/delAllTagsView", []).then(() => {
        setTimeout(() => {
          location.reload()
        }, 100);
        next(`/login`)
        NProgress.done()
      }); //中断当前导航的afterEach,又进入一次路由守卫的beforeEach,等待 next()放行
    }
  }

})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
