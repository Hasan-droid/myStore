import React, { useEffect, useState } from "react";
import { Flex, Text, Button, Box } from "@chakra-ui/react";
import CheckOutModal from "./CheckOutModal";
import { CheckTokenExperimentData } from "./Header";
import { useDispatch } from "react-redux";
import { openModal } from "../Redux/features/LoginInSlicer";
export default function CartFooter_lg({ itemId, showImage, cartData, totalPrice, handleCheckOut }) {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("token");

  const pullDownFooter = () => {
    console.log("pullDownFooterLG", itemId);
    if (!itemId || !showImage.render) return 0;
    //find how many items remain in the cart that higher id than the current item

    let numberOfItems = cartData.length;
    while (numberOfItems < 4) {
      numberOfItems++;
    }
    const remainItems = numberOfItems * 130;
    let total = remainItems - itemId;
    console.log("itemId ", itemId, "remainItems", remainItems, "total", total);
    if (total < 0) return Math.abs(total);
  };

  return (
    <Flex
      w="99%"
      //   h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      // border={"50px solid black"}
      //add some animation when margin top change
      transition="margin-top 0.5s ease-in-out"
      // mt={pullDownFooter()}
      // mt={pullDownFooter()}
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
            dispatch(openModal());
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
