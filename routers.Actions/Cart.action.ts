import axios from "axios";
import { redirect } from "../node_modules/react-router-dom/dist/index";

export default async function ({ request, params }) {
  const backEndURL = import.meta.env.VITE_BACKEND_URL_CARDS;
  const formData = await request.formData();
  const intent = formData.get("intent");
  const entries = Object.fromEntries(formData);
  let emptyFiledFound = false;
  let inputFields = {
    personName: { required: false },
    phoneNumber: { required: false },
    address: { required: false },
  };
  let errorReturn = {
    data: { state: true, type: "Filed Required", message: "Filed Required", filed: inputFields },
  };
  const { personName, phoneNumber, address } = entries;
  if (intent === "create") {
    if (!personName) {
      emptyFiledFound = true;
      inputFields.personName.required = true;
    }
    if (!phoneNumber) {
      emptyFiledFound = true;
      inputFields.phoneNumber.required = true;
    }
    if (!address) {
      emptyFiledFound = true;
      inputFields.address.required = true;
    }
    if (emptyFiledFound) {
      return errorReturn;
    }
  }
}
