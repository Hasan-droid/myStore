import axios from "axios";

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
  const token = localStorage.getItem("token");
  let data: ITypes["response"] = { state: 400, type: "error", message: "network error" };
  if (intent === "paginator") {
    debugger;
    const { itemsLength } = Object.fromEntries(formData);
    const INBOX_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/inbox";
    await axios
      .get(INBOX_URL, {
        params: { limit: 12, offset: itemsLength },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("res of more data", res);
        const newItems = res.data.orders;
        data = { state: 200, type: "paginator", message: "items fetched successfully", data: newItems };
      });
  }
  if (intent === "items") {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/inbox";
    await axios
      .get(`${BACKEND_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          data = { state: 200, type: "items", message: "items fetched successfully", data: response.data };
        }
      });
  }
  if (intent === "deliver") {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/inbox";
    const bodyRequest = {
      orderStatus: "on deliver",
    };
    await axios
      .put(
        `${BACKEND_URL}/${id}`,
        //body request and headers
        bodyRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          debugger;
          data = {
            state: 200,
            type: "deliver",
            message: "items fetched successfully",
            data: response.data.updatedOrder,
          };
        }
      });
  }

  if (intent === "delivered") {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/inbox";
    const bodyRequest = {
      orderStatus: "delivered",
    };
    await axios
      .put(`${BACKEND_URL}/${id}`, bodyRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          debugger;
          data = {
            state: 200,
            type: "deliver",
            message: "items fetched successfully",
            data: response.data.updatedOrder,
          };
        }
      });
  }
  return data;
}
