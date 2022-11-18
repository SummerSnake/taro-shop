#![allow(non_snake_case)]

use super::{ad::AdVO, good::GoodVO};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct HomeVO {
    pub bannerUrl: String,
    pub swipperList: Vec<AdVO>,
    pub iconList: Vec<AdVO>,
    pub singleList: Vec<GoodVO>,
    pub goodsList: Vec<GoodVO>,
}
