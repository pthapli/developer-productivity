import { useNavigate } from "react-router-dom";
import Tab from "../tabs/Tab";
import Tabs from "../tabs/Tabs";
import { CurrentClipboard } from "./CurrentClipboard";
import { BookmarkClipboard } from "./BookmarkClipboard";

function ClipboardTab() {
  console.log("RENDERING ClipboardTab");
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>Go back buddy</button>
      <Tabs>
        <Tab title="Current Clipboard">
          <CurrentClipboard />
        </Tab>
        <Tab title="Saved Clipboard">
          <BookmarkClipboard />
        </Tab>
      </Tabs>
    </div>
  );
}

export default ClipboardTab;
