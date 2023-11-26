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
} from "@chakra-ui/react";
import React from "react";
import { useDisclosure } from "@chakra-ui/react";

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

const PurchaseOrderModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const total = productData.reduce((acc, product) => acc + product.price, 0);

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" variant="outline">
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Purchase Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                Customer Information:
              </Text>
              <Text>
                <Text fontWeight="bold">Name:</Text> {customerData.name}
              </Text>
              <Text>
                <Text fontWeight="bold">Email:</Text> {customerData.email}
              </Text>
              <Text>
                <Text fontWeight="bold">Address:</Text> {customerData.address}
              </Text>
            </Box>

            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Product ID</Th>
                  <Th>Product Name</Th>
                  <Th>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {productData.map((product) => (
                  <Tr key={product.id}>
                    <Td>{product.id}</Td>
                    <Td>{product.name}</Td>
                    <Td>${product.price}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <Text fontWeight="bold" mt={4} fontSize="lg">
              Total: ${total}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Print</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PurchaseOrderModal;
