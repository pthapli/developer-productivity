import { createRouter } from "@remix-run/router";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import App from "./App";
import { CurrentClipboard } from "./components/clipboard/CurrentClipboard";
import ClipboardTab from "./components/clipboard/ClipboardTab";
import ErrorPage from "./error-page";
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
