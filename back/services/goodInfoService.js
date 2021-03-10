/**
 * 商品详情相关接口
 */
const { querySql } = require('../utils/mysql');
const { STATUS_ERROR, STATUS_SUCCESS } = require('../config/codeConfig');

/**
 * @desc 商品详情查询接口
 */
function getGoodInfoApi(req, res, next) {
  if (req) {
    const {
      query: { id = 0 },
    } = req;

    const goodInfoSql = `SELECT * FROM good where id=${id}`;
    querySql(goodInfoSql).then((_res) => {
      if (_res) {
        const list = JSON.parse(JSON.stringify(_res));

        let data = {};
        if (Array.isArray(list) && list.length > 0) {
          const { swiper = '' } = list[0];

          data = {
            ...list[0],
            swiper: swiper.split('#'),
          };
        }

        if (Object.keys(data).length > 0) {
          res.json({
            status: STATUS_SUCCESS,
            msg: '请求成功',
            data,
          });
        } else {
          res.json({
            status: STATUS_ERROR,
            msg: '服务器错误',
            data: null,
          });
        }
      }
    });
  }
}

module.exports = {
  getGoodInfoApi,
};
