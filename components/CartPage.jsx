import { Box, Flex, Heading, IconButton, Image, Text, Button, Grid } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { emptyChart } from "../Redux/features/ChartSlicer";
import { useNavigate, useOutletContext, useActionData } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import {
  increaseItemQuantityByOne,
  decreaseItemQuantityByOne,
  removeItemFromCart,
} from "../Redux/features/ChartSlicer";
import CartMediumSizeView from "./cartMediumSizeView";
import CartSmallSizeView from "./CartSmallSizeView";
import { CheckTokenExperimentData } from "./Header";
import CartHeaderSmallSize from "./CartHeaderSmallSize";
import CartHeaderMediumSize from "./CartHeaderMediumSize";
import CartHeaderLargeSize from "./CartHeaderLargeSize";
import CartLargeSizeView from "./CartLargeSizeView";

const CartPage = ({ currentItems }) => {
  const [useBreakpointValue] = useOutletContext();
  //turn the useBreakpointValue into a function
  const images = [
    "https://m.media-amazon.com/images/I/81c6H2eE+kL._AC_UF1000,1000_QL80_.jpg",
    "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2022/12/15/Man-of-Steel.jpg",
    "https://m.media-amazon.com/images/M/MV5BMzM0MDUwMDU1MV5BMl5BanBnXkFtZTcwOTUyMjU1OQ@@._V1_.jpg",
  ];

  const cartData = JSON.parse(localStorage.getItem("state"))?.ChartData ?? [];

  const windowSize = useBreakpointValue({ base: "column", md: "720", lg: "lg" });
  console.log("ml ////////!!!!!!!!", windowSize);
  const [previewImage, setPreviewImage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantityState, setQuantityState] = useState(0);
  const [showImage, setShowImage] = useState({ render: false, id: null });
  //this state is to take the clicked item out of the cart.map
  const [itemId, setItemId] = useState(null);
  const [scaleFooterState, setScaleFooterState] = useState(false);
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

  const handleRemoveItem = (id) => {
    // remove item from cart
    const item = cartData.find((item) => item.id === id);
    removeItemFromCart(dispatch, item);
    setQuantityState(quantityState - 1);
  };

  const handlePreviewImage = (item) => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setPreviewImage(randomImage);
  };

  const handleQuantityIncrease = (id) => {
    const item = cartData.find((item) => item.id === id);
    increaseItemQuantityByOne(dispatch, item);
    setQuantityState(quantityState + 1);
    // setTotalPrice(totalPrice + updatedCartData.find((item) => item.id === id).price);
  };

  const handleQuantityDecrease = (id) => {
    const item = cartData.find((item) => item.id === id);
    decreaseItemQuantityByOne(dispatch, item);
    setQuantityState(quantityState - 1);
    // setTotalPrice(totalPrice - updatedCartData.find((item) => item.id === id).price);
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

  const pullDownFooter = () => {
    console.log("pullDownFooter", itemId);
    if (!itemId || !showImage.render) return 0;
    //find how many items remain in the cart that higher id than the current item
    if (windowSize === "720") {
      const remainItems = cartData.filter((item) => item.id > itemId);
      return remainItems.length * 20 + 400;
    }
  };
  //pull down the footer when the user click on the item to show the image
  // const scaleFooter = (itemId) => {
  //   const itemIdBeforeLastItem = cartData[cartData.length - 2].id;
  //   const itemIdLastItem = cartData[cartData.length - 1].id;
  //   if (itemIdBeforeLastItem <= itemId && itemId <= itemIdLastItem) {
  //     setScaleFooterState(true);
  //     return;
  //   }
  //   setScaleFooterState(false);
  // };
  //NOTE : checkout buuton had been used instaed of react router action because of the bug in the react router
  // whuch use not update the cart state when the user click on the checkout button
  const handleCheckOut = () => {
    debugger;
    const userToken = localStorage.getItem("token");
    if (CheckTokenExperimentData(userToken)) return navigate("/signin");
    const decodedToken = jwtDecode(userToken);
    if (!decodedToken.role) return navigate("/signin");
    const role = decodedToken.role;
    //check if the token expired
    if (role !== "user") return navigate("/signin");
    //run emptyLocalStorage action
    emptyChart(dispatch);
    //return data and invoke redirect function
    return navigate("/waterSpaces", { replace: true });
  };

  return (
    <Box maxW="100%" mt={8} px={4}>
      {!cartData && (
        //center the text in the middle of the Box

        <Box
          w="100%"
          h="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt="3%"
        >
          <Text fontSize="4xl" color={"gray.500"}>
            Your chart is empty
          </Text>
        </Box>
      )}
      <Flex direction={{ base: "column", md: "row" }}>
        <Box flex="2">
          {cartData && (
            <Heading as="h2" size="lg" mb={5}>
              Your Chart
            </Heading>
          )}

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
              images={images}
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
              images={images}
              totalPrice={totalPrice}
              handleCheckOut={handleCheckOut}
              // scaleFooter={scaleFooter}
            />
          )}

          {cartData &&
            cartData.map((item) => {
              const { id, title, image, category, price, quantity } = item;

              if (windowSize === "720") {
                return <Box onClick={() => setItemId(id)} key={id}></Box>;
              }
              if (windowSize === "column") {
                return <Box onClick={() => setItemId(id)} key={id}></Box>;
              }
            })}
        </Box>

        {/* {windowSize === "lg" && (
          <Box
            border="1px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flex="1"
            ml={{ base: "0", md: "100px" }}
          >
            {previewImage && <Image src={previewImage} alt="Preview" boxSize={{ base: "250px", md: "400px" }} />}
          </Box>
        )} */}
      </Flex>
      {/* {cartData && (windowSize === "lg" || windowSize === "720") && (
        //center the elements in the Box
        <Flex
          w="100%"
          h="100%"
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
      )} */}
      {/* {cartData && windowSize === "column" && (
        //center the elements in the Box
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
          // mt={pullDownFooter()}
          flexDirection="column"
        >
          <Text fontWeight="bold" fontSize="sm">
            Total: ${totalPrice}
          </Text>
          <Button
            colorScheme="teal"
            size="sm"
            onClick={() => {
              handleCheckOut();
            }}
          >
            Check out
          </Button>
        </Flex>
      )} */}
    </Box>
  );
};

export default CartPage;
