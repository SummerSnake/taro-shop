# 前端

taro 商城小程序
taro 入门项目

# 技术栈

Taro + Taro-ui + Redux + less

Taro 是一套遵循 React 语法规范的 多端开发 解决方案。

使用 Taro，我们可以只书写一套代码，再通过 Taro 的编译工具，
将源代码分别编译出可以在不同端（微信/百度/支付宝/字节跳动小程序、H5、React-Native 等）运行的代码。

Taro 的语法规则基于 React 规范，它采用与 React 一致的组件化思想，组件生命周期与 React 保持一致，
同时在书写体验上也尽量与 React 类似，支持使用 JSX 语法，让代码具有更丰富的表现力。

接口使用 http://rap2.taobao.org/，http://rap2.taobao.org/ 是一个可视化，并且能快速生成 模拟数据 的持久化服务。

# 部分截图展示

## 首页 && 商品列表

<img src="https://github.com/SummerSnake/taro-shop/blob/master/screenshots/1.jpg" width="375" height="667" /> <img src="https://github.com/SummerSnake/taro-shop/blob/master/screenshots/2.jpg" width="375" height="667" />

## 商品详情 && 购物车

<img src="https://github.com/SummerSnake/taro-shop/blob/master/screenshots/3.jpg" width="375" height="667" /> <img src="https://github.com/SummerSnake/taro-shop/blob/master/screenshots/4.jpg" width="375" height="667" />

## 我的 && 订单列表

<img src="https://github.com/SummerSnake/taro-shop/blob/master/screenshots/5.jpg" width="375" height="667" /> <img src="https://github.com/SummerSnake/taro-shop/blob/master/screenshots/6.jpg" width="375" height="667" />

# 项目运行

```

git clone https://github.com/SummerSnake/taro-shop.git

cd taro-shop/front

# 全局安装taro脚手架
npm install -g @tarojs/cli

# 安装项目依赖
npm install

# 微信小程序
npm run dev:weapp

```

# 业务介绍

目录结构

    ├── dist                   // 微信小程序编译结果目录
    ├── config                 // Taro配置目录
    │   ├── dev.js                 // 开发时配置
    │   ├── index.js               // 默认配置
    │   └── prod.js                // 打包时配置
    ├── src                    // 源码目录
    │   ├── components             // 组件
    │   ├── pages                  // 页面文件目录
    │   │   └── index
    │   │       ├── index.js           // 页面逻辑
    │   │       ├── index.less         // 页面样式
    │   ├── utils              // 常用工具类
    │   ├── app.js             // 入口文件
    │   └── index.html
    └── package.json            // 项目依赖

#---------------------------------------------------------------

# 后端

taro 商城小程序 node.js 后端
node.js + mysql 入门项目

# 技术栈

node.js + express + mysql + nodemon

# 项目运行

```

yarn -i
yarn dev || yarn start || nodemon server.js

```

# 业务介绍

目录结构

    ├── config                      // 配置目录
    │   ├── codeConfig.js               // 开发配置
    │   ├── dbConfig.js                 // 数据库配置
    ├── routes                      // 路由
    ├── services                    // 接口
    ├── utils                       // 工具包
    │   ├── mqsql.js                    // sql连接配置
    ├── package.json                // 项目依赖
    └── server.js                   // 入口文件
