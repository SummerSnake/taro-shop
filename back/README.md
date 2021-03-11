# 前言

商城小程序 node.js 后端

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
