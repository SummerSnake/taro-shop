#![allow(non_snake_case)]

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
    pub category: String,
    pub category_id: u64,
    pub is_activity: u8,
    pub sales_valume: u64,
    pub image_list: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, FromRow)]
pub struct GoodVO {
    pub id: Option<u64>,
    pub title: String,
    pub price: Decimal,
    pub imgUrl: String,
    pub description: String,
    pub category: String,
    pub categoryId: u64,
    pub isActivity: u8,
    pub salesValume: u64,
    pub imageList: String,
}

#[derive(Deserialize)]
pub struct GoodUrlParams {
    pub id: Option<u64>,
}
