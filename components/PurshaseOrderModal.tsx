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

const customerData = {
  name: "John Doe",
  email: "johndoe@example.com",
  address: "123 Main St, City, State",
};

const productData = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
  { id: 6, name: "Product 6", price: 60 },
];

interface ITypes {
  dataFromActions?: {
    state: number;
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
      email: string;
      address: string;
      phoneNumber: string;
    };
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const PurchaseOrderModal: React.FC<ITypes["props"]> = ({ order, setLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dataFromActions = useActionData() as ITypes["dataFromActions"];
  const total = dataFromActions?.data.reduce((acc, product) => acc + product.totalPrice, 0);
  console.log("dataFromActions/orders", dataFromActions);
  const submit = useSubmit();

  useEffect(() => {
    if (dataFromActions?.state === 200) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [dataFromActions]);

  const handleClick = () => {
    submit({ id: order.id, intent: "items" }, { method: "post" });
    setLoading(true);
    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  return (
    <>
      {console.log("order!!!!!", order)}
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
        <Td>{order.id}</Td>
        <Td>{order.customerName}</Td>
        <Td>
          {
            //format date
            new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }
        </Td>
        <Td>{order.totalPrice}</Td>
        <Td>
          {order.orderStatus === "delivered" && (
            <Badge colorScheme="green" borderRadius={"xl"} size={"2xl"}>
              delivered
            </Badge>
          )}
          {order.orderStatus === "on deliver" && (
            <Badge colorScheme="blue" borderRadius={"xl"} size={"2xl"}>
              on deliver
            </Badge>
          )}
          {order.orderStatus === "rejected" && (
            <Badge colorScheme="red" borderRadius={"xl"} size={"2xl"}>
              rejected
            </Badge>
          )}
          {order.orderStatus === "pending" && (
            <Badge colorScheme={"orange"} borderRadius={"xl"} size={"2xl"}>
              pending
            </Badge>
          )}
        </Td>
      </Tr>
      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <Form method="post">
          <ModalContent>
            <ModalHeader>Purchase Order</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
                <Text fontWeight="bold" fontSize="lg" mb={2}>
                  Customer Information:
                </Text>
                <Grid //tow rows tow cloumns
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(2, 1fr)"
                  gap={4}
                >
                  <Text>
                    <Text fontWeight="bold">Name:</Text> {order.customerName}
                  </Text>
                  <Text>
                    <Text fontWeight="bold">Phone:</Text> {order.phoneNumber}
                  </Text>

                  <Text>
                    <Text fontWeight="bold">Address:</Text> {order.address}
                  </Text>
                  <Text>
                    <Text fontWeight="bold">Email:</Text> {order.email}
                  </Text>
                </Grid>
              </Box>

              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>Product ID</Th>
                    <Th>Product Name</Th>
                    <Th>Quantity</Th>
                    <Th>Price</Th>
                    <Th>Total Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataFromActions?.data.map((product) => (
                    <Tr key={product.id}>
                      <Td>{product.id}</Td>
                      <Td>{product.itemName}</Td>
                      <Td>{product.quantity}</Td>
                      <Td>${product.price}</Td>
                      <Td>${product.totalPrice}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Text fontWeight="bold" mt={4} fontSize="lg">
                Total: ${total}
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" variant={"ghost"} mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="green" type="submit">
                Deliver
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Modal>
    </>
  );
};

export default PurchaseOrderModal;
