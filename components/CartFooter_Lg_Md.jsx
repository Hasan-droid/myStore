import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import CheckOutModal from "./CheckOutModal";
import { CheckTokenExperimentData } from "./Header";
import { useDispatch } from "react-redux";
import { openModal } from "../Redux/features/LoginInSlicer";
export default function CartFooter_lg_md({ itemId, showImage, cartData, totalPrice, handleCheckOut }) {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("token");
  const pullDownFooter = () => {
    console.log("pullDownFooter", itemId);
    if (!itemId || !showImage.render) return 0;
    //find how many items remain in the cart that higher id than the current item

    const remainItems = cartData.filter((item) => item.id > itemId);
    return remainItems.length * 20 + 425;
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
