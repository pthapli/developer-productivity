use crate::storage;

#[tauri::command]
pub fn filesave() -> String {
    // println!("HI HOW ARE YOU");
    // storage::test_clipboard_data_to_file();
    // println!("Data was saved ");

    println!("Now we are trying to get that data back");
    storage::test_clipboard_file_to_data();
    "BERO ".to_string()

}
