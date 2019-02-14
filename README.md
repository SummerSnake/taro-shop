# 前言

商城小程序

可以不输入账号密码或任意账号密码直接登陆，登陆只是调用了接口，并没有做相应的验证。

# 技术栈

Taro + Taro-ui + Redux + less

Taro 是一套遵循 React 语法规范的 多端开发 解决方案。

使用 Taro，我们可以只书写一套代码，再通过 Taro 的编译工具，
将源代码分别编译出可以在不同端（微信/百度/支付宝/字节跳动小程序、H5、React-Native 等）运行的代码。

Taro 的语法规则基于 React 规范，它采用与 React 一致的组件化思想，组件生命周期与 React 保持一致，
同时在书写体验上也尽量与 React 类似，支持使用 JSX 语法，让代码具有更丰富的表现力。

接口使用 Easy Mock，Easy Mock 是一个可视化，并且能快速生成 模拟数据 的持久化服务。

# 项目运行

```

git clone https://github.com/SummerSnake/taro-shop.git

cd taro-shop

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
