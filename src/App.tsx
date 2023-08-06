import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { readText } from "@tauri-apps/api/clipboard";
import "./App.css";
import { Column } from "./components/wrappers/column";
import { SingleInput } from "./components/single-input";
import { Row } from "./components/wrappers/row";
import { BashInput } from "./components/bash-command-input";

import { listen } from "@tauri-apps/api/event";
import { Link, useNavigate } from "react-router-dom";
import { CurrentClipboard } from "./components/clipboard/CurrentClipboard";

function App() {
  const [msg, setMsg] = useState("initial bero");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    // setGreetMsg(await invoke("greet"));

    console.log("greet ran");
    try {
      const response = await invoke("greet", { name: "mister B2" });
      console.log({ response });
      setMsg(response as string);
    } catch (error) {
      console.log("error bero");
    }
  }

  //todo : make this dynamic as well
  async function freePort(port: number) {
    const response = await invoke("script_runner", { name: "free_port", port });
    setMsg(response as string);
  }

  async function startMySqlContainer() {
    const response = await invoke("script_runner", { name: "my_sql" });
    setMsg(response as string);
  }

  async function testFullCommand(port: number) {
    const response = await invoke("script_runner", {
      name: "full_script",
      port,
    });
    setMsg(response as string);
  }

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
      </Column>
    </div>
  );
}

export default App;
