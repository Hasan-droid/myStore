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
  Stack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Form, useActionData } from "react-router-dom";
import CustomToast from "./Toast";
import { useEffect, useState, useRef } from "react";

export default function CardModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showToast, setShowToast] = useState(false);
  const [toastReceivedStatus, setToastReceivedStatus] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const dataFromActions = useActionData();
  //count how many times this component is rendered
  const clearDataInputs = () => {
    const textArea = document.querySelector("textarea");
    const item_name = document.querySelector("input[name=item_name]");
    const item_price = document.querySelector("input[name=item_price]");
    if (!textArea || !item_price || !item_name) return;
    console.log("item price", item_price);
    textArea.value = "";

    //clear item_price numeric input
    //clear area-valuenow property from  item_price
    setItemPrice(0);
    item_name.value = "";
  };

  useEffect(() => {
    if (dataFromActions?.data?.state === 200) {
      setShowToast(true);
      setToastReceivedStatus("success");
      clearDataInputs();
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
  }, [dataFromActions]);

  return (
    <>
      {showToast && (
        <CustomToast
          receivedPosition="top"
          receivedStatus={toastReceivedStatus}
          receivedTitle={dataFromActions?.data.message}
        />
      )}
      <Box
        cursor="pointer"
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <Form method="post">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Stack direction={["column", "row"]} spacing={["0px", "20px"]}>
                  <FormControl>
                    <FormLabel>item name</FormLabel>
                    <Input placeholder="item name" name="item_name" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Price</FormLabel>
                    <NumberInput
                      name="item_price"
                      value={itemPrice}
                      onChange={(e) => setItemPrice(e)}
                      allowMouseWheel
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Stack>
              </Box>
              <Box mt="8%">
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea placeholder="Description" type="text" size="sm" height="3xs" name="item_description" />
                </FormControl>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="green" name="intent" value="add 1" type="submit">
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Modal>
    </>
  );
}
