use chrono::NaiveDateTime;
use rust_decimal::Decimal;
use serde::Deserialize;
use sqlx::FromRow;

#[derive(Clone, FromRow)]
pub struct Good {
    pub id: Option<u64>,
    pub order_number: String,
    pub order_status: u8,
    pub order_amount: Decimal,
    pub create_time: NaiveDateTime,
    pub update_time: NaiveDateTime,
    pub good_id: u64,
}

#[derive(Deserialize)]
pub struct OrderUrlParams {
    pub id: Option<u64>,
}
