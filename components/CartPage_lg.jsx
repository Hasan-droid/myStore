import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Text, Image, IconButton, Button, Flex, Divider } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import CartHeaderLargeSize from "./CartHeader_lg";
import CartFooter_lg from "./CartFooter_lg";
import { useSize } from "@chakra-ui/react-use-size";

import ImageCartPreview from "./ImageCartPreview";

export default function CartLargeSizeView({
  cartData,
  handleShowImageForPhone,
  showImage,
  handleRemoveItem,
  handleQuantityDecrease,
  handleQuantityIncrease,
  totalPrice,
  handleCheckOut,
}) {
  const [previewImage, setPreviewImage] = useState("");
  const [itemId, setItemId] = useState(null);
  const [cardData, setCardData] = useState([]);
  // const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [refElement, setRefElement] = useState(null);
  const boxRef = useRef(null);
  const dimensions = useSize(boxRef);
  useEffect(() => {
    console.log("diminsionsII", dimensions);
  }, [dimensions]);
  console.log("boxRefII", dimensions);
  const handlePreviewImage = (image) => {
    setPreviewImage(image);
  };
  {
    console.log("cartData]]]]form cartPage_lg", cartData);
  }
  useEffect(() => {
    if (showImage.render) {
      window.scrollTo(0, 100);
    }
  }, [showImage]);

  useEffect(() => {
    window.scrollTo(0, 100);
  }, []);

  return (
    <Box
      minW="100%"
      mt={20}
      px={4}
      ml={"-10"}
      // zIndex={20}
    >
      <Flex>
        <Box flex="2" minW="950px" minH={"90vh"}>
          <Box mr={"6%"} ml={"6%"}></Box>

          <Box
            //scroll when items more than 6
            // eslint-disable-next-line react/prop-types
            // overflowY={cartData?.length > 3 ? "scroll" : "hidden"}
            // maxH="470px"
            ml={"7"}
            className="customeScrollBar"
          >
            <CartHeaderLargeSize />
            <Divider bg={"brand.glaucous"} minH={"0.4"} mb={"-0.5"} />
            <AnimatePresence>
              <motion.Box
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
              >
                {cartData.map((item) => {
                  console.log("looping throw items", item);
                  const { id, title, images, category, price, quantity } = item;
                  return (
                    <Grid
                      onClick={() => {
                        setCardData(item);
                        handleShowImageForPhone(id);
                        handlePreviewImage(images[0].url);
                        setItemId(id);
                        console.log("boxRef", refElement);
                      }}
                      key={id}
                      templateColumns="repeat(11, 1fr)"
                      gap={4}
                      bg={showImage.render && showImage.id === id ? "gray.400" : "white"}
                      p={2}
                      rounded="md"
                      shadow="md"
                      alignItems="center"
                      m={4}
                      _hover={{
                        bg: "gray.400",
                        transform: "scale(1.03)",
                        transition: "all 0.4s ease-in-out",
                      }}
                      transition="all 0.2s ease-in-out"
                    >
                      <Box position="relative" cursor="pointer">
                        <Image
                          src={images[0].url}
                          alt={title}
                          boxSize={{ base: "50px", md: "75px" }}
                          mr={1}
                          fit={"contain"}
                        />
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
                        <Box
                          border="1px"
                          p={2}
                          borderColor="black"
                          borderRadius="l"
                          display="inline-block"
                          onClick={(e) => e.stopPropagation()}
                        >
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
                        <Text fontSize="sm" color="gray.500">
                          ${price * quantity}
                        </Text>
                        <IconButton
                          icon={<FaTrash />}
                          aria-label="Remove item"
                          ml="auto"
                          onClick={(e) => handleRemoveItem(e, id)}
                        />
                      </Box>
                    </Grid>
                  );
                })}
              </motion.Box>
            </AnimatePresence>
            <Box mt={"10"}>
              <CartFooter_lg
                itemId={dimensions?.height}
                showImage={showImage}
                cartData={cartData}
                totalPrice={totalPrice}
                handleCheckOut={handleCheckOut}
              />
            </Box>
          </Box>
        </Box>
        <Box
          ref={boxRef}
          // height="400px"
          // display="flex"
          flex="2"
          alignItems="center"
          justifyContent="space-between"
          ml="100"
          mt="3%"
          minW="400px"
        >
          {showImage.render && showImage.id === itemId && (
            <AnimatePresence>
              <motion.Box
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ImageCartPreview
                  image={previewImage}
                  name={cardData.title}
                  description={cardData.description}
                  price={cardData.price}
                  setRefElement={setRefElement}
                />
              </motion.Box>
            </AnimatePresence>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
