use super::dao_config::{DatabaseConnection, ResData};
use super::Good;
use axum::{extract::Path, http::StatusCode, Json};

pub async fn add_good(
    DatabaseConnection(mut conn): DatabaseConnection,
    Json(payload): Json<Good>,
) -> Result<String, (StatusCode, String)> {
    sqlx::query(
        r#"
            INSERT INTO goods (`title`, `price`, `img_url`, `description`, `category`, `category_id`, `is_activity`, `sales_valume`, `image_list`)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"#,
    )
    .bind(&payload.title)
    .bind(&payload.price)
    .bind(&payload.img_url)
    .bind(&payload.description)
    .bind(&payload.category)
    .bind(&payload.category_id)
    .bind(&payload.is_activity)
    .bind(&payload.sales_valume)
    .bind(&payload.image_list)
    .execute(&mut conn)
    .await
    .unwrap();

    Ok("Success".to_string())
}

pub async fn update_good(
    DatabaseConnection(mut conn): DatabaseConnection,
    Json(payload): Json<Good>,
) -> Result<String, (StatusCode, String)> {
    sqlx::query(
        r#"
            UPDATE goods
            SET `title` = ?, `price` = ?, `img_url` = ?, `description` = ?, `category` = ?, `category_id` = ?, `is_activity` = ?, `sales_valume` = ?, `image_list` = ?
            WHERE `id` = ?
            "#,
    )
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
    .execute(&mut conn)
    .await
    .unwrap();

    Ok("Success".to_string())
}

pub async fn delete_good(
    Path(id): Path<u64>,
    DatabaseConnection(mut conn): DatabaseConnection,
) -> Result<String, (StatusCode, String)> {
    sqlx::query(
        r#"
            DELETE FROM goods
            WHERE `id` = ?
            "#,
    )
    .bind(id)
    .execute(&mut conn)
    .await
    .unwrap();

    Ok("Success".to_string())
}

pub async fn get_good_by_id(
    Path(id): Path<u64>,
    DatabaseConnection(mut conn): DatabaseConnection,
) -> Result<Json<ResData<Good>>, (StatusCode, String)> {
    let good: Good = sqlx::query_as(r#"SELECT * FROM `goods` WHERE `id` = ?"#)
        .bind(id)
        .fetch_one(&mut conn)
        .await
        .unwrap();

    let res = ResData {
        code: 200,
        message: String::from("请求成功"),
        data: good,
    };

    Ok(Json(res))
}
