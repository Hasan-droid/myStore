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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Form, useActionData } from "react-router-dom";
import CustomToast from "./Toast";
import { useEffect, useState } from "react";

export default function CardModal({ item }) {
  console.log("item", item);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showToast, setShowToast] = useState(false);
  const [toastReceivedStatus, setToastReceivedStatus] = useState("");
  const [itemPrice, setItemPrice] = useState(item?.price || 0);
  const [itemDescription, setItemDescription] = useState(item?.description || "");
  const [itemName, setItemName] = useState(item?.title || "");
  const [error, setError] = useState({ state: false, type: "", message: "", filed: {} });
  const dataFromActions = useActionData();
  //count how many times this component is rendered
  const clearDataInputs = () => {
    setItemPrice(0);
    setItemDescription("");
    setItemName("");
  };

  useEffect(() => {
    if (dataFromActions?.data?.state === 200) {
      setShowToast(true);
      setToastReceivedStatus("success");
      if (dataFromActions?.data?.type === "add") {
        clearDataInputs();
      }
      setTimeout(() => {
        setShowToast(false);
      }, 100);
    } else if (dataFromActions?.data?.state === 400) {
      setShowToast(true);
      setToastReceivedStatus("error");
      setTimeout(() => {
        setShowToast(false);
      }, 100);
    }
    if (dataFromActions?.data?.state && dataFromActions?.data?.type === "Filed Required") {
      setError({
        state: true,
        type: dataFromActions?.data?.type,
        message: dataFromActions?.data?.message,
        filed: dataFromActions?.data?.filed,
      });
      console.log("data from actions", dataFromActions);
    }
  }, [dataFromActions]);

  return (
    <>
      {console.log("error", error)}
      {showToast && (
        <CustomToast
          receivedPosition="top"
          receivedStatus={toastReceivedStatus}
          receivedTitle={dataFromActions?.data.message}
        />
      )}
      {!item ? (
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
      ) : (
        <Button
          variant="ghost"
          //use this color #C6EBBE as colorScheme
          colorScheme="green"
          onClick={onOpen}
        >
          Edit
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <Form method="post">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Stack direction={["column", "row"]} spacing={["0px", "20px"]}>
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
                </Stack>
              </Box>
              <Box mt="8%">
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
              <Button colorScheme="red" mr={3} onClick={onClose} variant="ghost">
                Close
              </Button>
              {!item ? (
                <Button colorScheme="green" name="intent" value="add 1" type="submit" variant="ghost">
                  Add
                </Button>
              ) : (
                <>
                  <Input type="hidden" name="id" value={item.id} />
                  <Button colorScheme="green" name="intent" value="edit 1" type="submit" variant="ghost">
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
