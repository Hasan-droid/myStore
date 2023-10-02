import { redirect } from "react-router-dom";
export default function HomeLoader({ request, params }) {
  if (params.token === undefined) {
    return redirect("/signin");
  }
  return null;
}
