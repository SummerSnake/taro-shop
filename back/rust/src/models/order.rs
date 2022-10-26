#![allow(non_snake_case)]

use chrono::NaiveDateTime;
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Clone, FromRow)]
pub struct Order {
    pub id: Option<u64>,
    pub order_number: String,
    pub order_status: u8,
    pub order_amount: Decimal,
    pub create_time: NaiveDateTime,
    pub update_time: NaiveDateTime,
    pub good_id: u64,
}

#[derive(Serialize, Deserialize, Clone, FromRow)]
pub struct OrderVO {
    pub id: Option<u64>,
    pub orderNumber: String,
    pub orderStatus: u8,
    pub orderAmount: Decimal,
    pub createTime: NaiveDateTime,
    pub updateTime: NaiveDateTime,
    pub goodId: u64,
}

#[derive(Deserialize)]
pub struct OrderUrlParams {
    pub id: Option<u64>,
}
