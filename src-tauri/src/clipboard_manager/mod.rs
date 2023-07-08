use clipboard::{ClipboardContext, ClipboardProvider};
use clipboard_master::{CallbackResult, ClipboardHandler, Master};

struct Handler;

impl ClipboardHandler for Handler {
    fn on_clipboard_change(&mut self) -> CallbackResult {
        println!("Clipboard changed happened bero");
        // get the data from the clipboard
        let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();

        let value_read_from_clipboard = ctx.get_contents().unwrap();
        println!("value_read_from_clipboard : {}",value_read_from_clipboard);
        // println!("VALUE READ FROM CLIPBOARD -> {:?}", ctx.get_contents().unwrap());

        //todo : save the data to local storage
        CallbackResult::Next
    }

    fn on_clipboard_error(&mut self, error: std::io::Error) -> CallbackResult {
        eprintln!("Error : Could not print to task");
        CallbackResult::Stop
    }
}

pub fn add_clipboard_copy_event_listener_handler() {
    println!("Running add_clipboard_copy_event_listener_handler");
    let _ = Master::new(Handler).run();

}

pub fn copy_from_clipboard() -> String {
    "copied from inner module".to_string()
}

#[derive(Debug, Clone)]
pub struct Item {
    text: String,
}
