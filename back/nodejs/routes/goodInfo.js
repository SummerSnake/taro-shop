/**
 * 商品详情路由模块
 */
const express = require('express');
const router = express.Router();
const service = require('../services/goodInfoService');

// 商品详情接口
router.get('/good/info', service.getGoodInfoApi);

module.exports = router;
