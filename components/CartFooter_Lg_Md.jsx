import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";

export default function CartFooter_Lg_Md({ itemId, showImage, cartData, totalPrice, handleCheckOut }) {
  const pullDownFooter = () => {
    console.log("pullDownFooter", itemId);
    if (!itemId || !showImage.render) return 0;
    //find how many items remain in the cart that higher id than the current item

    const remainItems = cartData.filter((item) => item.id > itemId);
    return remainItems.length * 20 + 400;
  };
  return (
    <Flex
      //   w="100%"
      //   h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      //add some animation when margin top change
      transition="margin-top 0.5s ease-in-out"
      mt={pullDownFooter()}
      flexDirection="column"
    >
      <Text fontWeight="bold" fontSize="lg">
        Total: ${totalPrice}
      </Text>
      <Button
        colorScheme="teal"
        size="lg"
        onClick={() => {
          handleCheckOut();
        }}
      >
        Check out
      </Button>
    </Flex>
  );
}
