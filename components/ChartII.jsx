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
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { emptyChart } from "../Redux/features/ChartSlicer";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";

const CartPage = () => {
  const data = JSON.parse(localStorage.getItem("state"));
  const cartData = data?.ChartData;
  const ml = useBreakpointValue({ base: "column", md: "row" });
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, -200);
  }, []);

  const handleRemoveItem = (id) => {
    // remove item from cart
  };

  const handlePreviewImage = (item) => {
    setPreviewImage(item.previewImage);
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
      <Heading as="h1" size="lg" mb={4}>
        Cart
      </Heading>
      <Flex direction={{ base: "column", md: "row" }}>
        <Box flex="1">
          {!cartData && (
            //center the elements in the Box
            <Box w="100%" h="100%" display="flex" justifyContent="center" alignItems="center" mt="10%">
              <Text fontSize="4xl" color={"gray.500"}>
                Your chart is empty
              </Text>
            </Box>
          )}
          {cartData &&
            cartData.map((item) => {
              const { id, title, image, category, price, quantity } = item;
              if (ml === "row") {
                return (
                  <Flex
                    key={id}
                    bg="white"
                    p={4}
                    rounded="md"
                    shadow="md"
                    alignItems="center"
                    mb={4}
                    _hover={{
                      bg: "gray.400",
                      cursor: "pointer",
                      transform: "scale(1.01)",
                      transition: "all 0.2s ease-in-out",
                    }}
                    _active={{
                      transform: "scale(0.99)",
                    }}
                    transition="all 0.2s ease-in-out"
                    onClick={() => handlePreviewImage(item)}
                  >
                    <Box position="relative">
                      <Image src={image} alt={title} boxSize={{ base: "50px", md: "75px" }} mr={4} />
                    </Box>
                    <Box>
                      <Text fontWeight="bold">{title}</Text>

                      <Text fontSize="sm" color="gray.500" fontStyle="italic">
                        {category}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        ${price} x {quantity}
                      </Text>
                    </Box>
                    <IconButton
                      icon={<FaTrash />}
                      aria-label="Remove item"
                      ml="auto"
                      onClick={() => handleRemoveItem(id)}
                    />
                  </Flex>
                );
              }

              if (ml === "column") {
                return (
                  <Popover
                    key={id}
                    // returnFocusOnClose={false}
                    // isOpen={isOpen}
                    // onClose={onClose}
                    strategy="fixed"
                    placement="bottom"
                    closeOnBlur={true}
                  >
                    <PopoverTrigger>
                      <Flex
                        bg="white"
                        p={4}
                        rounded="md"
                        shadow="md"
                        alignItems="center"
                        mb={4}
                        _hover={{
                          bg: "gray.400",
                          cursor: "pointer",
                          transform: "scale(1.01)",
                          transition: "all 0.2s ease-in-out",
                        }}
                        _active={{
                          transform: "scale(0.99)",
                        }}
                        transition="all 0.2s ease-in-out"
                        onClick={() => handlePreviewImage(item)}
                      >
                        <Box position="relative">
                          <Image src={image} alt={title} boxSize={{ base: "50px", md: "75px" }} mr={4} />
                        </Box>
                        <Box>
                          <Text fontWeight="bold">{title}</Text>
                          <Text fontSize="sm" color="gray.500" fontStyle="italic">
                            {category}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            ${price} x {quantity}
                          </Text>
                        </Box>
                        <IconButton
                          icon={<FaTrash />}
                          aria-label="Remove item"
                          ml="auto"
                          onClick={() => handleRemoveItem(id)}
                        />
                      </Flex>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Image src={image} alt={title} boxSize={{ base: "300px" }} mr={4} />
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                );
              }
            })}
        </Box>

        {ml === "row" && (
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
            Total: $27.97
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
