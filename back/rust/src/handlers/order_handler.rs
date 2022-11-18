use crate::config::ListRes;
use crate::dtos::{good_dto, order_dto};
use crate::models::order::{OrderListVO, OrderUrlParams, OrderVO};
use crate::response::ResVO;
use axum::http::StatusCode;
use axum::{extract::Query, response::IntoResponse, Json};

/**
 * @desc 创建订单
 */
pub async fn create_order(Json(payload): Json<OrderVO>) -> impl IntoResponse {
    let affected_row = order_dto::create(payload).await;

    match affected_row {
        Ok(_affected_row) => {
            if _affected_row == 0 {
                Json(ResVO::from_error(None, String::from("创建订单失败"), None))
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

    let affected_row = order_dto::update(payload).await;

    match affected_row {
        Ok(_affected_row) => {
            if _affected_row == 0 {
                Json(ResVO::from_error(None, String::from("订单不存在"), None))
            } else {
                Json(ResVO::<Option<()>>::from_result(None))
            }
        }
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

    let affected_row = order_dto::delete(id).await;

    match affected_row {
        Ok(_affected_row) => {
            if _affected_row == 0 {
                Json(ResVO::from_error(None, String::from("订单不存在"), None))
            } else {
                Json(ResVO::<Option<()>>::from_result(None))
            }
        }
        Err(err) => {
            tracing::error!("Delete_order: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}

/**
 * @desc 通过 id 查询订单
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

    let order = order_dto::get_by_id(id).await;

    match order {
        Ok(_order) => Json(ResVO::<OrderVO>::from_result(Some(_order))),
        Err(err) => {
            tracing::error!("Get_order_by_id: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}

/**
 * @desc 查询订单列表
 */
pub async fn get_orders_list(Query(payload): Query<OrderUrlParams>) -> impl IntoResponse {
    let order_list = order_dto::get_list(Query(payload.clone())).await;
    let total = order_dto::get_total().await;

    match order_list {
        Ok(_res) => {
            let mut order_vec = vec![];
            for order in _res {
                let goods_list = good_dto::get_order_related_list(Query(order.clone())).await;
                let order_list_vo = OrderListVO {
                    id: order.id,
                    orderNumber: order.orderNumber,
                    orderStatus: order.orderStatus,
                    orderAmount: order.orderAmount,
                    createTime: order.createTime,
                    goodIds: order.goodIds,
                    goodsList: goods_list.unwrap_or(vec![]),
                };

                order_vec.push(order_list_vo)
            }

            let res = ListRes {
                total: total.unwrap_or(0),
                pageNo: payload.pageNo.unwrap_or(1),
                pageSize: payload.pageSize.unwrap_or(10),
                list: order_vec,
            };

            Json(ResVO::<ListRes<OrderListVO>>::from_result(Some(res)))
        }
        Err(err) => {
            tracing::error!("Get_orders_list: {:?}.", err);

            Json(ResVO::from_error(None, err.to_string(), None))
        }
    }
}
