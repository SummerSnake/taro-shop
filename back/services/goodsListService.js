/**
 * 商品列表相关接口
 */
const { querySql } = require('../utils/mysql');
const { STATUS_ERROR, STATUS_SUCCESS } = require('../config/codeConfig');

/**
 * @desc 首页查询接口
 */
function getGoodsListApi(req, res, next) {
  let data = {};

  const goodsListSql = 'SELECT * FROM good';
  querySql(goodsListSql).then((_res) => {
    if (_res) {
      const { tabData = [] } = data;
      const list = JSON.parse(JSON.stringify(_res));

      const proList = [];
      list.forEach((child) => {
        const obj = {
          id: child.id,
          name: child.name,
          price: child.price,
          desc: child.desc,
          imageUrl: child.imgUrl,
        };

        proList.push(obj);
      });

      list.forEach((item) => {
        const json = {
          id: item.id,
          title: item.category,
        };

        json.proList = proList;
        tabData.push(json);
      });

      data = {
        ...data,
        tabData,
      };

      console.log(data);
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

module.exports = {
  getGoodsListApi,
};
