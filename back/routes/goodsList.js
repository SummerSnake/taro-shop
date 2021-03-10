/**
 * 商品列表路由模块
 */
const express = require('express');
const router = express.Router();
const service = require('../services/goodsListService');

// 商品列表接口
router.get('/goodsList', service.getGoodsListApi);

module.exports = router;
