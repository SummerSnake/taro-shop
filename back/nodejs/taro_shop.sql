1,创建数据库: taro_shop
2,创建商品表:
CREATE TABLE `good` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `title` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '商品名称',
  `price` decimal(10,2) NOT NULL COMMENT '商品价格',
  `img_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '商品图片',
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '商品描述',
  `type` tinyint unsigned NOT NULL COMMENT '1. 鱼类  2. 节肢类  3. 甲壳类',
  `is_activity` tinyint unsigned NOT NULL COMMENT '0. 否  1. 是',
  `sales_volume` int unsigned DEFAULT '0' COMMENT '销量',
  `img_list` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '商品详情图片列表',
  `create_time` timestamp NOT NULL COMMENT '创建时间',
  `update_time` timestamp NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

3,创建订单表:
CREATE TABLE `order` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_number` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '订单编号',
  `order_status` tinyint unsigned NOT NULL COMMENT '1.未支付 2.待发货 3.已发货 4.待评价 5.已完成',
  `order_amount` decimal(10,2) NOT NULL COMMENT '订单金额',
  `create_time` timestamp NOT NULL COMMENT '创建时间',
  `update_time` timestamp NOT NULL COMMENT '更新时间',
  `good_ids` varchar(50) NOT NULL COMMENT '商品id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

4,创建广告表:
CREATE TABLE `ad` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `title` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '标题',
  `type` tinyint unsigned NOT NULL COMMENT '1. 首页轮播图  2. 通栏广告 3. 首页导航入口',
  `img_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '图片地址',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;