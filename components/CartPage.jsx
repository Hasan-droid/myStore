import { Box, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import {
  increaseItemQuantityByOne,
  decreaseItemQuantityByOne,
  removeItemFromCart,
} from "../Redux/features/CartSlicer";
import CartMediumSizeView from "./CartPage_md";
import CartSmallSizeView from "./CartPage_sm";
import { CheckTokenExperimentData } from "./Header";
import CartLargeSizeView from "./CartPage_lg";

const CartPage = ({ currentItems }) => {
  const [useBreakpointValue] = useOutletContext();
  //turn the useBreakpointValue into a function
  const cartData = JSON.parse(localStorage.getItem("state"))?.CartData ?? [];

  const windowSize = useBreakpointValue({ base: "column", md: "720", lg: "lg" });
  console.log("ml ////////!!!!!!!!", windowSize);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showImage, setShowImage] = useState({ render: false, id: null });
  //this state is to take the clicked item out of the cart.map
  let temproryTotalPrice = 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //calculate the total price of the cart items and set it to the state totalPrice to render it in the UI
    if (cartData) {
      cartData.forEach((item) => {
        temproryTotalPrice += item.price * item.quantity;
      });
      setTotalPrice(temproryTotalPrice);
    }
  }, [cartData]);

  useEffect(() => {
    //scroll to the top of the page
    window.scrollTo(0, -200);
  }, []);
  const closeReviewImage = (id) => {
    if (id === showImage.id) {
      setShowImage({ render: false, id: null });
    }
  };

  const handleRemoveItem = (e, id) => {
    // remove item from cart
    e.stopPropagation();
    closeReviewImage(id);
    const item = cartData.find((item) => item.id === id);
    removeItemFromCart(dispatch, item);
  };

  const handleQuantityIncrease = (id) => {
    const item = cartData.find((item) => item.id === id);
    increaseItemQuantityByOne(dispatch, item);
  };

  const handleQuantityDecrease = (id) => {
    const item = cartData.find((item) => item.id === id);
    decreaseItemQuantityByOne(dispatch, item);
  };

  const handleShowImageForPhone = (id) => {
    //get the previous state of the showImage
    setShowImage((prevState) => {
      if (prevState.id !== id) {
        return { render: true, id: id };
        //exit
      }
      return { render: !showImage.render, id: id };
    });
  };

  const handleCheckOut = () => {
    const userToken = localStorage.getItem("token");
    //check if the token expired
    if (CheckTokenExperimentData(userToken)) return navigate("/signin");
    const decodedToken = jwtDecode(userToken);
    if (!decodedToken.role) return navigate("/signin");
    const role = decodedToken.role;
    if (role !== "user") return navigate("/signin");
  };

  return (
    <Box maxW="100%" mt={8} px={4}>
      {!cartData.length ? (
        //center the text in the middle of the Box

        <Box
          w="100%"
          h="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt="20%"
        >
          <Text fontSize="4xl" color={"gray.500"}>
            Your cart is empty
          </Text>
        </Box>
      ) : (
        <Flex direction={{ base: "column", md: "row" }}>
          <Box flex="2">
            {cartData && windowSize === "lg" && (
              <CartLargeSizeView
                cartData={cartData}
                handleShowImageForPhone={handleShowImageForPhone}
                showImage={showImage}
                handleRemoveItem={handleRemoveItem}
                handleQuantityIncrease={handleQuantityIncrease}
                handleQuantityDecrease={handleQuantityDecrease}
                totalPrice={totalPrice}
                handleCheckOut={handleCheckOut}
              />
            )}
            {cartData && windowSize === "720" && (
              <CartMediumSizeView
                cartData={cartData}
                // item={item}
                handleQuantityDecrease={handleQuantityDecrease}
                handleQuantityIncrease={handleQuantityIncrease}
                handleRemoveItem={handleRemoveItem}
                showImage={showImage}
                handleShowImageForPhone={handleShowImageForPhone}
                totalPrice={totalPrice}
                handleCheckOut={handleCheckOut}
              />
            )}
            {cartData && windowSize === "column" && (
              <CartSmallSizeView
                cartData={cartData}
                handleRemoveItem={handleRemoveItem}
                showImage={showImage}
                handleShowImageForPhone={handleShowImageForPhone}
                totalPrice={totalPrice}
                handleCheckOut={handleCheckOut}
                // scaleFooter={scaleFooter}
              />
            )}
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default CartPage;
