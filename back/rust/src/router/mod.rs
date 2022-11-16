use crate::handlers::{ad_handler, good_handler, home_handler, order_handler};
use axum::{
    routing::{get, post},
    Router,
};

pub fn routers() -> Router {
    Router::new()
        .nest("/api/good", good_routers())
        .nest("/api/order", order_routers())
        .nest("/api/ad", ad_routers())
        .nest("/api/home", home_routers())
}

fn good_routers() -> Router {
    Router::new()
        .route("/create", post(good_handler::create_good))
        .route("/update", post(good_handler::update_good))
        .route("/delete", post(good_handler::delete_good))
        .route("/info", get(good_handler::get_good_by_id))
        .route("/list", get(good_handler::get_goods_list))
}

fn order_routers() -> Router {
    Router::new()
        .route("/create", post(order_handler::create_order))
        .route("/update", post(order_handler::update_order))
        .route("/delete", post(order_handler::delete_order))
        .route("/info", get(order_handler::get_order_by_id))
        .route("/list", get(order_handler::get_orders_list))
}

fn ad_routers() -> Router {
    Router::new()
        .route("/create", post(ad_handler::create_ad))
        .route("/update", post(ad_handler::update_ad))
        .route("/delete", post(ad_handler::delete_ad))
        .route("/info", get(ad_handler::get_ad_by_id))
        .route("/list", get(ad_handler::get_ads_list))
}

fn home_routers() -> Router {
    Router::new().route("/data", get(home_handler::get_home_data))
}
