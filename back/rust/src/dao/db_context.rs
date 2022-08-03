use super::Good;
use sqlx::mysql::MySqlRow;
use sqlx::{FromRow, MySqlPool};
use std::sync::Arc;

pub struct Table<'r, T>
where
    T: FromRow<'r, MySqlRow>,
{
    pub pool: Arc<MySqlPool>,
    _from_row: fn(&MySqlRow) -> Result<T, sqlx::Error>,
}

impl<'r, T> Table<'r, T>
where
    T: FromRow<'r, MySqlRow>,
{
    fn new(pool: Arc<MySqlPool>) -> Self {
        Table {
            pool,
            _from_row: T::from_row,
        }
    }
}

pub struct Database<'c> {
    pub goods: Arc<Table<'c, Good>>,
}
impl Database<'_> {
    pub async fn new(sql_url: &str) -> Database<'_> {
        let pool = MySqlPool::new(sql_url).await.unwrap();
        let pool = Arc::new(pool);

        Database {
            goods: Arc::from(Table::new(pool.clone())),
        }
    }
}
