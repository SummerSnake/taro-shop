use crate::config::{Pager, TotalRes};
use crate::db::mysql;
use crate::models::order::{Order, OrderVO};
use axum::extract::Query;
use sqlx::Error;

pub async fn create(payload: OrderVO) -> Result<u64, Error> {
    let sql = "INSERT INTO order (`order_number`, `order_status`, `order_amount`, `create_time`, `update_time`, `good_id`)
    VALUES(?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?)";
    let pool = mysql::get_pool().unwrap();

    let affected_row = sqlx::query(sql)
        .bind(&payload.orderNumber)
        .bind(&payload.orderStatus)
        .bind(&payload.orderAmount)
        .bind(&payload.goodId)
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn update(payload: OrderVO) -> Result<u64, Error> {
    let sql = "UPDATE order
    SET `order_number` = ?, `order_status` = ?, `order_amount` = ?, `update_time` = CURRENT_TIMESTAMP, `good_id` = ?
    WHERE `id` = ?";
    let pool = mysql::get_pool().unwrap();

    let affected_row = sqlx::query(sql)
        .bind(&payload.orderNumber)
        .bind(&payload.orderStatus)
        .bind(&payload.orderAmount)
        .bind(&payload.goodId)
        .bind(&payload.id)
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn delete(id: u64) -> Result<u64, Error> {
    let sql = "DELETE FROM order WHERE `order_number` = ?";
    let pool = mysql::get_pool().unwrap();

    let affected_row = sqlx::query(sql)
        .bind(id)
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn get_order_by_id(id: u64) -> Result<Order, Error> {
    let sql = "SELECT * FROM `order` WHERE `id` = ?";
    let pool = mysql::get_pool().unwrap();

    let order = sqlx::query_as::<_, OrderVO>(sql)
        .bind(id)
        .fetch_one(pool)
        .await?;

    Ok(order)
}

pub async fn get_orders_list(Query(payload): Query<Pager>) -> Result<Vec<OrderVO>, Error> {
    let page_no = payload.pageNo.unwrap_or(1);
    let page_size = payload.pageSize.unwrap_or(10);
    let limit = (page_no - 1) * page_size;
    let pool = mysql::get_pool().unwrap();
    let sql = "SELECT * FROM `order` ORDER BY id DESC limit ?,?";

    let list = sqlx::query_as::<_, Order>(sql)
        .bind(limit)
        .bind(page_size)
        .fetch_all(pool)
        .await?;

    Ok(list)
}

pub async fn get_orders_total() -> Result<i64, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "SELECT COUNT(*) AS total FROM `order`";

    let total_res = sqlx::query_as::<_, TotalRes>(sql).fetch_one(pool).await?;

    Ok(total_res.total)
}
