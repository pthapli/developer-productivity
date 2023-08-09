import { useNavigate } from "react-router-dom";
import { Column } from "../wrappers/column";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { Row } from "../wrappers/row";
import { writeText } from "@tauri-apps/api/clipboard";

function UuidTab() {
  const navigate = useNavigate();

  const [uuid, setUUid] = useState("");
  const generateUuid = async () => {
    const response = await invoke("generate_uuid");
    console.log(response);
    writeText(response as string);
    setUUid(response as string);
  };

  useEffect;

  return (
    <div
      style={{
        position: "initial",
        padding: "200",
        // margin: "20px 50px 20px 20px",
      }}
    >
      <Column>
        <button onClick={() => navigate("/")}>Go back buddy</button>
        <button onClick={() => generateUuid()}>Generate UUID bero</button>
        <Row>
          <p>{uuid}</p>
        </Row>
      </Column>
    </div>
  );
}

export default UuidTab;
