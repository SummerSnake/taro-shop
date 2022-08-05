use axum::{
    extract::Extension,
    http::StatusCode,
    response::{Html, IntoResponse},
    Json,
};
use serde::{Deserialize, Serialize};

use super::Good;
use sqlx::{MySql, Pool};

pub async fn hello() -> Html<&'static str> {
    println!("hello");
    Html("<h1>Hello, World!</h1>")
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct CommonRes {
    pub ok: bool,
}

pub async fn add_good(
    Json(req): Json<Good>,
    Extension(pool): Extension<Pool<MySql>>,
) -> impl IntoResponse {
    match Good::add_good(&pool, &req).await {
        Ok(_) => (StatusCode::OK, Json(CommonRes { ok: true })),
        Err(_) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(CommonRes { ok: false }),
        ),
    }
}

pub async fn update_good(
    Json(req): Json<Good>,
    Extension(pool): Extension<Pool<MySql>>,
) -> impl IntoResponse {
    match Good::update_good(&pool, &req).await {
        Ok(_) => (StatusCode::OK, Json(CommonRes { ok: true })),
        Err(_) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(CommonRes { ok: false }),
        ),
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct GetByIdReq {
    id: u64,
}

pub async fn delete_good(
    Json(req): Json<GetByIdReq>,
    Extension(pool): Extension<Pool<MySql>>,
) -> impl IntoResponse {
    match Good::delete_good(&pool, req.id).await {
        Ok(_) => (StatusCode::OK, Json(CommonRes { ok: true })),
        Err(_) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(CommonRes { ok: false }),
        ),
    }
}

pub async fn get_good(
    Json(req): Json<GetByIdReq>,
    Extension(pool): Extension<Pool<MySql>>,
) -> impl IntoResponse {
    match Good::get_good_by_id(&pool, req.id).await {
        Ok(good) => (StatusCode::OK, Json(Good { ..good })),
        Err(_) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(Good {
                id: todo!(),
                title: todo!(),
                price: todo!(),
                img_url: todo!(),
                description: todo!(),
                category: todo!(),
                category_id: todo!(),
                is_activity: todo!(),
                sales_valume: todo!(),
                image_list: todo!(),
            }),
        ),
    }
}
