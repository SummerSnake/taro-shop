use crate::config::{ListRes, Pager};
use crate::dtos::good_dto;
use crate::models::good::{GoodUrlParams, GoodVO};
use crate::response::ResVO;
use axum::http::StatusCode;
use axum::{extract::Query, response::IntoResponse, Json};

/**
 * @desc 创建商品
 */
pub async fn create_good(Json(payload): Json<GoodVO>) -> impl IntoResponse {
    let good_id = good_dto::create(payload).await;

    match good_id {
        Ok(id) => {
            if id == 0 {
                Json(ResVO::from_error(None, String::from("新增商品失败"), None))
            } else {
                Json(ResVO::<Option<()>>::from_result(None))
            }
        }
        Err(err) => {
            tracing::error!("Create_good: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}

/**
 * @desc 更新商品
 */
pub async fn update_good(Json(payload): Json<GoodVO>) -> impl IntoResponse {
    let id = payload.id.unwrap_or(0);
    if id == 0 {
        return Json(ResVO::from_error(
            Some(StatusCode::BAD_REQUEST.as_u16()),
            "缺少参数 id".to_string(),
            None,
        ));
    }

    let affected_row = good_dto::update(payload).await;

    match affected_row {
        Ok(_affected_row) => {
            if _affected_row == 0 {
                Json(ResVO::from_error(None, String::from("商品不存在"), None))
            } else {
                Json(ResVO::<Option<()>>::from_result(None))
            }
        }
        Err(err) => {
            tracing::error!("Update_good: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}

/**
 * @desc 删除商品
 */
pub async fn delete_good(Json(payload): Json<GoodUrlParams>) -> impl IntoResponse {
    let id = payload.id.unwrap_or(0);
    if id == 0 {
        return Json(ResVO::from_error(
            Some(StatusCode::BAD_REQUEST.as_u16()),
            "缺少参数 id".to_string(),
            None,
        ));
    }

    let affected_row = good_dto::delete(id).await;

    match affected_row {
        Ok(_affected_row) => {
            if _affected_row == 0 {
                Json(ResVO::from_error(None, String::from("商品不存在"), None))
            } else {
                Json(ResVO::<Option<()>>::from_result(None))
            }
        }
        Err(err) => {
            tracing::error!("Delete_good: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}

/**
 * @desc 通过 id 查询商品
 */
pub async fn get_good_by_id(Query(payload): Query<GoodUrlParams>) -> impl IntoResponse {
    let id = payload.id.unwrap_or(0);
    if id == 0 {
        return Json(ResVO::from_error(
            Some(StatusCode::BAD_REQUEST.as_u16()),
            "缺少参数 id".to_string(),
            None,
        ));
    }

    let res = good_dto::get_by_id(id).await;

    match res {
        Ok(_res) => Json(ResVO::<GoodVO>::from_result(Some(_res))),
        Err(err) => {
            tracing::error!("Get_good_by_id: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}

/**
 * @desc 查询商品列表
 */
pub async fn get_goods_list(Query(payload): Query<Pager>) -> impl IntoResponse {
    let good_list = good_dto::get_list(Query(payload.clone())).await;
    let total = good_dto::get_total().await;

    match good_list {
        Ok(_res) => {
            let res = ListRes {
                total: total.unwrap_or(0),
                pageNo: payload.pageNo.unwrap_or(1),
                pageSize: payload.pageSize.unwrap_or(10),
                list: _res,
            };

            Json(ResVO::<ListRes<GoodVO>>::from_result(Some(res)))
        }
        Err(err) => {
            tracing::error!("Get_good_list: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}
