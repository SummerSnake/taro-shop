use crate::config::{Pager, TotalRes};
use crate::db::mysql;
use crate::models::order::{Order, OrderVO};
use axum::extract::Query;
use chrono::Utc;
use sqlx::Error;

pub async fn create(payload: OrderVO) -> Result<u64, Error> {
    let sql = "
    INSERT INTO 
        `orders` (
            `order_number`, 
            `order_status`, 
            `order_amount`, 
            `create_time`, 
            `update_time`, 
            `good_ids`
        )
    VALUES
        (?, ?, ?, ?, ?, ?)";
    let pool = mysql::get_pool().unwrap();

    let affected_row = sqlx::query(sql)
        .bind(&payload.orderNumber)
        .bind(&payload.orderStatus)
        .bind(&payload.orderAmount)
        .bind(Utc::now())
        .bind(Utc::now())
        .bind(&payload.goodIds)
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn update(payload: OrderVO) -> Result<u64, Error> {
    let sql = "
    UPDATE 
        `orders`
    SET 
        `order_number` = ?, 
        `order_status` = ?, 
        `order_amount` = ?, 
        `update_time` = ?, 
        `good_ids` = ?
    WHERE 
        `id` = ?";
    let pool = mysql::get_pool().unwrap();

    let affected_row = sqlx::query(sql)
        .bind(&payload.orderNumber)
        .bind(&payload.orderStatus)
        .bind(&payload.orderAmount)
        .bind(Utc::now())
        .bind(&payload.goodIds)
        .bind(&payload.id)
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn delete(id: u64) -> Result<u64, Error> {
    let sql = "
    DELETE FROM 
        `orders` 
    WHERE 
        `id` = ?";
    let pool = mysql::get_pool().unwrap();

    let affected_row = sqlx::query(sql)
        .bind(id)
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn get_order_by_id(id: u64) -> Result<OrderVO, Error> {
    let sql = "
    SELECT 
        * 
    FROM 
        `orders` 
    WHERE 
        `id` = ?";
    let pool = mysql::get_pool().unwrap();

    let order = sqlx::query_as::<_, Order>(sql)
        .bind(id)
        .fetch_one(pool)
        .await?;

    let order_vo = OrderVO {
        id: order.id,
        orderNumber: order.order_number,
        orderStatus: order.order_status,
        orderAmount: order.order_amount,
        createTime: Some(order.create_time),
        goodIds: order.good_ids,
    };

    Ok(order_vo)
}

pub async fn get_orders_list(Query(payload): Query<Pager>) -> Result<Vec<OrderVO>, Error> {
    let page_no = payload.pageNo.unwrap_or(1);
    let page_size = payload.pageSize.unwrap_or(10);
    let limit = (page_no - 1) * page_size;
    let pool = mysql::get_pool().unwrap();
    let sql = "
    SELECT 
        * 
    FROM 
        `orders` 
    ORDER BY 
        id DESC 
    limit 
        ?,?";

    let list = sqlx::query_as::<_, Order>(sql)
        .bind(limit)
        .bind(page_size)
        .fetch_all(pool)
        .await?;

    let mut list_vo = vec![];
    for order in list {
        let order_vo = OrderVO {
            id: order.id,
            orderNumber: order.order_number,
            orderStatus: order.order_status,
            orderAmount: order.order_amount,
            createTime: Some(order.create_time),
            goodIds: order.good_ids,
        };

        list_vo.push(order_vo);
    }

    Ok(list_vo)
}

pub async fn get_orders_total() -> Result<i64, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
    SELECT 
        COUNT(*) AS total 
    FROM
        `orders`";

    let total_res = sqlx::query_as::<_, TotalRes>(sql).fetch_one(pool).await?;

    Ok(total_res.total)
}
