/**
 * 首页相关接口
 */
const { querySql } = require('../utils/mysql');
const { CODE_ERROR, CODE_SUCCESS } = require('../config/codeConfig');

/**
 * @desc 首页查询接口
 */
function getHomeApi(req, res, next) {
  let data = {};

  // 查询广告表
  const adSql = 'SELECT * FROM ad';
  querySql(adSql).then((_res) => {
    if (_res) {
      const swipperList = [];
      const iconList = [];
      let bannerUrl = '';
      const list = JSON.parse(JSON.stringify(_res));

      list.forEach((item) => {
        const itemVo = {
          id: item?.id,
          title: item?.title,
          type: item?.type,
          imgUrl: item?.img_url,
          createTime: item?.create_time,
        };

        if (item.type === 1) {
          swipperList.push(itemVo);
        }
        if (item.type === 2) {
          bannerUrl = item.img_url;
        }
        if (item.type === 3) {
          iconList.push(itemVo);
        }
      });

      // 查询商品表
      const goodSql = 'SELECT * FROM good';
      querySql(goodSql).then((_res) => {
        if (_res) {
          const singleList = [];
          const goodsList = [];
          const list = JSON.parse(JSON.stringify(_res));

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

            if (item.is_activity === 1) {
              singleList.push(itemVo);
            } else {
              goodsList.push(itemVo);
            }
          });

          data = {
            bannerUrl,
            swipperList,
            iconList,
            singleList,
            goodsList,
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
  });
}

module.exports = {
  getHomeApi,
};
