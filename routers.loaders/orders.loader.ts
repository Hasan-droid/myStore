import axios from "axios";
import jwtDecode from "jwt-decode";
interface ITypes {
  token: {
    email: string;
  };
}

export default async function OrdersLoader({ params }) {
  let data = {};
  const CARDS_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/cart/orders";
  const token = localStorage.getItem("token");
  let email: string = "";
  if (token !== null) {
    email = jwtDecode<ITypes["token"]>(token).email;
  }

  await axios
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
    });

  return data;
}
