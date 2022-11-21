use crate::config::TotalRes;
use crate::db::mysql;
use crate::models::ad::{Ad, AdUrlParams, AdVO};
use axum::extract::Query;
use chrono::Utc;
use sqlx::Error;

pub async fn create(payload: AdVO) -> Result<u64, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
        INSERT INTO 
            `ad` (
                `img_url`, 
                `title`, 
                `type`, 
                `create_time`, 
                `update_time`
            )
        VALUES
            (?, ?, ?, ?, ?)";

    let affected_row = sqlx::query(sql)
        .bind(&payload.imgUrl)
        .bind(&payload.title)
        .bind(&payload.r#type)
        .bind(Utc::now())
        .bind(Utc::now())
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn update(payload: AdVO) -> Result<u64, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
        UPDATE
            `ad`
        SET
            `img_url` = ?,
            `title` = ?,
            `type` = ?,
            `update_time` = ?
        WHERE
            `id` = ?";

    let affected_row = sqlx::query(sql)
        .bind(&payload.imgUrl)
        .bind(&payload.title)
        .bind(&payload.r#type)
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
            `ad` 
        WHERE 
            `id` = ?";

    let affected_row = sqlx::query(sql)
        .bind(id)
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn get_by_id(id: u64) -> Result<AdVO, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
        SELECT 
            * 
        FROM 
            `ad` 
        WHERE 
            `id` = ?";

    let ad = sqlx::query_as::<_, Ad>(sql)
        .bind(id)
        .fetch_one(pool)
        .await?;

    let ad_vo = AdVO {
        id: ad.id,
        title: ad.title,
        imgUrl: ad.img_url,
        r#type: ad.r#type,
        createTime: Some(ad.create_time),
    };

    Ok(ad_vo)
}

pub async fn get_list(Query(payload): Query<AdUrlParams>) -> Result<Vec<AdVO>, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
        SELECT 
            * 
        FROM 
            `ad` 
        WHERE
            `type` = ?
        ORDER BY 
            `id` ASC";

    let list = sqlx::query_as::<_, Ad>(sql)
        .bind(payload.r#type)
        .fetch_all(pool)
        .await?;

    let mut list_vo = vec![];
    for ad in list {
        let ad_vo = AdVO {
            id: ad.id,
            title: ad.title,
            imgUrl: ad.img_url,
            r#type: ad.r#type,
            createTime: Some(ad.create_time),
        };

        list_vo.push(ad_vo);
    }

    Ok(list_vo)
}

pub async fn get_total() -> Result<i64, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
        SELECT 
            COUNT(*) AS total 
        FROM
            `ad`";

    let total_res = sqlx::query_as::<_, TotalRes>(sql).fetch_one(pool).await?;

    Ok(total_res.total)
}
