use axum::{
    extract::{Extension, FromRequest, RequestParts},
    http::StatusCode,
};
use serde::{Deserialize, Serialize};
use sqlx::mysql::MySqlPool;

/**
 * @desc 数据库连接
 */
pub struct DatabaseConnection(pub sqlx::pool::PoolConnection<sqlx::MySql>);

#[axum::async_trait]
impl<B: Send> FromRequest<B> for DatabaseConnection {
    type Rejection = (StatusCode, String);

    async fn from_request(req: &mut RequestParts<B>) -> Result<Self, Self::Rejection> {
        let Extension(pool) = Extension::<MySqlPool>::from_request(req)
            .await
            .map_err(internal_error)?;

        let conn = pool.acquire().await.map_err(internal_error)?;

        Ok(Self(conn))
    }
}

fn internal_error<E>(err: E) -> (StatusCode, String)
where
    E: std::error::Error,
{
    (StatusCode::INTERNAL_SERVER_ERROR, err.to_string())
}

/**
 * @desc 返回格式
 */
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ResData<T> {
    pub code: i32,
    pub message: String,
    pub data: T,
}
