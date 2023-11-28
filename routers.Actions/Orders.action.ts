import axios from "axios";
import { redirect } from "../node_modules/react-router-dom/dist/index";

export default async function ({ request, params }) {
  const formData = await request.formData();
  const { id } = Object.fromEntries(formData);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/inbox";
  let data = {};
  await axios.get(`${BACKEND_URL}/${id}`).then((response) => {
    debugger;
    if (response.status == 200) data = response.data;
  });
  return { data: { state: 200, type: "items", message: "items fetched successfully", data: data } };
}
