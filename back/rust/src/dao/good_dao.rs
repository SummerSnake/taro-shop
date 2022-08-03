use super::Good;
use super::Table;
use sqlx::mysql::MySqlQueryAs;

impl<'c> Table<'c, Good> {
    pub async fn create_table(&self) -> Result<u64, sqlx::Error> {
        sqlx::query(
      r#"
      CREATE TABLE IF NOT EXISTS goods (
        `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '主键id',
        `title` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '商品名称',
        `price` decimal(10,2) NOT NULL COMMENT '商品价格',
        `img_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '商品图片',
        `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '商品描述',
        `category` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '商品类别名称',
        `category_id` int unsigned NOT NULL COMMENT '商品类别id',
        `is_activity` int unsigned DEFAULT '0' COMMENT '0.不参与活动 1.参与活动',
        `sales_valume` int unsigned DEFAULT '0' COMMENT '销量',
        `image_list` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '商品详情图片列表',
        PRIMARY KEY (`id`) USING BTREE
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC"#,
    )
    .execute(&*self.pool)
    .await
    }

    pub async fn drop_table(&self) -> Result<u64, sqlx::Error> {
        sqlx::query("DROP TABLE IF EXISTS goods;")
            .execute(&*self.pool)
            .await
    }

    pub async fn get_good_by_id(&self, good_id: u64) -> Result<Good, sqlx::Error> {
        sqlx::query_as(r#"SELECT * FROM `goods` WHERE `id` = ?"#)
            .bind(good_id)
            .fetch_one(&*self.pool)
            .await
    }

    pub async fn add_good(&self, good: &Good) -> Result<u64, sqlx::Error> {
        sqlx::query(
            r#"
      INSERT INTO goods (
        `title`, 
        `price`, 
        `img_url`, 
        `description`, 
        `category`, 
        `category_id`, 
        `is_activity`, 
        `sales_valume`, 
        `image_list`
      )"#,
        )
        .bind(&good.title)
        .bind(&good.price)
        .bind(&good.img_url)
        .bind(&good.description)
        .bind(&good.category)
        .bind(&good.category_id)
        .bind(&good.is_activity)
        .bind(&good.sales_valume)
        .bind(&good.image_list)
        .execute(&*self.pool)
        .await
    }

    pub async fn update_good(&self, good: &Good) -> Result<u64, sqlx::Error> {
        sqlx::query(
            r#"
      UPDATE goods SET
      `title` = ?, 
      `price` = ?, 
      `img_url` = ?, 
      `description` = ?, 
      `category` = ?, 
      `category_id` = ?, 
      `is_activity` = ?, 
      `sales_valume` = ?, 
      `image_list = ?`
      WHERE `id` = ?
      "#,
        )
        .bind(&good.title)
        .bind(&good.price)
        .bind(&good.img_url)
        .bind(&good.description)
        .bind(&good.category)
        .bind(&good.category_id)
        .bind(&good.is_activity)
        .bind(&good.sales_valume)
        .bind(&good.image_list)
        .bind(&good.id)
        .execute(&*self.pool)
        .await
    }

    pub async fn delete_good(&self, good_id: u64) -> Result<u64, sqlx::Error> {
        sqlx::query(r#"DELETE FROM goods WHRER `id` = ?"#)
            .bind(good_id)
            .execute(&*self.pool)
            .await
    }
}
