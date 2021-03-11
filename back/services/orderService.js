/**
 * 订单列表相关接口
 */
const { querySql } = require('../utils/mysql');
const { STATUS_ERROR, STATUS_SUCCESS } = require('../config/codeConfig');

/**
 * @desc 订单列表查询接口
 */
function getOrderListApi(req, res, next) {
  if (req) {
    const {
      query: { orderType = 0 },
    } = req;

    const orderSql =
      orderType > 0 ? `SELECT * FROM orders WHERE orderType=${orderType}` : `SELECT * FROM orders`;

    querySql(orderSql).then((_res) => {
      console.log(_res);
      if (_res) {
        res.json({
          status: STATUS_SUCCESS,
          msg: '请求成功',
          data: _res,
        });
      } else {
        res.json({
          status: STATUS_ERROR,
          msg: '服务器错误',
          data: null,
        });
      }
    });
  }
}

module.exports = {
  getOrderListApi,
};
