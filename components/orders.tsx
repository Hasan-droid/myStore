import React from "react";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const orders = [
  { id: 1, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "delivered" },
  //create 3 new orders with different data
  { id: 2, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "pending" },
  { id: 3, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "on deliver" },
];

const Orders: React.FC = () => {
  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Orders
      </Text>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Order purchase Date</Th>
            <Th>Order delivery Date</Th>
            <Th>Total</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.purchaseData}</Td>
              <Td>{order.orderDeliveryDate}</Td>
              <Td>{order.total}</Td>
              <Td>{order.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Orders;
