import React, { useEffect, useState } from "react";
import { Flex, Text, Button, Box } from "@chakra-ui/react";
import CheckOutModal from "./CheckOutModal";
import { CheckTokenExperimentData } from "./Header";
export default function CartFooter_lg({ itemId, showImage, cartData, totalPrice, handleCheckOut }) {
  const userToken = localStorage.getItem("token");
  return (
    <Flex
      w="99%"
      //   h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      //add some animation when margin top change
      transition="margin-top 0.5s ease-in-out"
      flexDirection="column"
    >
      <Text fontWeight="bold" fontSize="lg">
        Total: ${totalPrice}
      </Text>
      {CheckTokenExperimentData(userToken) && (
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => {
            handleCheckOut();
          }}
        >
          Check out
        </Button>
      )}
      {!CheckTokenExperimentData(userToken) && <CheckOutModal />}
    </Flex>
  );
}
