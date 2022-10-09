use crate::db::mysql;
use crate::models::good::Good;
use sqlx::Error;

pub async fn create(payload: Good) -> Result<u64, Error> {
    let sql = "INSERT INTO goods (`title`, `price`, `img_url`, `description`, `category`, `category_id`, `is_activity`, `sales_valume`, `image_list`)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let pool = mysql::get_pool().unwrap();

    let affected_row = sqlx::query(sql)
        .bind(&payload.title)
        .bind(&payload.price)
        .bind(&payload.img_url)
        .bind(&payload.description)
        .bind(&payload.category)
        .bind(&payload.category_id)
        .bind(&payload.is_activity)
        .bind(&payload.sales_valume)
        .bind(&payload.image_list)
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn update(payload: Good) -> Result<u64, Error> {
    let sql = "UPDATE goods
    SET `title` = ?, `price` = ?, `img_url` = ?, `description` = ?, `category` = ?, `category_id` = ?, `is_activity` = ?, `sales_valume` = ?, `image_list` = ?
    WHERE `id` = ?";
    let pool = mysql::get_pool().unwrap();

    let affected_row = sqlx::query(sql)
        .bind(&payload.title)
        .bind(&payload.price)
        .bind(&payload.img_url)
        .bind(&payload.description)
        .bind(&payload.category)
        .bind(&payload.category_id)
        .bind(&payload.is_activity)
        .bind(&payload.sales_valume)
        .bind(&payload.image_list)
        .bind(&payload.id)
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn delete(id: u64) -> Result<u64, Error> {
    let sql = "DELETE FROM goods WHERE `id` = ?";
    let pool = mysql::get_pool().unwrap();

    let affected_row = sqlx::query(sql)
        .bind(id)
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn get_good_by_id(id: u64) -> Result<Good, Error> {
    let sql = "SELECT * FROM `goods` WHERE `id` = ?";
    let pool = mysql::get_pool().unwrap();

    let good = sqlx::query_as::<_, Good>(sql)
        .bind(id)
        .fetch_one(pool)
        .await?;

    Ok(good)
}
