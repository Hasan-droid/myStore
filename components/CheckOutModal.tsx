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
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../Redux/features/LoginInSlicer";
import jwtDecode from "jwt-decode";
import LoadingScreen from "./LoadingScreen";

interface ITypes {
  ActionData: {
    state: boolean | number;
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
  props: {
    size: string;
  };
}
interface actionDataType {
  data: ITypes["ActionData"];
}

const CheckOutModal: React.FC<ITypes["props"]> = ({ size }) => {
  const navigate = useNavigate();
  const selector = useSelector((state: any) => state.LoginInSlicer);
  const Dispatch = useDispatch();
  console.log("selector", selector);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user: ITypes["tokenData"] = jwtDecode(token);
      setName(user.name);
    }
  }, []);
  const [name, setName] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
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
      setLoading(false);
    }
    if (dataFromAction?.data.type === "order" && dataFromAction?.data.state === 200) {
      // onClose();
      setTimeout(() => {
        navigate("/orders");
      }, 1000);

      // setLoading(false);
    }
  }, [dataFromAction]);

  useEffect(() => {
    if (selector?.openModal === true) {
      onOpen();
    }
  }, [selector]);

  const handleClose = () => {
    Dispatch(closeModal());
    onClose();
  };

  return (
    <>
      <Button colorScheme="teal" size={size} onClick={onOpen}>
        Check out
      </Button>

      <Modal isOpen={isOpen} onClose={() => handleClose} closeOnOverlayClick={false} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact Info</ModalHeader>
          <ModalCloseButton />
          {loading && <LoadingScreen isLoading={loading} />}
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
              <Button
                colorScheme="teal"
                m={2}
                size={size}
                type="submit"
                value="create"
                name="intent"
                onClick={() => setLoading(true)}
              >
                Make order
              </Button>
              <Button
                variant="ghost"
                colorScheme="blue"
                mr={3}
                size={size}
                onClick={() => {
                  handleClose();
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckOutModal;
