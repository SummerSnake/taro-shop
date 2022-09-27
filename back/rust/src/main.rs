use axum::{
    extract::Extension,
    routing::{get, post},
    Router,
};
use sqlx::mysql::MySqlPoolOptions;
use std::net::SocketAddr;
use taro_shop_rust::dao;

mod error;

async fn connect_success() -> &'static str {
    "Connect success!"
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    dotenv::dotenv().ok();
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL is not set.");

    let pool = MySqlPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("Cannot connect to database.");

    let routes = Router::new().nest(
        "/good",
        Router::new()
            .route("/add", post(dao::good_dao::add_good))
            .route("/update", post(dao::good_dao::update_good))
            .route("/delete/:id", post(dao::good_dao::delete_good))
            .route("/getGood/:id", get(dao::good_dao::get_good_by_id)),
    );

    let app = Router::new()
        .route("/", get(connect_success))
        .nest("/api", routes)
        .layer(Extension(pool))
        .into_make_service_with_connect_info::<SocketAddr>();

    let addr = SocketAddr::from(([127, 0, 0, 1], 8081));
    println!("Serve running at http://{addr}");

    axum::Server::bind(&addr).serve(app).await.unwrap();
}
