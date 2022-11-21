use crate::config::TotalRes;
use crate::db::mysql;
use crate::models::order::{Order, OrderUrlParams, OrderVO};
use axum::extract::Query;
use chrono::Utc;
use sqlx::Error;
use uuid::Uuid;

pub async fn create(payload: OrderVO) -> Result<u64, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
        INSERT INTO 
            `order` (
                `order_number`, 
                `order_status`, 
                `order_amount`, 
                `create_time`, 
                `update_time`, 
                `good_ids`
            )
        VALUES
            (?, ?, ?, ?, ?, ?)";

    let affected_row = sqlx::query(sql)
        .bind(Uuid::new_v4().simple().to_string())
        .bind(1)
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
    let pool = mysql::get_pool().unwrap();
    let sql = "
        UPDATE 
            `order`
        SET 
            `order_number` = ?, 
            `order_status` = ?, 
            `order_amount` = ?, 
            `update_time` = ?, 
            `good_ids` = ?
        WHERE 
            `id` = ?";

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
    let pool = mysql::get_pool().unwrap();
    let sql = "
        DELETE FROM 
            `order` 
        WHERE 
            `id` = ?";

    let affected_row = sqlx::query(sql)
        .bind(id)
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn get_by_id(id: u64) -> Result<OrderVO, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
        SELECT 
            * 
        FROM 
            `order` 
        WHERE 
            `id` = ?";

    let order = sqlx::query_as::<_, Order>(sql)
        .bind(id)
        .fetch_one(pool)
        .await?;

    let order_vo = OrderVO {
        id: order.id,
        orderNumber: Some(order.order_number),
        orderStatus: Some(order.order_status),
        orderAmount: order.order_amount,
        createTime: Some(order.create_time),
        goodIds: order.good_ids,
    };

    Ok(order_vo)
}

pub async fn get_list(Query(payload): Query<OrderUrlParams>) -> Result<Vec<OrderVO>, Error> {
    let pool = mysql::get_pool().unwrap();
    let page_no = payload.pageNo.unwrap_or(1);
    let page_size = payload.pageSize.unwrap_or(10);
    let limit = (page_no - 1) * page_size;
    let sql = "
        SELECT 
            * 
        FROM 
            `order` 
        WHERE 
            `order_status` = ?
        ORDER BY 
            id ASC 
        limit 
            ?, ?";

    let list = sqlx::query_as::<_, Order>(sql)
        .bind(&payload.orderStatus)
        .bind(limit)
        .bind(page_size)
        .fetch_all(pool)
        .await?;

    let mut list_vo = vec![];
    for order in list {
        let order_vo = OrderVO {
            id: order.id,
            orderNumber: Some(order.order_number),
            orderStatus: Some(order.order_status),
            orderAmount: order.order_amount,
            createTime: Some(order.create_time),
            goodIds: order.good_ids,
        };

        list_vo.push(order_vo);
    }

    Ok(list_vo)
}

pub async fn get_total() -> Result<i64, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
        SELECT 
            COUNT(*) AS total 
        FROM
            `order`";

    let total_res = sqlx::query_as::<_, TotalRes>(sql).fetch_one(pool).await?;

    Ok(total_res.total)
}
