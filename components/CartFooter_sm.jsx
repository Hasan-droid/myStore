import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

export default function CartFooter_sm({ handleCheckOut, totalPrice, scaleFooterState, showImage }) {
  return (
    <Flex
      w="100%"
      h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={
        scaleFooterState && showImage.render
          ? { transform: "scale(0.9)", transition: "all 0.5s ease-in-out", opacity: "0.5" }
          : { transform: "scale(1)", transition: "all 0.5s ease-in-out" }
      }
      //prevent click on the Flex when the scaleFooter is true
      pointerEvents={scaleFooterState && showImage.render ? "none" : "auto"}
      //add some animation when margin top change
      transition="margin-top 0.5s ease-in-out"
      flexDirection="column"
    >
      <Text fontWeight="bold" fontSize="sm">
        Total: ${totalPrice}
      </Text>
      <Button
        colorScheme="teal"
        // color="brand.ashGray"
        size="sm"
        onClick={() => {
          handleCheckOut();
        }}
      >
        Check out
      </Button>
    </Flex>
  );
}
