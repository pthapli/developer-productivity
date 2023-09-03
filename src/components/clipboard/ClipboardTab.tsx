import { useNavigate } from "react-router-dom";
import Tab from "../tabs/Tab";
import Tabs from "../tabs/Tabs";
import { CurrentClipboard } from "./CurrentClipboard";
import { BookmarkClipboard } from "./BookmarkClipboard";
import { Column } from "../wrappers/column";
import { ScrollWrapper } from "../utility/wrapper";
import { useState } from "react";

function ClipboardTab() {
  console.log("RENDERING ClipboardTab");
  const navigate = useNavigate();
  const [showContext, setShowContext] = useState(false);
  const [contextValue, setContextValue] = useState("");
  return (
    <div
      style={{
        position: "initial",
        padding: "200",
      }}
    >
      <Column>
        <button onClick={() => navigate("/")}>Go back buddy</button>

        {showContext && <p>{contextValue}</p>}
        <Tabs>
          <Tab title="Current Clipboard">
            <ScrollWrapper>
              <CurrentClipboard />
            </ScrollWrapper>
          </Tab>
          <Tab title="Saved Clipboard">
            <ScrollWrapper>
              <BookmarkClipboard
                setContextValue={setContextValue}
                setShowContext={setShowContext}
              />
            </ScrollWrapper>
          </Tab>
        </Tabs>
      </Column>
    </div>
  );
}

export default ClipboardTab;
