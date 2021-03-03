/**
 * 首页相关接口
 */
const { querySql } = require('../utils/index');
const { CODE_ERROR, CODE_SUCCESS } = require('../config/codeConfig');

/**
 * @desc 首页查询接口
 */
function getHomeData() {
  const sql = 'SELECT * FROM home';
  querySql(sql).then((res) => {
    console.log(res);
    if (res) {
      res.json({
        code: CODE_SUCCESS,
        msg: '请求成功',
        data: res,
      });
    } else {
      res.json({
        code: CODE_ERROR,
        msg: '请求成功',
        data: null,
      });
    }
  });
}

module.exports = {
  getHomeData,
};
