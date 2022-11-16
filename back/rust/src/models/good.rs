#![allow(non_snake_case)]

use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Serialize, Deserialize, Debug, Clone, FromRow)]
pub struct Good {
    pub id: Option<u64>,
    pub title: String,
    pub price: Decimal,
    pub img_url: String,
    pub description: String,
    pub r#type: u8,
    pub is_activity: Option<u8>,
    pub sales_valume: u64,
    pub image_list: String,
    pub create_time: DateTime<Utc>,
    pub update_time: DateTime<Utc>,
}

#[derive(Serialize, Deserialize, Debug, Clone, FromRow)]
pub struct GoodVO {
    pub id: Option<u64>,
    pub title: String,
    pub price: Decimal,
    pub imgUrl: String,
    pub description: String,
    pub r#type: u8,
    pub isActivity: Option<u8>,
    pub salesValume: u64,
    pub imageList: String,
    pub createTime: Option<DateTime<Utc>>,
}

#[derive(Deserialize)]
pub struct GoodUrlParams {
    pub id: Option<u64>,
}
