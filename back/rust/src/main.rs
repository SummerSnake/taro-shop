use axum::{routing::post, Router};
use std::net::SocketAddr;
use taro_shop_rust::controller;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();

    let app = Router::new().nest(
        "/good",
        Router::new().route("/add", post(controller::good_controller::add_good)),
    );

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
