
#![allow(dead_code)]
#![allow(unused_variables)]
use serde::{Serialize, Deserialize};
use std::fs::File;
mod traits;


#[derive(Serialize, Deserialize, Debug)]
struct Point {
    x: i32,
    y: i32,
}

#[derive(Debug,Serialize,Deserialize)]
pub struct Data{ 
    key: String,
    value : String,
}

impl Data{ 
    pub fn mock_new()->Data{ 
        Data{key : "test_key".to_string(),value : "test_value".to_string()}
    }

    pub fn new(&self,key: String,value : String)-> Data{ 
        Data{key,value}
    }
}


pub fn write_to_file(serialized_text : String,path : String) { 
    println!("Writing to a file ");

}

//Takes struct as an argument and returns the serialized value of that struct
pub fn serialize_struct(data : &Data) -> Option<String>{ 
    println!("serialize struct called");
    match serde_json::to_string(data) {
        Ok(string_value) => Some(string_value),
        Err(_) =>  {println!("Error when serializing the struct");None }
    }
}


//-----------------------------------new implementation below---------------
#[derive(Debug,Serialize, Deserialize)]
struct ClipboardData{ 
    my_vector: Vec<String>,
}

fn save_vector_to_file(data: &ClipboardData, filename: &str) -> Result<(), Box<dyn std::error::Error>> {
    let file = File::create(filename)?;
    let writer = std::io::BufWriter::new(file);

    serde_json::to_writer_pretty(writer, data)?;

    Ok(())
}

fn read_vector_from_file(filename: &str) -> Result<Vec<String>, Box<dyn std::error::Error>> {
    let file = File::open(filename)?;
    let reader = std::io::BufReader::new(file);

    let data: ClipboardData= serde_json::from_reader(reader)?;

    Ok(data.my_vector)
}

pub fn write_item_to_clipboard_storage(value : String){ 
    //first get the vector from the file
    let mut vec = read_vector_from_file("/Users/pthapli/Desktop/scripts/linux/output.json").unwrap();

    //append value to the vector
    vec.push(value);
    
    //save vector to file
    let clipboard_struct = ClipboardData{my_vector : vec};

     if let Err(err) = save_vector_to_file(&clipboard_struct, "/Users/pthapli/Desktop/scripts/linux/output.json") {
        eprintln!("Error saving vector to file: {}", err);
    } else {
        println!("Vector saved to file successfully!");
    }
}

//code test function to write data to a vector and save it to file 
pub fn test_clipboard_data_to_file(){
     let my_vector = vec!["Bhai ".to_string(),"Kaise ho bero".to_string()];
     let clipboard_struct = ClipboardData{my_vector};
     if let Err(err) = save_vector_to_file(&clipboard_struct, "/Users/pthapli/Desktop/scripts/linux/output.json") {
        eprintln!("Error saving vector to file: {}", err);
    } else {
        println!("Vector saved to file successfully!");
    }
}

//code test function to read the vector from the file
pub fn test_clipboard_file_to_data(){ 
    let vec = read_vector_from_file("/Users/pthapli/Desktop/scripts/linux/output.json").unwrap();
    println!("Vector is {:?}",vec);
}





