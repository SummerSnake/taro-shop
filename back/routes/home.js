/**
 * 首页路由模块
 */
const express = require('express');
const router = express.Router();
const service = require('../services/homeService');

// 任务清单接口
router.get('/getHomeData', service.getHomeData);

module.exports = router;
