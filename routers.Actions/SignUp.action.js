import axios from "axios";
import { redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default async function SignUpAction({ request, params }) {
  const signUpURL = import.meta.env.VITE_BACKEND_URL_CARDS + "/user/signup";
  let status = {};
  const inputFields = { firstname: "", lastname: "", username: "", password: "" };
  let errorData = {
    data: { state: true, type: "invalid", message: "something went wrong please try again later" },
  };
  let errorReturn = {
    data: { state: true, type: "Filed Required", message: "Filed Required", filed: inputFields },
  };
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let filedEmpty = false;

  if (user.firstname === "") {
    filedEmpty = true;
    errorReturn.data.filed.firstname = { required: true };
  }
  if (user.lastname === "") {
    filedEmpty = true;
    errorReturn.data.filed.lastname = { required: true };
  }
  if (user.username === "") {
    filedEmpty = true;
    errorReturn.data.filed.username = { required: true };
  } else if (!emailRegex.test(user.username)) {
    filedEmpty = true;
    errorReturn.data.filed.username = {
      required: true,
      formatMessage: "E-mail must be in format name@example.extesion",
    };
  }
  if (user.password === "") {
    filedEmpty = true;
    errorReturn.data.filed.password = { required: true };
  }
  if (filedEmpty) {
    return errorReturn;
  }
  console.log("out of error return");

  console.log("user ", user);
  const bodyRequest = {
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    password: user.password,
  };
  console.log("bodyRequest ", bodyRequest);
  try {
    await axios.post(signUpURL, bodyRequest).then((res) => {
      if (res.status === 200) {
        console.log("res ", res);
        status = { status: res.status, data: res.data };
      }
    });
  } catch (error) {
    console.log("server error", error);
    return errorData;
  }

  if (status.status === 200) {
    const decodedToken = jwtDecode(status.data.token);
    if (!decodedToken.role) {
      return errorData;
    }
    if (decodedToken.role === "user") {
      //save token in local storage
      localStorage.setItem("token", status.data.token);
      //save the token in the axios header
      return redirect("/");
    }
    // return redirect("/");
  }
  return null;
}
