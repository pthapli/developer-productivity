import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Column } from "./components/wrappers/column";
import { SingleInput } from "./components/single-input";

import { useNavigate } from "react-router-dom";

function App() {
  const [msg, setMsg] = useState("initial bero");

  //todo : make this dynamic as well
  async function freePort(port: number) {
    const response = await invoke("script_runner", { name: "free_port", port });
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

        <button
          onClick={() => {
            navigate("/uuid");
          }}
        >
          UUID
        </button>
      </Column>
    </div>
  );
}

export default App;
