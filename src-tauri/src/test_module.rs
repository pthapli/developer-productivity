// use std::process::Command;

#![allow(dead_code)]
#![allow(unused_variables)]

use std::process::Command;
#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Greetings from the my backend")
}
