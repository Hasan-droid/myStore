/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Grid, Image, Text, IconButton, Button } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import CartHeaderMediumSize from "./CartHeader_md";
import CartFooter_md from "./CartFooter_md";
export default function CartMediumSizeView({
  cartData,
  handleQuantityDecrease,
  handleQuantityIncrease,
  handleRemoveItem,
  showImage,
  handleShowImageForPhone,
  totalPrice,
  handleCheckOut,
}) {
  // useEffect(() => {}, [item]);
  const [itemId, setItemId] = useState(null);
  return (
    <>
      <CartHeaderMediumSize />
      {cartData.map((item) => {
        const { id, title, price, category, images, quantity } = item;
        {
          console.log("looping through cartData in CartMediumSizeView", item);
        }
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
                alignItems="center"
                mb={4}
                _hover={{
                  bg: "gray.400",
                  transform: "scale(1.01)",
                  transition: "all 0.2s ease-in-out",
                }}
                _active={{
                  bg: "gray.400",
                }}
                transition="all 0.5s ease-in-out"
                style={{
                  opacity: showImage.render && showImage.id !== id ? 0.7 : 1,
                  //only items with id greater than the current id will be transformed
                  transform: showImage.render && id > showImage.id ? "translateY(400px)" : "none",
                }}

                // onAnimationEnd={() => (true)}
                // transition={{ duration: 0.5 }}
              >
                <Box
                  position="relative"
                  cursor="pointer"
                  onClick={() => {
                    handleShowImageForPhone(id);
                    setItemId(id);
                  }}
                >
                  <Image src={images[0].url} alt={title} boxSize={{ base: "50px", md: "75px" }} mr={4} />
                </Box>
                <Box gridColumn="2 /5">
                  <Text fontWeight="bold">{title}</Text>
                  <Text fontSize="sm" color="gray.500" fontStyle="italic">
                    {category}
                  </Text>
                </Box>
                <Box gridColumn="5/7" testAlign="center">
                  <Text fontSize="sm" color="gray.500">
                    ${price}
                  </Text>
                </Box>
                <Box gridColumn="7/ 10">
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
                <Box gridColumn="10/11">
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
            </motion.div>

            {showImage.render && showImage.id === id && (
              //add some animation to the box
              <AnimatePresence>
                <motion.Box
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={images[0].url}
                    alt={title}
                    boxSize={{ base: "250px", md: "400px" }}
                    //i want the position of the image to not affect the other items
                    position="absolute"
                    zIndex="100"
                    fit={"contain"}
                  />
                </motion.Box>
              </AnimatePresence>
            )}
          </>
        );
      })}
      <CartFooter_md
        itemId={itemId}
        showImage={showImage}
        cartData={cartData}
        totalPrice={totalPrice}
        handleCheckOut={handleCheckOut}
      />
    </>
  );
}
