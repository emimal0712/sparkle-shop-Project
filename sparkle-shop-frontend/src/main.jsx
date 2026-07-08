import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { Provider } from "react-redux";
import store from "./redux/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./context/AuthContext";

import "./index.css";



ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <Provider store={store}>

      <AuthProvider>

          <App />

          <ToastContainer />

      </AuthProvider>

    </Provider>

  </React.StrictMode>
);