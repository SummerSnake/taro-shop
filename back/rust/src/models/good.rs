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
