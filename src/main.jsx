import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Header from "../components/Header.jsx";
import SignIn from "../components/SignIn.jsx";
import SignupCard from "../components/signup.jsx";
import CartPage from "../components/CartPage.jsx";
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
import OrdersPaginator from "../components/OrdersPaginator.tsx";
import OrdersLoader from "../routers.loaders/orders.loader.ts";
import InboxLoader from "../routers.loaders/Inbox.loader.ts";
import InboxAction from "../routers.Actions/Inbox.action.ts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    loader: InboxLoader,

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
        path: "/cart",
        element: <CartPage />,
        action: CartAction,
      },
      {
        path: "/orders",
        element: <OrdersPaginator itemsPerPage={8} />,
        loader: OrdersLoader,
      },
      {
        path: "/inbox",
        element: <OrdersPaginator itemsPerPage={8} />,
        loader: InboxLoader,
        action: InboxAction,
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
