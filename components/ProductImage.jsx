import { AspectRatio, Box, Container, forwardRef, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import uploadImageIcon from "../assets/images/pngtransparentaddimageiconthumbnail.png";
import addIcon from "../assets/images/tranumberaddbuttonthumbnail.png";

const third = {
  rest: {
    scale: 1.1,
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    scale: 1.3,
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const PreviewImage = forwardRef((props, ref) => {
  return (
    <Box
      bg="white"
      top="0"
      height="100%"
      width="100%"
      position="absolute"
      borderWidth="1px"
      borderStyle="solid"
      rounded="sm"
      borderColor="gray.400"
      as={motion.div}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      // backgroundImage={`url("https://image.shutterstock.com/image-photo/paella-traditional-classic-spanish-seafood-600w-1662253543.jpg")`}
      {...props}
      ref={ref}
    />
  );
});

export default function ProductImage({ image }) {
  const [imageFile, setImageFile] = useState(null);
  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();

  const handleImageChange = (e) => {
    setImageFile(URL.createObjectURL(e.target.files[0]));
  };
  console.log("calling product image");
  return (
    <Container my="12" display="flex" justifyContent="center" alignItem="center" width="100%">
      <AspectRatio width="100%" ratio={1}>
        <Box
          borderColor="gray.300"
          borderStyle="dashed"
          borderWidth="2px"
          rounded="md"
          shadow="sm"
          role="group"
          transition="all 150ms ease-in-out"
          _hover={{
            shadow: "lg",
          }}
          as={motion.div}
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <Box position="relative" height="100%" width="100%">
            <Box
              position="absolute"
              //   top="0"
              //   left="0"
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column"
            >
              <Stack height="100%" width="100%" display="flex" alignItems="center" justify="center" spacing="4">
                <Box height="100%" width="100%" position="relative">
                  <PreviewImage
                    variants={third}
                    backgroundImage={image?.url ? image.url : imageFile ? imageFile : addIcon}
                    newprops="just checking in"
                  />
                </Box>
                {/* <Stack p="8" textAlign="center" spacing="1">
                  <Heading fontSize="sm" color="gray.700" fontWeight="bold">
                    Drop images here
                  </Heading>
                  <Text fontWeight="light">or click to upload</Text>
                </Stack> */}
              </Stack>
            </Box>
            <Input
              name="item_image"
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="image/*"
              onDragEnter={startAnimation}
              onDragLeave={stopAnimation}
              onChange={(e) => handleImageChange(e)}
            />
          </Box>
        </Box>
      </AspectRatio>
    </Container>
  );
}
