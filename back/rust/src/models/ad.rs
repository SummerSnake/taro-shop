#![allow(non_snake_case)]

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Serialize, Deserialize, Debug, Clone, FromRow)]
pub struct Ad {
    pub id: Option<u64>,
    pub img_url: String,
    pub r#type: u8,
    pub create_time: DateTime<Utc>,
    pub update_time: DateTime<Utc>,
}

#[derive(Serialize, Deserialize, Debug, Clone, FromRow)]
pub struct AdVO {
    pub id: Option<u64>,
    pub imgUrl: String,
    pub r#type: u8,
    pub createTime: Option<DateTime<Utc>>,
}

#[derive(Deserialize, Clone)]
pub struct AdUrlParams {
    pub id: Option<u64>,
    pub r#type: Option<u8>,
}
