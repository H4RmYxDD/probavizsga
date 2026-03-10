import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllPizza from "./pages/AllPizza";
import ErrorPage from "./errors/ErrorPage";
import EditPizza from "./pages/EditPizza";
import OnePizza from "./pages/OnePizza";
import NewPizza from "./pages/NewPizza";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://dcac6a5b4d95c2f8683e70a5466d153c@o4510912042893312.ingest.de.sentry.io/4510912049315920",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllPizza />} />
        <Route path="/new-pizza" element={<NewPizza />} />
        <Route path="/pizza/:id" element={<OnePizza />} />
        <Route path="/edit/:id" element={<EditPizza />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>,
);
