import React from "react";
import { Box, Grid, Text, Heading } from "@chakra-ui/react";

const phoneHeaderFontStyle = {
  fontSize: "0.75rem",
  fontWeight: "bold",
  color: "gray",
  "margin-left": "10px",
  "margin-bottom": "-5px",
};

const phoneHeaderFontStyle2 = {
  fontSize: "1.25rem",
  fontWeight: "bold",
  "margin-left": "10px",
  "margin-bottom": "5px",
  "margin-top": "10px",
  color: "brand.glaucous",
};

export default function CartHeader_sm() {
  return (
    <>
      <Heading
        as="h2"
        size="lg"
        mb={5} //destructure color from phoneHeaderFontStyle2
        color={phoneHeaderFontStyle2.color}
        style={phoneHeaderFontStyle2}
      >
        Your Cart
      </Heading>

      <Grid templateColumns="repeat(13, 1fr)" gap={4} bg="white" p={2}>
        <Box gridColumn="1 /8" textAlign="left">
          <Text style={phoneHeaderFontStyle}>Product</Text>
        </Box>
        <Box gridColumn="8 /11">
          <Text style={phoneHeaderFontStyle}>Price</Text>
        </Box>
        <Box gridColumn="11/12">
          <Text style={phoneHeaderFontStyle}>Quantity</Text>
        </Box>
        <Box gridColumn="12 / 13">
          <Text style={phoneHeaderFontStyle}>Total</Text>
        </Box>
      </Grid>
    </>
  );
}
