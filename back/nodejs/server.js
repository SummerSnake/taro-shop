/**
 * 入口文件
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes'); // 导入自定义路由文件，创建模块化路由

const app = express();

// 解析 form 格式 content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// 解析json数据格式 content-type - application/json
app.use(bodyParser.json());

// 注入cors模块解决跨域
app.use(cors());

app.use('/', routes);

app.listen(8088, () => {
  console.log('Server running at http://127.0.0.1:8088');
});
