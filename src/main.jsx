import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Chart from "../components/Chart.jsx";
import Header from "../components/Header.jsx";
import SignIn from "../components/SignIn.jsx";
import SignupCard from "../components/signup.jsx";
import ChartII from "../components/ChartII.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import SignInAction from "../routers.Actions/SignIn.action.js";
import SignUpAction from "../routers.Actions/SignUp.action.js";
import CategoryLoader from "../routers.loaders/category.loader.js";
import store from "../redux/store/store.js";
import CategoryAction from "../routers.Actions/Category.action.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,

    children: [
      {
        path: "/:waterSpaces",
        element: <App />,
        loader: CategoryLoader,
        action: CategoryAction,
      },
      {
        path: "/:candles",
        element: <App />,
        loader: CategoryLoader,
        action: CategoryAction,
      },
      {
        path: "/chart",
        element: <ChartII />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
    action: SignInAction,
  },
  {
    path: "/signup",
    element: <SignupCard />,
    action: SignUpAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
