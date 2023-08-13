// use std::process::Command;

#![allow(dead_code)]
#![allow(unused_variables)]

use std::{process::Command, thread};

use tauri::Window;

use crate::clipboard_manager;
#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Greetings from the my backend")
}

#[tauri::command]
pub fn start_clipboard_listener(window: Window) -> String {
    println!("Ran the clipboard listener");
    thread::spawn(move || {
        clipboard_manager::add_clipboard_copy_event_listener_handler(window);
        println!("Clipboard manager setup done");
    });
    "bero".to_string()
}
