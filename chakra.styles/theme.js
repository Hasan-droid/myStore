import { extendTheme } from "@chakra-ui/react";
import { menuTheme } from "./menuTheme";

const theme = extendTheme({
  components: {
    Menu: menuTheme,
  },
});

export default theme;
