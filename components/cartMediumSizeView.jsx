import React from 'react'
import { Box, Grid, Image, Text, IconButton, Button } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

export default function cartMediumSizeView() {
    return (
        <>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Grid
                templateColumns="repeat(11, 1fr)"
                bg="white"
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
                transition="all 0.6s ease-in-out"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                // transition={{ duration: 0.5 }}
              >
                <Box
                  position="relative"
                  cursor="pointer"
                  onClick={() => handleShowImageForPhone(item.id)}
                >
                  <Image src={image} alt={title} boxSize={{ base: "50px", md: "75px" }} mr={4} />
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
                <IconButton
                  icon={<FaTrash />}
                  aria-label="Remove item"
                  ml="auto"
                  onClick={() => handleRemoveItem(id)}
                />
              </Grid>
            </motion.div>
          </AnimatePresence>
          {console.log("((((((showImage)))))", showImage)}
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
                  src={images[Math.floor(Math.random() * images.length)]}
                  alt={title}
                  boxSize={{ base: "250px", md: "400px" }}
                />
              </motion.Box>
            </AnimatePresence>
          )}
        </>
      );
}
