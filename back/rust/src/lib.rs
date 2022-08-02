use std::sync::{Arc, Mutex};

pub mod config;

pub struct AppState {
    pub connections: Mutex<u32>,
}
