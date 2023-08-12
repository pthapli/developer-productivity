import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ClipboardTab from "./components/clipboard/ClipboardTab";
import "./styles.css";
import UuidTab from "./components/uuid/uuid";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/clipboard" element={<ClipboardTab />} />
      <Route path="/uuid" element={<UuidTab />} />
    </Routes>
  </BrowserRouter>
);
