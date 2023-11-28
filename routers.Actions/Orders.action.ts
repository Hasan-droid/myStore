import axios from "axios";
import { redirect } from "../node_modules/react-router-dom/dist/index";

interface ITypes {
  response: {
    state: number;
    type: string;
    message: string;
    data?: object[];
  };
}

export default async function ({ request, params }) {
  const formData = await request.formData();
  const { id } = Object.fromEntries(formData);
  const intent = formData.get("intent");
  let data: ITypes["response"];

  debugger;
  if (intent === "items") {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/inbox";
    await axios.get(`${BACKEND_URL}/${id}`).then((response) => {
      if (response.status == 200) {
        data = { state: 200, type: "items", message: "items fetched successfully", data: response.data };
      }
    });
  }
  return data;
}
