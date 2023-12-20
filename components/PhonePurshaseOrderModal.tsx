import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Badge,
  Grid,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useActionData, Form, useSubmit } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { dataStyle, headerStyle, pagingStyle } from "./PhoneOrders";

const customerInfoStyle = {
  fontSize: "sm",
  p: -60,
};

const inboxDataStyle = {
  ...dataStyle,
  fontSize: "0.7rem",
};
interface ITypes {
  dataFromActions?: {
    state: number;
    type: string;
    data: {
      itemName: string;
      id: number;
      quantity: number;
      price: number;
      totalPrice: number;
    }[];
  };
  props: {
    order: {
      customerName?: string;
      id: number;
      createdAt: string;
      totalPrice: number;
      orderStatus: string;
      email?: string;
      address?: string;
      phoneNumber?: string;
    };
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
  };
}

const PhonePurchaseOrderModal: React.FC<ITypes["props"]> = ({ order, setLoading, isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [items, setItems] = React.useState<ITypes["dataFromActions"]>();
  const dataFromActions = useActionData() as ITypes["dataFromActions"];
  const total = items?.data.reduce((acc, product) => acc + product.totalPrice, 0);
  console.log("dataFromActions/orders", dataFromActions);
  const submit = useSubmit();

  useEffect(() => {
    if (dataFromActions?.state === 200 && dataFromActions.type === "items") {
      setItems(dataFromActions);
    }
    setTimeout(() => {
      setLoading(false);
    }, 750);
  }, [dataFromActions]);

  const handleClick = () => {
    submit({ id: order.id, intent: "items" }, { method: "post" });
    setLoading(true);
    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  const handleStartDelivery = () => {
    submit({ id: order.id, intent: "deliver" }, { method: "post" });
    setLoading(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleDelivery = () => {
    submit({ id: order.id, intent: "delivered" }, { method: "post" });
    setLoading(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <>
      <Tr
        key={order.id}
        cursor={"pointer"}
        _hover={{
          transform: "scale(1.001)",
          transition: "transform 0.5s",
          boxShadow: "xl",
          bg: "gray.100",
        }}
        onClick={() => handleClick()}
      >
        <Td style={inboxDataStyle}>{order.id}</Td>
        <Td style={inboxDataStyle}>{order.customerName}</Td>
        <Td style={inboxDataStyle}>
          {
            //format date
            new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "2-digit",
              month: "short",
              day: "numeric",
            })
          }
        </Td>
        <Td style={inboxDataStyle} minW={"40px"}>
          {order.totalPrice}
        </Td>
        <Td style={inboxDataStyle}>
          {order.orderStatus === "delivered" && (
            <Badge {...pagingStyle} color={"green"}>
              delivered
            </Badge>
          )}
          {order.orderStatus === "on deliver" && (
            <Badge {...pagingStyle} color={"blue"}>
              on deliver
            </Badge>
          )}
          {order.orderStatus === "rejected" && (
            <Badge {...pagingStyle} color={"red"}>
              rejected
            </Badge>
          )}
          {order.orderStatus === "pending" && (
            <Badge {...pagingStyle} color={"orange"}>
              pending
            </Badge>
          )}
        </Td>
      </Tr>
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"} closeOnOverlayClick={false}>
        <ModalOverlay />
        <Form method="post">
          <ModalContent>
            <ModalHeader fontSize={"sm"}>Purchase Order</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box borderWidth="1px" borderRadius="md" mb={4}>
                <Text fontWeight="bold" fontSize="sm" mb={2}>
                  Customer Information:
                </Text>
                <Grid //tow rows tow cloumns
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(2, 1fr)"
                >
                  <Text {...customerInfoStyle}>
                    <Text fontWeight="bold" display={"inline-block"}>
                      Name:
                    </Text>{" "}
                    {order.customerName}
                  </Text>
                  <Text {...customerInfoStyle}>
                    <Text fontWeight="bold" display={"inline-block"}>
                      Phone:
                    </Text>
                    {order.phoneNumber}
                  </Text>

                  <Text {...customerInfoStyle}>
                    <Text fontWeight="bold" display={"inline-block"}>
                      Address:{" "}
                    </Text>{" "}
                    {order.address}
                  </Text>
                  <Text {...customerInfoStyle}>
                    <Text
                      fontWeight="bold"
                      //dont make Text Block
                      display="inline-block"
                    >
                      Email:
                    </Text>{" "}
                    {order.email}
                  </Text>
                </Grid>
              </Box>

              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th style={headerStyle}>Product ID</Th>
                    <Th style={headerStyle}>Product Name</Th>
                    <Th style={headerStyle}>Quantity</Th>
                    <Th style={headerStyle}>Price</Th>
                    <Th style={headerStyle}>Total Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {items?.data?.map((product) => (
                    <Tr key={product.id}>
                      <Td style={dataStyle}>{product.id}</Td>
                      <Td style={dataStyle}>{product.itemName}</Td>
                      <Td style={dataStyle}>{product.quantity}</Td>
                      <Td style={dataStyle}>${product.price}</Td>
                      <Td style={dataStyle}>${product.totalPrice}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Text fontWeight="bold" mt={4} fontSize="sm">
                Total: ${total}
              </Text>
            </ModalBody>

            <ModalFooter>
              {!isLoading && (
                <Button size={"sm"} colorScheme="red" variant={"ghost"} mr={3} onClick={onClose}>
                  Close
                </Button>
              )}
              {order.orderStatus === "pending" && (
                <Button
                  size={"sm"}
                  colorScheme="blue"
                  variant={"ghost"}
                  onClick={() => handleStartDelivery()}
                  isLoading={isLoading}
                  spinner={<BeatLoader size={9} color="white" />}
                >
                  Start Delivering
                </Button>
              )}
              {order.orderStatus === "on deliver" && (
                <Button
                  size={"sm"}
                  colorScheme="green"
                  variant={"ghost"}
                  onClick={() => handleDelivery()}
                  isLoading={isLoading}
                  spinner={<BeatLoader size={9} color="white" />}
                >
                  Delivered
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Form>
      </Modal>
    </>
  );
};

export default PhonePurchaseOrderModal;
