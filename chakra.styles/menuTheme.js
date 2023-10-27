import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  list: {
    // this will style the MenuList component
    // py: "1",
    // borderRadius: "xl",
    // border: "none",
    bg: "blue.500",
    // size: "sm",
    border: "10px solid red",
    //make it smaller
    fontSize: "sm",
    lineHeight: "1.5",
    // p: "0.5rem",
    // m: "0.5rem",
    // w: "10rem",
    //make the minW to fit the content
    //small the size of the list
    // maxH: "10rem",
    // maxW: "1px",
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    // color: "gray.200",
    // border: "3px solid red",
    // w: "100%",
    // p: "1rem",
  },
});

export const menuTheme = defineMultiStyleConfig({
  baseStyle,
});
