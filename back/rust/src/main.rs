use sqlx::Error;
use std::net::SocketAddr;
use taro_shop_rust::{db, router};

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt::init();

    dotenv::dotenv().ok();

    db::mysql::init_db_pool().await?;

    let app = router::routers();

    let addr = SocketAddr::from(([127, 0, 0, 1], 8081));
    tracing::debug!("Serve running at http://{addr}");

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();

    Ok(())
}
