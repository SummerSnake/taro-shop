/**
 * 商品详情路由模块
 */
const express = require('express');
const router = express.Router();
const service = require('../services/orderService');

// 商品详情接口
router.get('/order', service.getOrderListApi);

module.exports = router;
