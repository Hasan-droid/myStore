import { redirect } from "react-router";
import jwtDecode from "jwt-decode";
import store from "../Redux/store/store";
import { emptyChart } from "../Redux/features/ChartSlicer";
//make instance of dispatch and export it from class

export default async function Chartaction() {
  const userToken = localStorage.getItem("token");
  if (!userToken) return redirect("/signin");
  const decodedToken = jwtDecode(userToken);
  if (!decodedToken.role) return redirect("/signin");
  const role = decodedToken.role;
  if (role !== "user") return redirect("/signin");
  //run emptyLocalStorage action
  emptyChart(store.dispatch);
  const data = { state: 200 };
  //return data and invoke redirect function
  return redirect("/", data);
}
