/**
 * 商品详情相关接口
 */
const { querySql } = require('../utils/mysql');
const { CODE_ERROR, CODE_SUCCESS } = require('../config/codeConfig');

/**
 * @desc 商品详情查询接口
 */
function getGoodInfoApi(req, res, next) {
  if (req) {
    const {
      query: { id = 0 },
    } = req;

    const goodInfoSql = `SELECT * FROM good WHERE id=${id}`;
    querySql(goodInfoSql).then((_res) => {
      if (_res) {
        const list = JSON.parse(JSON.stringify(_res));

        let data = {};
        if (Array.isArray(list) && list.length > 0) {
          const itemVo = {
            id: list[0]?.id,
            title: list[0]?.title,
            price: list[0]?.price,
            imgUrl: list[0]?.img_url,
            description: list[0]?.description,
            type: list[0]?.type,
            isActivity: list[0]?.is_activity,
            salesVolume: list[0]?.sales_volume,
            imgList: list[0]?.img_list,
            createTime: list[0]?.create_time,
          };

          data = {
            ...data,
            ...itemVo,
          };
        }

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
  getGoodInfoApi,
};
