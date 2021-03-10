const express = require('express');
const homeRouter = require('./home'); // 引入 home 路由模块
const goodsListRouter = require('./goodsList'); // 引入 goodsList 路由模块
const goodInfoRouter = require('./goodInfo'); // 引入 goodInfo 路由模块
const router = express.Router(); // 注册路由

router.use('/api', homeRouter); // 注入 home 路由模块
router.use('/api', goodsListRouter); // 注入 goodsList 路由模块
router.use('/api', goodInfoRouter); // 注入 goodInfo 路由模块

// 自定义统一异常处理中间件，需要放在代码最后
router.use((err, req, res, next) => {
  if (err) {
    const { output } = err || {};
    // 错误码和错误信息
    const errCode = (output && output.statusCode) || 500;
    const errMsg = (output && output.payload && output.payload.error) || err.message;

    res.status(errCode).json({
      status: errCode,
      msg: errMsg,
    });
  }
});

module.exports = router;
