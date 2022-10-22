import * as menu from "@/api/menu";
export default {
  data() {
    return {
      btnArr: [],
      tableArr: [],
    }
  },
  mounted() {
    if (this.btnPower) {
      this.getAuthorizeButtonColumnList()
    }
  },
  methods: {
    getAuthorizeButtonColumnList() {
      let params = {
        enCode: this.$route.name
      }
      menu.getAuthorizeButtonColumnList(params).then((res) => {
        if (res.code == 200) {
          this.btnArr = res.data.moduleButtons

          if (res.data.moduleEntity ?.isPermVerification) {

            this.gridOptions.columns.forEach((item) => {

              res.data.moduleColumns.forEach((item2) => {
                if (item.type == "seq") {
                  this.tableArr.push(item)
                }
                if (item.field == item2.enCode) {
                  this.tableArr.push(item)
                }
              })
            })
            this.gridOptions.columns = this.tableArr
          }


        } else {
          this.$message.error(res.info)
        }
      })
    },
  },
  directives: {
    // 注册一个局部的自定义指令 v-focus
    btn: {
      // 统一全部隐藏
      bind: function (el) {
        if (el.tagName == "BUTTON") {
          el.setAttribute("disabled", "disabled")
          el.classList.add("is-disabled")
        } else {
          el.style.display = "none"
        }
      },
      update: function (el, binding, vnode) {
        if (typeof binding.value == 'object') {
          for (let i = 0; i < binding.value.length; i++) {
            if (binding.value[i].enCode == binding.arg) {
              if (el.tagName == "BUTTON") {
                el.removeAttribute("disabled")
                el.classList.remove("is-disabled")
              } else {
                el.style.display = "inline-block"
              }
            }
          }
        }

      }
    },
    drag: {
      bind: function (el, binding) {
        let oDiv = el; //当前元素
        let self = this; //上下文
        let firstTime = '',
          lastTime = '';
        oDiv.onmousedown = function (e) {
          oDiv.setAttribute("data-flag", false)
          firstTime = new Date().getTime();
          //鼠标按下，计算当前元素距离可视区的距离
          let disX = e.clientX - oDiv.offsetLeft;
          let disY = e.clientY - oDiv.offsetTop;
          document.onmousemove = function (e) {
            //通过事件委托，计算移动的距离 
            let l = e.clientX - disX;
            let t = e.clientY - disY;
            //移动当前元素  
            let winWidth = document.documentElement.clientWidth || document.body.clientWidth
            let winHeight = document.documentElement.clientHeight || document.body.clientHeight
            if (l + el.offsetWidth >= winWidth) {
              l = winWidth - el.offsetWidth
            }
            if (l <= 0) {
              l = 0
            }
            if (t <= 0) {
              t = 0
            }
            if (t + el.offsetHeight >= winHeight) {
              t = winHeight - el.offsetHeight
            }
            oDiv.style.left = l + 'px';
            oDiv.style.top = t + 'px';
          };
          document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
            lastTime = new Date().getTime();
            if ((lastTime - firstTime) < 200) {
              oDiv.setAttribute('data-flag', true)
            }
          };
        };
      },
    }
  }
}
