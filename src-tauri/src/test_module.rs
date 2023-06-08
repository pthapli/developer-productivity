// use std::process::Command;

#![allow(dead_code)]
#![allow(unused_variables)]

use std::process::Command;

#[tauri::command]
pub fn start_my_sql() -> String {
    format!("Using the format macro bero")
}

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Greetings from the my backend")
}

#[tauri::command]
pub fn ungreet() -> String {
    format!("Greetings from the bhau bero")
}

#[tauri::command]
pub fn run_test_script(name: &str) -> String {
    match name {
        "my_sql" => println!("my sql berl"),
        "postgres" => println!("postgres bero"),
        _ => println!("nope"),
    }
    let output = Command::new("echo").arg("Hello world").output().unwrap();

    // let out = output.stdout;
    println!("status {}", output.status);

    let output_vector = output.stdout;

    let output_array = output_vector.as_slice();

    let output_result = String::from_utf8(output_vector);

    let return_value = match output_result {
        Ok(val) => val,
        Err(err) => String::from("Error when running script"),
    };

    return_value
}
