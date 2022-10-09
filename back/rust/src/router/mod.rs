use crate::handlers::good_handler;
use axum::{
    routing::{get, post},
    Router,
};

pub fn routers() -> Router {
    Router::new().nest("/good", good_routers())
}

fn good_routers() -> Router {
    Router::new()
        .route("/add", post(good_handler::create_good))
        .route("/update", post(good_handler::update_good))
        .route("/delete/:id", post(good_handler::delete_good))
        .route("/getGood/:id", get(good_handler::get_good_by_id))
}
