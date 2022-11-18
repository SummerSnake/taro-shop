#![allow(non_snake_case)]

use serde::{Deserialize, Serialize};
use sqlx::FromRow;

/**
 * @desc 分页结构体
 */
#[derive(Serialize, Deserialize, Clone, FromRow)]
pub struct Pager {
    pub pageNo: Option<u32>,
    pub pageSize: Option<u32>,
}

/**
 * @desc 列表返回结构体
 */
#[derive(Serialize, Deserialize)]
pub struct ListRes<T> {
    pub total: i64,
    pub pageNo: u32,
    pub pageSize: u32,
    pub list: Vec<T>,
}

/**
 * @desc mysql 表数据总条数 返回结构体
 */
#[derive(Serialize, Deserialize, FromRow)]
pub struct TotalRes {
    pub total: i64,
}
