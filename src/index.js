import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css"
import { HashRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Spinner from "../src/components/Spinner/Spinner.js";

import AOS from "aos";
import "aos/dist/aos.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import { AdminProvider } from "./context/AdminContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

AOS.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <HashRouter>
        <AdminProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AdminProvider>
      </HashRouter>
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
