#![allow(non_snake_case)]

use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Serialize, Deserialize, Clone, FromRow)]
pub struct Pager {
    pub total: Option<i64>,
    pub pageNo: Option<u32>,
    pub pageSize: Option<u32>,
}

#[derive(Serialize, Deserialize)]
pub struct ListRes<T> {
    pub total: i64,
    pub pageNo: u32,
    pub pageSize: u32,
    pub list: Vec<T>,
}

#[derive(Serialize, Deserialize, FromRow)]
pub struct TotalRes {
    pub total: i64,
}
