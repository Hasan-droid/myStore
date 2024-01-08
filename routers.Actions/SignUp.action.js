import axios from "axios";

export default async function SignUpAction({ request, params }) {
  const signUpURL = import.meta.env.VITE_BACKEND_URL_CARDS + "/user/signup";
  let status = {};
  let errorData = {
    data: { state: true, type: "invalid", message: "something went wrong please try again later" },
  };
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  const bodyRequest = {
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username.toLowerCase(),
    password: user.password,
  };
  try {
    await axios.post(signUpURL, bodyRequest).then((res) => {
      if (res.status === 200) {
        console.log("res ", res);
        status = { status: res.status, data: res.data };
      }
    });
  } catch (error) {
    return errorData;
  }

  if (status.status === 200) {
    // const decodedToken = jwtDecode(status.data.token);
    // if (!decodedToken.role) {
    //   return errorData;
    // }
    // if (decodedToken.role === "user") {
    //   localStorage.setItem("token", status.data.token);
    //   if (cart?.CartData) {
    //     return redirect("/cart");
    //   }
    //   //save token in local storage
    //   //save the token in the axios header
    //   return redirect("/");
    // }
    // return redirect("/");
    return { data: { state: true, type: "signup-success", message: "Please Check your inbox" } };
  }
  return null;
}
