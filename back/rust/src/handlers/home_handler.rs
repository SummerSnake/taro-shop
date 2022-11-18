use crate::config::Pager;
use crate::dtos::{ad_dto, good_dto, home_dto};
use crate::models::{ad::AdUrlParams, home::HomeVO};
use crate::response::ResVO;
use axum::{extract::Query, response::IntoResponse, Json};

/**
 * @desc 查询首页数据
 */
pub async fn get_home_data() -> impl IntoResponse {
    // 通栏广告
    let banner_url = home_dto::get_banner_url().await;
    let swipper_list = ad_dto::get_list(Query(AdUrlParams {
        id: None,
        r#type: Some(1),
    }))
    .await;
    // 导航入口
    let icon_list = ad_dto::get_list(Query(AdUrlParams {
        id: None,
        r#type: Some(3),
    }))
    .await;
    // 商品列表
    let goods_list = good_dto::get_list(Query(Pager {
        pageNo: None,
        pageSize: None,
    }))
    .await;

    match goods_list {
        Ok(_goods_list) => {
            let mut single_list = vec![];
            let mut goods_list = vec![];
            for good in _goods_list {
                match good.isActivity {
                    Some(1) => single_list.push(good),
                    _ => goods_list.push(good),
                }
            }

            let res = HomeVO {
                bannerUrl: banner_url.unwrap_or(String::new()),
                swipperList: swipper_list.unwrap_or(vec![]),
                iconList: icon_list.unwrap_or(vec![]),
                singleList: single_list,
                goodsList: goods_list,
            };

            Json(ResVO::<HomeVO>::from_result(Some(res)))
        }
        Err(err) => {
            tracing::error!("Get_good_list: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}
