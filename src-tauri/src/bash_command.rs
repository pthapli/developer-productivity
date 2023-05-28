use std::process::Command;

#[tauri::command]
pub fn run_bash_command(bash_command: &str) -> String {
    println!("Running full script function");
    println!("COmmand valud below : -=.......");
    println!("{}", bash_command);
    // let bash_command = "ls /Users/pthapli/Desktop/scripts";

    let output = Command::new("sh")
        .arg("-c")
        .arg(bash_command)
        .output()
        .expect("Failed to execute command");

    if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        let stderr = String::from_utf8_lossy(&output.stderr);

        println!("Command executed successfully");
        println!("Stdout: {}", stdout);
        println!("Stderr: {}", stderr);
        return String::from(stdout);
    } else {
        let error_code = output.status.code().unwrap_or(-1);

        println!("Command failed with error code: {}", error_code);
        return String::from("Error in running command");
    }
}
