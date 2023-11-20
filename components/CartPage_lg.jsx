import React, { useState } from "react";
import { Box, Grid, Text, Image, IconButton, Button, Flex } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import CartHeaderLargeSize from "./CartHeader_lg";
import CartFooter_Lg_Md from "./CartFooter_Lg_Md";

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
  const handlePreviewImage = (image) => {
    setPreviewImage(image);
  };

  return (
    <Box maxW="100%" mt={8} px={4}>
      <Flex>
        <Box flex="2">
          <CartHeaderLargeSize />
          {cartData.map((item) => {
            console.log("looping throw items", item);
            const { id, title, images, category, price, quantity } = item;
            return (
              <Grid
                onClick={() => {
                  handleShowImageForPhone(id);
                  handlePreviewImage(images[0].url);
                }}
                key={id}
                templateColumns="repeat(11, 1fr)"
                gap={4}
                bg={showImage.render && showImage.id === id ? "gray.400" : "white"}
                p={2}
                rounded="md"
                shadow="md"
                alignItems="center"
                mb={4}
                _hover={{
                  bg: "gray.400",
                  transform: "scale(1.03)",
                  transition: "all 0.4s ease-in-out",
                }}
                transition="all 0.2s ease-in-out"
              >
                <Box position="relative" cursor="pointer" onClick={() => setItemId(id)}>
                  <Image src={images[0].url} alt={title} boxSize={{ base: "50px", md: "75px" }} mr={1} />
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
                  <IconButton
                    icon={<FaTrash />}
                    aria-label="Remove item"
                    ml="auto"
                    onClick={() => handleRemoveItem(id)}
                  />
                </Box>
              </Grid>
            );
          })}
        </Box>
        <Box
          height="400px"
          display="flex"
          flex="1"
          alignItems="center"
          justifyContent="space-between"
          ml={{ base: "0", md: "100px" }}
        >
          {showImage.render && showImage.id === itemId && (
            <AnimatePresence>
              <motion.Box
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={previewImage}
                  alt="Preview"
                  boxSize={{ base: "250px", md: "400px" }}
                  //add some animation to image when show
                />
              </motion.Box>
            </AnimatePresence>
          )}
        </Box>
      </Flex>
      <CartFooter_Lg_Md
        itemId={null}
        showImage={showImage}
        cartData={cartData}
        totalPrice={totalPrice}
        handleCheckOut={handleCheckOut}
      />
    </Box>
  );
}
