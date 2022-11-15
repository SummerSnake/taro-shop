use crate::dtos::ad_dto;
use crate::models::ad::{AdUrlParams, AdVO};
use crate::response::ResVO;
use axum::http::StatusCode;
use axum::{extract::Query, response::IntoResponse, Json};

/**
 * @desc 创建广告
 */
pub async fn create_ad(Json(payload): Json<AdVO>) -> impl IntoResponse {
    let affected_row = ad_dto::create(payload).await;

    match affected_row {
        Ok(_affected_row) => {
            if _affected_row == 0 {
                Json(ResVO::from_error(None, String::from("创建广告失败"), None))
            } else {
                Json(ResVO::<Option<()>>::from_result(None))
            }
        }
        Err(err) => {
            tracing::error!("Create_ad: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}

/**
 * @desc 更新广告
 */
pub async fn update_ad(Json(payload): Json<AdVO>) -> impl IntoResponse {
    let id = payload.id.unwrap_or(0);
    if id == 0 {
        return Json(ResVO::from_error(
            Some(StatusCode::BAD_REQUEST.as_u16()),
            "缺少参数 id".to_string(),
            None,
        ));
    }

    let affected_row = ad_dto::update(payload).await;

    match affected_row {
        Ok(_affected_row) => {
            if _affected_row == 0 {
                Json(ResVO::from_error(None, String::from("广告不存在"), None))
            } else {
                Json(ResVO::<Option<()>>::from_result(None))
            }
        }
        Err(err) => {
            tracing::error!("Update_ad: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}

/**
 * @desc 删除广告
 */
pub async fn delete_ad(Json(payload): Json<AdUrlParams>) -> impl IntoResponse {
    let id = payload.id.unwrap_or(0);
    if id == 0 {
        return Json(ResVO::from_error(
            Some(StatusCode::BAD_REQUEST.as_u16()),
            "缺少参数 id".to_string(),
            None,
        ));
    }

    let affected_row = ad_dto::delete(id).await;

    match affected_row {
        Ok(_affected_row) => {
            if _affected_row == 0 {
                Json(ResVO::from_error(None, String::from("广告不存在"), None))
            } else {
                Json(ResVO::<Option<()>>::from_result(None))
            }
        }
        Err(err) => {
            tracing::error!("Delete_ad: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}

/**
 * @desc 通过 id 查询广告
 */
pub async fn get_ad_by_id(Query(payload): Query<AdUrlParams>) -> impl IntoResponse {
    let id = payload.id.unwrap_or(0);
    if id == 0 {
        return Json(ResVO::from_error(
            Some(StatusCode::BAD_REQUEST.as_u16()),
            "缺少参数 id".to_string(),
            None,
        ));
    }

    let ad = ad_dto::get_by_id(id).await;

    match ad {
        Ok(_ad) => Json(ResVO::<AdVO>::from_result(Some(_ad))),
        Err(err) => {
            tracing::error!("Get_ad_by_id: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}

/**
 * @desc 查询广告列表
 */
pub async fn get_ads_list(Query(payload): Query<AdUrlParams>) -> impl IntoResponse {
    let ad_list = ad_dto::get_list(Query(payload.clone())).await;

    match ad_list {
        Ok(_res) => Json(ResVO::<Vec<AdVO>>::from_result(Some(_res))),
        Err(err) => {
            tracing::error!("Get_ads_list: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}
