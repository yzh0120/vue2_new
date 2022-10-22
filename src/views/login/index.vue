<template>
  <div class="login-container">
    <div class="login">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <el-form size="larger" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form"
          label-position="left" v-on:submit.native.prevent>
          <div class="title-container">
            <h3 class="title">保 函 业 务 操 作 系 统</h3>
          </div>

          <el-form-item prop="userName">
            <el-input ref="userName" v-model="loginForm.userName" prefix-icon="el-icon-user" placeholder="请输入账号">
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input ref="password" :type="passwordType" v-model="loginForm.password" prefix-icon="el-icon-lock"
              placeholder="请输入密码" :autoComplete="dotEnv">
              <!-- <svg-icon @click="showPwd" slot="suffix" :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /> -->
            </el-input>
          </el-form-item>

          <el-button size="larger" native-type="submit" :loading="loading" type="primary"
            style="width: 100%; margin-bottom: 30px" @click.native.prevent="handleLogin">登 录</el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { setCookie } from "@/utils/auth";
import * as loginApi from "@/api/login.js";
export default {
  name: "login",
  data() {
    return {
      dotEnv: process.env.NODE_ENV == 'production' ? 'new-password' : 'off',
      loginForm: {
        userName: "",
        password: "",
      },
      loginRules: {
        userName: [{ required: true, trigger: "blur", message: "请输入账号" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
      passwordType: "password",
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() { },
  mounted() {
    if (this.loginForm.userName === "") {
      this.$refs.userName.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() { },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    //提交登录
    handleLogin() {
      this.$store.dispatch("user/setUserInfo", {});
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;

          loginApi.login(this.loginForm).then(
            (res) => {
              this.loading = false;
              if (res.code == 200) {
                setCookie(
                  "token",
                  res.data.token,
                  new Date(res.data.expireTime)
                );

                this.$router.push({
                  path: this.redirect || "/",
                  query: this.otherQuery,
                });
              } else {
                this.$message.error(res.info);
              }
            },
            (err) => {
              this.loading = false;
              console.log(err, "err");
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>


<style lang="scss" scoped>
$bg: #2d3a4b;
$light_gray: #cccccc;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background: url("../../assets/imgs/bg-login.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;

  .login {
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    // transform: translate(-50%, -50%);
    transform: translate(-200px, -155px);
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
