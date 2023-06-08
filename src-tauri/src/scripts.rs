#![allow(dead_code)]
#![allow(unused_variables)]

use std::process::Command;

pub struct ScriptData {
    port: u32,
}

pub fn run_bash_command(bash_command: &str) {}

#[tauri::command]
pub fn script_runner(name: &str, port: u32) -> String {
    println!("input received {} ", name);
    let return_value = match name {
        "my_sql" => String::from("my_sql bero"),
        "postgres" => String::from("postgres bero"),
        "free_port" => free_port(port),
        "full_script" => full_script("test_name"),
        _ => log_data(),
    };

    return_value
}

fn full_script(name: &str) -> String {
    println!("Running full script function");
    let bash_command = "git confi user.name";
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

fn log_data() -> String {
    let output = Command::new("echo")
        .arg("Nothing matched so I ran the echo command")
        .output()
        .unwrap();

    let output_vector = output.stdout;

    let output_result = String::from_utf8(output_vector);

    let return_value = match output_result {
        Ok(val) => val,
        Err(err) => String::from("Error when running script"),
    };

    return_value
}

fn run_my_sql_container() {
    println!("todo : Running my sql container script")
}

fn run_postgres_container() {
    println!("todo : Running postgres container script")
}

fn free_port(port: u32) -> String {
    let get_pid = Command::new("lsof").arg("-i").arg(":3000").output();

    let get_pid_ok = match get_pid {
        Ok(val) => val,
        Err(err) => panic!("Error when running get_pid"),
    };

    let std_out_value = get_pid_ok.stdout;
    let get_pid_response = String::from_utf8(std_out_value).unwrap();
    println!("BERO -> {}", get_pid_response);
    let splitted_res = get_pid_response.lines().last().unwrap_or_else(|| "Nope");

    let pid_vec: Vec<&str> = splitted_res.split_whitespace().collect();
    println!("pid _ ved{:?}", pid_vec);
    let pid = pid_vec.get(1).unwrap_or_else(|| &"no process");
    println!("splitted response {}", splitted_res);

    println!("PID {}", pid);

    let kill_command = Command::new("kill").arg("-9").arg(pid).output().unwrap();
    println!("port to be killed -> {}", port);
    pid.to_string()
}
