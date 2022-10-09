use axum::http::StatusCode;
use serde::{de::DeserializeOwned, Deserialize, Serialize};

// 状态码
pub const CODE_SUCCESS: StatusCode = StatusCode::OK;
pub const CODE_FAIL: StatusCode = StatusCode::BAD_REQUEST;

#[derive(Debug, Deserialize, Serialize)]
pub struct ResVO<T> {
    pub code: u16,
    pub msg: String,
    pub data: Option<T>,
}

impl<T: DeserializeOwned + Serialize> ResVO<T> {
    pub fn from_result(data: Option<T>) -> Self {
        Self {
            code: CODE_SUCCESS.as_u16(),
            msg: "操作成功".to_string(),
            data,
        }
    }

    pub fn from_error(msg: String, data: Option<T>) -> Self {
        Self {
            code: CODE_FAIL.as_u16(),
            msg,
            data,
        }
    }
}
