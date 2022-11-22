/**
 * 订单列表路由模块
 */
const express = require('express');
const router = express.Router();
const service = require('../services/orderService');

// 订单列表接口
router.get('/order/list', service.getOrderListApi);

module.exports = router;
