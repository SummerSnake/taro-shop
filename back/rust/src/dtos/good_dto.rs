use crate::config::{Pager, TotalRes};
use crate::db::mysql;
use crate::models::{
    good::{Good, GoodVO},
    order::OrderVO,
};
use axum::extract::Query;
use chrono::Utc;
use sqlx::Error;

pub async fn create(payload: GoodVO) -> Result<u64, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
        INSERT INTO 
            `good` (
                `title`, 
                `price`, 
                `img_url`, 
                `description`, 
                `type`, 
                `is_activity`, 
                `sales_volume`, 
                `img_list`,
                `create_time`, 
                `update_time` 
            )
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    let affected_row = sqlx::query(sql)
        .bind(&payload.title)
        .bind(&payload.price)
        .bind(&payload.imgUrl)
        .bind(&payload.description)
        .bind(&payload.r#type)
        .bind(&payload.isActivity)
        .bind(&payload.salesVolume)
        .bind(&payload.imgList)
        .bind(Utc::now())
        .bind(Utc::now())
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn update(payload: GoodVO) -> Result<u64, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
        UPDATE 
            `good`
        SET 
            `title` = ?, 
            `price` = ?, 
            `img_url` = ?, 
            `description` = ?, 
            `type`, 
            `is_activity`, 
            `sales_volume`, 
            `img_list`,
            `create_time`, 
            `update_time` 
        WHERE 
            `id` = ?";

    let affected_row = sqlx::query(sql)
        .bind(&payload.title)
        .bind(&payload.price)
        .bind(&payload.imgUrl)
        .bind(&payload.description)
        .bind(&payload.r#type)
        .bind(&payload.isActivity)
        .bind(&payload.salesVolume)
        .bind(&payload.imgList)
        .bind(Utc::now())
        .bind(Utc::now())
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
            `good` 
        WHERE 
            `id` = ?";

    let affected_row = sqlx::query(sql)
        .bind(id)
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn get_by_id(id: u64) -> Result<GoodVO, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
        SELECT 
            * 
        FROM 
            `good` 
        WHERE 
            `id` = ?";

    let good = sqlx::query_as::<_, Good>(sql)
        .bind(id)
        .fetch_one(pool)
        .await?;

    let good_vo = GoodVO {
        id: good.id,
        title: good.title,
        price: good.price,
        imgUrl: good.img_url,
        description: good.description,
        r#type: good.r#type,
        isActivity: good.is_activity,
        salesVolume: good.sales_volume,
        imgList: good.img_list,
        createTime: Some(good.create_time),
    };

    Ok(good_vo)
}

pub async fn get_list(Query(payload): Query<Pager>) -> Result<Vec<GoodVO>, Error> {
    let pool = mysql::get_pool().unwrap();
    let page_no = payload.pageNo.unwrap_or(1);
    let page_size = payload.pageSize.unwrap_or(10);
    let limit = (page_no - 1) * page_size;
    let sql = "
        SELECT 
            * 
        FROM 
            `good` 
        ORDER BY 
            id ASC 
        limit 
            ?, ?";

    let list = sqlx::query_as::<_, Good>(sql)
        .bind(limit)
        .bind(page_size)
        .fetch_all(pool)
        .await?;

    let mut list_vo = vec![];
    for good in list {
        let good_vo = GoodVO {
            id: good.id,
            title: good.title,
            price: good.price,
            imgUrl: good.img_url,
            description: good.description,
            r#type: good.r#type,
            isActivity: good.is_activity,
            salesVolume: good.sales_volume,
            imgList: good.img_list,
            createTime: Some(good.create_time),
        };

        list_vo.push(good_vo);
    }

    Ok(list_vo)
}

pub async fn get_total() -> Result<i64, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
        SELECT 
            COUNT(*) AS total 
        FROM 
            `good`";

    let total_res = sqlx::query_as::<_, TotalRes>(sql).fetch_one(pool).await?;

    Ok(total_res.total)
}

pub async fn get_order_related_list(Query(payload): Query<OrderVO>) -> Result<Vec<GoodVO>, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
        SELECT 
            * 
        FROM 
            `good` 
        WHERE
            FIND_IN_SET(id, ?)
        ORDER BY 
            id ASC";

    let list = sqlx::query_as::<_, Good>(sql)
        .bind(&payload.goodIds)
        .fetch_all(pool)
        .await?;

    let mut list_vo = vec![];
    for good in list {
        let good_vo = GoodVO {
            id: good.id,
            title: good.title,
            price: good.price,
            imgUrl: good.img_url,
            description: good.description,
            r#type: good.r#type,
            isActivity: good.is_activity,
            salesVolume: good.sales_volume,
            imgList: good.img_list,
            createTime: Some(good.create_time),
        };

        list_vo.push(good_vo);
    }

    Ok(list_vo)
}
