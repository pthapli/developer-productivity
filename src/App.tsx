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
import { ClipboardList } from "./components/clipboard/clipboard-main";

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

  const handlePaste = async (event: any) => {
    const text = await readText();

    console.log("Pasted text : ", { text });
    // const response = await invoke("clipboard", {
    //   text,
    // });
    setMsg(response as string);
  };

  const handleFileSave = async () => {
    const response = await invoke("filesave");
    setMsg(response as string);
  };

  async function getClipboardData() {}

  //function to listen for clipboard copy evenrts and pass them to the backend
  async function listenToCopyEvent(event: any) {
    console.log("listenToCopy button pressed");
    // await listen("click", (event: any) => {
    //   console.log("CLICKED CALLED");
    // });
  }

  async function runBashCommand(command: string) {
    const response = await invoke("run_bash_command", {
      bashCommand: command,
    });
    setMsg(response as string);
  }

  const navigate = useNavigate();

  return (
    <div className="menu-container row">
      <Column>
        {msg}
        {/* <button onClick={greet}>bero press me</button>
          <button onClick={ungreet}>bero press ungreet</button>
          <button onClick={runTestScript}>mysql bero</button> */}
        {/* <button onClick={freePort}>Free Port</button> */}
        <SingleInput
          buttonName="free"
          inputName="port"
          handleClick={freePort}
        />
        <SingleInput
          buttonName="bero"
          inputName="test-one"
          handleClick={startMySqlContainer}
        />

        <>
          <button onClick={handlePaste}>Test Copy</button>
        </>

        <>
          <button onClick={handleFileSave}>Test File Save</button>
        </>

        <button
          onClick={() => {
            console.log("Navigating");
            navigate("/clipboard");
          }}
        >
          BERO PLIJ
        </button>
        <BashInput
          buttonName="Run bash command"
          inputName="test-bash-command"
          handleClick={runBashCommand}
        />
      </Column>
    </div>
  );
}

export default App;
