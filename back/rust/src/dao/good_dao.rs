use super::Good;
use sqlx::mysql::MySqlQueryResult;
use sqlx::{Error, MySql, Pool};

impl Good {
    pub async fn add_good(pool: &Pool<MySql>, good: &Good) -> Result<MySqlQueryResult, Error> {
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
        .execute(pool)
        .await
    }

    pub async fn update_good(pool: &Pool<MySql>, good: &Good) -> Result<MySqlQueryResult, Error> {
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
        .execute(pool)
        .await
    }

    pub async fn delete_good(pool: &Pool<MySql>, id: u64) -> Result<MySqlQueryResult, Error> {
        sqlx::query(
            r#"
        DELETE FROM goods 
        WHRER `id` = ?
        "#,
        )
        .bind(id)
        .execute(pool)
        .await
    }

    pub async fn get_good_by_id(pool: &Pool<MySql>, id: u64) -> Result<Good, Error> {
        sqlx::query_as(r#"SELECT * FROM `goods` WHERE `id` = ?"#)
            .bind(id)
            .fetch_one(pool)
            .await
    }
}
