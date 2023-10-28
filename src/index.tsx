import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailPage from "./pages/detailspage/DetailPage";
import AddPage from "./pages/addpage/AddPage";
import { initialReservation } from "./pages/addpage/AddPage.types";

//creating Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  // {
  //   path: "/update/:id",
  //   element: <EditData />,
  // },
  {
    path: "/details",
    element: <DetailPage />,
  },
  {
    path: "/add",
    element: <AddPage {...initialReservation} />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
