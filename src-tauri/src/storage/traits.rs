pub fn test_trait(){
    println!("Hello from traits module")
}


#[derive(Debug)]
struct DatabaseItem {
    id : String,
    name : String
}

pub trait Repository<TEntity> {
    fn get_all() ;
    fn get_single_item(name : &str)-> DatabaseItem;
    fn create(data : DatabaseItem)->DatabaseItem;
    fn update(data : DatabaseItem) -> Option<String>;
}
