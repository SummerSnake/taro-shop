/**
 * @desc 数据库基础配置
 */
const mysql = {
  host: 'localhost', // 主机名称，一般是本机
  port: '3306', // 数据库的端口号，如果不设置，默认是3306
  user: 'root', // 数据库用户名
  password: 'summersnake', // 数据库密码
  database: 'taro_shop', // 数据库
  connectTimeout: 5000, // 连接超时
};

module.exports = mysql;
