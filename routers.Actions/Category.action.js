import axios from "axios";
import { redirect } from "../node_modules/react-router-dom/dist/index";
export default async function CategoryAction({ request, params }) {
  debugger;
  const backEndURL = import.meta.env.VITE_BACKEND_URL_CARDS + "/gallery/";
  const formData = await request.formData();
  const intent = formData.get("intent");
  const card = Object.fromEntries(formData);
  let status = {};
  let filedEmpty = false;
  let inputFields = { item_name: "", item_description: "", item_price: 0 };
  let errorReturn = {
    data: { state: true, type: "Filed Required", message: "Filed Required", filed: inputFields },
  };
  if (intent === "add 1") {
    const adminToken = localStorage.getItem("token");
    console.log("card ", card);
    if (!card.item_name) {
      filedEmpty = true;
      errorReturn.data.filed.item_name = { required: true };
    }
    if (!card.item_description) {
      filedEmpty = true;
      errorReturn.data.filed.item_description = { required: true };
    }

    if (card.item_price === "0") {
      filedEmpty = true;
      errorReturn.data.filed.item_price = { required: true };
    }

    if (filedEmpty) {
      return errorReturn;
    }

    const bodyRequest = {
      name: card.item_name,
      description: card.item_description,
      price: card.item_price,
      category: document.location.pathname.split("/")[1],
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    };
    try {
      console.log("backEndURL ", backEndURL);
      //send request to backend with headers and body
      await axios.post(backEndURL, bodyRequest, { headers }).then((res) => {
        console.log("res.data ", res.data);
        console.log("res.headers ", res.headers);
        if (res.status === 200) {
          status = { data: { state: 200, message: "card added successfully" } };
        }
      });
    } catch (error) {
      console.log("error.response ", error.response.data.err);
      if (error.response.data.err.message === "jwt expired") {
        return redirect("/signin");
      }
      if (error.response.status === 401 || error.response.status === 404) {
        status = { data: { state: 400, type: "invalid", message: "something went wrong try again later" } };
      }
    }
    return status;
  }
  if (intent === "delete 1") {
    debugger;
    const adminToken = localStorage.getItem("token");
    const param = {
      id: formData.get("id"),
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    };
    try {
      console.log("backEndURL ", backEndURL);
      //send request to backend with headers and param id
      await axios.delete(backEndURL, { headers, params: param }).then((res) => {
        console.log("res.data ", res.data);
        console.log("res.headers ", res.headers);
        if (res.status === 200) {
          status = { data: { state: 200, message: "card deleted successfully" } };
        }
      });
    } catch (error) {
      console.log("error.response ", error);
      // if (error.response.data.err.message === "jwt expired") {
      //   return redirect("/signin");
      // }
      if (error.response.status === 401 || error.response.status === 404) {
        status = { data: { state: 400, type: "invalid", message: "something went wrong try again later" } };
      }
    }
    return status;
  }
}
