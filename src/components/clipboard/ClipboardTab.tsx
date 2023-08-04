import { useNavigate } from "react-router-dom";
import Tab from "../tabs/Tab";
import Tabs from "../tabs/Tabs";
import { CurrentClipboard } from "./CurrentClipboard";
import { BookmarkClipboard } from "./BookmarkClipboard";
import { Column } from "../wrappers/column";
import { ScrollWrapper } from "../utility/wrapper";

function ClipboardTab() {
  console.log("RENDERING ClipboardTab");
  const navigate = useNavigate();
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

        <Tabs>
          <Tab title="Current Clipboard">
            <ScrollWrapper>
              <CurrentClipboard />
            </ScrollWrapper>
          </Tab>
          <Tab title="Saved Clipboard">
            <ScrollWrapper>
              <BookmarkClipboard />
            </ScrollWrapper>
          </Tab>
        </Tabs>
      </Column>
    </div>
  );
}

export default ClipboardTab;
