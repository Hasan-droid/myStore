import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Button,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { emptyChart } from "../Redux/features/ChartSlicer";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import {
  increaseItemQuantityByOne,
  decreaseItemQuantityByOne,
  removeItemFromCart,
} from "../Redux/features/ChartSlicer";
import { motion, AnimatePresence } from "framer-motion";
import CartMediumSizeView from "./cartMediumSizeView";

const CartPage = () => {
  const images = [
    "https://m.media-amazon.com/images/I/81c6H2eE+kL._AC_UF1000,1000_QL80_.jpg",
    "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2022/12/15/Man-of-Steel.jpg",
    "https://m.media-amazon.com/images/M/MV5BMzM0MDUwMDU1MV5BMl5BanBnXkFtZTcwOTUyMjU1OQ@@._V1_.jpg",
  ];
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const data = JSON.parse(localStorage.getItem("state"));
  const cartData = data?.ChartData;
  //let the useBreakpoint give size that less than the half of the row size

  const ml = useBreakpointValue({ base: "column", md: "720", lg: "lg" });
  console.log("ml ////////!!!!!!!!", ml);
  const [previewImage, setPreviewImage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantityState, setQuantityState] = useState(0);
  const [showImage, setShowImage] = useState({ render: false, id: null });
  const firstFieldRef = useRef(null);
  let temproryTotalPrice = 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartData) {
      cartData.forEach((item) => {
        temproryTotalPrice += item.price * item.quantity;
      });
      setTotalPrice(temproryTotalPrice);
    }
  }, [cartData]);

  useEffect(() => {
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

  const handlePopoverTrigger = () => {
    console.log("popover trigger");
  };

  const handleShowImageForPhone = (id) => {
    //get the previous state of the showImage
    debugger;
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
    if (!userToken) return navigate("/signin");
    const decodedToken = jwtDecode(userToken);
    if (!decodedToken.role) return navigate("/signin");
    const role = decodedToken.role;
    //check if the token expired
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) return navigate("/signin");
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

          {cartData && ml === "lg" && (
            <Grid templateColumns="repeat(11, 1fr)" gap={4} bg="white" p={2}>
              <Box gridColumn="1 /4" textAlign="left">
                <Text fontWeight="bold">Product</Text>
              </Box>
              <Box gridColumn="4 / 5">
                <Text fontWeight="bold">Price</Text>
              </Box>
              <Box gridColumn="6/10">
                <Text fontWeight="bold">Quantity</Text>
              </Box>
              <Box gridColumn="10 / 11">
                <Text fontWeight="bold">Total</Text>
              </Box>
            </Grid>
          )}
          {cartData && ml === "720" && (
            <Grid templateColumns="repeat(11, 1fr)" gap={4} bg="white" p={2}>
              <Box gridColumn="1 /5" textAlign="left">
                <Text fontWeight="bold">Product</Text>
              </Box>
              <Box gridColumn="5 / 7">
                <Text fontWeight="bold">Price</Text>
              </Box>
              <Box gridColumn="7/10">
                <Text fontWeight="bold">Quantity</Text>
              </Box>
              <Box gridColumn="10 / 11">
                <Text fontWeight="bold">Total</Text>
              </Box>
            </Grid>
          )}
          {cartData &&
            cartData.map((item) => {
              const { id, title, image, category, price, quantity } = item;

              if (ml === "lg") {
                return (
                  <Grid
                    key={id}
                    templateColumns="repeat(11, 1fr)"
                    gap={4}
                    bg="white"
                    p={2}
                    rounded="md"
                    shadow="md"
                    alignItems="center"
                    mb={4}
                    _hover={{
                      cursor: "pointer",
                      transform: "scale(1.03)",
                      transition: "all 0.4s ease-in-out",
                    }}
                    transition="all 0.2s ease-in-out"
                    onClick={() => handlePreviewImage(item)}
                  >
                    <Box position="relative">
                      <Image src={image} alt={title} boxSize={{ base: "50px", md: "75px" }} mr={1} />
                    </Box>

                    <Box gridColumn="2 /4">
                      <Text fontWeight="bold">{title}</Text>

                      <Text fontSize="sm" color="gray.500" fontStyle="italic">
                        {category}
                      </Text>
                    </Box>
                    <Box gridColumn="4 / 5">
                      <Text fontSize="sm" color="gray.500">
                        ${price}
                      </Text>
                    </Box>
                    <Box gridColumn="6/ 10">
                      <Box border="1px" p={2} borderColor="black" borderRadius="l" display="inline-block">
                        <Button size="xs" mr={2} onClick={() => handleQuantityDecrease(id)}>
                          -
                        </Button>
                        {quantity}

                        <Button size="xs" ml={2} onClick={() => handleQuantityIncrease(id)}>
                          +
                        </Button>
                      </Box>
                    </Box>
                    <Box gridColumn="10 / 11">
                      <IconButton
                        icon={<FaTrash />}
                        aria-label="Remove item"
                        ml="auto"
                        onClick={() => handleRemoveItem(id)}
                      />
                    </Box>
                  </Grid>
                );
              }
              if (ml === "720") {
                return (
                  <CartMediumSizeView
                    item={item}
                    handleQuantityDecrease={handleQuantityDecrease}
                    handleQuantityIncrease={handleQuantityIncrease}
                    handleRemoveItem={handleRemoveItem}
                    showImage={showImage}
                    handleShowImageForPhone={handleShowImageForPhone}
                    images={images}
                    key={id}
                  />
                );
              }
            })}
        </Box>

        {ml === "lg" && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flex="1"
            ml={{ base: "0", md: "100px" }}
          >
            {previewImage && <Image src={previewImage} alt="Preview" boxSize={{ base: "250px", md: "400px" }} />}
          </Box>
        )}
      </Flex>
      {cartData && (
        //center the elements in the Box
        <Flex
          w="100%"
          h="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt="3%"
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
      )}
    </Box>
  );
};

export default CartPage;
