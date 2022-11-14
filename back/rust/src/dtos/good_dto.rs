use crate::config::{Pager, TotalRes};
use crate::db::mysql;
use crate::models::good::{Good, GoodVO};
use axum::extract::Query;
use sqlx::Error;

pub async fn create(payload: GoodVO) -> Result<u64, Error> {
    let sql = "
    INSERT INTO 
        `good` (
            `title`, 
            `price`, 
            `img_url`, 
            `description`, 
            `category`, 
            `category_id`, 
            `is_activity`, 
            `sales_valume`, 
            `image_list`
        )
    VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let pool = mysql::get_pool().unwrap();

    let affected_row = sqlx::query(sql)
        .bind(&payload.title)
        .bind(&payload.price)
        .bind(&payload.imgUrl)
        .bind(&payload.description)
        .bind(&payload.category)
        .bind(&payload.categoryId)
        .bind(&payload.isActivity)
        .bind(&payload.salesValume)
        .bind(&payload.imageList)
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn update(payload: GoodVO) -> Result<u64, Error> {
    let sql = "
    UPDATE 
        `good`
    SET 
        `title` = ?, 
        `price` = ?, 
        `img_url` = ?, 
        `description` = ?, 
        `category` = ?, 
        `category_id` = ?, 
        `is_activity` = ?, 
        `sales_valume` = ?, 
        `image_list` = ?
    WHERE 
        `id` = ?";
    let pool = mysql::get_pool().unwrap();

    let affected_row = sqlx::query(sql)
        .bind(&payload.title)
        .bind(&payload.price)
        .bind(&payload.imgUrl)
        .bind(&payload.description)
        .bind(&payload.category)
        .bind(&payload.categoryId)
        .bind(&payload.isActivity)
        .bind(&payload.salesValume)
        .bind(&payload.imageList)
        .bind(&payload.id)
        .execute(pool)
        .await?
        .rows_affected();

    Ok(affected_row)
}

pub async fn delete(id: u64) -> Result<u64, Error> {
    let sql = "
    DELETE FROM 
        `good` 
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

pub async fn get_good_by_id(id: u64) -> Result<GoodVO, Error> {
    let sql = "
    SELECT 
        * 
    FROM 
        `good` 
    WHERE 
        `id` = ?";
    let pool = mysql::get_pool().unwrap();

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
        category: good.category,
        categoryId: good.category_id,
        isActivity: good.is_activity,
        salesValume: good.sales_valume,
        imageList: good.image_list,
    };

    Ok(good_vo)
}

pub async fn get_goods_list(Query(payload): Query<Pager>) -> Result<Vec<GoodVO>, Error> {
    let page_no = payload.pageNo.unwrap_or(1);
    let page_size = payload.pageSize.unwrap_or(10);
    let limit = (page_no - 1) * page_size;
    let pool = mysql::get_pool().unwrap();
    let sql = "
    SELECT 
        * 
    FROM 
        `good` 
    ORDER BY 
        id DESC 
    limit 
        ?,?";

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
            category: good.category,
            categoryId: good.category_id,
            isActivity: good.is_activity,
            salesValume: good.sales_valume,
            imageList: good.image_list,
        };

        list_vo.push(good_vo);
    }

    Ok(list_vo)
}

pub async fn get_goods_total() -> Result<i64, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
    SELECT 
        COUNT(*) AS total 
    FROM 
        `good`";

    let total_res = sqlx::query_as::<_, TotalRes>(sql).fetch_one(pool).await?;

    Ok(total_res.total)
}
