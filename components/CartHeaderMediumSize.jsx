import React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";

export default function CartHeaderMediumSize() {
  return (
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
  );
}
