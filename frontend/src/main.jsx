import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./redux/store.js"
import { Provider } from "react-redux"
import MainRouter from './MainRouter.jsx'
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import '@fontsource/zain';
import Footer from "./components/Footer.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <MainRouter />
      <Toaster />
    </BrowserRouter>    
  </Provider>
);
