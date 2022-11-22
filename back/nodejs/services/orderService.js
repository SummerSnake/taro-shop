/**
 * 订单列表相关接口
 */
const { querySql } = require('../utils/mysql');
const { CODE_ERROR, CODE_SUCCESS } = require('../config/codeConfig');

/**
 * @desc 订单列表查询接口
 */
function getOrderListApi(req, res, next) {
  if (req) {
    const {
      query: { orderStatus = 0 },
    } = req;

    const sql = 'SELECT * FROM `order` WHERE order_status=';
    const orderSql = orderStatus > 0 ? `${sql}${orderStatus}` : 'SELECT * FROM `order`';

    querySql(orderSql).then((orderRes) => {
      if (orderRes) {
        const orderList = JSON.parse(JSON.stringify(orderRes));
        const orderListVo = [];
        orderList.forEach((item) => {
          // 查询订单中的商品
          const goodsListSql = `SELECT * FROM good WHERE FIND_IN_SET(id, '${item?.good_ids}')`;

          querySql(goodsListSql).then((_goodRes) => {
            if (_goodRes) {
              const goodsList = JSON.parse(JSON.stringify(_goodRes));

              const goodsListVo = [];
              goodsList.forEach((child) => {
                const goodVo = {
                  id: child?.id,
                  title: child?.title,
                  price: child?.price,
                  imgUrl: child?.img_url,
                  description: child?.description,
                  type: child?.type,
                  isActivity: child?.is_activity,
                  salesVolume: child?.sales_volume,
                  imgList: child?.img_list,
                  createTime: child?.create_time,
                };

                goodsListVo.push(goodVo);
              });

              const itemVo = {
                id: item?.id,
                orderNumber: item?.order_number,
                orderStatus: item?.order_status,
                orderAmount: item?.order_amount,
                goodIds: item?.good_ids,
                goodsList: goodsListVo,
                createTime: item?.create_time,
              };

              orderListVo.push(itemVo);
            }
          });
        });

        data = {
          list: orderListVo,
        };

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
    });
  }
}

module.exports = {
  getOrderListApi,
};
