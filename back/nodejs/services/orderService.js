/**
 * 订单相关接口
 */
const { v4: uuidv4 } = require('uuid');
const { querySql } = require('../utils/mysql');
const { CODE_ERROR, CODE_SUCCESS } = require('../config/codeConfig');

/**
 * @desc 查询订单中的商品
 * @param { string } goodIds
 * @return { Promise }
 */
const getGoodsList = async (goodIds) => {
  const goodListSql = `SELECT * FROM good WHERE FIND_IN_SET(id, '${goodIds}')`;
  const goodRes = await querySql(goodListSql);

  if (Array.isArray(goodRes)) {
    const goodList = JSON.parse(JSON.stringify(goodRes));
    const goodListVo = [];

    goodList.forEach((item) => {
      const goodVo = {
        id: item?.id,
        title: item?.title,
        price: item?.price,
        imgUrl: item?.img_url,
        description: item?.description,
        type: item?.type,
        isActivity: item?.is_activity,
        salesVolume: item?.sales_volume,
        imgList: item?.img_list,
        createTime: item?.create_time,
      };

      goodListVo.push(goodVo);
    });

    return new Promise((resolve) => resolve(goodListVo));
  }
};

/**
 * @desc 查询订单列表
 * @param { number } orderStatus
 * @return { Promise }
 */
const getOrderList = async (orderStatus) => {
  const sql = 'SELECT * FROM `order` WHERE order_status=';
  const orderSql = orderStatus > 0 ? `${sql}${orderStatus}` : 'SELECT * FROM `order`';
  const orderRes = await querySql(orderSql);

  if (Array.isArray(orderRes)) {
    const orderList = JSON.parse(JSON.stringify(orderRes));
    const orderListVo = [];

    orderList.forEach((item) => {
      const orderVo = {
        id: item?.id,
        orderNumber: item?.order_number,
        orderStatus: item?.order_status,
        orderAmount: item?.order_amount,
        goodIds: item?.good_ids,
        createTime: item?.create_time,
      };

      orderListVo.push(orderVo);
    });

    return new Promise((resolve) => resolve(orderListVo));
  }
};

/**
 * @desc 订单列表查询接口
 */
async function getOrderListApi(req, res, next) {
  if (!req) {
    res.json({
      code: CODE_ERROR,
      msg: '请求失败',
      data: null,
    });
  }

  const {
    query: { orderStatus = 0 },
  } = req;

  const orderList = await getOrderList(orderStatus);
  const goodList = await Promise.all(orderList.map((item) => getGoodsList(item?.goodIds)));

  for (let i = 0; i < orderList.length; i++) {
    orderList[i].goodsList = goodList[i];
  }

  const data = { list: orderList };
  if (Object.keys(data).length > 0) {
    res.json({
      code: CODE_SUCCESS,
      msg: '请求成功',
      data,
    });
  } else {
    res.json({
      code: CODE_ERROR,
      msg: '服务器错误',
      data: null,
    });
  }
}

/**
 * @desc 创建订单接口
 */
async function postCreateOrderApi(req, res, next) {
  if (!req) {
    res.json({
      code: CODE_ERROR,
      msg: '请求失败',
      data: null,
    });
  }

  const {
    body: { orderAmount = 0, goodIds = '' },
  } = req;
  const orderNumber = uuidv4().replaceAll('-', '');

  const sql =
    'INSERT INTO `order` (order_number, order_status, order_amount, create_time, update_time, good_ids) values ';
  const createOrderSql = `${sql}('${orderNumber}', 1, ${orderAmount}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '${goodIds}')`;
  const resultSetHeader = await querySql(createOrderSql);

  if (resultSetHeader?.affectedRows === 1) {
    res.json({
      code: CODE_SUCCESS,
      msg: '操作成功',
      data: null,
    });
  } else {
    res.json({
      code: CODE_ERROR,
      msg: '操作失败',
      data: null,
    });
  }
}

module.exports = {
  getOrderListApi,
  postCreateOrderApi,
};
