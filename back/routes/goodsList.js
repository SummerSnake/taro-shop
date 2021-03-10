/**
 * 首页路由模块
 */
const express = require('express');
const router = express.Router();
const service = require('../services/goodsListService');

// 任务清单接口
router.get('/goodsList', service.getGoodsListApi);

module.exports = router;
