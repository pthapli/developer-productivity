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
import { ClipboardList } from "./components/clipboard/clipboard-main";
import ErrorPage from "./error-page";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/clipboard" element={<ClipboardList />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
