import React from "react";
import { Box, Image, Text, Flex, Grid } from "@chakra-ui/react";

interface Product {
  image: string;
  name: string;
  description: string;
  price: number;
}

const ImageCartPreview: React.FC<Product> = ({ image, name, description, price }) => {
  const headStyle = {
    fontStyle: "italic",
    color: "gray",
    fontWeight: "semibold",
    fontSize: "xl",
    mb: "2",
  };
  const infoStyle = {
    color: "black",
    fontSize: "lg",
    mb: "4",
    fontweight: "bold",
  };
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" shadow={"xl"}>
      <Image src={image} alt={name} boxSize={"sm"} fit={"contain"} />

      <Grid
        //3 rows and 2 columns
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
        p="6"
      >
        <Text //italic text style
          style={headStyle}
        >
          Product Name :
        </Text>
        <Text style={infoStyle}>{name}</Text>
        <Text style={headStyle}>Description :</Text>
        <Text color="gray.500" fontSize="sm" mb="4">
          {description}
        </Text>
        <Text style={headStyle}>Price</Text>
        <Text style={infoStyle}>${price}</Text>
      </Grid>
    </Box>
  );
};

export default ImageCartPreview;
