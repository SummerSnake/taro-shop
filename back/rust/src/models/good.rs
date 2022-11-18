#![allow(non_snake_case)]

use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, FromRow)]
pub struct Good {
    pub id: Option<u64>,
    pub title: String,
    pub price: Decimal,
    pub img_url: String,
    pub description: String,
    pub r#type: u8,
    pub is_activity: Option<u8>,
    pub sales_volume: u64,
    pub img_list: String,
    pub create_time: DateTime<Utc>,
    pub update_time: DateTime<Utc>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GoodVO {
    pub id: Option<u64>,
    pub title: String,
    pub price: Decimal,
    pub imgUrl: String,
    pub description: String,
    pub r#type: u8,
    pub isActivity: Option<u8>,
    pub salesVolume: u64,
    pub imgList: String,
    pub createTime: Option<DateTime<Utc>>,
}

#[derive(Deserialize)]
pub struct GoodUrlParams {
    pub id: Option<u64>,
}
