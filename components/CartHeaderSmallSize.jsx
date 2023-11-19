import React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";

const phoneHeaderFontStyle = {
  fontSize: "0.75rem",
  fontWeight: "bold",
  color: "gray",
  "margin-left": "10px",
  "margin-bottom": "-5px",
};

export default function CartHeaderSmallSize() {
  return (
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
  );
}
