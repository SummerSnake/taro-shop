#![allow(non_snake_case)]

use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Clone, Debug, FromRow)]
pub struct Order {
    pub id: Option<u64>,
    pub order_number: String,
    pub order_status: u8,
    pub order_amount: Decimal,
    pub create_time: DateTime<Utc>,
    pub update_time: DateTime<Utc>,
    pub good_ids: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, FromRow)]
pub struct OrderVO {
    pub id: Option<u64>,
    pub orderNumber: String,
    pub orderStatus: u8,
    pub orderAmount: Decimal,
    pub createTime: Option<DateTime<Utc>>,
    pub goodIds: String,
}

#[derive(Deserialize)]
pub struct OrderUrlParams {
    pub id: Option<u64>,
}
