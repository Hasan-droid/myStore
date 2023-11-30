/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Box, Grid, Image, Text, IconButton, Button } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@chakra-ui/react";
import { listenItemQuantity } from "../Redux/features/CartSlicer";
import { useDispatch } from "react-redux";
import CartHeader_sm from "./CartHeader_sm";
import CartFooter_sm from "./CartFooter_sm";

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
  totalPrice,
  handleCheckOut,
}) {
  const [scaleFooterState, setScaleFooterState] = useState(false);
  const scaleFooter = (itemId) => {
    const itemIdBeforeLastItem = cartData[cartData.length - 2].id;
    const itemIdLastItem = cartData[cartData.length - 1].id;
    if (itemIdBeforeLastItem <= itemId && itemId <= itemIdLastItem) {
      setScaleFooterState(true);
      return;
    }
    setScaleFooterState(false);
  };
  console.log("show Image", showImage);
  return (
    <>
      <CartHeader_sm />
      {cartData &&
        cartData.map((item) => {
          const { id, title, price, category, images, quantity } = item;

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
                    <Image src={images[0].url} alt={title} boxSize={{ base: "50px", md: "75px" }} mr={4} />
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
                    onClick={(e) => handleRemoveItem(e, id)}
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
                      src={images[0].url}
                      alt={title}
                      boxSize={{ base: "200px" }}
                      //i want the position of the image to not affect the other items
                      position="absolute"
                      zIndex="1"
                      fit={"contain"}
                    />
                  </motion.Box>
                </AnimatePresence>
              )}
            </>
          );
        })}
      <CartFooter_sm
        handleCheckOut={handleCheckOut}
        totalPrice={totalPrice}
        scaleFooterState={scaleFooterState}
        showImage={showImage}
      />
    </>
  );
}
