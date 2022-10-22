import baseRoutes, {
  otherRoutes
} from '@/router/routes'
const _import = require('@/router/_import_' + process.env.NODE_ENV)
let layout = () => import("@/layout/index.vue")
let blank = () => import("@/views/blank.vue")

export default {
  namespaced: true,
  state: {
    routes: [],
    //最后的路由
    preRoute: null,
  },
  mutations: {
    set_routes: (state, params) => { //路由合并 仅一次
      state.routes = baseRoutes.concat(params)
      // console.log(state.routes, "state.routes")
    },
    preRoute_fn(state, params) {
      if (params && params.name !== 'login' && params.name !== '404' && params.name !== '401') {
        state.preRoute = params
      }
    },
  },
  actions: {
    //第一次登录的时候获取 角色的权限相匹配的路由
    asyncRoutes({
      commit
    }, list) {
      return new Promise(resolve => {
        let accessedRoutes = change(translateDataToTree(list))
        commit('set_routes', accessedRoutes)
        resolve(filterAsyncRoutes(accessedRoutes).concat(otherRoutes))
      })
    }
  },
}

//递归后台传来的多维路由，替换字段
function change(asyncRouterMap) {
  let arr = [];
  asyncRouterMap.filter(route => {
    let obj = {
      meta: {}
    };
    if (route.target) {
      obj.name = route.enCode
      obj.meta.title = route.fullName
      obj.meta.icon = route.icon
      obj.meta.noCache = false
      obj.path = route.urlAddress
      obj.meta.hidden = !route.isMenu
      obj.todoNum = route.todoNum
      obj.component = route.target
    }
    // console.log(route.children, "obj.children")
    if (route.children && route.children.length) {
      obj.children = change(route.children)

    }
    arr.push(obj)
    return true
  })
  return arr
}

// 将后台返回的数据转换为树形结构
function translateDataToTree(data) {
  let parents = data.filter(value => value.parentId == 'undefined' || value.parentId == null || value.parentId == 0)
  let children = data.filter(value => value.parentId !== 'undefined' && value.parentId != null && value.parentId != 0)
  let translator = (parents, children) => {
    parents.forEach((parent) => {
      children.forEach((current, index) => {
        if (current.parentId === parent.moduleId) {
          let temp = JSON.parse(JSON.stringify(children))
          temp.splice(index, 1)
          translator([current], temp)
          typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current]
        }
      })
    })
  }

  translator(parents, children)
  return parents
}

// 将数据处理成符合vue结构的数据
function filterAsyncRoutes(routes) {
  const res = []

  routes.filter(route => {
    const tmp = {
      ...route
    }
    // console.log(tmp.component, tmp.meta && tmp.meta.title, "tmp.component")
    if (tmp.component == "layout") { //布局
      tmp.component = layout;
    } else if (tmp.component == "blank") {
      tmp.component = blank;
    } else {
      tmp.component = _import(tmp.component)
    }

    if (tmp.children && tmp.children.length) {
      tmp.children = filterAsyncRoutes(tmp.children)
    }
    res.push(tmp)
    return true
  })
  return res
}


// let fixedRoutes = [] //固定路由
// function getFixed(routes) {
//   routes.forEach((item) => { //迭代
//     if (item.meta && item.meta.isAffix && !item.meta.hidden) {
//       fixedRoutes.push(item)
//     }
//     if (item.children) {
//       getFixed(item.children)
//     }
//   })
//   fixedRoutes.forEach((item) => { //添加固定路由
//     item.fullPath = item.path = item.meta.fixed
//   })
// }
