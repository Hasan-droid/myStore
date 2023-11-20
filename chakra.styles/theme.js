import { extendTheme } from "@chakra-ui/react";
import { menuTheme } from "./menuTheme";

const theme = extendTheme({
  colors: {
    brand: {
      teaGreen: "#C6EBBE",
      glaucous: "#647AA3",
      ashGray: "#95B2B0",
    },
  },
});

export default theme;
