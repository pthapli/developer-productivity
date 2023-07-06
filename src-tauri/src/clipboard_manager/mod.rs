use std::error::Error;

pub fn copy_from_clipboard() -> String {
    "copied from inner module".to_string()
}

#[derive(Debug, Clone)]
pub struct Item {
    text: String,
}

