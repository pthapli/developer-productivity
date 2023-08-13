use clipboard::{ClipboardContext, ClipboardProvider};
use clipboard_master::{CallbackResult, ClipboardHandler, Master};
use tauri::Window;

use crate::storage;

struct Handler {
    window: Window,
}

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

struct WindowObject<'a> {
    window: &'a Window,
}

impl Handler {
    fn bero(&self, window: &Window) {
        println!("Emitting clipboard_event from the backend");
        window
            .emit(
                "clipboard_event",
                Payload {
                    message: "Hey buddy".into(),
                },
            )
            .unwrap();
    }
}

impl Handler {}

impl ClipboardHandler for Handler {
    fn on_clipboard_change(&mut self) -> CallbackResult {
        println!("Clipboard changed happened bero");
        // get the data from the clipboard
        let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
        let value_read_from_clipboard = ctx.get_contents().unwrap();
        println!("value_read_from_clipboard : {}", value_read_from_clipboard);
        // println!("VALUE READ FROM CLIPBOARD -> {:?}", ctx.get_contents().unwrap());

        storage::write_item_to_clipboard_storage(value_read_from_clipboard);

        //todo : emit the event for the frontend to rerender the UI
        self.bero(&self.window);

        CallbackResult::Next
    }

    fn on_clipboard_error(&mut self, error: std::io::Error) -> CallbackResult {
        eprintln!("Error : Could not print to task");
        CallbackResult::Stop
    }
}

// fn test(window: &Window) {
//     println!("Emitting clipboard_event from the backend");
//     window
//         .emit(
//             "clipboard_event",
//             Payload {
//                 message: "Hey buddy".into(),
//             },
//         )
//         .unwrap();
// }

pub fn add_clipboard_copy_event_listener_handler(window: Window) {
    // let window_struct = WindowObject { window };
    // test(window);
    let _ = Master::new(Handler { window }).run();
}

pub fn copy_from_clipboard() -> String {
    "copied from inner module".to_string()
}

#[derive(Debug, Clone)]
pub struct Item {
    text: String,
}
