import axios from "axios";
import jwtDecode from "jwt-decode";
import { redirect } from "react-router-dom";
import { verifyAdmin } from "../components/Header";
interface ITypes {
  token: {
    email: string;
  };
}

export default async function OrdersLoader({ params }) {
  let data = {};
  const CARDS_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/cart/orders";
  const INBOX_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/cart/inbox";
  const token = localStorage.getItem("token");
  let email: string = "";
  if (token !== null) {
    email = jwtDecode<ITypes["token"]>(token).email;
  }

  {
    !verifyAdmin() &&
      (await axios
        .get(CARDS_URL, {
          params: { email: email },
        })
        .then((res) => {
          console.log("loaders:::::::: ");
          return (data = { data: res.data, state: true });
        })
        .catch((err) => {
          console.log(err);
          return (data = { data: [err, "error in fetching data  from backend" + CARDS_URL], state: false });
        }));
  }
  {
    verifyAdmin() &&
      (await axios
        .get(INBOX_URL, {})
        .then((res) => {
          console.log("loaders:::::::: ");
          return (data = { data: res.data, state: true });
        })
        .catch((err) => {
          console.log(err);
          return (data = { data: [err, "error in fetching data  from backend" + CARDS_URL], state: false });
        }));
  }
  return data;
}
