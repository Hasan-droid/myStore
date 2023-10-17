import axios from "axios";
import { redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
const userSignInURL = import.meta.env.VITE_BACKEND_URL_CARDS + "/user/signin";
let status = {};
export default async function SignInaction({ request, params }) {
  //check if the user username and password is empty
  console.log("userSignInURL ", userSignInURL);
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  if (user.username === "" && user.password === "") {
    return { data: { state: true, type: "username and password field", message: "this filed is required" } };
  }
  if (user.username === "") {
    return { data: { state: true, type: "username field", message: "this filed is required" } };
  }
  if (user.password === "") {
    return { data: { state: true, type: "password field", message: "this filed is required" } };
  }
  try {
    const response = await axios.post(userSignInURL, user).then((res) => {
      const token = res.data?.token;
      const decodedToken = jwtDecode(token);
      if (!token)
        return {
          data: { state: true, type: "username and password field", message: "Invalid username or password" },
        };
      if (!decodedToken.role)
        return {
          data: { state: true, type: "username and password field", message: "Invalid username or password" },
        };
      console.log("res.data ", res.data);
      console.log("res.headers ", res.headers);
      if (res.status === 200) {
        if (decodedToken.role == "user" || decodedToken.role == "admin") {
          //decode token using and extract role
          const role = decodedToken.role;
          console.log("decodedToken ", decodedToken);

          status = { data: { state: 200, role: role, token: token } };
        }
      }
    });
  } catch (error) {
    console.log("error.response ", error);
    if (error.response.status === 401 || error.response.status === 404) {
      return { data: { state: true, type: "invalid", message: "Invalid username or password" } };
    }
    console.log(error.response);
  }
  console.log("status ", status);
  //redirect function won't work from the response of the server
  if (status?.data.state === 200) {
    if (status.data.role === "user" || status.data.role === "admin") {
      //save token in local storage
      localStorage.setItem("token", status.data.token);

      if (localStorage.getItem("state")) {
        return redirect("/chart");
      }
      return redirect("/");
    }
  }
  console.log("status ", status);
  return null;
}
