import axios from "axios";
import jwtDecode from "jwt-decode";
import { redirect } from "react-router-dom";
import { verifyAdmin } from "../components/Header";
interface ITypes {
  token: {
    email: string;
  };
}

export default async function InboxLoader({ params }) {
  let data = {};
  const INBOX_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/inbox";
  const token = localStorage.getItem("token");
  let email: string = "";
  if (token !== null) {
    email = jwtDecode<ITypes["token"]>(token).email;
  }

  await axios
    .get(INBOX_URL, {})
    .then((res) => {
      console.log("loaders:::::::: ");
      return (data = { data: res.data, state: true });
    })
    .catch((err) => {
      console.log(err);
      return (data = { data: [err, "error in fetching data  from backend" + INBOX_URL], state: false });
    });

  return data;
}
