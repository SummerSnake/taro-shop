use crate::handlers::{good_handler, order_handler};
use axum::{
    routing::{get, post},
    Router,
};

pub fn routers() -> Router {
    Router::new()
        .nest("/good", good_routers())
        .nest("/order", order_routers())
}

fn good_routers() -> Router {
    Router::new()
        .route("/create", post(good_handler::create_good))
        .route("/update", post(good_handler::update_good))
        .route("/delete", post(good_handler::delete_good))
        .route("/getGood", get(good_handler::get_good_by_id))
        .route("/getGoodList", get(good_handler::get_goods_list))
}

fn order_routers() -> Router {
    Router::new()
        .route("/create", post(order_handler::create_order))
        .route("/update", post(order_handler::update_order))
        .route("/delete", post(order_handler::delete_order))
        .route("/getOrder", get(order_handler::get_order_by_id))
        .route("/getOrderList", get(order_handler::get_orders_list))
}
