/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Box, Grid, Image, Text, IconButton, Button } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@chakra-ui/react";
import { listenItemQuantity } from "../Redux/features/ChartSlicer";
import { useDispatch } from "react-redux";
import CartHeaderSmallSize from "./CartHeaderSmallSize";

const ChangeQunatity = ({ quntity, item }) => {
  const [quantityState, setQuantityState] = useState(quntity);
  const dispatch = useDispatch();
  return (
    <Input
      padding="10px"
      value={quantityState}
      w="50px"
      textAlign="center"
      type="number"
      onChange={(e) => {
        setQuantityState(e.target.value);
      }}
      onBlur={() => {
        listenItemQuantity(dispatch, { clickedItem: item, quantity: quantityState });
      }}
    />
  );
};

export default function CartSmallSizeView({
  cartData,
  handleRemoveItem,
  showImage,
  handleShowImageForPhone,
  images,
  scaleFooter,
}) {
  console.log("show Image", showImage);
  return (
    <>
      <CartHeaderSmallSize />
      {cartData &&
        cartData.map((item) => {
          const { id, title, price, category, image, quantity } = item;

          // const [quantityState, setQuantityState] = useState(quantity);
          return (
            <>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
              >
                <Grid
                  templateColumns="repeat(11, 1fr)"
                  bg={showImage.render && showImage.id === id ? "gray.400" : "white"}
                  p={4}
                  rounded="md"
                  shadow="md"
                  zIndex="0"
                  alignItems="center"
                  mb={4}
                  transition="all 0.5s ease-in-out"
                  style={{
                    opacity: showImage.render && showImage.id !== id ? 0.7 : 1,
                    //only items with id greater than the current id will be transformed

                    transform: showImage.render && showImage.id !== id ? "scale(0.9)" : "scale(1)",
                    //prevent any item that apply this condition showImage.render && showImage.id !== id ? "scale(0.9)" : "scale(1)"
                    //from being clicked
                    pointerEvents: showImage.render && showImage.id !== id ? "none" : "auto",
                  }}

                  // onAnimationEnd={() => (true)}
                  // transition={{ duration: 0.5 }}
                >
                  <Box
                    size="0"
                    position="relative"
                    cursor="pointer"
                    border="1px solid black"
                    onClick={() => {
                      handleShowImageForPhone(id);
                      scaleFooter(id);
                    }}
                  >
                    <Image src={image} alt={title} boxSize={{ base: "50px", md: "75px" }} mr={4} />
                  </Box>
                  <Box gridColumn="2 /6" ml={2}>
                    <Text fontWeight="400" fontSize="sm" mb={0}>
                      {title}
                    </Text>
                    <Text fontSize="xs" color="gray.500" fontStyle="italic">
                      {category}
                    </Text>
                  </Box>
                  <Box gridColumn="6/8" testAlign="center">
                    <Text fontSize="xs" color="gray.500">
                      ${price}
                    </Text>
                  </Box>
                  <Box gridColumn="8/ 11">
                    <ChangeQunatity quntity={quantity} item={item} />
                  </Box>
                  <IconButton
                    icon={<FaTrash />}
                    aria-label="Remove item"
                    ml="auto"
                    onClick={() => handleRemoveItem(id)}
                  />
                </Grid>
              </motion.div>

              {showImage.render && showImage.id === id && (
                //add some animation to the box
                <AnimatePresence>
                  <motion.Box
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={images[Math.floor(Math.random() * images.length)]}
                      alt={title}
                      boxSize={{ base: "200px" }}
                      //i want the position of the image to not affect the other items
                      position="absolute"
                      zIndex="1"
                    />
                  </motion.Box>
                </AnimatePresence>
              )}
            </>
          );
        })}
    </>
  );
}
