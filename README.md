<!--
 * @Author: wjs
 * @Date: 2022-05-09 09:54:31
 * @Description: 操作手册
 * @FilePath: \oaweb\README.md
 * 
-->
# 业务系统web开发说明

### 1、项目介绍
该项目是一个基于 [vue2](https://cn.vuejs.org) + [elementui](https://element.eleme.cn/) + [vxe-table](https://vxetable.cn/) 开发的前后端分离的项目

### 2、使用说明
```
- node版本 > v12.0.0
- IDE推荐：Visual Studio Code
```

### 3、项目依赖安装和启动
#### 3.1 安装依赖
```
cnpm install 
or
npm install
or
yarn
```

#### 3.2 启动项目
```
npm run dev
or
yarn dev
```

### 4、项目目录结构
```
├── public
    ├── css                             -- fontawesome样式
    ├── font                            -- fontawesome字体
    ├── favicon.ico                     -- 网址浏览器图标
    ├── index.html                      -- 主页面
├── src                                 -- 源代码
│   ├── api                             -- api 组
│   ├── App.vue                         -- 入口页面
│   ├── assets                          -- 静态资源
│   ├── components                      -- 全局组件
│   ├── config                          -- 配置
│   ├── icons                           -- svg组件
│   ├── layout                          -- 模板
│   ├── mixins                          -- mixins
│   ├── router                          -- 路由声明文件
│   │   └── modules                     -- modules
│   │   ├── index.js
│   │   ├── routes.js
│   ├── main.js                         -- 主文件
│   ├── store                           -- vuex 状态管理器
│   │   ├── index.js                    -- 入口文件
│   │   ├── getter.js                   -- 入口文件
│   │   └── modules                     -- modules
│   │       ├── config.js
│   │       ├── router.js
│   │       ├── tagsView.js
│   │       └── user.js
│   ├── styles                          -- 全局样式
│   │   ├── app.scss
│   │   ├── index.scss
│   │   ├── primary.scss
│   │   ├── table.css
│   │   ├── ui.scss
│   │   └── var.scss
│   ├── utils                           -- 方法工具库
│   │   ├── auth.js                     -- 设置cookie和localStorage
│   │   ├── baseData.js                 -- 常用接口封装
│   │   ├── baseFn.js                   -- 全局公共方法
│   │   ├── companyOpenLetter.js        -- 公司资料上传文件
│   │   ├── contractNo.js               -- 处理合同号
│   │   ├── dataServe.js                -- 数据服务http封装
│   │   ├── eleServe.js                 -- 电子保函http封装
│   │   ├── getQueryVariable.js         -- 图片相关方法
│   │   ├── getStyleSheets.js           -- 处理fontawesome图标
│   │   ├── guid.js                     -- 生成uuid
│   │   ├── handleTreeData.js           -- 处理树形结构数据
│   │   ├── oarequest.js                -- 业务http封装
│   │   ├── province.js                 -- 企查查省份对照表
│   │   └── validate.js                 -- 校验规则
|   ├── view                            -- 主要view代码
|   |   ├── baohou                      -- 保后管理
|   |   ├── basicManagement             -- 基础管理
|   |   ├── comprehensive               -- 综合管理
|   |   ├── costcenter                  -- 费用中心
|   |   ├── credit                      -- 授信管理
|   |   ├── data                        -- 数据管理
|   |   ├── database                    -- 数据源管理
|   |   ├── eleguarance                 -- 电子投标保函
|   |   |   ├── baohou                  -- 保后管理
|   |   |   ├── center                  -- 公共资源交易中心
|   |   |   ├── channel                 -- 渠道管理
|   |   |   ├── format                  -- 格式库
|   |   |   ├── institution             -- 金融机构配置
|   |   |   ├── institution             -- 电子投标保函项目列表
|   |   |   └── eleHome                 -- 电子投标保函数据统计
|   |   ├── entry                       -- 准入管理
|   |   ├── home                        -- 首页
|   |   ├── income                      -- 绩效管理
|   |   ├── interface
|   |   ├── InvoiceList                 -- 财务管理
|   |   ├── login                       -- 登录 
|   |   ├── meeting                     -- 排会管理 
|   |   ├── message                     -- 通知管理 
|   |   ├── monitoring                  -- 监控管理 
|   |   ├── performance                 -- 创收管理 
|   |   ├── personalCenter              --个人中心 
|   |   ├── project                     -- 项目管理
|   |   ├── spiderdata                  -- 企查查页面
|   |   ├── spiderdataSkyEye            -- 天眼查页面
|   |   ├── statistics                  -- 统计管理
|   |   ├── status                      -- 401，404页面
|   |   ├── systemmanagement            -- 系统配置管理页面
|   |   ├── systemMes                   -- 系统通知
|   |   ├── unit                        -- 单位组织
|   |   ├── workflow                    -- 流程管理
|   |   └── blank.vue                   -- 空白中转页面
├── .env                                -- 公共配置
├── .env.development                    -- 开发环境配置
├── .env.production                     -- 生产环境配置
├── .env.productiontest                 -- 预发布环境配置
├── .env.productiontest                 -- 测试环境配置
├── .gitignore                          -- 忽略文件配置
├── babel.config.js                     -- Babel配置文件
├── jsconfig.json                       -- 功能选项
├── package.json                        -- 包管理器代码
├── vue.config.js                       -- vue 配置文件
└── yarn.lock
```

#### 角色固定的id值
+ 评委角色id：b006f0c40c5847748441ea5ff3529be3
+ 主持人角色id：7e94363516ca4a65a65650f11a6c731f
+ 记会法务角色id：26fc67f15da54124a8dd0654272c33be
+ 项目经理角色id：dc0099ab-30c9-11ec-b30c-1c697ac46efc
+ 排会法务角色id：5630bf05aa6e479aa6c61346b53dcb35
#### 按钮权限控制
```
import btn from "@/mixins/btn.js";
//全局注入
Vue.mixin(btn)
//局部注入
mixins: [btn],
```

#### 注意事项
+ 菜单页获取列表的方法要用getData()
+ 按钮权限控制，使用的是src/mixins/btn.js文件的方法：
  + 新增：v-btn:add="btnArr"
  + 编辑：v-btn:edit="btnArr"
  + 删除：v-btn:del="btnArr"
  + 导出：v-btn:export="btnArr"
  + 查看：v-btn:detail="btnArr"
  + 审核：v-btn:audit="btnArr"
  + 复制：v-btn:copy="btnArr"
  + 特批：v-btn:special="btnArr"
  + 发起流程：v-btn:submitFlow="btnArr"
  + 特批：v-btn:special="btnArr"
  + 申请当期上会：v-btn:will="btnArr"
  + 发起流程：v-btn:submitFlow="btnArr"


> 页面需要使用按钮权限控制时，需要在data里面增加一个字段 btnPower:true
> 对金额的输入框去除逗号（,）时，只需加上指令 v-enter-money 即可
