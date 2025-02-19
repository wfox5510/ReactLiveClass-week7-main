import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./router/router";
import store from "../store";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={createHashRouter(router)} />
  </Provider>
);
