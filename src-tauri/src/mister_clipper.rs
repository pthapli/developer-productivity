#![allow(dead_code)]
#![allow(unused_variables)]
// use tauri::ClipboardManager;

use crate::clipboard_manager;
use crate::storage::{self, write_to_file, Data};
/**
*
* 1. Save the clipboard values to local storage
* 2.
*
*/

#[tauri::command]
pub fn mister_clipper(text: &str) {
    // let copied_value = copy_from_clipboard();
    println!("BERO testing the copied value: {}", text);
    // println!("COPIED VALUE : {}",copied_value);
    // test_storage()
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
