import axios from "axios";
import { redirect } from "../node_modules/react-router-dom/dist/index";
import { CheckTokenExperimentData } from "../components/Header";
import jwtDecode from "jwt-decode";

export default async function ({ request, params }) {
  const backEndURL = import.meta.env.VITE_BACKEND_URL_CARDS + "/cart/";
  const formData = await request.formData();
  const intent = formData.get("intent");
  const entries = Object.fromEntries(formData);
  const userToken = localStorage.getItem("token");
  let emptyFiledFound = false;
  let inputFields = {
    personName: { required: false },
    phoneNumber: { required: false },
    address: { required: false },
  };
  interface ITypes {
    data: {
      state: boolean | number;
      type: string;
      message: string;
      filed?: object;
    };
  }
  let fieldsRequiredError: ITypes = {
    data: { state: true, type: "Filed Required", message: "Filed Required", filed: inputFields },
  };
  let returnedResponse: ITypes = {
    data: { state: false, type: "error", message: "network error", filed: {} },
  };
  if (CheckTokenExperimentData(userToken)) return redirect("/signin");
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
      return fieldsRequiredError;
    }
    const cartData = await localStorage.getItem("state");
    if (cartData !== null) {
      const items = await JSON.parse(cartData).ChartData;
      const decodedToken: any = jwtDecode(userToken);
      const { email } = decodedToken;
      const bodyRequest = {
        customer: {
          name: personName,
          phone: phoneNumber,
          address: address,
          email: email,
        },
        items: items,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      };
      try {
        await axios.post(backEndURL, bodyRequest, { headers }).then((res) => {
          if (res.status === 200) {
            // localStorage.removeItem("state");
            returnedResponse = { data: { state: 200, type: "success", message: "success" } };
          }
        });
      } catch (err) {
        console.log("error posting card", err);

        // returnedResponse = { data: { state: true, type: "error", message: "network error" } };
      }
      // console.log("bodyRequest", bodyRequest);
      return returnedResponse;
    }
  }
}
