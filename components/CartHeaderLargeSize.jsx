import React from "react";
import { Box, Grid, Text, Heading } from "@chakra-ui/react";

export default function CartHeaderLargeSize() {
  return (
    <>
      <Heading as="h2" size="lg" mb={5} color={"brand.glaucous"}>
        Your Chart
      </Heading>
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
    </>
  );
}
