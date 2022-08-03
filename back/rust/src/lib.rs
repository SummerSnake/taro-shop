use crate::dao::Database;
use std::sync::{Arc, Mutex};

pub mod config;
pub mod dao;
pub mod model;

pub struct AppState<'a> {
    pub connections: Mutex<u32>,
    pub context: Arc<Database<'a>>,
}
