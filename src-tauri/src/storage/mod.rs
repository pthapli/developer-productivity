
#![allow(dead_code)]
#![allow(unused_variables)]
use serde::{Serialize, Deserialize};

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





