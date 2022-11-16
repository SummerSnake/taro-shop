use crate::db::mysql;
use crate::models::ad::Ad;
use sqlx::Error;

/**
 * @desc 查询通栏图片数据
 */
pub async fn get_banner_url() -> Result<String, Error> {
    let pool = mysql::get_pool().unwrap();
    let sql = "
        SELECT 
            * 
        FROM 
            `ad` 
        WHERE
            `type` = 2";

    let list = sqlx::query_as::<_, Ad>(sql).fetch_all(pool).await?;
    let mut banner_url = String::new();
    for ad in list {
        banner_url = ad.img_url;
    }

    Ok(banner_url)
}
