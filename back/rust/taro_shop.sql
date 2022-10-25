1,创建数据库: taro_shop
2,创建商品表:
CREATE TABLE `good` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `title` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '商品名称',
  `price` decimal(10,2) NOT NULL COMMENT '商品价格',
  `img_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '商品图片',
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '商品描述',
  `category` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '商品类别名称',
  `category_id` int unsigned NOT NULL COMMENT '商品类别id',
  `is_activity` int unsigned DEFAULT '0' COMMENT '0.不参与活动 1.参与活动',
  `sales_valume` int unsigned DEFAULT '0' COMMENT '销量',
  `image_list` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '商品详情图片列表',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

2,创建订单表:
CREATE TABLE `order` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_number` varchar(20) NOT NULL COMMENT '订单编号',
  `order_status` int NOT NULL COMMENT '1.未支付 2.待发货 3.已发货 4.待评价 5.已完成',
  `order_amount` decimal(10,2) NOT NULL COMMENT '订单金额',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;