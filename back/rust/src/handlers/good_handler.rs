use crate::dtos::good_dto;
use crate::models::good::Good;
use crate::response::ResVO;
use axum::{extract::Path, response::IntoResponse, Json};

/**
 * @desc 创建商品
 */
pub async fn create_good(Json(payload): Json<Good>) -> impl IntoResponse {
    let good_id = good_dto::create(payload).await;

    match good_id {
        Ok(id) => {
            if id == 0 {
                Json(ResVO::from_error(String::from("新增商品失败"), None))
            } else {
                Json(ResVO::<Option<()>>::from_result(None))
            }
        }
        Err(err) => {
            tracing::error!("Create_good: {:?}.", err);

            Json(ResVO::from_error(err.to_string(), None))
        }
    }
}

/**
 * @desc 更新商品
 */
pub async fn update_good(Json(payload): Json<Good>) -> impl IntoResponse {
    let res = good_dto::update(payload).await;

    match res {
        Ok(_res) => Json(ResVO::<Option<()>>::from_result(None)),
        Err(err) => {
            tracing::error!("Update_good: {:?}.", err);

            Json(ResVO::from_error(err.to_string(), None))
        }
    }
}

/**
 * @desc 删除商品
 */
pub async fn delete_good(Path(id): Path<u64>) -> impl IntoResponse {
    let res = good_dto::delete(id).await;

    match res {
        Ok(_res) => Json(ResVO::<Option<()>>::from_result(None)),
        Err(err) => {
            tracing::error!("Delete_good: {:?}.", err);

            Json(ResVO::from_error(err.to_string(), None))
        }
    }
}

/**
 * @desc 通过 id 查询商品
 */
pub async fn get_good_by_id(Path(id): Path<u64>) -> impl IntoResponse {
    let res = good_dto::get_good_by_id(id).await;

    match res {
        Ok(_res) => Json(ResVO::<Good>::from_result(Some(_res))),
        Err(err) => {
            tracing::error!("Get_good_by_id: {:?}.", err);

            Json(ResVO::from_error(err.to_string(), None))
        }
    }
}
