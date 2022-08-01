/**
 * 首页路由模块
 */
const express = require('express');
const router = express.Router();
const service = require('../services/homeService');

// 首页接口
router.get('/home', service.getHomeApi);

module.exports = router;
