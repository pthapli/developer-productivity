import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Column } from "./components/wrappers/column";
import { SingleInput } from "./components/single-input";

import { useNavigate } from "react-router-dom";
import { emit, listen } from "@tauri-apps/api/event";
function App() {
  const [msg, setMsg] = useState("initial bero");

  //todo : make this dynamic as well
  async function freePort(port: number) {
    const response = await invoke("script_runner", { name: "free_port", port });
    setMsg(response as string);
  }

  /**
   * The first time the application is loaded, we start the clipboard listener
   * on the rust backend.
   * Then we set up an event listener on he backgroud in the Clipboard to
   * rerender the UI. eveytime a clipboard change is detected
   */

  useEffect(() => {
    invoke("start_clipboard_listener").then((res) => {
      console.log("Clipboard listener INVOKE function", res);
    });
  });

  useEffect(() => {
    const unlisten = listen("clipboard_event", (event) => {
      // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
      // event.payload is the payload object
      console.log("EVENT RECEIVED FROM THE BACKEND inside useEffect");
      console.log(event);
    }).then((res) => {
      console.log("EVENT RESPONSE ", res);
    });
  });

  const testHandleEvent = async () => {
    invoke("start_clipboard_listener").then((res) => {
      console.log("Clipboard listener INVOKE function", res);
    });
  };

  const navigate = useNavigate();

  return (
    <div className="menu-container row">
      <Column>
        <SingleInput
          buttonName="free port"
          inputName="port"
          handleClick={freePort}
        />
        <button
          onClick={() => {
            console.log("Navigating");
            navigate("/clipboard");
          }}
        >
          CLIPBOARD TABS
        </button>

        <button
          onClick={() => {
            navigate("/uuid");
          }}
        >
          UUID
        </button>

        <button onClick={testHandleEvent}>TEST</button>
      </Column>
    </div>
  );
}

export default App;
