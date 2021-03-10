/**
 * 首页相关接口
 */
const { querySql } = require('../utils/mysql');
const { STATUS_ERROR, STATUS_SUCCESS } = require('../config/codeConfig');

/**
 * @desc 首页查询接口
 */
function getHomeData(req, res, next) {
  let data = {};

  const homeSql = 'SELECT * FROM home';
  querySql(homeSql).then((_res) => {
    if (_res) {
      const { iconList = [], imgList = [] } = data;
      const list = JSON.parse(JSON.stringify(_res));

      list.forEach((item) => {
        if (item.type === 1) {
          iconList.push(item);
        }
        if (item.type === 2) {
          imgList.push(item);
        }
        if (item.type === 3) {
          data.logoImgUrl = item.logoImgUrl;
        }
      });

      const goodSql = 'SELECT * FROM good';
      querySql(goodSql).then((_res) => {
        if (_res) {
          const { moreList = [], singleList = [] } = data;
          const list = JSON.parse(JSON.stringify(_res));

          list.forEach((item) => {
            if (item.type === 1) {
              singleList.push(item);
            } else {
              moreList.push(item);
            }
          });

          data = {
            ...data,
            iconList,
            imgList,
            singleList,
            moreList,
          };

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
  });
}

module.exports = {
  getHomeData,
};
