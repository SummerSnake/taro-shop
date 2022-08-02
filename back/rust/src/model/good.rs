use serde::{Deserialize, Serialize};
use sqlx::{mysql::MySqlRow, FromRow, Row};

#[derive(Serialize, Deserialize, PartialEq, Clone)]
pub struct Good {
    id: u64,
    title: String,
    price: f64,
    img_url: String,
    description: String,
    category: String,
    category_id: u64,
    is_activity: u8,
    sales_valume: u64,
    image_list: String,
}

impl<'c> FromRow<'c, MySqlRow<'c>> for Good {
    fn from_row(row: &MySqlRow) -> Result<Self, sqlx::Error> {
        Ok(Good {
            id: row.get(0),
            title: row.get(1),
            price: row.get(2),
            img_url: row.get(3),
            description: row.get(5),
            category: row.get(6),
            category_id: row.get(7),
            is_activity: row.get(8),
            sales_valume: row.get(9),
            image_list: row.get(10),
        })
    }
}
