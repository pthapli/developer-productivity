#![allow(dead_code)]
#![allow(unused_variables)]
// use tauri::ClipboardManager;

use crate::clipboard_manager;
use crate::storage::{self, Data};
/**
*
* 1. Save the clipboard values to local storage
* 2.
*
*/

#[tauri::command]
pub fn get_clipboard_entries() -> Vec<String> {
    println!("Running mister clipper");

    return storage::get_last_10_items_from_clipboard();
    // return vec!["Hi".to_string(),"How are you".to_string()];
}

#[tauri::command]
pub fn save_bookmark(item: String) {
    println!("====================================");
    println!("SAVING BOOKMARK ->{}", item);
    println!("====================================");
    return storage::add_item_to_bookmark_list(item);
}

#[tauri::command]
pub fn delete_saved_bookmark(item: String) {
    println!("====================================");
    println!("DELETE BOOKMARK ->{}", item);
    println!("====================================");
    return storage::delete_item_from_bookmark_list(item);
}

#[tauri::command]
pub fn get_bookmark_list() -> Vec<String> {
    println!("====================================");
    println!("GETTING BOOKMARK LIST->");
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
