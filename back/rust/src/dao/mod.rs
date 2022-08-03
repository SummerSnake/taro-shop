use super::model::Good;

pub mod db_context;

mod good_dao;

pub type Database<'c> = db_context::Database<'c>;
pub type Table<'c, T> = db_context::Table<'c, T>;
