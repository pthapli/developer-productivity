// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(dead_code)]
#![allow(unused_variables)]

use tauri::{Manager, SystemTray, SystemTrayEvent, SystemTrayMenu};

use tauri_plugin_positioner::{Position, WindowExt};
mod scripts;
mod test_module;

mod bash_command;
use bash_command::run_bash_command;
use scripts::script_runner;
use test_module::{greet, start_my_sql, ungreet};

mod clipboard_manager;
mod mister_clipper;
mod storage;
use mister_clipper::get_bookmark_list;
use mister_clipper::mister_clipper;
use mister_clipper::save_bookmark;
mod filesave;
use filesave::filesave;
use std::thread;
use std::time::Duration;

fn main() {
    // let system_tray_menu = SystemTrayMenu::new();
    // std::env::set_var("RUST_BACKTRACE", "full");
    let quit = tauri::CustomMenuItem::new("quit".to_string(), "Quit").accelerator("Cmd+Q");
    let system_tray_menu = SystemTrayMenu::new().add_item(quit);

    //we start a separate thread on which we run the clipboard listener
    thread::spawn(|| {
        println!("Bhai bhai");
        clipboard_manager::add_clipboard_copy_event_listener_handler();
        println!("Clipboard manager setup done");
    });

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            ungreet,
            start_my_sql,
            script_runner,
            run_bash_command,
            mister_clipper,
            save_bookmark,
            get_bookmark_list,
            filesave
        ])
        .plugin(tauri_plugin_positioner::init())
        .system_tray(SystemTray::new().with_menu(system_tray_menu))
        .on_system_tray_event(|app, event| {
            //WRONG PLACE TO REGISTER THE CLIPBOARD MANAGER EVENT
            // println!("Bhai bhai");
            // clipboard_manager::add_clipboard_copy_event_listener_handler();
            // println!("Clipboard manager setup done");
            tauri_plugin_positioner::on_tray_event(app, &event);
            match event {
                SystemTrayEvent::LeftClick {
                    position: _,
                   size: _,
                    ..
                } => {
                    let window = app.get_window("main").unwrap();
                    // use TrayCenter as initial window position
                    let _ = window.move_window(Position::TrayCenter);
                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                }
                SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                    "quit" => {
                        std::process::exit(0);
                    }
                    _ => {}
                },
                _ => {}
            }
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::Focused(is_focused) => {
                if !is_focused {
                    event.window().hide().unwrap();
                }
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
