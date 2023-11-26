import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Header from "../components/Header.jsx";
import SignIn from "../components/SignIn.jsx";
import SignupCard from "../components/signup.jsx";
import ChartII from "../components/CartPage.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import SignInAction from "../routers.Actions/SignIn.action.js";
import SignUpAction from "../routers.Actions/SignUp.action.js";
import CategoryLoader from "../routers.loaders/category.loader.js";
import store from "../Redux/store/store.js";
import CategoryAction from "../routers.Actions/Category.action.js";
import theme from "../chakra.styles/theme.js";
import CartAction from "../routers.Actions/Cart.action.ts";
import OrdersPaginator from "../components/OrdersPaginator.jsx";
import OrdersLoader from "../routers.loaders/orders.loader.js";
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
        action: CartAction,
      },
      {
        path: "/orders",
        element: <OrdersPaginator itemsPerPage={8} />,
        loader: OrdersLoader,
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
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
