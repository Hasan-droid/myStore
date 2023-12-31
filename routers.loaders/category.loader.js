import axios from "axios";

export default async function CategoryLoader({ params }) {
  let data = {};
  const CARDS_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/gallery";
  console.log("loader params", params.waterSpaces);
  // if (params.token === undefined) {
  //   console.log("redirect to signin");
  //   return redirect("/signin");
  // }

  await axios
    .get(CARDS_URL, {
      params: { limit: 8, offset: 0, page: params.waterSpaces },
    })
    .then((res) => {
      console.log("loaders:::::::: ");
      return (data = { data: res.data, state: true });
    })
    .catch((err) => {
      console.log(err);
      return (data = { data: [err, "error in fetching data  from backend" + CARDS_URL], state: false });
    });
  return data;
}
