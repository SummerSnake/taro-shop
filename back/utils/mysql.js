const mysql = require('mysql');
const dbConfig = require('../config/dbConfig');

/**
 * @desc 连接mysql
 */
function connectSql() {
  const { host = '', user = '', password = '', database = '' } = dbConfig;
  return mysql.createConnection({
    host,
    user,
    password,
    database,
  });
}

/**
 * @desc 新建查询连接
 * @param { string } sql
 */
function querySql(sql) {
  const connect = connectSql();

  return new Promise((resolve, reject) => {
    try {
      connect.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    } catch (error) {
      reject(error);
    } finally {
      // 释放连接
      connect.end();
    }
  });
}

module.exports = {
  querySql,
};
