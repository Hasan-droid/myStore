import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  Stack,
  GridItem,
  useBreakpointValue,
  Grid,
  Image,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Form, useActionData } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminProductImage from "./AdminProductImage";
import addIcon from "../assets/images/pngtransparentaddimageiconthumbnail.png";
import LoadingScreen from "./LoadingScreen";
export default function AdminCardModal({ item, image, type }) {
  //destructuring the item object
  const { title, description, price } = item || {};

  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("price", price);
  const [itemPrice, setItemPrice] = useState(price || 0);
  const [itemDescription, setItemDescription] = useState(description || "");
  const [itemName, setItemName] = useState(title || "");
  const [error, setError] = useState({ state: false, type: "", message: "", filed: {} });
  const [isLoading, setIsLoading] = useState(false);
  const dataFromActions = useActionData();
  const windowSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  //count how many times this component is rendered
  const clearDataInputs = () => {
    setItemPrice(0);
    setItemDescription("");
    setItemName("");
  };

  const fillInitialState = () => {
    setItemName(title);
    setItemPrice(price);
    setItemDescription(description);
  };

  useEffect(() => {
    fillInitialState();
  }, [title]);

  const closeLoadingScreen = () => {
    setTimeout(() => {
      setIsLoading(false);
      //close the modal
      onClose();
    }, 750);
  };

  useEffect(() => {
    if (dataFromActions?.data?.type === "add") {
      clearDataInputs();
      closeLoadingScreen();
    }
    if (dataFromActions?.data?.type === "edit") {
      closeLoadingScreen();
    }

    if (dataFromActions?.data?.state && dataFromActions?.data?.type === "Filed Required") {
      setIsLoading(false);
      setError({
        state: true,
        type: dataFromActions?.data?.type,
        message: dataFromActions?.data?.message,
        filed: dataFromActions?.data?.filed,
      });
      console.log("data from actions", dataFromActions);
      return;
    }
  }, [dataFromActions?.data]);

  const handleSubmit = () => {
    setIsLoading(true);
  };

  return (
    <>
      {type === "image" &&
        (image?.url ? (
          <Box cursor="pointer" onClick={onOpen} w={300} h={300}>
            <Image
              src={image?.url}
              alt={item?.title}
              boxSize={300}
              objectFit={"contain"}
              //circle the image radius
            />
          </Box>
        ) : (
          <Box cursor="pointer" onClick={onOpen}>
            <Image src={addIcon} alt={item?.title} />
          </Box>
        ))}

      {type === "edit" && (
        <Button
          variant="ghost"
          //use this color #C6EBBE as colorScheme
          colorScheme="green"
          {...(item && { onClick: onOpen })}
        >
          Edit
        </Button>
      )}
      {type === "add" && (
        <Box
          cursor="pointer"
          //add condition that fire the modal when the user is admin
          onClick={onOpen}
          _hover={{ transform: "scale(1.4)", transition: "all 0.2s ease-in-out" }}
          transition="all 0.2s ease-in-out"
          //change the color and the size of the icon when hovering
        >
          <AddIcon color="gray.500" fontSize="6xl" />
          <Text fontSize="xl" color="gray.500">
            Add new item
          </Text>
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size={windowSize} closeOnOverlayClick={false}>
        <Form method="post" id="product form" encType="multipart/form-data">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                {isLoading && <LoadingScreen isLoading={isLoading} />}
                <Grid
                  templateRows={{ base: "repeat(3, 1fr)", md: "repeat(1, 1fr)", lg: "repeat(1, 1fr)" }}
                  templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)", lg: "repeat(5, 1fr)" }}
                  gap={2}
                >
                  <GridItem
                    rowSpan={1}
                    colSpan={{ base: 5, md: 5, lg: 3 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <AdminProductImage image={image} error={error} />
                  </GridItem>

                  <GridItem
                    rowSpan={1}
                    colSpan={{ base: 3, md: 3, lg: 3 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    h={{ base: "0%", md: "30%", lg: "30%" }}
                  >
                    <FormControl isInvalid={error.filed.item_name?.required}>
                      <FormLabel>item name</FormLabel>
                      <Input
                        placeholder="item name"
                        name="item_name"
                        value={itemName}
                        onChange={(e) => {
                          setItemName(e.target.value);
                          error.filed.item_name.required = false;
                          setError({
                            type: "Filed Required",
                            message: "Filed Required",
                            filed: error.filed,
                          });
                        }}
                      />
                      <FormErrorMessage>
                        {error.filed.item_name?.required === true ? error.message : ""}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem
                    rowSpan={1}
                    colSpan={{ base: 3, md: 2, lg: 2 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    h={{ base: "0%", md: "35%", lg: "30%" }}
                  >
                    <FormControl isInvalid={error.filed.item_price?.required}>
                      <FormLabel>Price</FormLabel>
                      <NumberInput
                        name="item_price"
                        value={itemPrice}
                        onChange={(e) => {
                          setItemPrice(e);
                          error.filed.item_price.required = false;
                          setError({
                            type: "Filed Required",
                            message: "Filed Required",
                            filed: error.filed,
                          });
                        }}
                        allowMouseWheel
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage>{error.filed.item_price?.required ? error.message : ""}</FormErrorMessage>
                    </FormControl>
                  </GridItem>
                </Grid>
              </Box>
              <Box>
                <FormControl isInvalid={error.filed.item_description?.required}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder="Description"
                    type="text"
                    size="sm"
                    height="3xs"
                    name="item_description"
                    value={itemDescription}
                    onChange={(e) => {
                      setItemDescription(e.target.value);
                      error.filed.item_description.required = false;
                      setError({
                        type: "Filed Required",
                        message: "Filed Required",
                        filed: error.filed,
                      });
                    }}
                  />
                  <FormErrorMessage>
                    {error.filed.item_description?.required ? error.message : ""}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={onClose}
                name="intent"
                value="clear errors"
                variant="ghost"
              >
                Close
              </Button>
              {type === "add" && (
                <Button
                  colorScheme="green"
                  name="intent"
                  value="add 1"
                  onClick={() => handleSubmit()}
                  type="submit"
                  variant="ghost"
                >
                  Add
                </Button>
              )}
              {(type === "edit" || type === "image") && (
                <>
                  <Input type="hidden" name="id" value={item.id} />
                  <Input type="hidden" name="imageUrl" value={image?.url ?? ""} />
                  <Button
                    colorScheme="green"
                    name="intent"
                    value="edit 1"
                    onClick={() => handleSubmit()}
                    type="submit"
                    variant="ghost"
                  >
                    Edit
                  </Button>
                </>
              )}
            </ModalFooter>
          </ModalContent>
        </Form>
      </Modal>
    </>
  );
}
