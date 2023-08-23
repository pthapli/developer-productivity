#![allow(dead_code)]
#![allow(unused_variables)]
// use tauri::ClipboardManager;

use crate::clipboard_manager;
use crate::storage::{self, ClipboardItemData, Data};
/**
*
* 1. Save the clipboard values to local storage
* 2.
*
*/

#[tauri::command]
pub fn get_clipboard_entries() -> Vec<ClipboardItemData> {
    println!("Running mister clipper");

    return storage::get_last_10_items_from_clipboard();
}

#[tauri::command]
pub fn save_bookmark(item: ClipboardItemData) {
    println!("====================================");
    println!("SAVING BOOKMARK ->{:?}", item);
    println!("====================================");
    return storage::add_item_to_bookmark_list(item);
}

#[tauri::command]
pub fn delete_saved_bookmark(item: ClipboardItemData) {
    println!("====================================");
    println!("DELETE BOOKMARK ->{:?}", item);
    println!("====================================");
    return storage::delete_item_from_bookmark_list(item);
}

#[tauri::command]
pub fn get_bookmark_list() -> Vec<ClipboardItemData> {
    println!("====================================");
    println!("GETTING BOOKMARK LIST->");
    println!("====================================");
    return storage::get_bookmark_list();
}

#[tauri::command]
pub fn update_bookmark_context() -> Vec<ClipboardItemData> {
    println!("====================================");
    println!("UPDATING BOOKMARK CONTEXT->");
    println!("====================================");
    return storage::get_bookmark_list();
}

fn copy_from_clipboard() -> String {
    clipboard_manager::copy_from_clipboard()
}

//Testing the custom local database implementation
fn test_storage() {
    let data = Data::mock_new();
    println!("Value of struct is -> {:?}", data);
    // storage::write_to_file(, path)
    println!("Running clipboard logic");
    // write_to_file(data,"/Users/pthapli/Desktop/learning/rust/menu-bar/".to_string());
    let serialized_string_value = storage::serialize_struct(&data).unwrap();
    println!("serialized struct value : {:?}", serialized_string_value);
}
