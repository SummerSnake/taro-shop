#![allow(non_snake_case)]

use serde::{Deserialize, Serialize};
use sqlx::FromRow;

use super::{ad::AdVO, good::GoodVO};

#[derive(Serialize, Deserialize, Debug, Clone, FromRow)]
pub struct HomeVO {
    pub bannerUrl: String,
    pub swipperList: Vec<AdVO>,
    pub iconList: Vec<AdVO>,
    pub singleList: Vec<GoodVO>,
    pub goodsList: Vec<GoodVO>,
}
