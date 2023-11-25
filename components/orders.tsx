import React from "react";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Badge } from "@chakra-ui/react";

interface ITypes {
  props: {
    currentItems?: //array of objects
    {
      id: number;
      purchaseData: string;
      orderDeliveryDate: string;
      total: number;
      status: string;
    }[];
  };
}

const Orders: React.FC<ITypes["props"]> = ({ currentItems }) => {
  console.log("currentItems//////", currentItems);
  return (
    <Box p={4} minH={"80vh"}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Orders!
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
          {currentItems?.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.purchaseData}</Td>
              <Td>{order.orderDeliveryDate}</Td>
              <Td>{order.total}</Td>
              <Td>
                {order.status === "delivered" && (
                  <Badge colorScheme="green" borderRadius={"xl"} size={"2xl"}>
                    delivered
                  </Badge>
                )}
                {order.status === "on deliver" && (
                  <Badge colorScheme="blue" borderRadius={"xl"} size={"2xl"}>
                    on deliver
                  </Badge>
                )}
                {order.status === "rejected" && (
                  <Badge colorScheme="red" borderRadius={"xl"} size={"2xl"}>
                    rejected
                  </Badge>
                )}
                {order.status === "pending" && (
                  <Badge colorScheme={"orange"} borderRadius={"xl"} size={"2xl"}>
                    pending
                  </Badge>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Orders;
