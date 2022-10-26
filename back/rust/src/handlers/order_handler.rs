use crate::config::{ListRes, Pager};
use crate::dtos::order_dto;
use crate::models::order::{OrderUrlParams, OrderVO};
use crate::response::ResVO;
use axum::http::StatusCode;
use axum::{extract::Query, response::IntoResponse, Json};

/**
 * @desc 创建订单
 */
pub async fn create_order(Json(payload): Json<OrderVO>) -> impl IntoResponse {
    let id = order_dto::create(payload).await;

    match id {
        Ok(id) => {
            if id == 0 {
                Json(ResVO::from_error(None, String::from("新增商品失败"), None))
            } else {
                Json(ResVO::<Option<()>>::from_result(None))
            }
        }
        Err(err) => {
            tracing::error!("Create_order: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}

/**
 * @desc 更新订单
 */
pub async fn update_order(Json(payload): Json<OrderVO>) -> impl IntoResponse {
    let id = payload.id.unwrap_or(0);
    if id == 0 {
        return Json(ResVO::from_error(
            Some(StatusCode::BAD_REQUEST.as_u16()),
            "缺少参数 id".to_string(),
            None,
        ));
    }

    let res = order_dto::update(payload).await;

    match res {
        Ok(_res) => Json(ResVO::<Option<()>>::from_result(None)),
        Err(err) => {
            tracing::error!("Update_order: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}

/**
 * @desc 删除订单
 */
pub async fn delete_order(Json(payload): Json<OrderUrlParams>) -> impl IntoResponse {
    let id = payload.id.unwrap_or(0);
    if id == 0 {
        return Json(ResVO::from_error(
            Some(StatusCode::BAD_REQUEST.as_u16()),
            "缺少参数 id".to_string(),
            None,
        ));
    }

    let res = order_dto::delete(id).await;

    match res {
        Ok(_res) => Json(ResVO::<Option<()>>::from_result(None)),
        Err(err) => {
            tracing::error!("Delete_order: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}

/**
 * @desc 通过 orderNumber 查询订单
 */
pub async fn get_order_by_id(Query(payload): Query<OrderUrlParams>) -> impl IntoResponse {
    let id = payload.id.unwrap_or(0);
    if id == 0 {
        return Json(ResVO::from_error(
            Some(StatusCode::BAD_REQUEST.as_u16()),
            "缺少参数 id".to_string(),
            None,
        ));
    }

    let res = order_dto::get_order_by_id(id).await;

    match res {
        Ok(_res) => Json(ResVO::<OrderVO>::from_result(Some(_res))),
        Err(err) => {
            tracing::error!("Get_order_by_id: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}

/**
 * @desc 查询商品列表
 */
pub async fn get_orders_list(Query(payload): Query<Pager>) -> impl IntoResponse {
    let order_list = order_dto::get_orders_list(Query(payload.clone())).await;
    let total = order_dto::get_orders_total().await;

    match order_list {
        Ok(_res) => {
            let res = ListRes {
                total: total.unwrap_or(0),
                pageNo: payload.pageNo.unwrap_or(1),
                pageSize: payload.pageSize.unwrap_or(10),
                list: _res,
            };

            Json(ResVO::<ListRes<OrderVO>>::from_result(Some(res)))
        }
        Err(err) => {
            tracing::error!("Get_orders_list: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}
