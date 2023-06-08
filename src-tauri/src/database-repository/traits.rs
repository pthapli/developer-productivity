#[derive(Debug)]
struct Database_item {
    id : String,
    name : String
}

pub trait Repository<TEntity> {
    fn get_all() ;
    fn get_single_item(name : &str)-> Database_item;
    fn create(data : Database_item)->Database_item;
    fn update(data : Database_item) -> Option<String>;
}
