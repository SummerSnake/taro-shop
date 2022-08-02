use actix_web::{web, App, HttpServer};
use taro_shop_rust::config::Config;

// #[actix_web::main]
// fn main() -> std::io::Result<()> {
fn main() {
    let config_file: &'static str = "config.json";
    let config: Config = Config::from_file(config_file);

    println!("Using configuration file from {:?}", config);
}
