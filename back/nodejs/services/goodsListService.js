/**
 * 商品列表相关接口
 */
const { querySql } = require('../utils/mysql');
const { CODE_ERROR, CODE_SUCCESS } = require('../config/codeConfig');

/**
 * @desc 商品列表查询接口
 */
function getGoodsListApi(req, res, next) {
  let data = {};

  const goodsListSql = 'SELECT * FROM good';
  querySql(goodsListSql).then((_res) => {
    if (_res) {
      const list = JSON.parse(JSON.stringify(_res));

      const listVo = [];
      list.forEach((item) => {
        const itemVo = {
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

        listVo.push(itemVo);
      });

      data = {
        ...data,
        list: listVo,
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

module.exports = {
  getGoodsListApi,
};
