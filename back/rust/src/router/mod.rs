use super::dao;
use axum::{
    routing::{get, post},
    Router,
};

pub fn routers() -> Router {
    Router::new().nest("/good", good_routers())
}

fn good_routers() -> Router {
    Router::new()
        .route("/add", post(dao::good_dao::add_good))
        .route("/update", post(dao::good_dao::update_good))
        .route("/delete/:id", post(dao::good_dao::delete_good))
        .route("/getGood/:id", get(dao::good_dao::get_good_by_id))
}
