use uuid::Uuid;

#[tauri::command]
pub fn generate_uuid() -> String {
    println!("----------Running generate_uuid function---------------------");
    Uuid::new_v4().to_string()
}

