import React from "react";
import ReactDOM from "react-dom/client";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/index.js";
import "intro.js/introjs.css";
// import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: ,
//     errorElement: <ErrorPage />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
