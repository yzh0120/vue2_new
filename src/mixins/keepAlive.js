import * as menuApi from "@/api/menu";
export default {
  data() {
    return {}
  },
  computed: {
    tagsViewList: {
      get() {
        return this.$store.getters.tagsViewList;
      },
      set(v) {
        this.$store.commit("tagsView/setView", v);
      },
    },
  },
  methods: {
    // 1、刷新当前 tagsView：
    _refreshCurrentTagsView(currV) {
      //再次请求菜单api

      menuApi.getmodulelist({}).then((res) => {
        if (res.code == 200) {
          this.$store.commit('router/set_routes', change(translateDataToTree(res.data)))
        }
      })


      this._delRouteCache(currV.path); //删除 右键菜单所指向的路由 的缓存
      this.$router.replace({
        name: 'blank'
      }).then(() => {
        // 异步重载
        this.$router.replace({
          ...currV
        });
      });
    },
    // 2、关闭当前 tagsView：当前项 `tags-view` icon 关闭时点击，如果是设置了固定的（isAffix），不可以关闭
    _closeCurrentTagsView(currV, toV, doSome) {
      let path = currV.path;
      if (this.tagsViewList.length == 1) {
        return
      }
      this.tagsViewList.map((v, k, arr) => {
        if (!v.meta.isAffix) {
          if (v.path === path) {
            // this.tagsViewList.splice(k, 1);
            this.$store.dispatch("tagsView/delVisitedView", v)
            this._delRouteCache(path); //删除缓存
            setTimeout(() => {
              if (toV && toV.path) {
                this.$router.push({
                  path: toV.path,
                  query: toV.query
                }).then(() => {
                  if (doSome) {
                    this._getData(toV.path)
                  }

                })
              }
              // 最后一个
              else if (this.tagsViewList.length === k) this.$router.push({
                path: arr[arr.length - 1].path,
                query: arr[arr.length - 1].query
              });
              // 否则，跳转到下一个
              else this.$router.push({
                path: arr[k].path,
                query: arr[k].query
              });
            }, 0);
          }
        }
      });
    },

    // 3、关闭其它 tagsView：如果是设置了固定的（isAffix），不进行关闭
    _closeOtherTagsView(route) {
      this.$router.push(route);
      this.tagsViewList.map((v) => {
        if (!v.meta.isAffix && v.path != route.path) {
          this._delRouteCache(v.path);
        }
      });
      this.$store.dispatch("tagsView/delOtherView", route);
    },
    // 4、关闭全部 tagsView：如果是设置了固定的（isAffix），不进行关闭
    _closeAllTagsView(route) {
      this.tagsViewList.map((v) => {
        if (!v.meta.isAffix) {
          this._delRouteCache(v.path);
        }
      });
      this.$store.dispatch("tagsView/delAllView");
      const lastView = this.tagsViewList.slice(-1)[0]
      if (lastView) {
        this.$router.push(lastView.path);
      } else {
        if (route.name === "base") {
          // to reload home page
          this.$router.replace({
            path: "/redirect" + route.path
          });
        } else {
          this.$router.push("/");
        }
      }
    },
    // //删除页面缓存 被其他方法引用的方法
    _delRouteCache(key) {
      //参数 是 path
      key = key.split('?')[0]; //去除query   缓存实例不包括query
      let cache = this.$root.keepAlive.cache; //获取缓存对象
      let keys = this.$root.keepAlive.keys; //获取已缓存fullPath的数组
      let prefix = keys[0].split('/')[0]; //如果有transition标签 会有随机的前缀
      key = prefix + key;

      for (let i = 0; i < keys.length; i++) {
        //循环 已缓存fullPath的数组
        if (keys[i] == key) {
          //如果 已缓存fullPath的数组 的某个 fullPath 等于传入的 fullPath
          keys.splice(i, 1); //根据index 在 已缓存fullPath的数组 删除 这个fullPath
          if (cache[key] != null) {
            //如果 在 cache数组 中的fullPath 也有 值
            cache[key].componentInstance.$destroy(); //删除内存中的实例  评论推荐
            delete cache[key]; //删除 cache对象 中的这个fullPath的 值
          }
          break;
        }
      }
    },
    _getData(key, doSome) {
      let cache = this.$store.state.router.keepAliveComponentInstance.cache; //获取缓存对象
      let keys = this.$store.state.router.keepAliveComponentInstance.keys; //获取已缓存fullPath的数组
      if (keys[0]) {
        let prefix = keys[0].split("/")[0]; //如果有transition标签 会有随机的前缀
        key = prefix + key;
      }

      for (let i = 0; i < keys.length; i++) {
        //循环 已缓存fullPath的数组
        // console.log("-"+keys[i]+"-" , "-"+key+"-",keys[i] == key,"2222222222222")
        if (keys[i] == key) {
          //如果 已缓存fullPath的数组 的某个 fullPath 等于传入的 fullPath
          if (cache[key] != null) {
            //如果 在 cache数组 中的fullPath 也有 值
            // console.log(cache[key].componentInstance,"cache[key].componentInstance")
            let res = cache[key].componentInstance
            doSome.split(".").forEach((item) => {
              res = res[item]
            })
            res()
          }
          break;
        }
      }
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
