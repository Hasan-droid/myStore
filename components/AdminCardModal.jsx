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
import { Form, useActionData, useSubmit } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminProductImage from "./AdminProductImage";
import addIcon from "../assets/images/pngtransparentaddimageiconthumbnail.png";
import LoadingScreen from "./LoadingScreen";
export default function AdminCardModal({ item, image, type }) {
  let inputFields = {
    item_name: { required: false },
    item_description: { required: false },
    item_price: { required: false },
    item_image: { required: false },
  };
  let errorReturn = {
    data: { state: false, type: "", message: { filed: "", price: "" }, filed: inputFields },
  };
  const submit = useSubmit();
  const { title, description, price } = item || {};
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemPrice, setItemPrice] = useState(price || 0);
  const [itemDescription, setItemDescription] = useState(description || "");
  const [itemName, setItemName] = useState(title || "");
  const [imageFile, setImageFile] = useState(image?.url ?? null);
  const [error, setError] = useState({ ...errorReturn.data });
  const [isLoading, setIsLoading] = useState(false);
  const dataFromActions = useActionData();
  const windowSize = useBreakpointValue({ base: "xs", md: "md", lg: "lg" });

  useEffect(() => {
    fillInitialState();
  }, [title]);

  useEffect(() => {
    if (dataFromActions?.data?.type === "add") {
      clearDataInputs();
      closeLoadingScreen();
    }
    if (dataFromActions?.data?.type === "edit") {
      closeLoadingScreen();
    }
  }, [dataFromActions?.data]);

  const resetError = () => {
    setError(errorReturn.data);
    setImageFile(null);
  };

  const clearDataInputs = () => {
    setTimeout(() => {
      setItemPrice("0");
      setItemDescription("");
      setItemName("");
      setImageFile(null);
    }, 1000);
  };

  const fillInitialState = () => {
    setItemName(title);
    setItemPrice(price ? price + "" : "0");
    setItemDescription(description);
  };

  const closeLoadingScreen = () => {
    setTimeout(() => {
      setIsLoading(false);
      //close the modal
      onClose();
    }, 750);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const checkInputFields = () => {
    let filedError = false;
    if (!itemName?.trim()) {
      errorReturn.data.filed.item_name.required = true;
      errorReturn.data.message.filed = "Filed Required";
      filedError = true;
    }
    if (!itemDescription?.trim()) {
      errorReturn.data.filed.item_description.required = true;
      errorReturn.data.message.filed = "Filed Required";
      filedError = true;
    }
    if (!itemPrice?.trim()) {
      errorReturn.data.filed.item_price.required = true;
      errorReturn.data.message.filed = "Filed Required";
      filedError = true;
    }
    if (parseFloat(itemPrice) <= 0) {
      errorReturn.data.filed.item_price.required = true;
      errorReturn.data.message.price = "Price must be greater than 0";
      filedError = true;
    }
    if (isNaN(parseFloat(itemPrice))) {
      errorReturn.data.filed.item_price.required = true;
      errorReturn.data.message.price = "Price must be a number";
      filedError = true;
    }

    if (!imageFile && !image?.url) {
      errorReturn.data.filed.item_image.required = true;
      errorReturn.data.message.filed = "Filed Required";
      filedError = true;
    }
    if (filedError) {
      setError(errorReturn.data);
      return false;
    }
    return true;
  };

  const handleAddNewItem = async () => {
    if (!checkInputFields()) return;
    const getImageInput = document.querySelector('input[name="item_image"]').files[0];
    const image = await convertBase64(getImageInput);
    setIsLoading(true);

    submit(
      {
        intent: "add 1",
        item_name: itemName,
        item_description: itemDescription,
        item_price: itemPrice,
        item_image: image,
      },
      { method: "post" }
    );
  };

  const handleEditItem = async () => {
    if (!checkInputFields()) return;
    const getImageInput = document.querySelector('input[name="item_image"]').files[0];
    let imageFile = "";
    if (getImageInput) imageFile = await convertBase64(getImageInput);
    setIsLoading(true);
    submit(
      {
        intent: "edit 1",
        id: item.id,
        item_name: itemName,
        item_description: itemDescription,
        item_price: itemPrice,
        item_image: imageFile,
        imageUrl: image.url,
      },
      { method: "post" }
    );
  };

  const handleCloseModal = () => {
    onClose();
    resetError();
    if (!image) clearDataInputs();
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
        <Button variant="ghost" colorScheme="green" {...(item && { onClick: onOpen })}>
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
      <Modal isOpen={isOpen} onClose={() => handleCloseModal()} size={windowSize} closeOnOverlayClick={false}>
        <Form method="post" id="product form" encType="multipart/form-data">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <LoadingScreen isLoading={isLoading} width={140} height={320} />
                <Grid
                  templateRows={{ base: "repeat(0, 1fr)", md: "repeat(1, 1fr)", lg: "repeat(1, 1fr)" }}
                  templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)", lg: "repeat(5, 1fr)" }}
                  gap={1}
                >
                  <GridItem
                    rowSpan={1}
                    colSpan={{ base: 5, md: 5, lg: 4 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    h="90%"
                  >
                    <AdminProductImage
                      image={image}
                      error={error}
                      setImageFile={setImageFile}
                      imageFile={imageFile}
                    />
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
                        {error.filed.item_name?.required === true ? error.message.filed : ""}
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
                      <FormErrorMessage>
                        {!itemPrice && error.message.filed}
                        {itemPrice && error.message.price}
                      </FormErrorMessage>
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
                    height={{ base: "2xs", md: "150px", lg: "xs" }}
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
                    {error.filed.item_description?.required ? error.message.filed : ""}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  handleCloseModal();
                }}
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
                  onClick={() => handleAddNewItem()}
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
                    onClick={() => handleEditItem()}
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
