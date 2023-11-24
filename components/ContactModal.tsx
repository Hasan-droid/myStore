import React, { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { Box, FormControl, FormLabel, FormErrorMessage, Input } from "@chakra-ui/react";
import { Form, useActionData, Link } from "react-router-dom";
import { useState } from "react";
import jwtDecode from "jwt-decode";

const ContactModal: React.FC = () => {
  interface ITypes {
    ActionData: {
      state: boolean;
      type: string;
      message: string;
      //make this optional
      filed?: {
        personName?: {
          required: boolean;
        };
        phoneNumber?: {
          required: boolean;
        };
        address?: {
          required: boolean;
        };
      };
    };
    tokenData: {
      name: string;
      email: string;
    };
  }
  interface actionDataType {
    data: ITypes["ActionData"];
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user: ITypes["tokenData"] = jwtDecode(token);
      setName(user.name);
    }
  }, []);
  const [name, setName] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  //declare this seperately to avoid rerendering
  const [error, setError] = useState<ITypes["ActionData"]>({
    state: false,
    type: "",
    message: "",
    filed: { personName: { required: false }, phoneNumber: { required: false }, address: { required: false } },
  });
  const dataFromAction = useActionData() as actionDataType; // Update the type of dataFromAction

  useEffect(() => {
    if (dataFromAction?.data.state === true && dataFromAction?.data.type === "Filed Required") {
      debugger;
      const data = dataFromAction.data;
      setError({ state: data.state, type: data.type, message: data.message, filed: data.filed });
    }
  }, [dataFromAction]);

  return (
    <>
      <Button colorScheme="teal" size="lg" onClick={onOpen}>
        Check out
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact Info</ModalHeader>
          <ModalCloseButton />
          <Form method="post">
            <ModalBody>
              <Box p={4}>
                <FormControl m={2} id="personName" isInvalid={error.filed?.personName?.required === true}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="personName"
                    value={name}
                    onChange={() => {
                      if (error.filed?.personName?.required === true) {
                        error.filed.personName.required = false;
                        setError({ ...error });
                      }
                    }}
                    // disabled={true}
                    readOnly={true}
                  />
                  <FormErrorMessage>
                    {error.filed?.personName?.required === true ? error.message : ""}
                  </FormErrorMessage>
                </FormControl>
                <FormControl m={2} id="phoneNumber" isInvalid={error.filed?.phoneNumber?.required === true}>
                  <FormLabel>phoneNumber</FormLabel>
                  <Input
                    type="number"
                    name="phoneNumber"
                    onChange={() => {
                      if (error.filed?.phoneNumber?.required === true) {
                        error.filed.phoneNumber.required = false;
                        setError({ ...error });
                      }
                    }}
                  />
                  <FormErrorMessage>
                    {error.filed?.phoneNumber?.required === true ? error.message : ""}
                  </FormErrorMessage>
                </FormControl>
                <FormControl m={2} id="phoneNumber" isInvalid={error.filed?.address?.required === true}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    name="address"
                    onChange={() => {
                      if (error.filed?.address?.required === true) {
                        error.filed.address.required = false;
                        setError({ ...error });
                      }
                    }}
                  />
                  <FormErrorMessage>
                    {error.filed?.address?.required === true ? error.message : ""}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" m={2} type="submit" value="create" name="intent">
                Make order
              </Button>
              <Button variant="ghost" colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactModal;